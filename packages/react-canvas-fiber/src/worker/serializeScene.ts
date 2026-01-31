import type { CanvasNode, RootNode } from '../runtime/nodes'
import type { CanvasRootOptions } from '../types'
import type { WorkerOverlay, WorkerSerializedNode, WorkerSerializedScene, WorkerSerializedStyle } from './protocol'

function pickStyle(style: any): WorkerSerializedStyle | undefined {
	if (!style || typeof style !== 'object') return undefined
	const out: WorkerSerializedStyle = {}
	if ('transform' in style) out.transform = style.transform
	if ('transformOrigin' in style) out.transformOrigin = style.transformOrigin
	if ('overflow' in style) out.overflow = style.overflow
	if ('zIndex' in style) out.zIndex = style.zIndex
	if ('opacity' in style) out.opacity = style.opacity
	if ('fontSize' in style) out.fontSize = style.fontSize
	if ('fontFamily' in style) out.fontFamily = style.fontFamily
	if ('fontWeight' in style) out.fontWeight = style.fontWeight
	if ('lineHeight' in style) out.lineHeight = style.lineHeight
	return out
}

function serializeNode(node: CanvasNode): WorkerSerializedNode {
	const style = pickStyle((node.props as any)?.style)
	const base = {
		id: node.debugId,
		type: node.type as WorkerSerializedNode['type'],
		layout: node.layout,
		contentBounds: node.contentBounds,
		style,
		scrollLeft: node.scrollLeft,
		scrollTop: node.scrollTop,
		scrollContentWidth: node.scrollContentWidth,
		scrollContentHeight: node.scrollContentHeight,
		children: node.children.map(serializeNode),
	} satisfies Omit<WorkerSerializedNode, 'props'>

	if (node.type === 'View' || node.type === 'Layer') {
		const p = node.props as any
		return {
			...base,
			props: {
				background: p.background,
				backgroundImage: p.backgroundImage,
				backgroundPosition: p.backgroundPosition,
				backgroundSize: p.backgroundSize,
				backgroundRepeat: p.backgroundRepeat,
				border: p.border,
				borderRadius: p.borderRadius,
				scrollX: p.scrollX,
				scrollY: p.scrollY,
				scrollbarX: p.scrollbarX,
				scrollbarY: p.scrollbarY,
				scrollbarWidth: p.scrollbarWidth,
				scrollbarInset: p.scrollbarInset,
				scrollbarTrackColor: p.scrollbarTrackColor,
				scrollbarThumbColor: p.scrollbarThumbColor,
			},
		}
	}

	if (node.type === 'Rect') {
		const p = node.props as any
		return { ...base, props: { fill: p.fill, stroke: p.stroke, lineWidth: p.lineWidth, borderRadius: p.borderRadius } }
	}

	if (node.type === 'Circle') {
		const p = node.props as any
		return { ...base, props: { fill: p.fill, stroke: p.stroke, lineWidth: p.lineWidth } }
	}

	if (node.type === 'Path') {
		const p = node.props as any
		return { ...base, props: { d: p.d, fill: p.fill, fillRule: p.fillRule, stroke: p.stroke, lineWidth: p.lineWidth } }
	}

	if (node.type === 'Line') {
		const p = node.props as any
		return {
			...base,
			props: { x1: p.x1, y1: p.y1, x2: p.x2, y2: p.y2, stroke: p.stroke, lineWidth: p.lineWidth, lineCap: p.lineCap },
		}
	}

	if (node.type === 'Text') {
		const p = node.props as any
		return { ...base, props: { text: p.text, color: p.color } }
	}

	if (node.type === 'Image') {
		const p = node.props as any
		return { ...base, props: { src: p.src, objectFit: p.objectFit, borderRadius: p.borderRadius } }
	}

	return { ...base, props: {} as any }
}

export function serializeSceneForWorker(
	root: RootNode,
	options: CanvasRootOptions,
	frameIndex: number,
	overlay?: WorkerOverlay | null,
	debug?: WorkerSerializedScene['debug'],
) {
	return {
		frameIndex,
		width: options.width,
		height: options.height,
		dpr: options.dpr,
		clearColor: options.clearColor,
		defaults: {
			fontFamily: options.fontFamily,
			fontSize: options.fontSize,
			fontWeight: options.fontWeight,
			lineHeight: options.lineHeight,
		},
		rootChildren: root.children.map(serializeNode),
		overlay: overlay ?? null,
		debug: debug ?? null,
	} satisfies WorkerSerializedScene
}

