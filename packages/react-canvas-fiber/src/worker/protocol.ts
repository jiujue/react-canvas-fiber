export type WorkerLogLevel = 'debug' | 'info' | 'warn' | 'error'

export type WorkerDebugOptions = {
	logEnabled?: boolean
	visualize?: {
		nodeBounds?: boolean
	}
}

export type WorkerOverlayRect = {
	x: number
	y: number
	width: number
	height: number
	clipRects?: Array<{ x: number; y: number; width: number; height: number }>
}

export type WorkerOverlay = {
	hover?: WorkerOverlayRect | null
	selected?: WorkerOverlayRect | null
}

export type WorkerSerializedStyle = {
	transform?: unknown
	transformOrigin?: unknown
	overflow?: 'visible' | 'hidden'
	zIndex?: number
	opacity?: number
	fontSize?: number
	fontFamily?: string
	fontWeight?: number | string
	lineHeight?: number
}

export type WorkerSerializedNode = {
	id: number
	type: 'View' | 'Group' | 'Layer' | 'Rect' | 'Circle' | 'Path' | 'Line' | 'Text' | 'Image'
	layout: { x: number; y: number; width: number; height: number }
	contentBounds?: { x: number; y: number; width: number; height: number }
	style?: WorkerSerializedStyle
	scrollLeft?: number
	scrollTop?: number
	scrollContentWidth?: number
	scrollContentHeight?: number
	props:
		| {
				background?: string
				backgroundImage?: string
				backgroundPosition?: string
				backgroundSize?: string
				backgroundRepeat?: string
				border?: string
				borderRadius?: number
				scrollX?: boolean
				scrollY?: boolean
				scrollbarX?: boolean
				scrollbarY?: boolean
				scrollbarWidth?: number
				scrollbarInset?: number
				scrollbarTrackColor?: string
				scrollbarThumbColor?: string
		  }
		| { fill?: string; stroke?: string; lineWidth?: number; borderRadius?: number }
		| { fill?: string; stroke?: string; lineWidth?: number }
		| { d: string; fill?: string; fillRule?: CanvasFillRule; stroke?: string; lineWidth?: number }
		| {
				x1?: number
				y1?: number
				x2?: number
				y2?: number
				stroke?: string
				lineWidth?: number
				lineCap?: CanvasLineCap
		  }
		| { text: string; color?: string }
		| { src: string; objectFit?: 'cover' | 'contain' | 'fill'; borderRadius?: number }
	children: WorkerSerializedNode[]
}

export type WorkerSerializedScene = {
	frameIndex: number
	width: number
	height: number
	dpr: number
	clearColor?: string
	defaults?: {
		fontFamily?: string
		fontSize?: number
		fontWeight?: number | string
		lineHeight?: number
	}
	rootChildren: WorkerSerializedNode[]
	overlay?: WorkerOverlay | null
	debug?: WorkerDebugOptions | null
}

export type WorkerInitMessage = {
	type: 'init'
	canvas: OffscreenCanvas
	width: number
	height: number
	dpr: number
	debug?: WorkerDebugOptions | null
}

export type WorkerResizeMessage = {
	type: 'resize'
	width: number
	height: number
	dpr: number
}

export type WorkerRenderMessage = {
	type: 'render'
	scene: WorkerSerializedScene
}

export type WorkerSetDebugMessage = {
	type: 'setDebug'
	debug: WorkerDebugOptions | null
}

export type WorkerCaptureMessage = {
	type: 'capture'
	requestId: number
	blobType?: string
	quality?: number
}

export type WorkerDisposeMessage = {
	type: 'dispose'
}

export type WorkerToMainMessage =
	| { type: 'ready' }
	| {
			type: 'frameDone'
			frameIndex: number
			drawMs: number
			overlayMs: number
			totalMs: number
			fps: number
			memory?: {
				usedJSHeapSize?: number
				totalJSHeapSize?: number
				jsHeapSizeLimit?: number
			} | null
			resources?: { bitmaps: number; bitmapBytes: number } | null
	  }
	| {
			type: 'log'
			level: WorkerLogLevel
			message: string
			ts: number
	  }
	| {
			type: 'captureResult'
			requestId: number
			ok: true
			blob: Blob
	  }
	| {
			type: 'captureResult'
			requestId: number
			ok: false
			error: string
	  }
	| { type: 'error'; error: string; stack?: string }

export type MainToWorkerMessage =
	| WorkerInitMessage
	| WorkerResizeMessage
	| WorkerRenderMessage
	| WorkerSetDebugMessage
	| WorkerCaptureMessage
	| WorkerDisposeMessage
