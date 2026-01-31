import type { ReactNode } from 'react'
import { createRootNode } from './nodes'
import { drawTree } from '../render'
import { layoutTree } from '../layout'
import { createReconcilerRoot } from './reconciler'
import type { CanvasNode, RootNode } from './nodes'
import type { CanvasPointerEventType, CanvasRootOptions, MeasureTextFn } from '../types'
import { createCanvasProfiler } from './profiler'
import {
	IDENTITY_MATRIX,
	applyToPoint,
	estimateUniformScale,
	invertMatrix,
	multiplyMatrix,
	parseTransform,
	resolveOverflowHidden,
	resolvePath2D,
	resolveTransformOrigin,
	resolveZIndex,
	translationMatrix,
} from '../utils'
import { hitTestEllipse, hitTestLineSegment } from './hitTestPrimitives'

function getOrderedChildrenByZIndex(node: CanvasNode): CanvasNode[] {
	const children = node.children
	if (children.length <= 1) return children
	if (node.type === 'Layer') return children
	let hasAnyZ = false
	let hash = 2166136261
	for (let i = 0; i < children.length; i += 1) {
		const z = resolveZIndex((children[i].props as any)?.style?.zIndex)
		if (z !== 0) {
			hasAnyZ = true
		}
		hash ^= children[i].debugId
		hash = Math.imul(hash, 16777619)
		hash ^= z
		hash = Math.imul(hash, 16777619)
	}
	if (!hasAnyZ) return children
	const cache = (node as any).__zOrderCache as
		| { hash: number; len: number; ordered: CanvasNode[] }
		| undefined
	if (cache && cache.hash === hash && cache.len === children.length) return cache.ordered
	const ordered = children
		.map((child, index) => ({
			child,
			index,
			zIndex: resolveZIndex((child.props as any)?.style?.zIndex),
		}))
		.sort((a, b) => a.zIndex - b.zIndex || a.index - b.index)
		.map((x) => x.child)
	;(node as any).__zOrderCache = { hash, len: children.length, ordered }
	return ordered
}

function computeLocalTransform(node: CanvasNode, style: any, w: number, h: number) {
	const cache = (node as any).__localTransformCache as
		| {
				transform: any
				transformOrigin: any
				w: number
				h: number
				value: { matrix: any; inv: any; scale: number }
		  }
		| undefined
	if (
		cache &&
		cache.transform === style?.transform &&
		cache.transformOrigin === style?.transformOrigin &&
		cache.w === w &&
		cache.h === h
	) {
		return cache.value
	}

	const transformMatrix = parseTransform(style?.transform)
	const hasTransform =
		transformMatrix.a !== IDENTITY_MATRIX.a ||
		transformMatrix.b !== IDENTITY_MATRIX.b ||
		transformMatrix.c !== IDENTITY_MATRIX.c ||
		transformMatrix.d !== IDENTITY_MATRIX.d ||
		transformMatrix.e !== IDENTITY_MATRIX.e ||
		transformMatrix.f !== IDENTITY_MATRIX.f
	if (!hasTransform) {
		const value = { matrix: IDENTITY_MATRIX, inv: IDENTITY_MATRIX, scale: 1 }
		;(node as any).__localTransformCache = {
			transform: style?.transform,
			transformOrigin: style?.transformOrigin,
			w,
			h,
			value,
		}
		return value
	}

	const origin = resolveTransformOrigin(style?.transformOrigin, w, h)
	const withOrigin = multiplyMatrix(
		translationMatrix(origin.x, origin.y),
		multiplyMatrix(transformMatrix, translationMatrix(-origin.x, -origin.y)),
	)
	const inv = invertMatrix(withOrigin)
	const value = inv
		? { matrix: withOrigin, inv, scale: estimateUniformScale(withOrigin) }
		: { matrix: withOrigin, inv: null, scale: estimateUniformScale(withOrigin) }
	;(node as any).__localTransformCache = {
		transform: style?.transform,
		transformOrigin: style?.transformOrigin,
		w,
		h,
		value,
	}
	return value
}

function hitTestRoundedRect(x: number, y: number, w: number, h: number, r: number): boolean {
	if (!(w > 0 && h > 0)) return false
	const radius = Math.max(0, Math.min(r, Math.min(w, h) / 2))
	if (radius === 0) return x >= 0 && x <= w && y >= 0 && y <= h

	if (x < 0 || x > w || y < 0 || y > h) return false

	if (x >= radius && x <= w - radius) return true
	if (y >= radius && y <= h - radius) return true

	const cx = x < radius ? radius : w - radius
	const cy = y < radius ? radius : h - radius
	const dx = x - cx
	const dy = y - cy
	return dx * dx + dy * dy <= radius * radius
}

export function hitTestTree(
	rootChildren: CanvasNode[],
	x: number,
	y: number,
	ctx?: CanvasRenderingContext2D | null,
): CanvasNode | null {
	const orderedRoots =
		rootChildren.length <= 1
			? rootChildren
			: rootChildren
					.map((child, index) => ({
						child,
						index,
						zIndex: resolveZIndex((child.props as any)?.style?.zIndex),
					}))
					.sort((a, b) => a.zIndex - b.zIndex || a.index - b.index)
					.map((x) => x.child)

	const visit = (node: CanvasNode, px: number, py: number): CanvasNode | null => {
		if ((node.props as any)?.pointerEvents === 'none') return null

		const w = node.layout.width
		const h = node.layout.height
		const style = (node.props as any)?.style ?? {}

		let localX = px - node.layout.x
		let localY = py - node.layout.y

		const t = computeLocalTransform(node, style, w, h)
		if (t.inv === null) return null
		if (t.matrix !== IDENTITY_MATRIX) {
			const p = applyToPoint(t.inv, localX, localY)
			localX = p.x
			localY = p.y
		}

		const inBox = localX >= 0 && localX <= w && localY >= 0 && localY <= h

		const overflowHidden = resolveOverflowHidden(style.overflow)
		const isView = node.type === 'View' || node.type === 'Layer'
		const scrollX = isView && !!(node.props as any)?.scrollX
		const scrollY = isView && !!(node.props as any)?.scrollY
		const clipped = scrollX || scrollY || overflowHidden
		let inClip = inBox
		if (clipped && isView) {
			const radius = (node.props as any)?.borderRadius ?? 0
			if (typeof radius === 'number' && radius > 0) {
				inClip = hitTestRoundedRect(localX, localY, w, h, radius)
			}
		}
		if (clipped && !inClip) return null

		let childPX = localX
		let childPY = localY
		if (scrollX) childPX += node.scrollLeft ?? 0
		if (scrollY) childPY += node.scrollTop ?? 0

		const children = getOrderedChildrenByZIndex(node)
		for (let i = children.length - 1; i >= 0; i -= 1) {
			const hit = visit(children[i], childPX, childPY)
			if (hit) return hit
		}

		if (!inClip) return null

		if (node.type === 'Circle') {
			if (!hitTestEllipse(localX, localY, 0, 0, w, h)) return null
		}

		if (node.type === 'Line') {
			const x1 = (node.props as any).x1 ?? 0
			const y1 = (node.props as any).y1 ?? 0
			const x2 = (node.props as any).x2 ?? w
			const y2 = (node.props as any).y2 ?? h
			const lineWidth = (node.props as any).lineWidth ?? 1
			const threshold = Math.max(1, (lineWidth / 2) * t.scale)
			if (!hitTestLineSegment(localX, localY, x1, y1, x2, y2, threshold)) return null
		}

		if (node.type === 'Path') {
			const path = resolvePath2D(node as any)
			if (!path) return null
			if (!ctx) return node
			const fillRule = (node.props as any).fillRule
			const stroke = (node.props as any).stroke
			const lineWidth = (node.props as any).lineWidth ?? 1
			ctx.save()
			ctx.setTransform(1, 0, 0, 1, 0, 0)
			ctx.lineWidth = lineWidth * t.scale
			const inFill = ctx.isPointInPath(path as any, localX, localY, fillRule)
			const inStroke = stroke ? ctx.isPointInStroke(path as any, localX, localY) : false
			ctx.restore()
			if (!inFill && !inStroke) return null
		}

		return node
	}

	for (let i = orderedRoots.length - 1; i >= 0; i -= 1) {
		const hit = visit(orderedRoots[i], x, y)
		if (hit) return hit
	}
	return null
}

/**
 * 创建自定义 renderer 的运行时 Root。
 *
 * 它串起三段流水线：
 * 1) React 提交阶段（reconciler）把 JSX 变成场景树节点
 * 2) Yoga layout pass 计算每个节点的 x/y/width/height
 * 3) Canvas2D draw pass 按布局结果把节点绘制到画布
 *
 * 注意：这里用 requestAnimationFrame 合帧，避免一次提交触发多次绘制。
 */
export function createCanvasRoot(canvas: HTMLCanvasElement, options: CanvasRootOptions) {
	const ctx = canvas.getContext('2d')
	if (!ctx) throw new Error('CanvasRenderingContext2D is not available')

	const profiling = options.profiling
	const profiler = profiling
		? createCanvasProfiler(typeof profiling === 'object' ? profiling : undefined)
		: null

	/**
	 * 容器根节点（不对应 JSX），其 children 是 React 渲染出来的顶层节点。
	 */
	const rootNode = createRootNode()

	let containerRef: any = null
	let pendingCommits = 0

	const commitSubscribers = new Set<() => void>()
	const notifyCommit = () => {
		pendingCommits += 1
		profiler?.markSceneDirty()
		for (const cb of commitSubscribers) cb()
	}

	let hoverId: number | null = null
	let selectedId: number | null = null
	let lastHoveredNode: CanvasNode | null = null

	const toCanvasPoint = (clientX: number, clientY: number) => {
		const rect = canvas.getBoundingClientRect()
		const scaleX = rect.width ? options.width / rect.width : 1
		const scaleY = rect.height ? options.height / rect.height : 1
		const x = (clientX - rect.left) * scaleX
		const y = (clientY - rect.top) * scaleY
		return { x, y }
	}

	const findNodeById = (id: number): CanvasNode | null => {
		const walk = (node: CanvasNode): CanvasNode | null => {
			if (node.debugId === id) return node
			for (const child of node.children) {
				const hit = walk(child)
				if (hit) return hit
			}
			return null
		}
		for (const child of rootNode.children) {
			const hit = walk(child)
			if (hit) return hit
		}
		return null
	}

	const getAbsoluteRect = (node: CanvasNode) => {
		const path: CanvasNode[] = []
		let current: CanvasNode | null = node
		while (current) {
			path.push(current)
			const nextParent: CanvasNode | RootNode | null = current.parent
			current = nextParent && nextParent.type !== 'Root' ? nextParent : null
		}

		let absLeft = 0
		let absTop = 0
		for (let i = path.length - 1; i >= 0; i -= 1) {
			const n = path[i]
			absLeft += n.layout.x
			absTop += n.layout.y
			const hasNext = i > 0
			if (hasNext && (n.type === 'View' || n.type === 'Layer') && (n.props as any)?.scrollX)
				absLeft -= n.scrollLeft ?? 0
			if (hasNext && (n.type === 'View' || n.type === 'Layer') && (n.props as any)?.scrollY)
				absTop -= n.scrollTop ?? 0
		}

		return { x: absLeft, y: absTop, width: node.layout.width, height: node.layout.height }
	}

	const getScrollClipRects = (node: CanvasNode) => {
		const rects: { x: number; y: number; width: number; height: number }[] = []
		let current: CanvasNode | null = node.parent && node.parent.type !== 'Root' ? node.parent : null
		while (current) {
			if (current.type === 'View' || current.type === 'Layer') {
				const scrollX = !!(current.props as any)?.scrollX
				const scrollY = !!(current.props as any)?.scrollY
				if (scrollX || scrollY) rects.push(getAbsoluteRect(current))
			}
			const nextParent: CanvasNode | RootNode | null = current.parent
			current = nextParent && nextParent.type !== 'Root' ? nextParent : null
		}
		return rects.reverse()
	}

	const serializeValue = (value: any, depth: number, seen: WeakSet<object>): any => {
		if (depth > 6) return '[MaxDepth]'
		if (value == null) return value
		const t = typeof value
		if (t === 'string' || t === 'number' || t === 'boolean') return value
		if (t === 'bigint') return String(value)
		if (t === 'symbol') return String(value)
		if (t === 'function') return '[Function]'
		if (t !== 'object') return String(value)
		if (seen.has(value)) return '[Circular]'
		seen.add(value)
		if (Array.isArray(value)) {
			const next: any[] = []
			const len = Math.min(value.length, 50)
			for (let i = 0; i < len; i += 1) next.push(serializeValue(value[i], depth + 1, seen))
			if (value.length > len) next.push(`[+${value.length - len}]`)
			return next
		}
		const out: Record<string, any> = {}
		const keys = Object.keys(value).slice(0, 80)
		for (const k of keys) out[k] = serializeValue(value[k], depth + 1, seen)
		const allKeys = Object.keys(value)
		if (allKeys.length > keys.length) out.__moreKeys = allKeys.length - keys.length
		return out
	}

	/**
	 * 合帧状态：
	 * - dirtyLayout：本帧是否需要 layout
	 * - dirtyDraw：本帧是否需要 draw（包含 overlay）
	 * - frameId：是否已安排下一帧
	 */
	let frameId: number | null = null
	let running = false
	let disposed = false
	let dirtyLayout = true
	let dirtyDraw = true
	let frameErrorStreak = 0

	const dispose = () => {
		disposed = true
		if (frameId != null) cancelAnimationFrame(frameId)
		frameId = null
	}

	/**
	 * Text 的 Yoga 测量依赖外部测量函数。
	 * 这里直接复用当前 CanvasRenderingContext2D 的 measureText，做最小可用实现。
	 */
	const measureText: MeasureTextFn = (text: string, font: string, maxWidth?: number) => {
		ctx.save()
		ctx.font = font
		const metrics = ctx.measureText(text)
		ctx.restore()
		const width = typeof maxWidth === 'number' ? Math.min(metrics.width, maxWidth) : metrics.width
		const height = Math.ceil(
			metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent || 0,
		)
		return { width, height: Math.max(1, height) }
	}

	/**
	 * 通知下一帧执行一次 layout + draw。
	 * reconciler commit 完成后会调用它，从而把 React 更新“推”到画布渲染。
	 */
	const scheduleFrame = () => {
		if (disposed || running) return
		if (frameId != null) return
		frameId = requestAnimationFrame(() => {
			void runFrame()
		})
	}

	const runFrame = async () => {
		if (disposed) {
			frameId = null
			return
		}
		profiler?.beginFrame()
		frameId = null
		running = true
		try {
			if (!dirtyLayout && !dirtyDraw) return
			try {
				const needsLayout = dirtyLayout
				const needsDraw = dirtyDraw || dirtyLayout
				dirtyLayout = false
				dirtyDraw = false
				if (containerRef) {
					containerRef.__rcfNeedsLayout = false
					containerRef.__rcfNeedsDraw = false
				}
				if (profiler && pendingCommits) {
					profiler.count('react.commit', pendingCommits)
					pendingCommits = 0
				}
				if (needsLayout) {
					profiler?.count('pass.layout')
					if (profiler) {
						await profiler.timeAsync('layoutMs', async () => {
							await layoutTree(rootNode, options.width, options.height, measureText, options, {
								isCancelled: () => disposed,
							})
						})
					} else {
						await layoutTree(rootNode, options.width, options.height, measureText, options, {
							isCancelled: () => disposed,
						})
					}
				}

				if (disposed) return

				if (needsDraw) {
					profiler?.count('pass.draw')
					if (profiler) {
						profiler.timeSync('drawMs', () => {
							drawTree(rootNode, ctx, options.dpr, options.clearColor, options, {
								count: profiler.count,
							})
						})
					} else {
						drawTree(rootNode, ctx, options.dpr, options.clearColor, options)
					}
				}

				if (disposed) return
				frameErrorStreak = 0
			} catch (err) {
				void err
				if (!disposed) {
					frameErrorStreak += 1
					if (frameErrorStreak < 3) {
						dirtyLayout = true
						dirtyDraw = true
						if (containerRef) {
							containerRef.__rcfNeedsLayout = true
							containerRef.__rcfNeedsDraw = true
						}
					} else {
						dirtyLayout = false
						dirtyDraw = false
					}
				}
				return
			}

			const overlayHover = typeof hoverId === 'number' ? findNodeById(hoverId) : null
			const overlaySelected = typeof selectedId === 'number' ? findNodeById(selectedId) : null
			if (overlayHover || overlaySelected) {
				profiler?.count('pass.overlay')
				const perf = profiler ? { count: profiler.count } : null
				const drawOverlay = () => {
					perf?.count('ctx.save')
					ctx.save()
					perf?.count('ctx.setTransform')
					ctx.setTransform(options.dpr, 0, 0, options.dpr, 0, 0)

					if (
						overlayHover &&
						(!overlaySelected || overlayHover.debugId !== overlaySelected.debugId)
					) {
						const r = getAbsoluteRect(overlayHover)
						perf?.count('ctx.save')
						ctx.save()
						for (const clip of getScrollClipRects(overlayHover)) {
							perf?.count('ctx.beginPath')
							ctx.beginPath()
							perf?.count('ctx.rect')
							ctx.rect(clip.x, clip.y, clip.width, clip.height)
							perf?.count('ctx.clip')
							ctx.clip()
						}
						perf?.count('ctx.fillStyle.set')
						ctx.fillStyle = 'rgba(59,130,246,0.12)'
						perf?.count('ctx.strokeStyle.set')
						ctx.strokeStyle = 'rgba(59,130,246,0.9)'
						perf?.count('ctx.lineWidth.set')
						ctx.lineWidth = 1
						perf?.count('ctx.fillRect')
						ctx.fillRect(r.x, r.y, r.width, r.height)
						perf?.count('ctx.strokeRect')
						ctx.strokeRect(
							r.x + 0.5,
							r.y + 0.5,
							Math.max(0, r.width - 1),
							Math.max(0, r.height - 1),
						)
						perf?.count('ctx.restore')
						ctx.restore()
					}

					if (overlaySelected) {
						const r = getAbsoluteRect(overlaySelected)
						perf?.count('ctx.save')
						ctx.save()
						for (const clip of getScrollClipRects(overlaySelected)) {
							perf?.count('ctx.beginPath')
							ctx.beginPath()
							perf?.count('ctx.rect')
							ctx.rect(clip.x, clip.y, clip.width, clip.height)
							perf?.count('ctx.clip')
							ctx.clip()
						}
						perf?.count('ctx.fillStyle.set')
						ctx.fillStyle = 'rgba(16,185,129,0.12)'
						perf?.count('ctx.strokeStyle.set')
						ctx.strokeStyle = 'rgba(16,185,129,0.95)'
						perf?.count('ctx.lineWidth.set')
						ctx.lineWidth = 2
						perf?.count('ctx.fillRect')
						ctx.fillRect(r.x, r.y, r.width, r.height)
						perf?.count('ctx.strokeRect')
						ctx.strokeRect(r.x + 1, r.y + 1, Math.max(0, r.width - 2), Math.max(0, r.height - 2))
						perf?.count('ctx.restore')
						ctx.restore()
					}

					perf?.count('ctx.restore')
					ctx.restore()
				}

				if (profiler) profiler.timeSync('overlayMs', drawOverlay)
				else drawOverlay()
			}

			if (disposed) return

			if (profiler && profiler.shouldSampleSceneThisFrame()) {
				const nodesByType: Record<string, number> = Object.create(null)
				let nodesTotal = 0
				let imagesTotal = 0
				let decodedImageBytes = 0

				const addImage = (img: any) => {
					if (!img) return
					const w = img.naturalWidth ?? 0
					const h = img.naturalHeight ?? 0
					if (w > 0 && h > 0) decodedImageBytes += w * h * 4
				}

				const walk = (n: CanvasNode) => {
					nodesTotal += 1
					nodesByType[n.type] = (nodesByType[n.type] ?? 0) + 1
					if (n.type === 'Image') {
						imagesTotal += 1
						addImage((n as any).imageInstance)
					}
					if (n.type === 'View' || n.type === 'Layer') {
						const bg = (n as any).backgroundImageInstance
						if (bg) {
							imagesTotal += 1
							addImage(bg)
						}
					}
					for (const c of n.children) walk(c)
				}
				for (const c of rootNode.children) walk(c)

				profiler.setSceneSnapshot({
					nodesTotal,
					nodesByType,
					imagesTotal,
					decodedImageBytes,
					canvasBytes: ctx.canvas.width * ctx.canvas.height * 4,
				})
			}
		} finally {
			running = false
			profiler?.endFrame()
			if (!disposed && (dirtyLayout || dirtyDraw)) scheduleFrame()
		}
	}

	const invalidate = () => {
		if (disposed) return
		dirtyLayout = true
		dirtyDraw = true
		if (containerRef) {
			containerRef.__rcfNeedsLayout = true
			containerRef.__rcfNeedsDraw = true
		}
		scheduleFrame()
	}

	const invalidateDrawOnly = () => {
		if (disposed) return
		dirtyDraw = true
		if (containerRef) containerRef.__rcfNeedsDraw = true
		scheduleFrame()
	}

	const getScrollbarMetricsY = (
		view: CanvasNode,
		left: number,
		top: number,
	): {
		maxScrollTop: number
		trackX: number
		trackY: number
		trackH: number
		thumbY: number
		thumbH: number
	} | null => {
		if (view.type !== 'View' && view.type !== 'Layer') return null
		if (!(view.props as any)?.scrollY) return null
		if ((view.props as any)?.scrollbarY === false) return null

		const w = view.layout.width
		const h = view.layout.height
		const contentHeight = view.scrollContentHeight ?? 0
		const maxScrollTop = Math.max(0, contentHeight - h)
		if (maxScrollTop <= 0) return null

		const scrollbarWidth = (view.props as any)?.scrollbarWidth ?? 10
		const scrollbarInset = (view.props as any)?.scrollbarInset ?? 6
		const corner = scrollbarInset + scrollbarWidth

		const contentWidth = view.scrollContentWidth ?? 0
		const maxScrollLeft = Math.max(0, contentWidth - w)
		const hasScrollX =
			!!(view.props as any)?.scrollX &&
			(view.props as any)?.scrollbarX !== false &&
			maxScrollLeft > 0

		const trackX = left + w - scrollbarInset - scrollbarWidth
		const trackY = top + scrollbarInset
		const trackH = Math.max(0, h - scrollbarInset * 2 - (hasScrollX ? corner : 0))
		if (trackH <= 0) return null

		const minThumbH = 16
		const thumbH =
			contentHeight > 0
				? Math.max(minThumbH, Math.min(trackH, (trackH * h) / contentHeight))
				: trackH
		const travel = Math.max(0, trackH - thumbH)
		const scrollTop = view.scrollTop ?? 0
		const thumbY = travel > 0 ? trackY + (scrollTop / maxScrollTop) * travel : trackY
		return { maxScrollTop, trackX, trackY, trackH, thumbY, thumbH }
	}

	const getScrollbarMetricsX = (
		view: CanvasNode,
		left: number,
		top: number,
	): {
		maxScrollLeft: number
		trackX: number
		trackY: number
		trackW: number
		thumbX: number
		thumbW: number
	} | null => {
		if (view.type !== 'View' && view.type !== 'Layer') return null
		if (!(view.props as any)?.scrollX) return null
		if ((view.props as any)?.scrollbarX === false) return null

		const w = view.layout.width
		const h = view.layout.height
		const contentWidth = view.scrollContentWidth ?? 0
		const maxScrollLeft = Math.max(0, contentWidth - w)
		if (maxScrollLeft <= 0) return null

		const scrollbarWidth = (view.props as any)?.scrollbarWidth ?? 10
		const scrollbarInset = (view.props as any)?.scrollbarInset ?? 6
		const corner = scrollbarInset + scrollbarWidth

		const contentHeight = view.scrollContentHeight ?? 0
		const maxScrollTop = Math.max(0, contentHeight - h)
		const hasScrollY =
			!!(view.props as any)?.scrollY &&
			(view.props as any)?.scrollbarY !== false &&
			maxScrollTop > 0

		const trackX = left + scrollbarInset
		const trackY = top + h - scrollbarInset - scrollbarWidth
		const trackW = Math.max(0, w - scrollbarInset * 2 - (hasScrollY ? corner : 0))
		if (trackW <= 0) return null

		const minThumbW = 16
		const thumbW =
			contentWidth > 0 ? Math.max(minThumbW, Math.min(trackW, (trackW * w) / contentWidth)) : trackW
		const travel = Math.max(0, trackW - thumbW)
		const scrollLeft = view.scrollLeft ?? 0
		const thumbX = travel > 0 ? trackX + (scrollLeft / maxScrollLeft) * travel : trackX
		return { maxScrollLeft, trackX, trackY, trackW, thumbX, thumbW }
	}

	const hitTest = (x: number, y: number): CanvasNode | null => {
		return hitTestTree(rootNode.children, x, y, ctx)
	}

	const hitTestScrollbarThumbNode = (
		node: CanvasNode,
		x: number,
		y: number,
		offsetX: number,
		offsetY: number,
	): { view: CanvasNode; axis: 'x' | 'y' } | null => {
		if ((node.props as any)?.pointerEvents === 'none') return null
		const left = offsetX + node.layout.x
		const top = offsetY + node.layout.y
		const right = left + node.layout.width
		const bottom = top + node.layout.height
		if (x < left || x > right || y < top || y > bottom) return null

		const metricsY = getScrollbarMetricsY(node, left, top)
		if (metricsY) {
			const { trackX, thumbY, thumbH } = metricsY
			const thumbLeft = trackX
			const thumbRight = trackX + ((node.props as any)?.scrollbarWidth ?? 10)
			const thumbTop = thumbY
			const thumbBottom = thumbY + thumbH
			if (x >= thumbLeft && x <= thumbRight && y >= thumbTop && y <= thumbBottom) {
				return { view: node, axis: 'y' }
			}
		}

		const metricsX = getScrollbarMetricsX(node, left, top)
		if (metricsX) {
			const { trackY, thumbX, thumbW } = metricsX
			const thumbLeft = thumbX
			const thumbRight = thumbX + thumbW
			const thumbTop = trackY
			const thumbBottom = trackY + ((node.props as any)?.scrollbarWidth ?? 10)
			if (x >= thumbLeft && x <= thumbRight && y >= thumbTop && y <= thumbBottom) {
				return { view: node, axis: 'x' }
			}
		}

		const childOffsetX =
			(node.type === 'View' || node.type === 'Layer') && (node.props as any)?.scrollX
				? left - (node.scrollLeft ?? 0)
				: left
		const childOffsetY =
			(node.type === 'View' || node.type === 'Layer') && (node.props as any)?.scrollY
				? top - (node.scrollTop ?? 0)
				: top

		const children = getOrderedChildrenByZIndex(node)
		for (let i = children.length - 1; i >= 0; i -= 1) {
			const child = children[i]
			const hit = hitTestScrollbarThumbNode(child, x, y, childOffsetX, childOffsetY)
			if (hit) return hit
		}

		return null
	}

	const hitTestScrollbarThumb = (
		x: number,
		y: number,
	): { view: CanvasNode; axis: 'x' | 'y' } | null => {
		const rootChildren = rootNode.children
		const orderedRoots =
			rootChildren.length <= 1
				? rootChildren
				: rootChildren
						.map((child, index) => ({
							child,
							index,
							zIndex: resolveZIndex((child.props as any)?.style?.zIndex),
						}))
						.sort((a, b) => a.zIndex - b.zIndex || a.index - b.index)
						.map((x) => x.child)
		for (let i = orderedRoots.length - 1; i >= 0; i -= 1) {
			const child = orderedRoots[i]
			const hit = hitTestScrollbarThumbNode(child, x, y, 0, 0)
			if (hit) return hit
		}
		return null
	}

	const buildPath = (target: CanvasNode) => {
		const path: CanvasNode[] = []
		let current: CanvasNode | null = target
		while (current) {
			path.push(current)
			const nextParent: CanvasNode | RootNode | null = current.parent
			current = nextParent && nextParent.type !== 'Root' ? nextParent : null
		}
		return path
	}

	const pointerCapture = new Map<number, CanvasNode>()
	const pointerDownTarget = new Map<number, CanvasNode>()

	const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max))

	const applyScrollY = (node: CanvasNode, delta: number) => {
		if (node.type !== 'View' && node.type !== 'Layer') return false
		if (!(node.props as any)?.scrollY) return false
		const contentHeight = node.scrollContentHeight ?? 0
		const maxScrollTop = Math.max(0, contentHeight - node.layout.height)
		if (maxScrollTop <= 0) return false
		const current = node.scrollTop ?? 0
		const next = clamp(current + delta, 0, maxScrollTop)
		if (next === current) return false
		node.scrollTop = next
		const onScroll = (node.props as any)?.onScroll
		if (typeof onScroll === 'function') onScroll(next)

		return true
	}

	const applyScrollX = (node: CanvasNode, delta: number) => {
		if (node.type !== 'View' && node.type !== 'Layer') return false
		if (!(node.props as any)?.scrollX) return false
		const contentWidth = node.scrollContentWidth ?? 0
		const maxScrollLeft = Math.max(0, contentWidth - node.layout.width)
		if (maxScrollLeft <= 0) return false
		const current = node.scrollLeft ?? 0
		const next = clamp(current + delta, 0, maxScrollLeft)
		if (next === current) return false
		node.scrollLeft = next
		const onScrollX = (node.props as any)?.onScrollX
		if (typeof onScrollX === 'function') onScrollX(next)

		return true
	}

	const dispatchOnPath = (
		eventType: CanvasPointerEventType,
		path: CanvasNode[],
		init: {
			x: number
			y: number
			pointerId: number
			button: number
			buttons: number
			altKey: boolean
			ctrlKey: boolean
			shiftKey: boolean
			metaKey: boolean
		},
		target: CanvasNode,
	) => {
		const baseName =
			eventType === 'pointerdown'
				? 'onPointerDown'
				: eventType === 'pointermove'
					? 'onPointerMove'
					: eventType === 'pointerup'
						? 'onPointerUp'
						: eventType === 'pointercancel'
							? 'onPointerCancel'
							: 'onClick'

		let propagationStopped = false
		let defaultPrevented = false

		const eventObject: any = {
			type: eventType,
			...init,
			target,
			currentTarget: null,
			defaultPrevented,
			stopPropagation() {
				propagationStopped = true
			},
			preventDefault() {
				defaultPrevented = true
				eventObject.defaultPrevented = true
			},
		}

		for (let i = path.length - 1; i >= 0; i -= 1) {
			if (propagationStopped) break
			const currentTarget = path[i]
			const handler = (currentTarget.props as any)?.[`${baseName}Capture`]
			if (typeof handler === 'function') {
				eventObject.currentTarget = currentTarget
				handler(eventObject)
			}
		}

		for (let i = 0; i < path.length; i += 1) {
			if (propagationStopped) break
			const currentTarget = path[i]
			const handler = (currentTarget.props as any)?.[baseName]
			if (typeof handler === 'function') {
				eventObject.currentTarget = currentTarget
				handler(eventObject)
			}
		}

		return { defaultPrevented }
	}

	const dispatchPointerEvent = (
		eventType: CanvasPointerEventType,
		init: {
			x: number
			y: number
			pointerId: number
			button: number
			buttons: number
			altKey: boolean
			ctrlKey: boolean
			shiftKey: boolean
			metaKey: boolean
		},
	) => {
		const { pointerId } = init

		const capturedForScroll = pointerCapture.get(pointerId)
		if (
			capturedForScroll &&
			(capturedForScroll.type === 'View' || capturedForScroll.type === 'Layer') &&
			capturedForScroll.scrollbarDrag &&
			capturedForScroll.scrollbarDrag.pointerId === pointerId
		) {
			if (eventType === 'pointermove') {
				const drag = capturedForScroll.scrollbarDrag

				const path = buildPath(capturedForScroll)
				let absLeft = 0
				let absTop = 0
				for (let i = path.length - 1; i >= 0; i -= 1) {
					const n = path[i]
					absLeft += n.layout.x
					absTop += n.layout.y
					const hasNext = i > 0
					if (hasNext && (n.type === 'View' || n.type === 'Layer') && (n.props as any)?.scrollX)
						absLeft -= n.scrollLeft ?? 0
					if (hasNext && (n.type === 'View' || n.type === 'Layer') && (n.props as any)?.scrollY)
						absTop -= n.scrollTop ?? 0
				}

				if (drag.axis === 'y') {
					const metrics = getScrollbarMetricsY(capturedForScroll, absLeft, absTop)
					if (!metrics) return { defaultPrevented: true }
					const travel = Math.max(0, metrics.trackH - metrics.thumbH)
					if (travel <= 0) return { defaultPrevented: true }
					const deltaThumb = init.y - drag.startPointer
					const nextScrollTop = drag.startScroll + deltaThumb * (metrics.maxScrollTop / travel)
					const clamped = Math.max(0, Math.min(nextScrollTop, metrics.maxScrollTop))
					capturedForScroll.scrollTop = clamped
					const onScroll = (capturedForScroll.props as any)?.onScroll
					if (typeof onScroll === 'function') onScroll(clamped)
					invalidateDrawOnly()
					return { defaultPrevented: true }
				}

				const metrics = getScrollbarMetricsX(capturedForScroll, absLeft, absTop)
				if (!metrics) return { defaultPrevented: true }
				const travel = Math.max(0, metrics.trackW - metrics.thumbW)
				if (travel <= 0) return { defaultPrevented: true }
				const deltaThumb = init.x - drag.startPointer
				const nextScrollLeft = drag.startScroll + deltaThumb * (metrics.maxScrollLeft / travel)
				const clamped = Math.max(0, Math.min(nextScrollLeft, metrics.maxScrollLeft))
				capturedForScroll.scrollLeft = clamped
				const onScrollX = (capturedForScroll.props as any)?.onScrollX
				if (typeof onScrollX === 'function') onScrollX(clamped)
				invalidateDrawOnly()
				return { defaultPrevented: true }
			}

			if (eventType === 'pointerup' || eventType === 'pointercancel') {
				capturedForScroll.scrollbarDrag = null
				pointerCapture.delete(pointerId)
				pointerDownTarget.delete(pointerId)
				invalidateDrawOnly()
				return { defaultPrevented: true }
			}
		}

		if (eventType === 'pointerdown') {
			const scrollbarTarget = hitTestScrollbarThumb(init.x, init.y)
			if (
				scrollbarTarget &&
				(scrollbarTarget.view.type === 'View' || scrollbarTarget.view.type === 'Layer')
			) {
				scrollbarTarget.view.scrollbarDrag = {
					axis: scrollbarTarget.axis,
					pointerId,
					startPointer: scrollbarTarget.axis === 'y' ? init.y : init.x,
					startScroll:
						scrollbarTarget.axis === 'y'
							? (scrollbarTarget.view.scrollTop ?? 0)
							: (scrollbarTarget.view.scrollLeft ?? 0),
				}
				pointerCapture.set(pointerId, scrollbarTarget.view)
				return { defaultPrevented: true }
			}

			const target = hitTest(init.x, init.y)
			if (!target) return { defaultPrevented: false }
			pointerCapture.set(pointerId, target)
			pointerDownTarget.set(pointerId, target)
			return dispatchOnPath(eventType, buildPath(target), init, target)
		}

		if (eventType === 'pointermove') {
			const captured = pointerCapture.get(pointerId)
			const target = captured ?? hitTest(init.x, init.y)

			// Hover events (mouseenter/mouseleave simulation)
			if (target !== lastHoveredNode) {
				const prevChain: CanvasNode[] = []
				let p = lastHoveredNode
				while (p) {
					prevChain.push(p)
					const nextParent: CanvasNode | RootNode | null = p.parent
					p = nextParent && nextParent.type !== 'Root' ? nextParent : null
				}

				const nextChain: CanvasNode[] = []
				let n = target
				while (n) {
					nextChain.push(n)
					const nextParent: CanvasNode | RootNode | null = n.parent
					n = nextParent && nextParent.type !== 'Root' ? nextParent : null
				}

				// 1. Leave: nodes in prevChain NOT in nextChain (bottom-up)
				for (const node of prevChain) {
					if (!nextChain.includes(node)) {
						const handler = (node.props as any)?.onPointerLeave
						if (typeof handler === 'function') {
							handler({
								type: 'pointerleave',
								...init,
								target: node,
								currentTarget: node,
								defaultPrevented: false,
								stopPropagation: () => {},
								preventDefault: () => {},
							})
						}
					}
				}

				// 2. Enter: nodes in nextChain NOT in prevChain (top-down)
				const enteringNodes = nextChain.filter((node) => !prevChain.includes(node)).reverse()
				for (const node of enteringNodes) {
					const handler = (node.props as any)?.onPointerEnter
					if (typeof handler === 'function') {
						handler({
							type: 'pointerenter',
							...init,
							target: node,
							currentTarget: node,
							defaultPrevented: false,
							stopPropagation: () => {},
							preventDefault: () => {},
						})
					}
				}

				lastHoveredNode = target
			}

			if (!target) return { defaultPrevented: false }
			return dispatchOnPath(eventType, buildPath(target), init, target)
		}

		if (eventType === 'pointerup') {
			const captured = pointerCapture.get(pointerId)
			const target = captured ?? hitTest(init.x, init.y)
			if (!target) return { defaultPrevented: false }
			const res = dispatchOnPath(eventType, buildPath(target), init, target)

			const downTarget = pointerDownTarget.get(pointerId)
			pointerCapture.delete(pointerId)
			pointerDownTarget.delete(pointerId)

			if (downTarget && downTarget === target && init.button === 0) {
				const clickRes = dispatchOnPath('click', buildPath(target), init, target)
				return { defaultPrevented: res.defaultPrevented || clickRes.defaultPrevented }
			}

			return res
		}

		if (eventType === 'pointercancel') {
			const captured = pointerCapture.get(pointerId)
			const target = captured ?? hitTest(init.x, init.y)
			if (!target) return { defaultPrevented: false }
			const res = dispatchOnPath(eventType, buildPath(target), init, target)
			pointerCapture.delete(pointerId)
			pointerDownTarget.delete(pointerId)
			return res
		}

		const target = hitTest(init.x, init.y)
		if (!target) return { defaultPrevented: false }
		return dispatchOnPath(eventType, buildPath(target), init, target)
	}

	const dispatchWheelEvent = (init: {
		x: number
		y: number
		deltaX: number
		deltaY: number
		altKey: boolean
		ctrlKey: boolean
		shiftKey: boolean
		metaKey: boolean
	}) => {
		const target = hitTest(init.x, init.y)

		if (!target) return { defaultPrevented: false }

		const path = buildPath(target)
		let remainingX = init.deltaX
		let remainingY = init.deltaY
		let defaultPrevented = false

		for (let i = 0; i < path.length; i += 1) {
			const node = path[i]

			if (remainingY !== 0) {
				const applied = applyScrollY(node, remainingY)
				if (applied) {
					remainingY = 0
					defaultPrevented = true
				}
			}
			if (remainingX !== 0) {
				const applied = applyScrollX(node, remainingX)
				if (applied) {
					remainingX = 0
					defaultPrevented = true
				}
			}
			if (remainingX === 0 && remainingY === 0) break
		}

		if (defaultPrevented) invalidateDrawOnly()
		return { defaultPrevented }
	}

	/**
	 * React reconciler 的容器对象：RootNode + invalidate 回调。
	 */
	const container = { root: rootNode, invalidate, notifyCommit, invalidateDrawOnly }
	;(container as any).__rcfNeedsLayout = true
	;(container as any).__rcfNeedsDraw = true
	containerRef = container
	rootNode.container = container
	const reconcilerRoot = createReconcilerRoot(container as any)

	/**
	 * 先触发一次绘制，避免画布初始为空（即使 children 还没挂上）。
	 */
	invalidate()

	const __devtools = {
		rootId: rootNode.debugId,
		getSnapshot() {
			const nodesById: Record<
				number,
				{
					id: number
					type: CanvasNode['type']
					parentId: number | null
					childrenIds: number[]
					layout: { x: number; y: number; width: number; height: number }
				}
			> = {}
			const walk = (node: CanvasNode, parentId: number | null) => {
				nodesById[node.debugId] = {
					id: node.debugId,
					type: node.type,
					parentId,
					childrenIds: node.children.map((c) => c.debugId),
					layout: node.layout,
				}
				for (const child of node.children) walk(child, node.debugId)
			}
			for (const child of rootNode.children) walk(child, null)
			return {
				rootId: rootNode.debugId,
				rootChildrenIds: rootNode.children.map((c) => c.debugId),
				nodesById,
			}
		},
		getNode(id: number) {
			const node = findNodeById(id)
			if (!node) return null
			return {
				id: node.debugId,
				type: node.type,
				parentId: node.parent ? node.parent.debugId : null,
				childrenIds: node.children.map((c) => c.debugId),
				layout: node.layout,
			}
		},
		getNodeProps(id: number) {
			const node = findNodeById(id)
			if (!node) return null
			return serializeValue(node.props, 0, new WeakSet())
		},
		hitTestCanvas(x: number, y: number) {
			const node = hitTest(x, y)
			return node ? node.debugId : null
		},
		hitTestClient(clientX: number, clientY: number) {
			const { x, y } = toCanvasPoint(clientX, clientY)
			const node = hitTest(x, y)
			return node ? node.debugId : null
		},
		setHighlight(next: { hoverId?: number | null; selectedId?: number | null }) {
			if ('hoverId' in next) hoverId = next.hoverId ?? null
			if ('selectedId' in next) selectedId = next.selectedId ?? null
			invalidateDrawOnly()
		},
		subscribe(cb: () => void) {
			commitSubscribers.add(cb)
			return () => {
				commitSubscribers.delete(cb)
			}
		},
		getPerformanceReport() {
			return profiler?.getReport() ?? null
		},
		getPerformanceFrames() {
			return profiler?.getFrames() ?? null
		},
		resetPerformance() {
			profiler?.reset()
		},
	}

	const registryRootInstanceId = (() => {
		if (typeof window === 'undefined') return null
		const w = window as any
		const key = '__REACT_CANVAS_FIBER_DEVTOOLS__'
		if (!w[key]) {
			w[key] = {
				version: 1,
				nextRootInstanceId: 1,
				roots: new Map<
					number,
					{
						id: number
						canvas: HTMLCanvasElement
						options: { width: number; height: number; dpr: number }
						devtools: typeof __devtools
						revision: number
						unsubscribe: null | (() => void)
					}
				>(),
				picker: {
					enabled: false,
					rootInstanceId: null as number | null,
					hoverId: null as number | null,
					selectedId: null as number | null,
				},
				pickerCleanup: null as null | (() => void),
				listRoots() {
					const res: Array<{
						id: number
						rect: { left: number; top: number; width: number; height: number }
						options: { width: number; height: number; dpr: number }
						revision: number
					}> = []
					for (const r of this.roots.values()) {
						const rect = r.canvas.getBoundingClientRect()
						res.push({
							id: r.id,
							rect: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
							options: r.options,
							revision: r.revision,
						})
					}
					return res
				},
				getRootDevtools(id: number) {
					return this.roots.get(id)?.devtools ?? null
				},
				getSnapshot(rootInstanceId: number) {
					return this.getRootDevtools(rootInstanceId)?.getSnapshot?.() ?? null
				},
				getNodeProps(rootInstanceId: number, nodeId: number) {
					return this.getRootDevtools(rootInstanceId)?.getNodeProps?.(nodeId) ?? null
				},
				setHighlight(
					rootInstanceId: number,
					next: { hoverId?: number | null; selectedId?: number | null },
				) {
					this.getRootDevtools(rootInstanceId)?.setHighlight?.(next)
				},
				startPicker(rootInstanceId: number) {
					this.stopPicker()
					const handle = this.roots.get(rootInstanceId)
					if (!handle) return false
					this.picker.enabled = true
					this.picker.rootInstanceId = rootInstanceId
					this.picker.hoverId = null
					this.picker.selectedId = null

					const onMove = (e: PointerEvent) => {
						if (!this.picker.enabled) return
						if (e.target !== handle.canvas) {
							if (this.picker.hoverId != null) {
								this.picker.hoverId = null
								handle.devtools.setHighlight({ hoverId: null })
							}
							return
						}
						const id = handle.devtools.hitTestClient(e.clientX, e.clientY)
						if (id !== this.picker.hoverId) {
							this.picker.hoverId = id
							handle.devtools.setHighlight({ hoverId: id, selectedId: this.picker.selectedId })
						}
					}

					const onDown = (e: PointerEvent) => {
						if (!this.picker.enabled) return
						if (e.target !== handle.canvas) return
						if (e.button !== 0) return
						const id = handle.devtools.hitTestClient(e.clientX, e.clientY)
						this.picker.selectedId = id
						handle.devtools.setHighlight({ hoverId: null, selectedId: id })
						e.preventDefault()
						e.stopPropagation()
						this.stopPicker()
					}

					const onKeyDown = (e: KeyboardEvent) => {
						if (e.key !== 'Escape') return
						this.stopPicker()
					}

					window.addEventListener('pointermove', onMove, true)
					window.addEventListener('pointerdown', onDown, true)
					window.addEventListener('keydown', onKeyDown, true)
					this.pickerCleanup = () => {
						window.removeEventListener('pointermove', onMove, true)
						window.removeEventListener('pointerdown', onDown, true)
						window.removeEventListener('keydown', onKeyDown, true)
						handle.devtools.setHighlight({ hoverId: null })
					}
					return true
				},
				stopPicker() {
					if (!this.picker.enabled) return
					this.picker.enabled = false
					this.picker.hoverId = null
					this.pickerCleanup?.()
					this.pickerCleanup = null
				},
				getPickerState() {
					return { ...this.picker }
				},
				unregisterRoot(id: number) {
					const handle = this.roots.get(id)
					if (!handle) return
					if (this.picker.rootInstanceId === id) {
						if (this.picker.enabled) this.stopPicker()
						this.picker.rootInstanceId = null
						this.picker.hoverId = null
						this.picker.selectedId = null
					}
					handle.unsubscribe?.()
					this.roots.delete(id)
				},
			}
		}

		const registry = w[key]
		const rootInstanceId: number = registry.nextRootInstanceId++
		const entry = {
			id: rootInstanceId,
			canvas,
			options: { width: options.width, height: options.height, dpr: options.dpr },
			devtools: __devtools,
			revision: 0,
			unsubscribe: null as null | (() => void),
		}
		entry.unsubscribe = __devtools.subscribe(() => {
			entry.revision += 1
		})
		registry.roots.set(rootInstanceId, entry)
		return rootInstanceId
	})()

	return {
		render(element: ReactNode) {
			reconcilerRoot.render(element)
		},
		unmount() {
			dispose()
			reconcilerRoot.unmount()
			if (typeof window !== 'undefined' && registryRootInstanceId != null) {
				const w = window as any
				w.__REACT_CANVAS_FIBER_DEVTOOLS__?.unregisterRoot?.(registryRootInstanceId)
			}
		},
		dispatchPointerEvent,
		dispatchWheelEvent,
		__devtools,
	}
}
