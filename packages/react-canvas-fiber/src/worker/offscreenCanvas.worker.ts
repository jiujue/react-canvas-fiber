import {
	IDENTITY_MATRIX,
	parseTransform,
	resolveOpacity,
	resolveOverflowHidden,
	resolveTransformOrigin,
	resolveZIndex,
} from '../utils'
import type {
	MainToWorkerMessage,
	WorkerDebugOptions,
	WorkerOverlay,
	WorkerSerializedNode,
	WorkerSerializedScene,
	WorkerToMainMessage,
} from './protocol'

type BitmapEntry =
	| { status: 'pending'; promise: Promise<ImageBitmap | null> }
	| { status: 'ready'; bitmap: ImageBitmap; bytes: number }
	| { status: 'error'; error: string }

let canvas: OffscreenCanvas | null = null
let ctx: OffscreenCanvasRenderingContext2D | null = null
let width = 0
let height = 0
let dpr = 1

let lastFrameTs = 0
let latestScene: WorkerSerializedScene | null = null
let drawing = false
let pending = false

let debug: WorkerDebugOptions | null = null
let logEnabled = false

const bitmapCache = new Map<string, BitmapEntry>()
const pathCache = new Map<number, { d: string; path: Path2D | null }>()

type Ctx2D = OffscreenCanvasRenderingContext2D

function nowMs() {
	if (typeof performance !== 'undefined' && typeof performance.now === 'function')
		return performance.now()
	return Date.now()
}

function post(msg: WorkerToMainMessage, transfer?: Transferable[]) {
	if (transfer && transfer.length) {
		;(self as any).postMessage(msg, transfer)
	} else {
		;(self as any).postMessage(msg)
	}
}

function log(level: 'debug' | 'info' | 'warn' | 'error', message: string) {
	if (!logEnabled) return
	post({ type: 'log', level, message, ts: Date.now() })
}

function setSize(nextW: number, nextH: number, nextDpr: number) {
	width = nextW
	height = nextH
	dpr = nextDpr
	if (!canvas) return
	const pxW = Math.max(0, Math.floor(width * dpr))
	const pxH = Math.max(0, Math.floor(height * dpr))
	if (canvas.width !== pxW) canvas.width = pxW
	if (canvas.height !== pxH) canvas.height = pxH
}

async function loadBitmap(url: string) {
	const existing = bitmapCache.get(url)
	if (existing?.status === 'ready') return existing.bitmap
	if (existing?.status === 'pending') return existing.promise
	if (existing?.status === 'error') return null

	const promise = (async () => {
		try {
			const res = await fetch(url, { mode: 'cors', credentials: 'omit' })
			if (!res.ok) throw new Error(`HTTP ${res.status}`)
			const blob = await res.blob()
			const bitmap = await createImageBitmap(blob)
			const bytes = (bitmap.width ?? 0) * (bitmap.height ?? 0) * 4
			bitmapCache.set(url, { status: 'ready', bitmap, bytes })
			return bitmap
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e)
			bitmapCache.set(url, { status: 'error', error: msg })
			log('warn', `bitmap load failed: ${url} (${msg})`)
			return null
		}
	})()

	bitmapCache.set(url, { status: 'pending', promise })
	return promise
}

function drawRoundedRect(c: Ctx2D, x: number, y: number, w: number, h: number, r: number) {
	const radius = Math.max(0, Math.min(r, Math.min(w, h) / 2))
	c.beginPath()
	c.moveTo(x + radius, y)
	c.arcTo(x + w, y, x + w, y + h, radius)
	c.arcTo(x + w, y + h, x, y + h, radius)
	c.arcTo(x, y + h, x, y, radius)
	c.arcTo(x, y, x + w, y, radius)
	c.closePath()
}

type ResolvedBorder = { width: number; color: string }

function resolveBorder(value: unknown): ResolvedBorder | null {
	if (typeof value !== 'string') return null
	const raw = value.trim()
	if (!raw) return null
	const normalized = raw.replace(/\s+/g, ' ')
	const match = normalized.match(/^([0-9]*\.?[0-9]+)(px)?\s+(?:solid\s+)?(.+)$/i)
	if (match) {
		const bw = Number(match[1])
		const color = match[3]?.trim()
		if (Number.isFinite(bw) && bw > 0 && color) return { width: bw, color }
		return null
	}

	const withoutSolid = normalized
		.replace(/\bsolid\b/gi, ' ')
		.replace(/\s+/g, ' ')
		.trim()
	const match2 = withoutSolid.match(/^([0-9]*\.?[0-9]+)(px)?\s+(.+)$/i)
	if (match2) {
		const bw = Number(match2[1])
		const color = match2[3]?.trim()
		if (Number.isFinite(bw) && bw > 0 && color) return { width: bw, color }
		return null
	}

	if (/^[0-9]/.test(withoutSolid)) return null
	if (!withoutSolid) return null
	return { width: 1, color: withoutSolid }
}

function drawBorder(
	c: Ctx2D,
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
	c.save()
	c.strokeStyle = border.color
	c.lineWidth = border.width
	drawRoundedRect(c, x + inset, y + inset, bw, bh, Math.max(0, radius - inset))
	c.stroke()
	c.restore()
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

type BgRepeat = 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat'

function resolveBgRepeat(value: unknown): BgRepeat {
	if (value === 'repeat-x') return 'repeat-x'
	if (value === 'repeat-y') return 'repeat-y'
	if (value === 'no-repeat') return 'no-repeat'
	return 'repeat'
}

function parseBgSize(
	size: string | undefined,
	containerW: number,
	containerH: number,
	imgW: number,
	imgH: number,
) {
	const raw = (size || '').trim()
	if (!raw || raw === 'auto') return { width: imgW, height: imgH }
	if (raw === 'cover' || raw === 'contain') {
		const ratio =
			raw === 'cover'
				? Math.max(containerW / imgW, containerH / imgH)
				: Math.min(containerW / imgW, containerH / imgH)
		return { width: imgW * ratio, height: imgH * ratio }
	}
	const parts = raw.split(/\s+/)
	const wStr = parts[0] || 'auto'
	const hStr = parts[1] || 'auto'
	const resolveOne = (v: string, containerDim: number) => {
		if (v === 'auto') return null
		if (v.endsWith('%')) return (containerDim * parseFloat(v)) / 100
		if (v.endsWith('px')) return parseFloat(v)
		const n = parseFloat(v)
		return Number.isFinite(n) ? n : null
	}
	const w = resolveOne(wStr, containerW)
	const h = resolveOne(hStr, containerH)
	if (w != null && h != null) return { width: w, height: h }
	if (w != null && h == null) return { width: w, height: (w / imgW) * imgH }
	if (w == null && h != null) return { width: (h / imgH) * imgW, height: h }
	return { width: imgW, height: imgH }
}

function parseBgPos(
	pos: string | undefined,
	w: number,
	h: number,
	targetW: number,
	targetH: number,
) {
	const parts = (pos || '').trim().split(/\s+/)
	if (parts.length === 0 || (parts.length === 1 && !parts[0])) return { x: 0, y: 0 }

	const xStr = parts[0]
	let yStr = parts[1]
	if (parts.length === 1) yStr = 'center'

	function resolve(val: string, containerDim: number, imgDim: number) {
		if (val === 'left' || val === 'top') return 0
		if (val === 'right' || val === 'bottom') return containerDim - imgDim
		if (val === 'center') return (containerDim - imgDim) / 2
		if (val.endsWith('%')) return ((containerDim - imgDim) * parseFloat(val)) / 100
		if (val.endsWith('px')) return parseFloat(val)
		return parseFloat(val) || 0
	}

	return { x: resolve(xStr, w, targetW), y: resolve(yStr || 'center', h, targetH) }
}

async function drawBackgroundImage(
	c: Ctx2D,
	node: WorkerSerializedNode,
	x: number,
	y: number,
	w: number,
	h: number,
	radius: number,
) {
	const url = (node.props as any)?.backgroundImage
	if (!url) return
	const bitmap = await loadBitmap(url)
	if (!bitmap) return

	const props = node.props as any
	const bgSize = props.backgroundSize
	const bgPos = props.backgroundPosition
	const bgRepeat = resolveBgRepeat(props.backgroundRepeat)

	const imgW = bitmap.width
	const imgH = bitmap.height

	const { width: targetW, height: targetH } = parseBgSize(bgSize, w, h, imgW, imgH)
	const { x: posX, y: posY } = parseBgPos(bgPos, w, h, targetW, targetH)

	c.save()
	drawRoundedRect(c, x, y, w, h, radius)
	c.clip()

	if (bgRepeat === 'no-repeat') {
		c.drawImage(bitmap, x + posX, y + posY, targetW, targetH)
	} else {
		const pattern = c.createPattern(bitmap, bgRepeat as any)
		if (pattern) {
			const matrix = typeof DOMMatrix !== 'undefined' ? new DOMMatrix() : null
			if (matrix) {
				const scaleX = targetW / imgW
				const scaleY = targetH / imgH
				matrix.translateSelf(x + posX, y + posY)
				matrix.scaleSelf(scaleX, scaleY)
				;(pattern as any).setTransform?.(matrix)
			}
			c.fillStyle = pattern
			c.beginPath()
			c.rect(x, y, w, h)
			c.fill()
		}
	}
	c.restore()
}

function resolveInheritedTextStyle(
	node: WorkerSerializedNode,
	defaults?: WorkerSerializedScene['defaults'],
) {
	const own = node.style ?? {}
	const fontSize: number | undefined = own.fontSize
	const fontFamily: string | undefined = own.fontFamily
	const fontWeight: number | string | undefined = own.fontWeight
	const lineHeight: number | undefined = own.lineHeight
	const resolvedFontSize = fontSize ?? defaults?.fontSize ?? 16
	const resolvedFontFamily = fontFamily ?? defaults?.fontFamily ?? 'system-ui'
	const resolvedFontWeight = fontWeight ?? defaults?.fontWeight ?? 400
	const resolvedLineHeight =
		lineHeight ?? defaults?.lineHeight ?? Math.round(resolvedFontSize * 1.2)
	return {
		font: `${resolvedFontWeight} ${resolvedFontSize}px ${resolvedFontFamily}`,
		lineHeight: resolvedLineHeight,
	}
}

function getOrderedChildren(node: WorkerSerializedNode) {
	const children = node.children || []
	let hasAnyZ = false
	for (let i = 0; i < children.length; i += 1) {
		const z = resolveZIndex(children[i].style?.zIndex)
		if (z !== 0) {
			hasAnyZ = true
			break
		}
	}
	if (!hasAnyZ || children.length <= 1) return children
	return children
		.map((child, index) => ({ child, index, zIndex: resolveZIndex(child.style?.zIndex) }))
		.sort((a, b) => a.zIndex - b.zIndex || a.index - b.index)
		.map((x) => x.child)
}

async function drawNode(scene: WorkerSerializedScene, node: WorkerSerializedNode) {
	const c = ctx
	if (!c) return

	const w = node.layout.width
	const h = node.layout.height
	const style = node.style ?? {}
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

	c.save()
	c.translate(node.layout.x, node.layout.y)
	if (opacity !== 1) c.globalAlpha *= opacity

	if (hasTransform) {
		const origin = resolveTransformOrigin(style.transformOrigin, w, h)
		c.translate(origin.x, origin.y)
		c.transform(
			transformMatrix.a,
			transformMatrix.b,
			transformMatrix.c,
			transformMatrix.d,
			transformMatrix.e,
			transformMatrix.f,
		)
		c.translate(-origin.x, -origin.y)
	}

	if (node.type === 'Group') {
		if (overflowHidden) {
			c.save()
			c.beginPath()
			c.rect(0, 0, w, h)
			c.clip()
			for (const child of getOrderedChildren(node)) await drawNode(scene, child)
			c.restore()
			c.restore()
			return
		}
		for (const child of getOrderedChildren(node)) await drawNode(scene, child)
		c.restore()
		return
	}

	if (node.type === 'View' || node.type === 'Layer') {
		const props = node.props as any
		const background = props.background
		viewBorder = resolveBorder(props.border)
		viewRadius = props.borderRadius ?? 0
		const scrollX = !!props.scrollX
		const scrollY = !!props.scrollY
		const scrollLeft = scrollX ? (node.scrollLeft ?? 0) : 0
		const scrollTop = scrollY ? (node.scrollTop ?? 0) : 0
		const scrollbarX = scrollX ? props.scrollbarX !== false : false
		const scrollbarY = scrollY ? props.scrollbarY !== false : false
		const scrollbarWidth = props.scrollbarWidth ?? 10
		const scrollbarInset = props.scrollbarInset ?? 6
		const scrollbarTrackColor = props.scrollbarTrackColor ?? 'rgba(255,255,255,0.12)'
		const scrollbarThumbColor = props.scrollbarThumbColor ?? 'rgba(255,255,255,0.35)'
		const contentWidth = node.scrollContentWidth ?? 0
		const contentHeight = node.scrollContentHeight ?? 0
		const maxScrollLeft = Math.max(0, contentWidth - w)
		const maxScrollTop = Math.max(0, contentHeight - h)

		if (background) {
			c.save()
			c.fillStyle = background
			drawRoundedRect(c, 0, 0, w, h, viewRadius)
			c.fill()
			c.restore()
		}

		if ((node.props as any)?.backgroundImage) {
			await drawBackgroundImage(c, node, 0, 0, w, h, viewRadius)
		}

		if (overflowHidden && !scrollX && !scrollY) {
			c.save()
			drawRoundedRect(c, 0, 0, w, h, viewRadius)
			c.clip()
			for (const child of getOrderedChildren(node)) await drawNode(scene, child)
			c.restore()
			if (viewBorder) drawBorder(c, 0, 0, w, h, viewRadius, viewBorder)
			if (debug?.visualize?.nodeBounds) {
				c.save()
				c.strokeStyle = 'rgba(34,197,94,0.35)'
				c.lineWidth = 1
				c.strokeRect(0.5, 0.5, Math.max(0, w - 1), Math.max(0, h - 1))
				c.restore()
			}
			c.restore()
			return
		}

		if (scrollX || scrollY) {
			viewIsScroll = true
			c.save()
			c.beginPath()
			if (viewRadius > 0) drawRoundedRect(c, 0, 0, w, h, viewRadius)
			else c.rect(0, 0, w, h)
			c.clip()
			c.translate(-scrollLeft, -scrollTop)

			const cullPadding = 1
			const viewportX = scrollLeft - cullPadding
			const viewportY = scrollTop - cullPadding
			const viewportW = w + cullPadding * 2
			const viewportH = h + cullPadding * 2

			for (const child of getOrderedChildren(node)) {
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
				)
					continue
				await drawNode(scene, child)
			}
			c.restore()

			const corner = scrollbarInset + scrollbarWidth
			if (scrollbarY && maxScrollTop > 0) {
				const trackX = w - scrollbarInset - scrollbarWidth
				const trackY = scrollbarInset
				const trackH = Math.max(0, h - corner)
				const thumbH = Math.max(scrollbarWidth, (h / contentHeight) * trackH)
				const thumbY = trackY + (scrollTop / maxScrollTop) * (trackH - thumbH)
				c.save()
				c.fillStyle = scrollbarTrackColor
				drawRoundedRect(c, trackX, trackY, scrollbarWidth, trackH, scrollbarWidth / 2)
				c.fill()
				c.fillStyle = scrollbarThumbColor
				drawRoundedRect(c, trackX, thumbY, scrollbarWidth, thumbH, scrollbarWidth / 2)
				c.fill()
				c.restore()
			}

			if (scrollbarX && maxScrollLeft > 0) {
				const trackX = scrollbarInset
				const trackY = h - scrollbarInset - scrollbarWidth
				const trackW = Math.max(0, w - corner)
				const thumbW = Math.max(scrollbarWidth, (w / contentWidth) * trackW)
				const thumbX = trackX + (scrollLeft / maxScrollLeft) * (trackW - thumbW)
				c.save()
				c.fillStyle = scrollbarTrackColor
				drawRoundedRect(c, trackX, trackY, trackW, scrollbarWidth, scrollbarWidth / 2)
				c.fill()
				c.fillStyle = scrollbarThumbColor
				drawRoundedRect(c, thumbX, trackY, thumbW, scrollbarWidth, scrollbarWidth / 2)
				c.fill()
				c.restore()
			}

			if (viewBorder) drawBorder(c, 0, 0, w, h, viewRadius, viewBorder)
			if (debug?.visualize?.nodeBounds) {
				c.save()
				c.strokeStyle = 'rgba(34,197,94,0.35)'
				c.lineWidth = 1
				c.strokeRect(0.5, 0.5, Math.max(0, w - 1), Math.max(0, h - 1))
				c.restore()
			}
			c.restore()
			return
		}
	}

	if (node.type === 'Rect') {
		const props = node.props as any
		const fill = props.fill ?? '#ffffff'
		const stroke = props.stroke
		const lineWidth = props.lineWidth ?? 1
		const radius = props.borderRadius ?? 0
		c.save()
		drawRoundedRect(c, 0, 0, w, h, radius)
		if (fill) {
			c.fillStyle = fill
			c.fill()
		}
		if (stroke) {
			c.strokeStyle = stroke
			c.lineWidth = lineWidth
			c.stroke()
		}
		c.restore()
	}

	if (node.type === 'Circle') {
		const props = node.props as any
		const fill = props.fill ?? '#ffffff'
		const stroke = props.stroke
		const lineWidth = props.lineWidth ?? 1
		if (w > 0 && h > 0) {
			const cx = w / 2
			const cy = h / 2
			const rx = w / 2
			const ry = h / 2
			c.save()
			c.beginPath()
			c.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2)
			if (fill) {
				c.fillStyle = fill
				c.fill()
			}
			if (stroke) {
				c.strokeStyle = stroke
				c.lineWidth = lineWidth
				c.stroke()
			}
			c.restore()
		}
	}

	if (node.type === 'Path') {
		const props = node.props as any
		const d = String(props.d || '')
		let cached = pathCache.get(node.id)
		if (!cached || cached.d !== d) {
			try {
				cached = { d, path: d.trim() ? new Path2D(d) : null }
			} catch {
				cached = { d, path: null }
			}
			pathCache.set(node.id, cached)
		}
		const path = cached.path
		if (path) {
			const fill = props.fill ?? '#ffffff'
			const fillRule = props.fillRule
			const stroke = props.stroke
			const lineWidth = props.lineWidth ?? 1
			c.save()
			if (fill) {
				c.fillStyle = fill
				;(c as any).fill(path as any, fillRule)
			}
			if (stroke) {
				c.strokeStyle = stroke
				c.lineWidth = lineWidth
				c.stroke(path as any)
			}
			c.restore()
		}
	}

	if (node.type === 'Line') {
		const props = node.props as any
		const x1 = props.x1 ?? 0
		const y1 = props.y1 ?? 0
		const x2 = props.x2 ?? w
		const y2 = props.y2 ?? h
		const stroke = props.stroke ?? '#ffffff'
		const lineWidth = props.lineWidth ?? 1
		c.save()
		c.strokeStyle = stroke
		c.lineWidth = lineWidth
		if (props.lineCap) c.lineCap = props.lineCap
		c.beginPath()
		c.moveTo(x1, y1)
		c.lineTo(x2, y2)
		c.stroke()
		c.restore()
	}

	if (node.type === 'Text') {
		const props = node.props as any
		const text = props.text
		const color = props.color ?? '#ffffff'
		const { font, lineHeight } = resolveInheritedTextStyle(node, scene.defaults)
		c.save()
		c.font = font
		c.fillStyle = color
		c.textBaseline = 'top'
		const lines = String(text).split('\n')
		for (let i = 0; i < lines.length; i += 1) c.fillText(lines[i], 0, i * lineHeight)
		c.restore()
	}

	if (node.type === 'Image') {
		const props = node.props as any
		const src = props.src
		if (src) {
			const bitmap = await loadBitmap(src)
			if (bitmap) {
				const objectFit = props.objectFit || 'contain'
				const radius = props.borderRadius ?? 0
				const srcW = bitmap.width
				const srcH = bitmap.height
				let dstX = 0
				let dstY = 0
				let dstW = w
				let dstH = h
				let srcX = 0
				let srcY = 0
				let finalSrcW = srcW
				let finalSrcH = srcH
				if (objectFit === 'contain') {
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
				c.save()
				c.beginPath()
				drawRoundedRect(c, 0, 0, w, h, radius)
				c.clip()
				c.drawImage(bitmap, srcX, srcY, finalSrcW, finalSrcH, dstX, dstY, dstW, dstH)
				c.restore()
			}
		}
	}

	for (const child of getOrderedChildren(node)) await drawNode(scene, child)

	if ((node.type === 'View' || node.type === 'Layer') && !viewIsScroll && viewBorder) {
		drawBorder(c, 0, 0, w, h, viewRadius, viewBorder)
	}

	if (debug?.visualize?.nodeBounds) {
		c.save()
		c.strokeStyle = 'rgba(34,197,94,0.35)'
		c.lineWidth = 1
		c.strokeRect(0.5, 0.5, Math.max(0, w - 1), Math.max(0, h - 1))
		c.restore()
	}

	c.restore()
}

function drawOverlay(overlay: WorkerOverlay, dprValue: number) {
	const c = ctx
	if (!c) return
	const drawOne = (r: any, fill: string, stroke: string) => {
		if (!r) return
		c.save()
		c.setTransform(dprValue, 0, 0, dprValue, 0, 0)
		if (Array.isArray(r.clipRects)) {
			for (const clip of r.clipRects) {
				c.beginPath()
				c.rect(clip.x, clip.y, clip.width, clip.height)
				c.clip()
			}
		}
		c.fillStyle = fill
		c.strokeStyle = stroke
		c.lineWidth = 1
		c.fillRect(r.x, r.y, r.width, r.height)
		c.strokeRect(r.x + 0.5, r.y + 0.5, Math.max(0, r.width - 1), Math.max(0, r.height - 1))
		c.restore()
	}
	drawOne(overlay.hover, 'rgba(59,130,246,0.12)', 'rgba(59,130,246,0.9)')
	drawOne(overlay.selected, 'rgba(34,197,94,0.10)', 'rgba(34,197,94,0.9)')
}

async function drawScene(scene: WorkerSerializedScene) {
	if (!ctx) return
	const c = ctx
	const start = nowMs()

	const pxW = c.canvas.width
	const pxH = c.canvas.height

	c.save()
	if (scene.clearColor) {
		c.fillStyle = scene.clearColor
		c.fillRect(0, 0, pxW, pxH)
	} else {
		c.clearRect(0, 0, pxW, pxH)
	}
	c.restore()

	const drawStart = nowMs()
	c.save()
	c.setTransform(scene.dpr, 0, 0, scene.dpr, 0, 0)

	let hasAnyZ = false
	for (let i = 0; i < scene.rootChildren.length; i += 1) {
		const z = resolveZIndex(scene.rootChildren[i].style?.zIndex)
		if (z !== 0) {
			hasAnyZ = true
			break
		}
	}
	const orderedRootChildren =
		hasAnyZ && scene.rootChildren.length > 1
			? scene.rootChildren
					.map((child, index) => ({ child, index, zIndex: resolveZIndex(child.style?.zIndex) }))
					.sort((a, b) => a.zIndex - b.zIndex || a.index - b.index)
					.map((x) => x.child)
			: scene.rootChildren

	for (const child of orderedRootChildren) await drawNode(scene, child)
	c.restore()
	const drawMs = nowMs() - drawStart

	const overlayStart = nowMs()
	if (scene.overlay) drawOverlay(scene.overlay, scene.dpr)
	const overlayMs = nowMs() - overlayStart

	const t = nowMs()
	const dt = lastFrameTs ? t - lastFrameTs : 0
	lastFrameTs = t
	const fps = dt > 0 ? 1000 / dt : 0

	let bitmapBytes = 0
	let bitmaps = 0
	for (const v of bitmapCache.values()) {
		if (v.status === 'ready') {
			bitmaps += 1
			bitmapBytes += v.bytes
		}
	}

	const mem = (performance as any)?.memory
	const memory = mem
		? {
				usedJSHeapSize: mem.usedJSHeapSize,
				totalJSHeapSize: mem.totalJSHeapSize,
				jsHeapSizeLimit: mem.jsHeapSizeLimit,
			}
		: null

	post({
		type: 'frameDone',
		frameIndex: scene.frameIndex,
		drawMs: Number.isFinite(drawMs) ? drawMs : 0,
		overlayMs: Number.isFinite(overlayMs) ? overlayMs : 0,
		totalMs: Number.isFinite(t - start) ? t - start : 0,
		fps: Number.isFinite(fps) ? fps : 0,
		memory,
		resources: { bitmaps, bitmapBytes },
	})
}

function schedule() {
	if (drawing) {
		pending = true
		return
	}
	drawing = true
	pending = false
	;(async () => {
		try {
			if (latestScene) await drawScene(latestScene)
		} catch (e) {
			const msg = e instanceof Error ? e.message : String(e)
			post({ type: 'error', error: msg, stack: e instanceof Error ? e.stack : undefined })
		} finally {
			drawing = false
			if (pending) schedule()
		}
	})()
}

self.addEventListener('message', (e: MessageEvent<MainToWorkerMessage>) => {
	const msg = e.data
	if (!msg || typeof msg !== 'object') return

	if (msg.type === 'init') {
		canvas = msg.canvas
		ctx = canvas.getContext('2d', { alpha: true }) as any
		debug = msg.debug ?? null
		logEnabled = !!debug?.logEnabled
		setSize(msg.width, msg.height, msg.dpr)
		post({ type: 'ready' })
		return
	}

	if (msg.type === 'resize') {
		setSize(msg.width, msg.height, msg.dpr)
		if (latestScene) schedule()
		return
	}

	if (msg.type === 'setDebug') {
		debug = msg.debug
		logEnabled = !!debug?.logEnabled
		if (latestScene) schedule()
		return
	}

	if (msg.type === 'render') {
		latestScene = msg.scene
		debug = msg.scene.debug ?? debug
		logEnabled = !!debug?.logEnabled
		setSize(msg.scene.width, msg.scene.height, msg.scene.dpr)
		schedule()
		return
	}

	if (msg.type === 'capture') {
		const c = canvas
		if (!c || typeof (c as any).convertToBlob !== 'function') {
			post({
				type: 'captureResult',
				requestId: msg.requestId,
				ok: false,
				error: 'convertToBlob unavailable',
			})
			return
		}
		;(async () => {
			try {
				const blob = await (c as any).convertToBlob({ type: msg.blobType, quality: msg.quality })
				post({ type: 'captureResult', requestId: msg.requestId, ok: true, blob })
			} catch (e) {
				const err = e instanceof Error ? e.message : String(e)
				post({ type: 'captureResult', requestId: msg.requestId, ok: false, error: err })
			}
		})()
		return
	}

	if (msg.type === 'dispose') {
		bitmapCache.clear()
		pathCache.clear()
		canvas = null
		ctx = null
		latestScene = null
		return
	}
})
