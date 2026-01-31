import type { CanvasRootOptions } from '../types'
import type {
	MainToWorkerMessage,
	WorkerLogLevel,
	WorkerDebugOptions,
	WorkerSerializedScene,
	WorkerToMainMessage,
} from './protocol'

type FrameDone = Extract<WorkerToMainMessage, { type: 'frameDone' }>

export type OffscreenWorkerRenderer = {
	kind: 'offscreen-worker'
	isSupported: boolean
	render: (scene: WorkerSerializedScene) => Promise<FrameDone>
	setDebug: (debug: WorkerDebugOptions | null) => void
	captureBlob: (blobType?: string, quality?: number) => Promise<Blob>
	dispose: () => void
}

export function canUseOffscreenCanvas(canvas: HTMLCanvasElement) {
	return (
		typeof window !== 'undefined' &&
		typeof Worker !== 'undefined' &&
		typeof canvas.transferControlToOffscreen === 'function'
	)
}

export type OffscreenWorkerRendererCallbacks = {
	onLog?: (entry: { level: WorkerLogLevel; message: string; ts: number }) => void
	onError?: (err: Error) => void
	onFrameDone?: (frame: FrameDone) => void
}

type SharedController = {
	render: (scene: WorkerSerializedScene) => Promise<FrameDone>
	setDebug: (debug: WorkerDebugOptions | null) => void
	captureBlob: (blobType?: string, quality?: number) => Promise<Blob>
	terminate: () => void
	addCallbacks: (cb: OffscreenWorkerRendererCallbacks) => void
	removeCallbacks: (cb: OffscreenWorkerRendererCallbacks) => void
}

type SharedEntry = {
	controller: SharedController
	refCount: number
}

const sharedKey: symbol | string =
	typeof Symbol === 'function' && typeof Symbol.for === 'function'
		? Symbol.for('@jiujue/react-canvas-fiber/offscreenShared')
		: '__rcfOffscreenShared__'

function getSharedEntry(canvas: HTMLCanvasElement): SharedEntry | undefined {
	return (canvas as any)[sharedKey] as SharedEntry | undefined
}

function setSharedEntry(canvas: HTMLCanvasElement, entry: SharedEntry) {
	;(canvas as any)[sharedKey] = entry
}

function clearSharedEntry(canvas: HTMLCanvasElement) {
	try {
		;(canvas as any)[sharedKey] = undefined
	} catch (err) {
		void err
	}
}

function createSharedController(
	canvas: HTMLCanvasElement,
	options: CanvasRootOptions,
	initialDebug?: WorkerDebugOptions | null,
): SharedController {
	const offscreen = canvas.transferControlToOffscreen()
	const workerUrl = new URL('./worker/offscreenCanvas.worker.js', import.meta.url)
	const worker = new Worker(workerUrl, { type: 'module' })

	let disposed = false
	let lastReady = false

	let nextRequestId = 1
	const captureWaiters = new Map<
		number,
		{ resolve: (b: Blob) => void; reject: (e: Error) => void }
	>()

	let inflightFrame: null | {
		frameIndex: number
		resolve: (v: FrameDone) => void
		reject: (e: Error) => void
	} = null

	const callbacks = new Set<OffscreenWorkerRendererCallbacks>()

	const post = (msg: MainToWorkerMessage, transfer?: Transferable[]) => {
		if (disposed) return
		if (transfer && transfer.length) worker.postMessage(msg, transfer)
		else worker.postMessage(msg)
	}

	const emitError = (err: Error) => {
		for (const cb of callbacks) cb.onError?.(err)
	}

	const failInflight = (err: Error) => {
		emitError(err)
		if (inflightFrame) {
			const reject = inflightFrame.reject
			inflightFrame = null
			reject(err)
		}
		for (const w of captureWaiters.values()) w.reject(err)
		captureWaiters.clear()
	}

	worker.addEventListener('message', (e: MessageEvent<WorkerToMainMessage>) => {
		const msg = e.data
		if (!msg || typeof msg !== 'object') return

		if (msg.type === 'ready') {
			lastReady = true
			return
		}

		if (msg.type === 'frameDone') {
			for (const cb of callbacks) cb.onFrameDone?.(msg)
			if (inflightFrame && inflightFrame.frameIndex === msg.frameIndex) {
				const resolve = inflightFrame.resolve
				inflightFrame = null
				resolve(msg)
			}
			return
		}

		if (msg.type === 'log') {
			for (const cb of callbacks) cb.onLog?.({ level: msg.level, message: msg.message, ts: msg.ts })
			return
		}

		if (msg.type === 'captureResult') {
			const waiter = captureWaiters.get(msg.requestId)
			if (!waiter) return
			captureWaiters.delete(msg.requestId)
			if (msg.ok) waiter.resolve(msg.blob)
			else waiter.reject(new Error(msg.error))
			return
		}

		if (msg.type === 'error') {
			failInflight(new Error(msg.error))
			return
		}
	})

	worker.addEventListener('error', (e) => {
		failInflight(new Error((e as any)?.message || 'Worker error'))
	})

	post(
		{
			type: 'init',
			canvas: offscreen,
			width: options.width,
			height: options.height,
			dpr: options.dpr,
			debug: initialDebug ?? null,
		},
		[offscreen as unknown as Transferable],
	)

	const render = (scene: WorkerSerializedScene) =>
		new Promise<FrameDone>((resolve, reject) => {
			if (disposed) return reject(new Error('Renderer disposed'))
			if (!lastReady) return reject(new Error('Worker not ready'))
			if (inflightFrame) return reject(new Error('Previous frame still in flight'))
			inflightFrame = { frameIndex: scene.frameIndex, resolve, reject }
			post({ type: 'render', scene })
		})

	const setDebug = (next: WorkerDebugOptions | null) => {
		post({ type: 'setDebug', debug: next })
	}

	const captureBlob = (blobType?: string, quality?: number) =>
		new Promise<Blob>((resolve, reject) => {
			if (disposed) return reject(new Error('Renderer disposed'))
			const requestId = nextRequestId++
			captureWaiters.set(requestId, { resolve, reject })
			post({ type: 'capture', requestId, blobType, quality })
		})

	const terminate = () => {
		if (disposed) return
		disposed = true
		try {
			post({ type: 'dispose' })
		} finally {
			worker.terminate()
			failInflight(new Error('Renderer disposed'))
			callbacks.clear()
		}
	}

	const addCallbacks = (cb: OffscreenWorkerRendererCallbacks) => {
		callbacks.add(cb)
	}

	const removeCallbacks = (cb: OffscreenWorkerRendererCallbacks) => {
		callbacks.delete(cb)
	}

	return { render, setDebug, captureBlob, terminate, addCallbacks, removeCallbacks }
}

export function createOffscreenWorkerRenderer(
	canvas: HTMLCanvasElement,
	options: CanvasRootOptions,
	initialDebug?: WorkerDebugOptions | null,
	callbacks?: OffscreenWorkerRendererCallbacks,
): OffscreenWorkerRenderer {
	if (!canUseOffscreenCanvas(canvas)) {
		return {
			kind: 'offscreen-worker',
			isSupported: false,
			async render() {
				throw new Error('OffscreenCanvas is not supported')
			},
			setDebug() {},
			async captureBlob() {
				throw new Error('OffscreenCanvas is not supported')
			},
			dispose() {},
		}
	}

	const cb = callbacks ?? {}

	let entry = getSharedEntry(canvas)
	if (!entry) {
		entry = {
			controller: createSharedController(canvas, options, initialDebug),
			refCount: 0,
		}
		setSharedEntry(canvas, entry)
	}

	entry.refCount += 1
	entry.controller.addCallbacks(cb)
	if (initialDebug !== undefined) entry.controller.setDebug(initialDebug ?? null)

	let disposed = false
	const dispose = () => {
		if (disposed) return
		disposed = true
		entry.controller.removeCallbacks(cb)
		entry.refCount -= 1
		if (entry.refCount > 0) return
		if (!canvas.isConnected) {
			entry.controller.terminate()
			clearSharedEntry(canvas)
		}
	}

	return {
		kind: 'offscreen-worker',
		isSupported: true,
		render: entry.controller.render,
		setDebug: entry.controller.setDebug,
		captureBlob: entry.controller.captureBlob,
		dispose,
	}
}
