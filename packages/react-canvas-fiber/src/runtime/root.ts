import type { ReactNode } from 'react'
import { createRootNode } from './nodes'
import { drawTree } from '../render'
import { layoutTree } from '../layout'
import { createReconcilerRoot } from './reconciler'
import type { CanvasNode, RootNode } from './nodes'
import type { CanvasPointerEventType, CanvasRootOptions, MeasureTextFn } from '../types'

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

	/**
	 * 容器根节点（不对应 JSX），其 children 是 React 渲染出来的顶层节点。
	 */
	const rootNode = createRootNode()

	const commitSubscribers = new Set<() => void>()
	const notifyCommit = () => {
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
			if (hasNext && n.type === 'View' && (n.props as any)?.scrollX) absLeft -= n.scrollLeft ?? 0
			if (hasNext && n.type === 'View' && (n.props as any)?.scrollY) absTop -= n.scrollTop ?? 0
		}

		return { x: absLeft, y: absTop, width: node.layout.width, height: node.layout.height }
	}

	const getScrollClipRects = (node: CanvasNode) => {
		const rects: { x: number; y: number; width: number; height: number }[] = []
		let current: CanvasNode | null = node.parent && node.parent.type !== 'Root' ? node.parent : null
		while (current) {
			if (current.type === 'View') {
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
	let dirtyLayout = true
	let dirtyDraw = true

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
	const invalidate = () => {
		dirtyLayout = true
		dirtyDraw = true
		if (frameId != null) return
		frameId = requestAnimationFrame(async () => {
			frameId = null
			if (!dirtyLayout && !dirtyDraw) return
			const needsLayout = dirtyLayout
			const needsDraw = dirtyDraw || dirtyLayout
			dirtyLayout = false
			dirtyDraw = false
			if (needsLayout) {
				await layoutTree(rootNode, options.width, options.height, measureText, options)
			}
			if (needsDraw) {
				drawTree(rootNode, ctx, options.dpr, options.clearColor, options)
			}
			const overlayHover = typeof hoverId === 'number' ? findNodeById(hoverId) : null
			const overlaySelected = typeof selectedId === 'number' ? findNodeById(selectedId) : null
			if (overlayHover || overlaySelected) {
				ctx.save()
				ctx.setTransform(options.dpr, 0, 0, options.dpr, 0, 0)

				if (
					overlayHover &&
					(!overlaySelected || overlayHover.debugId !== overlaySelected.debugId)
				) {
					const r = getAbsoluteRect(overlayHover)
					ctx.save()
					for (const clip of getScrollClipRects(overlayHover)) {
						ctx.beginPath()
						ctx.rect(clip.x, clip.y, clip.width, clip.height)
						ctx.clip()
					}
					ctx.fillStyle = 'rgba(59,130,246,0.12)'
					ctx.strokeStyle = 'rgba(59,130,246,0.9)'
					ctx.lineWidth = 1
					ctx.fillRect(r.x, r.y, r.width, r.height)
					ctx.strokeRect(r.x + 0.5, r.y + 0.5, Math.max(0, r.width - 1), Math.max(0, r.height - 1))
					ctx.restore()
				}

				if (overlaySelected) {
					const r = getAbsoluteRect(overlaySelected)
					ctx.save()
					for (const clip of getScrollClipRects(overlaySelected)) {
						ctx.beginPath()
						ctx.rect(clip.x, clip.y, clip.width, clip.height)
						ctx.clip()
					}
					ctx.fillStyle = 'rgba(16,185,129,0.12)'
					ctx.strokeStyle = 'rgba(16,185,129,0.95)'
					ctx.lineWidth = 2
					ctx.fillRect(r.x, r.y, r.width, r.height)
					ctx.strokeRect(r.x + 1, r.y + 1, Math.max(0, r.width - 2), Math.max(0, r.height - 2))
					ctx.restore()
				}

				ctx.restore()
			}
		})
	}

	const invalidateDrawOnly = () => {
		dirtyDraw = true
		if (frameId != null) return
		frameId = requestAnimationFrame(async () => {
			frameId = null
			if (!dirtyLayout && !dirtyDraw) return
			const needsLayout = dirtyLayout
			const needsDraw = dirtyDraw || dirtyLayout
			dirtyLayout = false
			dirtyDraw = false
			if (needsLayout) {
				await layoutTree(rootNode, options.width, options.height, measureText, options)
			}
			if (needsDraw) {
				drawTree(rootNode, ctx, options.dpr, options.clearColor, options)
			}
			const overlayHover = typeof hoverId === 'number' ? findNodeById(hoverId) : null
			const overlaySelected = typeof selectedId === 'number' ? findNodeById(selectedId) : null
			if (overlayHover || overlaySelected) {
				ctx.save()
				ctx.setTransform(options.dpr, 0, 0, options.dpr, 0, 0)

				if (
					overlayHover &&
					(!overlaySelected || overlayHover.debugId !== overlaySelected.debugId)
				) {
					const r = getAbsoluteRect(overlayHover)
					ctx.save()
					for (const clip of getScrollClipRects(overlayHover)) {
						ctx.beginPath()
						ctx.rect(clip.x, clip.y, clip.width, clip.height)
						ctx.clip()
					}
					ctx.fillStyle = 'rgba(59,130,246,0.12)'
					ctx.strokeStyle = 'rgba(59,130,246,0.9)'
					ctx.lineWidth = 1
					ctx.fillRect(r.x, r.y, r.width, r.height)
					ctx.strokeRect(r.x + 0.5, r.y + 0.5, Math.max(0, r.width - 1), Math.max(0, r.height - 1))
					ctx.restore()
				}

				if (overlaySelected) {
					const r = getAbsoluteRect(overlaySelected)
					ctx.save()
					for (const clip of getScrollClipRects(overlaySelected)) {
						ctx.beginPath()
						ctx.rect(clip.x, clip.y, clip.width, clip.height)
						ctx.clip()
					}
					ctx.fillStyle = 'rgba(16,185,129,0.12)'
					ctx.strokeStyle = 'rgba(16,185,129,0.95)'
					ctx.lineWidth = 2
					ctx.fillRect(r.x, r.y, r.width, r.height)
					ctx.strokeRect(r.x + 1, r.y + 1, Math.max(0, r.width - 2), Math.max(0, r.height - 2))
					ctx.restore()
				}

				ctx.restore()
			}
		})
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
		if (view.type !== 'View') return null
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
		if (view.type !== 'View') return null
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

	const hitTestNode = (
		node: CanvasNode,
		x: number,
		y: number,
		offsetX: number,
		offsetY: number,
	): CanvasNode | null => {
		if ((node.props as any)?.pointerEvents === 'none') return null
		const left = offsetX + node.layout.x
		const top = offsetY + node.layout.y
		const right = left + node.layout.width
		const bottom = top + node.layout.height
		if (x < left || x > right || y < top || y > bottom) return null

		const childOffsetX =
			node.type === 'View' && (node.props as any)?.scrollX ? left - (node.scrollLeft ?? 0) : left
		const childOffsetY =
			node.type === 'View' && (node.props as any)?.scrollY ? top - (node.scrollTop ?? 0) : top

		for (let i = node.children.length - 1; i >= 0; i -= 1) {
			const child = node.children[i]
			const hit = hitTestNode(child, x, y, childOffsetX, childOffsetY)
			if (hit) return hit
		}

		return node
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
			node.type === 'View' && (node.props as any)?.scrollX ? left - (node.scrollLeft ?? 0) : left
		const childOffsetY =
			node.type === 'View' && (node.props as any)?.scrollY ? top - (node.scrollTop ?? 0) : top

		for (let i = node.children.length - 1; i >= 0; i -= 1) {
			const child = node.children[i]
			const hit = hitTestScrollbarThumbNode(child, x, y, childOffsetX, childOffsetY)
			if (hit) return hit
		}

		return null
	}

	const hitTestScrollbarThumb = (
		x: number,
		y: number,
	): { view: CanvasNode; axis: 'x' | 'y' } | null => {
		for (let i = rootNode.children.length - 1; i >= 0; i -= 1) {
			const child = rootNode.children[i]
			const hit = hitTestScrollbarThumbNode(child, x, y, 0, 0)
			if (hit) return hit
		}
		return null
	}

	const hitTest = (x: number, y: number): CanvasNode | null => {
		for (let i = rootNode.children.length - 1; i >= 0; i -= 1) {
			const child = rootNode.children[i]
			const hit = hitTestNode(child, x, y, 0, 0)
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
		if (node.type !== 'View') return false
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
		if (node.type !== 'View') return false
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
			capturedForScroll.type === 'View' &&
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
					if (hasNext && n.type === 'View' && (n.props as any)?.scrollX)
						absLeft -= n.scrollLeft ?? 0
					if (hasNext && n.type === 'View' && (n.props as any)?.scrollY) absTop -= n.scrollTop ?? 0
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
			if (scrollbarTarget && scrollbarTarget.view.type === 'View') {
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
	const container = { root: rootNode, invalidate, notifyCommit }
	rootNode.container = container
	const reconcilerRoot = createReconcilerRoot(container)

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
					this.picker.rootInstanceId = null
					this.picker.hoverId = null
					this.picker.selectedId = null
					this.pickerCleanup?.()
					this.pickerCleanup = null
				},
				getPickerState() {
					return { ...this.picker }
				},
				unregisterRoot(id: number) {
					const handle = this.roots.get(id)
					if (!handle) return
					if (this.picker.rootInstanceId === id) this.stopPicker()
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
