import {
	Align,
	Direction,
	Edge,
	FlexDirection,
	Gutter,
	Justify,
	MeasureMode,
	PositionType,
	Wrap,
	loadYoga,
} from 'yoga-layout/load'
import type { CanvasNode, RootNode, TextNode, ViewNode } from '../runtime/nodes'
import { normalizeInsets } from '../utils'
import type { LayoutEngine } from '../types'
import type { CanvasRootOptions } from '../types'

/**
 * Yoga 布局层：把场景树同步到 Yoga 树，计算布局，再把 computed layout 写回节点。
 *
 * 约束：
 * - 这里只实现“足够 demo 使用”的 YogaStyle 子集（不含百分比/auto/边框等复杂 CSS 特性）
 * - Text 的测量依赖 measureText 回调（通常来自 Canvas2D measureText）
 */
let layoutEnginePromise: Promise<LayoutEngine> | null = null

/**
 * Yoga WASM 只需初始化一次；这里用 Promise 缓存，避免重复加载。
 */
export function getLayoutEngine(): Promise<LayoutEngine> {
	if (!layoutEnginePromise) {
		layoutEnginePromise = (async () => {
			const yoga = await loadYoga()
			return { yoga }
		})()
	}
	return layoutEnginePromise
}

/**
 * 将 YogaStyle 映射到 yoga Node。
 */
function applyYogaStyle(node: any, style: any) {
	const s = style ?? {}
	if (typeof s.width === 'number') node.setWidth(s.width)
	if (typeof s.height === 'number') node.setHeight(s.height)
	if (typeof s.minWidth === 'number') node.setMinWidth(s.minWidth)
	if (typeof s.minHeight === 'number') node.setMinHeight(s.minHeight)
	if (typeof s.maxWidth === 'number') node.setMaxWidth(s.maxWidth)
	if (typeof s.maxHeight === 'number') node.setMaxHeight(s.maxHeight)

	const insets = normalizeInsets(s)
	node.setPadding(Edge.Top, insets.paddingTop)
	node.setPadding(Edge.Right, insets.paddingRight)
	node.setPadding(Edge.Bottom, insets.paddingBottom)
	node.setPadding(Edge.Left, insets.paddingLeft)

	node.setMargin(Edge.Top, insets.marginTop)
	node.setMargin(Edge.Right, insets.marginRight)
	node.setMargin(Edge.Bottom, insets.marginBottom)
	node.setMargin(Edge.Left, insets.marginLeft)

	if (typeof s.flexGrow === 'number') node.setFlexGrow(s.flexGrow)
	if (typeof s.flexShrink === 'number') node.setFlexShrink(s.flexShrink)
	if (typeof s.flexBasis === 'number') node.setFlexBasis(s.flexBasis)

	if (s.flexDirection === 'row') node.setFlexDirection(FlexDirection.Row)
	if (s.flexDirection === 'column') node.setFlexDirection(FlexDirection.Column)

	if (s.justifyContent === 'flex-start') node.setJustifyContent(Justify.FlexStart)
	if (s.justifyContent === 'center') node.setJustifyContent(Justify.Center)
	if (s.justifyContent === 'flex-end') node.setJustifyContent(Justify.FlexEnd)
	if (s.justifyContent === 'space-between') node.setJustifyContent(Justify.SpaceBetween)
	if (s.justifyContent === 'space-around') node.setJustifyContent(Justify.SpaceAround)

	if (s.alignItems === 'stretch') node.setAlignItems(Align.Stretch)
	if (s.alignItems === 'flex-start') node.setAlignItems(Align.FlexStart)
	if (s.alignItems === 'center') node.setAlignItems(Align.Center)
	if (s.alignItems === 'flex-end') node.setAlignItems(Align.FlexEnd)

	if (s.alignContent === 'stretch') node.setAlignContent(Align.Stretch)
	if (s.alignContent === 'flex-start') node.setAlignContent(Align.FlexStart)
	if (s.alignContent === 'center') node.setAlignContent(Align.Center)
	if (s.alignContent === 'flex-end') node.setAlignContent(Align.FlexEnd)
	if (s.alignContent === 'space-between') node.setAlignContent(Align.SpaceBetween)
	if (s.alignContent === 'space-around') node.setAlignContent(Align.SpaceAround)

	if (s.flexWrap === 'no-wrap') node.setFlexWrap(Wrap.NoWrap)
	if (s.flexWrap === 'wrap') node.setFlexWrap(Wrap.Wrap)

	if (s.position === 'absolute') node.setPositionType(PositionType.Absolute)
	if (s.position === 'relative') node.setPositionType(PositionType.Relative)

	if (typeof s.top === 'number') node.setPosition(Edge.Top, s.top)
	if (typeof s.right === 'number') node.setPosition(Edge.Right, s.right)
	if (typeof s.bottom === 'number') node.setPosition(Edge.Bottom, s.bottom)
	if (typeof s.left === 'number') node.setPosition(Edge.Left, s.left)

	if (typeof s.gap === 'number') {
		node.setGap(Gutter.All, s.gap)
	}
}

function resolveInheritedTextStyle(textNode: TextNode, defaults?: CanvasRootOptions) {
	const own = textNode.props.style ?? {}
	let fontSize: number | undefined = own.fontSize
	let fontFamily: string | undefined = own.fontFamily
	let fontWeight: number | string | undefined = own.fontWeight
	let lineHeight: number | undefined = own.lineHeight

	let current = textNode.parent
	while (
		current &&
		(fontSize == null || fontFamily == null || fontWeight == null || lineHeight == null)
	) {
		const s = (current.props as any)?.style ?? {}
		if (fontSize == null && typeof s.fontSize === 'number') fontSize = s.fontSize
		if (fontFamily == null && typeof s.fontFamily === 'string') fontFamily = s.fontFamily
		if (
			fontWeight == null &&
			(typeof s.fontWeight === 'number' || typeof s.fontWeight === 'string')
		)
			fontWeight = s.fontWeight
		if (lineHeight == null && typeof s.lineHeight === 'number') lineHeight = s.lineHeight
		current = current.parent
	}

	const resolvedFontSize = fontSize ?? defaults?.fontSize ?? 16
	const resolvedFontFamily = fontFamily ?? defaults?.fontFamily ?? 'system-ui'
	const resolvedFontWeight = fontWeight ?? defaults?.fontWeight ?? 400
	const resolvedLineHeight =
		lineHeight ?? defaults?.lineHeight ?? Math.round(resolvedFontSize * 1.2)
	return {
		fontSize: resolvedFontSize,
		fontFamily: resolvedFontFamily,
		fontWeight: resolvedFontWeight,
		lineHeight: resolvedLineHeight,
		font: `${resolvedFontWeight} ${resolvedFontSize}px ${resolvedFontFamily}`,
	}
}

/**
 * 确保每个 CanvasNode 都有对应的 YogaNode：
 * - View/Rect：只需要样式即可参与布局
 * - Text：需要 setMeasureFunc 才能自适应宽高
 */
function ensureYogaNode(
	engine: LayoutEngine,
	node: CanvasNode,
	measureText?: (
		text: string,
		font: string,
		maxWidth?: number,
	) => { width: number; height: number },
	defaults?: CanvasRootOptions,
) {
	if (node.yogaNode) return
	const yogaNode = engine.yoga.Node.create()
	node.yogaNode = yogaNode

	if (node.type === 'Text') {
		const textNode = node as TextNode
		/**
		 * Yoga 通过 measureFunc 询问：在给定约束（width + widthMode）下的理想尺寸。
		 * 这里做最小实现：只用 measureText 粗算，不做自动换行排版。
		 */
		yogaNode.setMeasureFunc(
			(width: number, widthMode: number, _height: number, _heightMode: number) => {
				const { font, fontSize, lineHeight } = resolveInheritedTextStyle(textNode, defaults)
				const maxWidth = widthMode === MeasureMode.Undefined ? textNode.props.maxWidth : width
				const measured = measureText?.(textNode.props.text, font, maxWidth)
				const w =
					measured?.width ??
					Math.min(
						textNode.props.text.length * fontSize,
						maxWidth ?? textNode.props.text.length * fontSize,
					)
				const lines = measured?.height ? Math.max(1, Math.round(measured.height / lineHeight)) : 1
				return { width: w, height: lines * lineHeight }
			},
		)
	}
}

/**
 * 将当前场景树“同步”为 Yoga 树结构：
 * - 先移除旧 child 关系，避免增删改后 Yoga 内残留旧结构
 * - 再按 children 顺序 insertChild，并应用 style
 */
function syncYogaTree(
	engine: LayoutEngine,
	rootYoga: any,
	root: RootNode,
	measureText: (text: string, font: string, maxWidth?: number) => { width: number; height: number },
	defaults?: CanvasRootOptions,
) {
	const detachAll = (yogaNode: any) => {
		const count = yogaNode.getChildCount()
		for (let i = count - 1; i >= 0; i -= 1) {
			yogaNode.removeChild(yogaNode.getChild(i))
		}
	}

	const clearLinks = (parent: RootNode | CanvasNode) => {
		if ((parent as any).yogaNode) detachAll((parent as any).yogaNode)
		for (const child of (parent as any).children ?? []) clearLinks(child)
	}

	clearLinks(root as any)
	detachAll(rootYoga)

	const visit = (parentYoga: any, parent: ViewNode | RootNode) => {
		for (let i = 0; i < parent.children.length; i += 1) {
			const child = parent.children[i]
			ensureYogaNode(engine, child, measureText, defaults)
			const style = (child as any).props?.style
			applyYogaStyle(child.yogaNode, style)
			const currentParent = child.yogaNode.getParent?.()
			if (currentParent && currentParent !== parentYoga) {
				currentParent.removeChild(child.yogaNode)
			}
			parentYoga.insertChild(child.yogaNode, parentYoga.getChildCount())
			if (child.children.length) {
				visit(child.yogaNode, child as any)
			}
		}
	}

	visit(rootYoga, root as any)
}

/**
 * 将 Yoga computed layout 写回 CanvasNode。
 */
function readComputedLayout(node: CanvasNode) {
	if (!node.yogaNode) return
	const layout = node.yogaNode.getComputedLayout()
	node.layout = {
		x: layout.left,
		y: layout.top,
		width: layout.width,
		height: layout.height,
	}
}

/**
 * 对整棵树执行一次 layout pass：
 * 1) 初始化/更新 Root 的 YogaNode 尺寸
 * 2) 同步结构与样式
 * 3) calculateLayout
 * 4) 回写 computed layout
 */
export async function layoutTree(
	root: RootNode,
	width: number,
	height: number,
	measureText: (text: string, font: string, maxWidth?: number) => { width: number; height: number },
	defaults?: CanvasRootOptions,
) {
	const engine = await getLayoutEngine()
	if (!root.yogaNode) {
		root.yogaNode = engine.yoga.Node.create()
		root.yogaNode.setWidth(width)
		root.yogaNode.setHeight(height)
	} else {
		root.yogaNode.setWidth(width)
		root.yogaNode.setHeight(height)
	}

	root.yogaNode.setFlexDirection(FlexDirection.Column)
	root.yogaNode.setAlignItems(Align.Stretch)

	syncYogaTree(engine, root.yogaNode, root, measureText, defaults)
	root.yogaNode.calculateLayout(width, height, Direction.LTR)

	const computeContentWidth = (node: CanvasNode) => {
		let maxRight = 0
		for (const child of node.children) {
			maxRight = Math.max(maxRight, child.layout.x + child.layout.width)
		}
		return maxRight
	}

	const computeContentHeight = (node: CanvasNode) => {
		let maxBottom = 0
		for (const child of node.children) {
			maxBottom = Math.max(maxBottom, child.layout.y + child.layout.height)
		}
		return maxBottom
	}

	const clampScrollTop = (node: CanvasNode) => {
		if (node.type !== 'View') return
		if (!(node.props as any)?.scrollY) return
		const viewportH = node.layout.height
		const contentH = node.scrollContentHeight ?? 0
		const maxScrollTop = Math.max(0, contentH - viewportH)
		if (typeof node.scrollTop !== 'number') node.scrollTop = 0
		node.scrollTop = Math.max(0, Math.min(node.scrollTop, maxScrollTop))
	}

	const clampScrollLeft = (node: CanvasNode) => {
		if (node.type !== 'View') return
		if (!(node.props as any)?.scrollX) return
		const viewportW = node.layout.width
		const contentW = node.scrollContentWidth ?? 0
		const maxScrollLeft = Math.max(0, contentW - viewportW)
		if (typeof node.scrollLeft !== 'number') node.scrollLeft = 0
		node.scrollLeft = Math.max(0, Math.min(node.scrollLeft, maxScrollLeft))
	}

	const walk = (parent: RootNode | CanvasNode) => {
		for (const child of parent.children) {
			readComputedLayout(child)
			if (child.children.length) walk(child)
			if (
				child.type === 'View' &&
				((child.props as any)?.scrollY || (child.props as any)?.scrollX)
			) {
				if ((child.props as any)?.scrollY) {
					child.scrollContentHeight = computeContentHeight(child)
					clampScrollTop(child)
				}
				if ((child.props as any)?.scrollX) {
					child.scrollContentWidth = computeContentWidth(child)
					clampScrollLeft(child)
				}
			}
		}
	}
	walk(root)

	const computeSubtreeContentBounds = (node: CanvasNode) => {
		let minX = 0
		let minY = 0
		let maxX = node.layout.width
		let maxY = node.layout.height

		for (const child of node.children) {
			if (child.children.length) computeSubtreeContentBounds(child)
			const childBounds = child.contentBounds ?? {
				x: 0,
				y: 0,
				width: child.layout.width,
				height: child.layout.height,
			}
			const bx = child.layout.x + childBounds.x
			const by = child.layout.y + childBounds.y
			const br = bx + childBounds.width
			const bb = by + childBounds.height
			minX = Math.min(minX, bx)
			minY = Math.min(minY, by)
			maxX = Math.max(maxX, br)
			maxY = Math.max(maxY, bb)
		}

		node.contentBounds = { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
	}

	for (const child of root.children) computeSubtreeContentBounds(child)
}

/**
 * 释放某个节点对应的 Yoga 子树（WASM 对象需要显式 free）。
 */
export function freeYogaSubtree(node: CanvasNode) {
	if (node.yogaNode) {
		const parent = node.yogaNode.getParent?.()
		if (parent) {
			parent.removeChild(node.yogaNode)
		}
		node.yogaNode.freeRecursive()
	}
	const clearRefs = (target: CanvasNode) => {
		target.yogaNode = null
		for (const child of target.children) clearRefs(child)
	}
	clearRefs(node)
}
