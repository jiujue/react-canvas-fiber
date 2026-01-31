import type { CanvasNode, RootNode } from '../runtime/nodes'
import type { DrawState } from '../types'
import type { CanvasRootOptions } from '../types'
import { drawLineNode, drawPathNode } from './drawPrimitives'
import {
	IDENTITY_MATRIX,
	parseTransform,
	resolveOpacity,
	resolveOverflowHidden,
	resolveTransformOrigin,
	resolveZIndex,
} from '../utils'

/**
 * Canvas2D 绘制层：将布局后的场景树绘制到 CanvasRenderingContext2D。
 *
 * 约束：
 * - 只实现最小图元：View（背景）、Rect、Text
 * - Text 只支持 \n 手动换行，不做自动换行与对齐
 * - 子节点坐标以父节点为参照系，递归累加 offset
 */
function resolveInheritedTextStyle(node: CanvasNode, defaults?: CanvasRootOptions) {
	const own = (node.props as any)?.style ?? {}
	let fontSize: number | undefined = own.fontSize
	let fontFamily: string | undefined = own.fontFamily
	let fontWeight: number | string | undefined = own.fontWeight
	let lineHeight: number | undefined = own.lineHeight

	let current = node.parent
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
 * 绘制圆角矩形路径（仅创建 path，不会自动 fill/stroke）。
 */
function drawRoundedRect(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	r: number,
) {
	const radius = Math.max(0, Math.min(r, Math.min(w, h) / 2))
	ctx.beginPath()
	ctx.moveTo(x + radius, y)
	ctx.arcTo(x + w, y, x + w, y + h, radius)
	ctx.arcTo(x + w, y + h, x, y + h, radius)
	ctx.arcTo(x, y + h, x, y, radius)
	ctx.arcTo(x, y, x + w, y, radius)
	ctx.closePath()
}

function rectsIntersect(
	ax: number,
	ay: number,
	aw: number,
	ah: number,
	bx: number,
	by: number,
	bw: number,
	bh: number,
) {
	return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by
}

type ResolvedBorder = { width: number; color: string }

function resolveBorder(value: unknown): ResolvedBorder | null {
	if (typeof value !== 'string') return null
	const raw = value.trim()
	if (!raw) return null
	const normalized = raw.replace(/\s+/g, ' ')
	const match = normalized.match(/^([0-9]*\.?[0-9]+)(px)?\s+(?:solid\s+)?(.+)$/i)
	if (match) {
		const width = Number(match[1])
		const color = match[3]?.trim()
		if (Number.isFinite(width) && width > 0 && color) return { width, color }
		return null
	}

	const withoutSolid = normalized
		.replace(/\bsolid\b/gi, ' ')
		.replace(/\s+/g, ' ')
		.trim()
	const match2 = withoutSolid.match(/^([0-9]*\.?[0-9]+)(px)?\s+(.+)$/i)
	if (match2) {
		const width = Number(match2[1])
		const color = match2[3]?.trim()
		if (Number.isFinite(width) && width > 0 && color) return { width, color }
		return null
	}

	if (/^[0-9]/.test(withoutSolid)) return null
	if (!withoutSolid) return null
	return { width: 1, color: withoutSolid }
}

function drawBorder(
	ctx: CanvasRenderingContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	radius: number,
	border: ResolvedBorder,
) {
	if (!Number.isFinite(border.width) || border.width <= 0) return
	const inset = border.width / 2
	const bw = w - border.width
	const bh = h - border.width
	if (bw <= 0 || bh <= 0) return
	ctx.save()
	ctx.strokeStyle = border.color
	ctx.lineWidth = border.width
	drawRoundedRect(ctx, x + inset, y + inset, bw, bh, Math.max(0, radius - inset))
	ctx.stroke()
	ctx.restore()
}

function resolveBgRepeat(repeat: string | undefined): string {
	if (!repeat) return 'repeat'
	if (
		repeat === 'no-repeat' ||
		repeat === 'repeat-x' ||
		repeat === 'repeat-y' ||
		repeat === 'repeat'
	)
		return repeat
	return 'repeat'
}

function parseBgSize(size: string | undefined, w: number, h: number, imgW: number, imgH: number) {
	if (!size || size === 'auto') return { width: imgW, height: imgH }
	if (size === 'cover') {
		const scale = Math.max(w / imgW, h / imgH)
		return { width: imgW * scale, height: imgH * scale }
	}
	if (size === 'contain') {
		const scale = Math.min(w / imgW, h / imgH)
		return { width: imgW * scale, height: imgH * scale }
	}
	const parts = size.trim().split(/\s+/)
	let rw = imgW
	let rh = imgH

	// Width
	if (parts[0]) {
		if (parts[0].endsWith('%')) {
			rw = (w * parseFloat(parts[0])) / 100
		} else if (parts[0] !== 'auto') {
			rw = parseFloat(parts[0])
		}
	}

	// Height
	if (parts[1]) {
		if (parts[1].endsWith('%')) {
			rh = (h * parseFloat(parts[1])) / 100
		} else if (parts[1] !== 'auto') {
			rh = parseFloat(parts[1])
		}
	} else {
		// If height is missing, set to auto (maintain aspect ratio if width changed)
		if (parts[0] !== 'auto') {
			rh = imgH * (rw / imgW)
		}
	}
	return { width: rw, height: rh }
}

function parseBgPos(
	pos: string | undefined,
	w: number,
	h: number,
	targetW: number,
	targetH: number,
) {
	// Default 0% 0%
	const parts = (pos || '').trim().split(/\s+/)
	if (parts.length === 0 || (parts.length === 1 && !parts[0])) {
		return { x: 0, y: 0 }
	}

	const xStr = parts[0]
	let yStr = parts[1]

	if (parts.length === 1) {
		yStr = 'center'
	}

	function resolve(val: string, containerDim: number, imgDim: number) {
		if (val === 'left' || val === 'top') return 0
		if (val === 'right' || val === 'bottom') return containerDim - imgDim
		if (val === 'center') return (containerDim - imgDim) / 2
		if (val.endsWith('%')) {
			return ((containerDim - imgDim) * parseFloat(val)) / 100
		}
		if (val.endsWith('px')) {
			return parseFloat(val)
		}
		return parseFloat(val) || 0
	}

	return {
		x: resolve(xStr, w, targetW),
		y: resolve(yStr, h, targetH),
	}
}

function drawBackgroundImage(
	ctx: CanvasRenderingContext2D,
	node: import('../runtime/nodes').ViewNode,
	x: number,
	y: number,
	w: number,
	h: number,
	radius: number,
) {
	const img = node.backgroundImageInstance
	if (!img || !img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) return

	const props = node.props as any
	const bgSize = props.backgroundSize
	const bgPos = props.backgroundPosition
	const bgRepeat = resolveBgRepeat(props.backgroundRepeat)

	// Calculate target size
	const imgW = img.naturalWidth
	const imgH = img.naturalHeight

	const { width: targetW, height: targetH } = parseBgSize(bgSize, w, h, imgW, imgH)
	const { x: posX, y: posY } = parseBgPos(bgPos, w, h, targetW, targetH)

	ctx.save()
	// Clip to rounded rect
	drawRoundedRect(ctx, x, y, w, h, radius)
	ctx.clip()

	if (bgRepeat === 'no-repeat') {
		// Simple drawImage
		ctx.drawImage(img, x + posX, y + posY, targetW, targetH)
	} else {
		// Use pattern
		const pattern = ctx.createPattern(img, bgRepeat)
		if (pattern) {
			const matrix = new DOMMatrix()
			const scaleX = targetW / imgW
			const scaleY = targetH / imgH

			matrix.translateSelf(x + posX, y + posY)
			matrix.scaleSelf(scaleX, scaleY)

			pattern.setTransform(matrix)

			ctx.fillStyle = pattern
			ctx.beginPath()
			ctx.rect(x, y, w, h)
			ctx.fill()
		}
	}
	ctx.restore()
}

/**
 * 绘制单个节点及其子树。
 *
 * 中文说明：
 * - drawNode 内部将 ctx 变换到“节点局部坐标系”（0,0 为节点左上角）
 * - 子节点只需要按自己的 layout.x/y 继续 translate 即可
 * - transform/opacity/overflow/zIndex 都在该局部坐标系下生效，并可自然传递到子树
 */
function drawNode(state: DrawState, node: CanvasNode) {
	const { ctx } = state
	const w = node.layout.width
	const h = node.layout.height

	const style = (node.props as any)?.style ?? {}
	const opacity = resolveOpacity(style.opacity)
	const overflowHidden = resolveOverflowHidden(style.overflow)

	const transformMatrix = parseTransform(style.transform)
	const hasTransform =
		transformMatrix.a !== IDENTITY_MATRIX.a ||
		transformMatrix.b !== IDENTITY_MATRIX.b ||
		transformMatrix.c !== IDENTITY_MATRIX.c ||
		transformMatrix.d !== IDENTITY_MATRIX.d ||
		transformMatrix.e !== IDENTITY_MATRIX.e ||
		transformMatrix.f !== IDENTITY_MATRIX.f

	let viewBorder: ResolvedBorder | null = null
	let viewRadius = 0
	let viewIsScroll = false

	const getOrderedChildren = () => {
		const children = node.children
		if (children.length <= 1) return children
		let hasAnyZ = false
		for (let i = 0; i < children.length; i += 1) {
			const z = resolveZIndex((children[i].props as any)?.style?.zIndex)
			if (z !== 0) {
				hasAnyZ = true
				break
			}
		}
		if (!hasAnyZ) return children
		return children
			.map((child, index) => ({
				child,
				index,
				zIndex: resolveZIndex((child.props as any)?.style?.zIndex),
			}))
			.sort((a, b) => a.zIndex - b.zIndex || a.index - b.index)
			.map((x) => x.child)
	}

	ctx.save()
	ctx.translate(node.layout.x, node.layout.y)
	if (opacity !== 1) ctx.globalAlpha *= opacity

	if (hasTransform) {
		const origin = resolveTransformOrigin(style.transformOrigin, w, h)
		ctx.translate(origin.x, origin.y)
		ctx.transform(
			transformMatrix.a,
			transformMatrix.b,
			transformMatrix.c,
			transformMatrix.d,
			transformMatrix.e,
			transformMatrix.f,
		)
		ctx.translate(-origin.x, -origin.y)
	}

	if (node.type === 'View') {
		const background = (node.props as any).background
		viewBorder = resolveBorder((node.props as any).border)
		viewRadius = (node.props as any).borderRadius ?? 0
		const scrollX = !!(node.props as any)?.scrollX
		const scrollY = !!(node.props as any)?.scrollY
		const scrollLeft = scrollX ? (node.scrollLeft ?? 0) : 0
		const scrollTop = scrollY ? (node.scrollTop ?? 0) : 0
		const scrollbarX = scrollX ? (node.props as any)?.scrollbarX !== false : false
		const scrollbarY = scrollY ? (node.props as any)?.scrollbarY !== false : false
		const scrollbarWidth = (node.props as any)?.scrollbarWidth ?? 10
		const scrollbarInset = (node.props as any)?.scrollbarInset ?? 6
		const scrollbarTrackColor = (node.props as any)?.scrollbarTrackColor ?? 'rgba(255,255,255,0.12)'
		const scrollbarThumbColor = (node.props as any)?.scrollbarThumbColor ?? 'rgba(255,255,255,0.35)'
		const contentWidth = node.scrollContentWidth ?? 0
		const contentHeight = node.scrollContentHeight ?? 0
		const maxScrollLeft = Math.max(0, contentWidth - w)
		const maxScrollTop = Math.max(0, contentHeight - h)

		if (background) {
			ctx.save()
			ctx.fillStyle = background
			drawRoundedRect(ctx, 0, 0, w, h, viewRadius)
			ctx.fill()
			ctx.restore()
		}

		// Background Image
		const viewNode = node as unknown as import('../runtime/nodes').ViewNode
		if (viewNode.backgroundImageInstance) {
			drawBackgroundImage(ctx, viewNode, 0, 0, w, h, viewRadius)
		}

		if (overflowHidden && !scrollX && !scrollY) {
			ctx.save()
			drawRoundedRect(ctx, 0, 0, w, h, viewRadius)
			ctx.clip()
			for (const child of getOrderedChildren()) {
				drawNode(state, child)
			}
			ctx.restore()
			if (viewBorder) drawBorder(ctx, 0, 0, w, h, viewRadius, viewBorder)
			ctx.restore()
			return
		}

		if (scrollX || scrollY) {
			viewIsScroll = true
			ctx.save()
			ctx.beginPath()
			if (viewRadius > 0) {
				drawRoundedRect(ctx, 0, 0, w, h, viewRadius)
			} else {
				ctx.rect(0, 0, w, h)
			}
			ctx.clip()
			ctx.translate(-scrollLeft, -scrollTop)
			const cullPadding = 1
			const viewportX = scrollLeft - cullPadding
			const viewportY = scrollTop - cullPadding
			const viewportW = w + cullPadding * 2
			const viewportH = h + cullPadding * 2
			for (const child of getOrderedChildren()) {
				const bounds = child.contentBounds ?? {
					x: 0,
					y: 0,
					width: child.layout.width,
					height: child.layout.height,
				}
				const bx = child.layout.x + bounds.x
				const by = child.layout.y + bounds.y
				if (
					!rectsIntersect(
						viewportX,
						viewportY,
						viewportW,
						viewportH,
						bx,
						by,
						bounds.width,
						bounds.height,
					)
				) {
					continue
				}
				drawNode(state, child)
			}
			ctx.restore()

			const corner = scrollbarInset + scrollbarWidth

			if (scrollbarY && maxScrollTop > 0) {
				const trackX = w - scrollbarInset - scrollbarWidth
				const trackY = scrollbarInset
				const trackH = Math.max(
					0,
					h - scrollbarInset * 2 - (scrollbarX && maxScrollLeft > 0 ? corner : 0),
				)
				const minThumbH = 16
				const thumbH =
					contentHeight > 0
						? Math.max(minThumbH, Math.min(trackH, (trackH * h) / contentHeight))
						: trackH
				const travel = Math.max(0, trackH - thumbH)
				const thumbY = travel > 0 ? trackY + (scrollTop / maxScrollTop) * travel : trackY
				const radius = Math.min(6, scrollbarWidth / 2)

				ctx.save()
				ctx.fillStyle = scrollbarTrackColor
				drawRoundedRect(ctx, trackX, trackY, scrollbarWidth, trackH, radius)
				ctx.fill()
				ctx.fillStyle = scrollbarThumbColor
				drawRoundedRect(ctx, trackX, thumbY, scrollbarWidth, thumbH, radius)
				ctx.fill()
				ctx.restore()
			}

			if (scrollbarX && maxScrollLeft > 0) {
				const trackX = scrollbarInset
				const trackY = h - scrollbarInset - scrollbarWidth
				const trackW = Math.max(
					0,
					w - scrollbarInset * 2 - (scrollbarY && maxScrollTop > 0 ? corner : 0),
				)
				const minThumbW = 16
				const thumbW =
					contentWidth > 0
						? Math.max(minThumbW, Math.min(trackW, (trackW * w) / contentWidth))
						: trackW
				const travel = Math.max(0, trackW - thumbW)
				const thumbX = travel > 0 ? trackX + (scrollLeft / maxScrollLeft) * travel : trackX
				const radius = Math.min(6, scrollbarWidth / 2)

				ctx.save()
				ctx.fillStyle = scrollbarTrackColor
				drawRoundedRect(ctx, trackX, trackY, trackW, scrollbarWidth, radius)
				ctx.fill()
				ctx.fillStyle = scrollbarThumbColor
				drawRoundedRect(ctx, thumbX, trackY, thumbW, scrollbarWidth, radius)
				ctx.fill()
				ctx.restore()
			}

			if (viewBorder) drawBorder(ctx, 0, 0, w, h, viewRadius, viewBorder)
			ctx.restore()
			return
		}
	}

	if (node.type === 'Rect') {
		const fill = node.props.fill ?? '#ffffff'
		const stroke = node.props.stroke
		const lineWidth = node.props.lineWidth ?? 1
		const radius = node.props.borderRadius ?? 0
		ctx.save()
		drawRoundedRect(ctx, 0, 0, w, h, radius)
		if (fill) {
			ctx.fillStyle = fill
			ctx.fill()
		}
		if (stroke) {
			ctx.strokeStyle = stroke
			ctx.lineWidth = lineWidth
			ctx.stroke()
		}
		ctx.restore()
	}

	if (node.type === 'Circle') {
		const fill = (node.props as any).fill ?? '#ffffff'
		const stroke = (node.props as any).stroke
		const lineWidth = (node.props as any).lineWidth ?? 1
		if (w > 0 && h > 0) {
			const cx = w / 2
			const cy = h / 2
			const rx = w / 2
			const ry = h / 2
			ctx.save()
			ctx.beginPath()
			ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
			if (fill) {
				ctx.fillStyle = fill
				ctx.fill()
			}
			if (stroke) {
				ctx.strokeStyle = stroke
				ctx.lineWidth = lineWidth
				ctx.stroke()
			}
			ctx.restore()
		}
	}

	if (node.type === 'Path') {
		drawPathNode(ctx, node as any, 0, 0)
	}

	if (node.type === 'Line') {
		drawLineNode(ctx, node as any, 0, 0, w, h)
	}

	if (node.type === 'Text') {
		const text = node.props.text
		const color = node.props.color ?? '#ffffff'
		const { font, lineHeight } = resolveInheritedTextStyle(node, state.defaults)
		ctx.save()
		ctx.font = font
		ctx.fillStyle = color
		ctx.textBaseline = 'top'
		const lines = String(text).split('\n')
		for (let i = 0; i < lines.length; i += 1) {
			ctx.fillText(lines[i], 0, i * lineHeight)
		}
		ctx.restore()
	}

	if (node.type === 'Image') {
		const { imageInstance } = node
		if (imageInstance && imageInstance.complete && imageInstance.naturalWidth > 0) {
			const objectFit = node.props.objectFit || 'contain'
			const radius = node.props.borderRadius ?? 0
			const srcW = imageInstance.naturalWidth
			const srcH = imageInstance.naturalHeight

			let dstX = 0
			let dstY = 0
			let dstW = w
			let dstH = h
			let srcX = 0
			let srcY = 0
			let finalSrcW = srcW
			let finalSrcH = srcH

			if (objectFit === 'fill') {
				// stretch
			} else if (objectFit === 'contain') {
				const ratio = Math.min(w / srcW, h / srcH)
				dstW = srcW * ratio
				dstH = srcH * ratio
				dstX = (w - dstW) / 2
				dstY = (h - dstH) / 2
			} else if (objectFit === 'cover') {
				const ratio = Math.max(w / srcW, h / srcH)
				const renderW = srcW * ratio
				const renderH = srcH * ratio
				srcX = (renderW - w) / 2 / ratio
				srcY = (renderH - h) / 2 / ratio
				finalSrcW = w / ratio
				finalSrcH = h / ratio
			}

			ctx.save()
			ctx.beginPath()
			drawRoundedRect(ctx, 0, 0, w, h, radius)
			ctx.clip()
			ctx.drawImage(imageInstance, srcX, srcY, finalSrcW, finalSrcH, dstX, dstY, dstW, dstH)
			ctx.restore()
		}
	}

	for (const child of getOrderedChildren()) {
		drawNode(state, child)
	}

	if (node.type === 'View' && !viewIsScroll && viewBorder) {
		drawBorder(ctx, 0, 0, w, h, viewRadius, viewBorder)
	}

	ctx.restore()
}

/**
 * draw pass 入口：
 * - 先清屏（clearColor 存在则填充底色，否则 clearRect）
 * - 再设置 dpr 变换，保证布局使用“逻辑像素”时也能在高分屏清晰绘制
 */
export function drawTree(
	root: RootNode,
	ctx: CanvasRenderingContext2D,
	dpr: number,
	clearColor?: string,
	defaults?: CanvasRootOptions,
) {
	const w = ctx.canvas.width
	const h = ctx.canvas.height
	ctx.save()
	if (clearColor) {
		ctx.fillStyle = clearColor
		ctx.fillRect(0, 0, w, h)
	} else {
		ctx.clearRect(0, 0, w, h)
	}
	ctx.restore()

	ctx.save()
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
	const state: DrawState = { ctx, dpr, defaults }
	const rootChildren = root.children
	let hasAnyZ = false
	for (let i = 0; i < rootChildren.length; i += 1) {
		const z = resolveZIndex((rootChildren[i].props as any)?.style?.zIndex)
		if (z !== 0) {
			hasAnyZ = true
			break
		}
	}
	const orderedRootChildren = hasAnyZ
		? rootChildren
				.map((child, index) => ({
					child,
					index,
					zIndex: resolveZIndex((child.props as any)?.style?.zIndex),
				}))
				.sort((a, b) => a.zIndex - b.zIndex || a.index - b.index)
				.map((x) => x.child)
		: rootChildren

	for (const child of orderedRootChildren) {
		drawNode(state, child)
	}
	ctx.restore()
}
