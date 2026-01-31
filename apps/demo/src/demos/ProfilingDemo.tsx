import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useEffect, useMemo, useRef, useState } from 'react'

declare global {
	interface Window {
		__REACT_CANVAS_FIBER_DEVTOOLS__?: any
	}
}

type Sprite = { x: number; y: number; vx: number; vy: number; size: number }

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

const createSprites = (count: number, width: number, height: number) => {
	const res: Sprite[] = []
	for (let i = 0; i < count; i += 1) {
		const size = 8 + Math.random() * 12
		res.push({
			x: Math.random() * Math.max(1, width - size),
			y: Math.random() * Math.max(1, height - size),
			vx: (Math.random() * 2 - 1) * 2.2,
			vy: (Math.random() * 2 - 1) * 2.2,
			size,
		})
	}
	return res
}

export default function ProfilingDemo() {
	const width = 900
	const height = 520
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

	const [settings, setSettings] = useState({
		cols: 54,
		rows: 26,
		size: 14,
		spriteCount: 180,
		running: true,
		enableProfiling: true,
		maxFrames: 240,
		sceneSampleEveryNFrames: 10,
	})

	const spritesRef = useRef<Sprite[]>(createSprites(settings.spriteCount, width, height))
	const rafRef = useRef<number | null>(null)
	const [tick, setTick] = useState(0)

	useEffect(() => {
		spritesRef.current = createSprites(settings.spriteCount, width, height)
	}, [settings.spriteCount])

	useEffect(() => {
		if (!settings.running) return
		const loop = () => {
			setTick((v) => v + 1)
			rafRef.current = requestAnimationFrame(loop)
		}
		rafRef.current = requestAnimationFrame(loop)
		return () => {
			if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
			rafRef.current = null
		}
	}, [settings.running])

	const staticRects = useMemo(() => {
		const rects: Array<{ key: string; x: number; y: number; fill: string }> = []
		for (let r = 0; r < settings.rows; r += 1) {
			for (let c = 0; c < settings.cols; c += 1) {
				const i = r * settings.cols + c
				const isDark = (r + c) % 2 === 0
				rects.push({
					key: String(i),
					x: 18 + c * (settings.size + 2),
					y: 18 + r * (settings.size + 2),
					fill: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
				})
			}
		}
		return rects
	}, [settings.cols, settings.rows, settings.size])

	const animatedSprites = useMemo(() => {
		const next: Array<{ key: string; x: number; y: number; size: number; fill: string }> = []
		const s = spritesRef.current
		for (let i = 0; i < s.length; i += 1) {
			const sp = s[i]
			let x = sp.x + sp.vx
			let y = sp.y + sp.vy
			if (x <= 0 || x >= width - sp.size) sp.vx *= -1
			if (y <= 0 || y >= height - sp.size) sp.vy *= -1
			x = clamp(x, 0, width - sp.size)
			y = clamp(y, 0, height - sp.size)
			sp.x = x
			sp.y = y
			const hue = (tick * 3 + i * 11) % 360
			next.push({
				key: String(i),
				x,
				y,
				size: sp.size,
				fill: `hsla(${hue}, 85%, 60%, 0.85)`,
			})
		}
		return next
	}, [tick])

	const [report, setReport] = useState<any>(null)
	const [rootId, setRootId] = useState<number | null>(null)
	const canvasHostRef = useRef<HTMLDivElement | null>(null)

	const profilingOptions = useMemo(
		() =>
			settings.enableProfiling
				? {
						maxFrames: settings.maxFrames,
						sceneSampleEveryNFrames: settings.sceneSampleEveryNFrames,
					}
				: false,
		[settings.enableProfiling, settings.maxFrames, settings.sceneSampleEveryNFrames],
	)

	useEffect(() => {
		const timer = window.setInterval(() => {
			const host = canvasHostRef.current
			const canvas = host?.querySelector('canvas') ?? null
			const registry = typeof window !== 'undefined' ? window.__REACT_CANVAS_FIBER_DEVTOOLS__ : null
			const roots:
				| undefined
				| Map<number, { id: number; canvas: HTMLCanvasElement; devtools: any }> = registry?.roots
			if (!canvas || !roots) return
			for (const entry of roots.values()) {
				if (entry?.canvas === canvas) {
					const id = entry?.id ?? null
					setRootId(typeof id === 'number' ? id : null)
					const next = entry?.devtools?.getPerformanceReport?.() ?? null
					setReport(next)
					return
				}
			}
		}, 400)
		return () => window.clearInterval(timer)
	}, [])

	const resetSampling = () => {
		const host = canvasHostRef.current
		const canvas = host?.querySelector('canvas') ?? null
		const registry = typeof window !== 'undefined' ? window.__REACT_CANVAS_FIBER_DEVTOOLS__ : null
		const roots: undefined | Map<number, { id: number; canvas: HTMLCanvasElement; devtools: any }> =
			registry?.roots
		if (!canvas || !roots) return
		for (const entry of roots.values()) {
			if (entry?.canvas === canvas) {
				entry?.devtools?.resetPerformance?.()
				return
			}
		}
	}

	const formatNumber = (n: unknown, digits = 1) =>
		typeof n === 'number' && Number.isFinite(n) ? n.toFixed(digits) : '-'

	const topCounts = useMemo(() => {
		const avg = report?.countsAvg
		if (!avg || typeof avg !== 'object') return []
		return Object.entries(avg as Record<string, number>)
			.filter(([, v]) => typeof v === 'number' && Number.isFinite(v) && v !== 0)
			.sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
			.slice(0, 8)
	}, [report])

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
				<label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
					cols
					<input
						type="number"
						value={settings.cols}
						min={10}
						max={90}
						step={1}
						onChange={(e) =>
							setSettings((s) => ({ ...s, cols: clamp(Number(e.target.value), 10, 90) }))
						}
						style={{ width: 72 }}
					/>
				</label>
				<label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
					rows
					<input
						type="number"
						value={settings.rows}
						min={6}
						max={60}
						step={1}
						onChange={(e) =>
							setSettings((s) => ({ ...s, rows: clamp(Number(e.target.value), 6, 60) }))
						}
						style={{ width: 72 }}
					/>
				</label>
				<label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
					sprites
					<input
						type="number"
						value={settings.spriteCount}
						min={0}
						max={800}
						step={10}
						onChange={(e) =>
							setSettings((s) => ({
								...s,
								spriteCount: clamp(Number(e.target.value), 0, 800),
							}))
						}
						style={{ width: 92 }}
					/>
				</label>
				<button
					type="button"
					onClick={() => setSettings((s) => ({ ...s, running: !s.running }))}
					style={{
						padding: '6px 10px',
						borderRadius: 8,
						border: '1px solid rgba(0,0,0,0.15)',
						background: settings.running ? '#111827' : '#ffffff',
						color: settings.running ? '#ffffff' : '#111827',
						cursor: 'pointer',
					}}
				>
					{settings.running ? 'Stop' : 'Start'}
				</button>
				<label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
					profiling
					<input
						type="checkbox"
						checked={settings.enableProfiling}
						onChange={(e) => setSettings((s) => ({ ...s, enableProfiling: e.target.checked }))}
					/>
				</label>
				<label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
					maxFrames
					<input
						type="number"
						value={settings.maxFrames}
						min={30}
						max={2000}
						step={10}
						onChange={(e) =>
							setSettings((s) => ({
								...s,
								maxFrames: clamp(Number(e.target.value), 30, 2000),
							}))
						}
						style={{ width: 92 }}
					/>
				</label>
				<label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
					sceneEvery
					<input
						type="number"
						value={settings.sceneSampleEveryNFrames}
						min={1}
						max={120}
						step={1}
						onChange={(e) =>
							setSettings((s) => ({
								...s,
								sceneSampleEveryNFrames: clamp(Number(e.target.value), 1, 120),
							}))
						}
						style={{ width: 72 }}
					/>
				</label>
				<button
					type="button"
					onClick={resetSampling}
					disabled={!settings.enableProfiling}
					style={{
						padding: '6px 10px',
						borderRadius: 8,
						border: '1px solid rgba(0,0,0,0.15)',
						background: !settings.enableProfiling ? '#f3f4f6' : '#ffffff',
						color: '#111827',
						cursor: !settings.enableProfiling ? 'not-allowed' : 'pointer',
					}}
				>
					Reset sampling
				</button>
				<span style={{ color: 'rgba(17,24,39,0.7)', fontSize: 12 }}>
					rootId: {rootId ?? '-'} · samples: {report?.sampleCount ?? '-'}
				</span>
			</div>

			<div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
				<div ref={canvasHostRef}>
					<Canvas
						width={width}
						height={height}
						dpr={dpr}
						clearColor="#0b1020"
						profiling={profilingOptions}
						style={{ borderRadius: 12, border: '1px solid rgba(0,0,0,0.15)' }}
					>
						<View
							style={{
								width,
								height,
								padding: 18,
								flexDirection: 'column',
								justifyContent: 'space-between',
							}}
						>
							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<View style={{ flexDirection: 'column', gap: 4 }}>
									<Text
										text="Profiling: 性能采样示例"
										style={{ fontSize: 18, fontWeight: 700 }}
										color="#e5e7eb"
									/>
									<Text
										text={`Static ${staticRects.length} · Sprites ${animatedSprites.length}`}
										style={{ fontSize: 12, lineHeight: 16 }}
										color="#93c5fd"
									/>
								</View>
								<View style={{ flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
									<Text
										text={`FPS avg ${formatNumber(report?.fps?.avg, 0)} · p95 ${formatNumber(
											report?.fps?.p95,
											0,
										)}`}
										style={{ fontSize: 12, lineHeight: 16 }}
										color="#c7d2fe"
									/>
									<Text
										text={`Total avg ${formatNumber(
											report?.totalMs?.avg,
										)}ms · p95 ${formatNumber(report?.totalMs?.p95)}ms`}
										style={{ fontSize: 12, lineHeight: 16 }}
										color="#a5b4fc"
									/>
								</View>
							</View>

							<View style={{ position: 'relative', flexGrow: 1 }}>
								{staticRects.map((r) => (
									<Rect
										key={r.key}
										style={{
											position: 'absolute',
											left: r.x,
											top: r.y,
											width: settings.size,
											height: settings.size,
										}}
										fill={r.fill}
										borderRadius={3}
									/>
								))}
								{animatedSprites.map((sp) => (
									<Rect
										key={sp.key}
										style={{
											position: 'absolute',
											left: sp.x,
											top: sp.y,
											width: sp.size,
											height: sp.size,
										}}
										fill={sp.fill}
										borderRadius={sp.size / 2}
									/>
								))}
							</View>

							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<Text
									text={`Layout avg ${formatNumber(
										report?.layoutMs?.avg,
									)}ms · Draw avg ${formatNumber(
										report?.drawMs?.avg,
									)}ms · Overlay avg ${formatNumber(report?.overlayMs?.avg)}ms`}
									style={{ fontSize: 11, lineHeight: 14 }}
									color="#9ca3af"
								/>
								<Text
									text={`window ${formatNumber(report?.timeWindowMs, 0)}ms`}
									style={{ fontSize: 11, lineHeight: 14 }}
									color="#9ca3af"
								/>
							</View>
						</View>
					</Canvas>
				</div>

				<div
					style={{
						width: 340,
						borderRadius: 12,
						border: '1px solid rgba(0,0,0,0.15)',
						padding: 12,
						fontFamily:
							'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
						fontSize: 12,
					}}
				>
					<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
						<div style={{ fontWeight: 700 }}>Sampling Report</div>
						<div style={{ color: 'rgba(17,24,39,0.6)' }}>{report ? 'live' : '—'}</div>
					</div>

					<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
						<div>
							<div style={{ color: 'rgba(17,24,39,0.65)' }}>fps</div>
							<div>
								avg {formatNumber(report?.fps?.avg, 0)} · p95 {formatNumber(report?.fps?.p95, 0)}
							</div>
						</div>
						<div>
							<div style={{ color: 'rgba(17,24,39,0.65)' }}>total(ms)</div>
							<div>
								avg {formatNumber(report?.totalMs?.avg)} · p95 {formatNumber(report?.totalMs?.p95)}
							</div>
						</div>
						<div>
							<div style={{ color: 'rgba(17,24,39,0.65)' }}>layout(ms)</div>
							<div>
								avg {formatNumber(report?.layoutMs?.avg)} · p95{' '}
								{formatNumber(report?.layoutMs?.p95)}
							</div>
						</div>
						<div>
							<div style={{ color: 'rgba(17,24,39,0.65)' }}>draw(ms)</div>
							<div>
								avg {formatNumber(report?.drawMs?.avg)} · p95 {formatNumber(report?.drawMs?.p95)}
							</div>
						</div>
						<div>
							<div style={{ color: 'rgba(17,24,39,0.65)' }}>overlay(ms)</div>
							<div>
								avg {formatNumber(report?.overlayMs?.avg)} · p95{' '}
								{formatNumber(report?.overlayMs?.p95)}
							</div>
						</div>
						<div>
							<div style={{ color: 'rgba(17,24,39,0.65)' }}>scene</div>
							<div>
								nodes {formatNumber(report?.latestScene?.nodesTotal, 0)} · images{' '}
								{formatNumber(report?.latestScene?.imagesTotal, 0)}
							</div>
						</div>
					</div>

					<div style={{ marginTop: 10 }}>
						<div style={{ fontWeight: 700, marginBottom: 4 }}>Top countsAvg</div>
						{topCounts.length ? (
							<div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
								{topCounts.map(([k, v]) => (
									<div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
										<span style={{ color: 'rgba(17,24,39,0.8)' }}>{k}</span>
										<span style={{ color: 'rgba(17,24,39,0.55)' }}>{formatNumber(v, 2)}</span>
									</div>
								))}
							</div>
						) : (
							<div style={{ color: 'rgba(17,24,39,0.55)' }}>—</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
