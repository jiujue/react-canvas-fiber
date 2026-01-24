import type { CanvasNode, RootNode } from '../runtime/nodes'
import type { DrawState } from '../types'
import type { CanvasRootOptions } from '../types'

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

/**
 * 绘制单个节点及其子树。
 * offsetX/offsetY 为父节点累加的偏移，用于把 computed layout 转换成最终画布坐标。
 */
function drawNode(state: DrawState, node: CanvasNode, offsetX: number, offsetY: number) {
	const { ctx } = state
	const x = offsetX + node.layout.x
	const y = offsetY + node.layout.y
	const w = node.layout.width
	const h = node.layout.height

	if (node.type === 'View') {
		const background = (node.props as any).background
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
			const radius = (node.props as any).borderRadius ?? 0
			ctx.save()
			ctx.fillStyle = background
			drawRoundedRect(ctx, x, y, w, h, radius)
			ctx.fill()
			ctx.restore()
		}

		if (scrollX || scrollY) {
			ctx.save()
			ctx.beginPath()
			ctx.rect(x, y, w, h)
			ctx.clip()
			const cullPadding = 1
			const viewportX = x - cullPadding
			const viewportY = y - cullPadding
			const viewportW = w + cullPadding * 2
			const viewportH = h + cullPadding * 2
			for (const child of node.children) {
				const bounds = child.contentBounds ?? {
					x: 0,
					y: 0,
					width: child.layout.width,
					height: child.layout.height,
				}
				const bx = x - scrollLeft + child.layout.x + bounds.x
				const by = y - scrollTop + child.layout.y + bounds.y
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
				drawNode(state, child, x - scrollLeft, y - scrollTop)
			}
			ctx.restore()

			const corner = scrollbarInset + scrollbarWidth

			if (scrollbarY && maxScrollTop > 0) {
				const trackX = x + w - scrollbarInset - scrollbarWidth
				const trackY = y + scrollbarInset
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
				const trackX = x + scrollbarInset
				const trackY = y + h - scrollbarInset - scrollbarWidth
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

			return
		}
	}

	if (node.type === 'Rect') {
		const fill = node.props.fill ?? '#ffffff'
		const stroke = node.props.stroke
		const lineWidth = node.props.lineWidth ?? 1
		const radius = node.props.borderRadius ?? 0
		ctx.save()
		drawRoundedRect(ctx, x, y, w, h, radius)
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
			ctx.fillText(lines[i], x, y + i * lineHeight)
		}
		ctx.restore()
	}

	if (node.type === 'Image') {
		const { imageInstance } = node
		if (imageInstance && imageInstance.complete && imageInstance.naturalWidth > 0) {
			const objectFit = node.props.objectFit || 'contain'
			const srcW = imageInstance.naturalWidth
			const srcH = imageInstance.naturalHeight

			let dstX = x
			let dstY = y
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
				dstX = x + (w - dstW) / 2
				dstY = y + (h - dstH) / 2
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
			drawRoundedRect(ctx, x, y, w, h, 0)
			ctx.clip()
			ctx.drawImage(imageInstance, srcX, srcY, finalSrcW, finalSrcH, dstX, dstY, dstW, dstH)
			ctx.restore()
		}
	}

	for (const child of node.children) {
		drawNode(state, child, x, y)
	}
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
	for (const child of root.children) {
		drawNode(state, child, 0, 0)
	}
	ctx.restore()
}
