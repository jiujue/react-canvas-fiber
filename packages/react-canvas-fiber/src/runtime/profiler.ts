export type CanvasPerfFrame = {
	frameIndex: number
	ts: number
	dtMs: number
	fps: number
	layoutMs: number
	drawMs: number
	overlayMs: number
	totalMs: number
	counts: Record<string, number>
	scene?: {
		nodesTotal: number
		nodesByType: Record<string, number>
		imagesTotal: number
		decodedImageBytes: number
		canvasBytes: number
	}
}

export type CanvasPerfReport = {
	sampleCount: number
	timeWindowMs: number
	fps: { avg: number; p50: number; p95: number; min: number; max: number }
	totalMs: { avg: number; p50: number; p95: number; min: number; max: number }
	layoutMs: { avg: number; p50: number; p95: number; min: number; max: number }
	drawMs: { avg: number; p50: number; p95: number; min: number; max: number }
	overlayMs: { avg: number; p50: number; p95: number; min: number; max: number }
	countsAvg: Record<string, number>
	latestScene?: CanvasPerfFrame['scene']
	latestFrame?: CanvasPerfFrame
}

export type CanvasPerfOptions = {
	maxFrames?: number
	sceneSampleEveryNFrames?: number
}

type SceneSnapshot = NonNullable<CanvasPerfFrame['scene']>

type PerfTimerState = {
	frameStartTs: number
	lastFrameTs: number
	frameIndex: number
	layoutMs: number
	drawMs: number
	overlayMs: number
	counts: Record<string, number>
	scene: SceneSnapshot | null
	sceneDirty: boolean
}

function nowMs() {
	if (typeof performance !== 'undefined' && typeof performance.now === 'function')
		return performance.now()
	return Date.now()
}

function clampNumber(v: number) {
	return Number.isFinite(v) ? v : 0
}

function summarize(values: number[]) {
	if (values.length === 0) return { avg: 0, p50: 0, p95: 0, min: 0, max: 0 }
	const sorted = values.slice().sort((a, b) => a - b)
	const min = sorted[0]
	const max = sorted[sorted.length - 1]
	const avg = sorted.reduce((s, x) => s + x, 0) / sorted.length
	const pick = (p: number) => {
		if (sorted.length === 1) return sorted[0]
		const idx = Math.min(sorted.length - 1, Math.max(0, Math.round((sorted.length - 1) * p)))
		return sorted[idx]
	}
	return { avg, p50: pick(0.5), p95: pick(0.95), min, max }
}

export function createCanvasProfiler(options?: CanvasPerfOptions) {
	const maxFrames = Math.max(30, Math.min(2000, options?.maxFrames ?? 240))
	const sceneSampleEveryNFrames = Math.max(1, Math.min(120, options?.sceneSampleEveryNFrames ?? 10))

	const frames: CanvasPerfFrame[] = []
	const state: PerfTimerState = {
		frameStartTs: 0,
		lastFrameTs: 0,
		frameIndex: 0,
		layoutMs: 0,
		drawMs: 0,
		overlayMs: 0,
		counts: Object.create(null),
		scene: null,
		sceneDirty: true,
	}

	const beginFrame = () => {
		const t = nowMs()
		if (state.lastFrameTs === 0) state.lastFrameTs = t
		state.frameStartTs = t
		state.layoutMs = 0
		state.drawMs = 0
		state.overlayMs = 0
		state.counts = Object.create(null)
		state.frameIndex += 1
	}

	const count = (name: string, delta = 1) => {
		const d = delta || 0
		if (!d) return
		state.counts[name] = (state.counts[name] ?? 0) + d
	}

	const markSceneDirty = () => {
		state.sceneDirty = true
	}

	const setSceneSnapshot = (snapshot: SceneSnapshot) => {
		state.scene = snapshot
		state.sceneDirty = false
	}

	const timeSync = <T>(section: 'layoutMs' | 'drawMs' | 'overlayMs', fn: () => T): T => {
		const start = nowMs()
		try {
			return fn()
		} finally {
			const dur = nowMs() - start
			state[section] += clampNumber(dur)
		}
	}

	const timeAsync = async <T>(
		section: 'layoutMs' | 'drawMs' | 'overlayMs',
		fn: () => Promise<T>,
	): Promise<T> => {
		const start = nowMs()
		try {
			return await fn()
		} finally {
			const dur = nowMs() - start
			state[section] += clampNumber(dur)
		}
	}

	const endFrame = () => {
		const t = nowMs()
		const dtMs = clampNumber(t - state.lastFrameTs)
		state.lastFrameTs = t
		const fps = dtMs > 0 ? 1000 / dtMs : 0
		const totalMs = clampNumber(t - state.frameStartTs)
		const frame: CanvasPerfFrame = {
			frameIndex: state.frameIndex,
			ts: t,
			dtMs,
			fps,
			layoutMs: clampNumber(state.layoutMs),
			drawMs: clampNumber(state.drawMs),
			overlayMs: clampNumber(state.overlayMs),
			totalMs,
			counts: { ...state.counts },
			scene: state.scene ?? undefined,
		}
		frames.push(frame)
		if (frames.length > maxFrames) frames.splice(0, frames.length - maxFrames)
		return frame
	}

	const getFrames = () => frames.slice()

	const getReport = () => {
		const sampleCount = frames.length
		const timeWindowMs =
			sampleCount >= 2 ? clampNumber(frames[sampleCount - 1].ts - frames[0].ts) : 0

		const fpsStats = summarize(frames.map((f) => f.fps))
		const totalStats = summarize(frames.map((f) => f.totalMs))
		const layoutStats = summarize(frames.map((f) => f.layoutMs))
		const drawStats = summarize(frames.map((f) => f.drawMs))
		const overlayStats = summarize(frames.map((f) => f.overlayMs))

		const countsSum: Record<string, number> = Object.create(null)
		for (const f of frames) {
			for (const k of Object.keys(f.counts)) {
				countsSum[k] = (countsSum[k] ?? 0) + (f.counts[k] ?? 0)
			}
		}
		const countsAvg: Record<string, number> = Object.create(null)
		if (sampleCount > 0) {
			for (const k of Object.keys(countsSum)) {
				countsAvg[k] = countsSum[k] / sampleCount
			}
		}

		let latestScene: CanvasPerfReport['latestScene']
		for (let i = frames.length - 1; i >= 0; i -= 1) {
			if (frames[i].scene) {
				latestScene = frames[i].scene
				break
			}
		}

		return {
			sampleCount,
			timeWindowMs,
			fps: fpsStats,
			totalMs: totalStats,
			layoutMs: layoutStats,
			drawMs: drawStats,
			overlayMs: overlayStats,
			countsAvg,
			latestScene,
			latestFrame: frames[frames.length - 1],
		} satisfies CanvasPerfReport
	}

	const shouldSampleSceneThisFrame = () =>
		state.sceneDirty || state.frameIndex % sceneSampleEveryNFrames === 0

	const reset = () => {
		frames.splice(0, frames.length)
		state.frameStartTs = 0
		state.lastFrameTs = 0
		state.frameIndex = 0
		state.layoutMs = 0
		state.drawMs = 0
		state.overlayMs = 0
		state.counts = Object.create(null)
		state.scene = null
		state.sceneDirty = true
	}

	return {
		beginFrame,
		endFrame,
		timeSync,
		timeAsync,
		count,
		getFrames,
		getReport,
		reset,
		markSceneDirty,
		setSceneSnapshot,
		shouldSampleSceneThisFrame,
	}
}
