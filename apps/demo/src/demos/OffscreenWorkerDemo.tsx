import { Canvas, Rect, Text, View, Image } from '@jiujue/react-canvas-fiber'
import { useEffect, useMemo, useState } from 'react'

function canUseOffscreenWorker() {
	if (typeof window === 'undefined') return false
	if (typeof Worker === 'undefined') return false
	return typeof (HTMLCanvasElement.prototype as any).transferControlToOffscreen === 'function'
}

function clampInt(n: number, min: number, max: number) {
	const v = Math.trunc(n)
	if (v < min) return min
	if (v > max) return max
	return v
}

type WorkerState = {
	requested: boolean
	active: boolean
	error: string | null
	lastFrame: {
		frameIndex: number
		drawMs: number
		overlayMs: number
		totalMs: number
		fps: number
		memory?: { usedJSHeapSize?: number; totalJSHeapSize?: number; jsHeapSizeLimit?: number } | null
		resources?: { bitmaps: number; bitmapBytes: number } | null
	} | null
	logs: Array<{ level: 'debug' | 'info' | 'warn' | 'error'; message: string; ts: number }>
}

export default function OffscreenWorkerDemo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const supported = canUseOffscreenWorker()

	const [useWorker, setUseWorker] = useState(true)
	const [running, setRunning] = useState(true)
	const [showBounds, setShowBounds] = useState(false)
	const [tick, setTick] = useState(0)
	const [workerState, setWorkerState] = useState<WorkerState | null>(null)
	const [rowCount, setRowCount] = useState(100)
	const [rowCountInput, setRowCountInput] = useState('100')

	useEffect(() => {
		if (!running) return
		let raf = 0
		const loop = () => {
			setTick((v) => (v + 1) % 1000000)
			raf = requestAnimationFrame(loop)
		}
		raf = requestAnimationFrame(loop)
		return () => cancelAnimationFrame(raf)
	}, [running])

	const rows = useMemo(() => {
		const count = rowCount
		const out = new Array(count)
		for (let i = 0; i < count; i += 1) out[i] = i
		return out
	}, [rowCount])

	useEffect(() => {
		if (typeof window === 'undefined') return
		const w = window as any
		const api = w.__REACT_CANVAS_FIBER_DEVTOOLS__
		if (!api || !api.roots || typeof api.getRootDevtools !== 'function') return

		const read = () => {
			try {
				const roots: Map<number, any> = api.roots
				const ids = Array.from(roots.keys())
				const rootId = ids.length ? ids[ids.length - 1] : null
				if (!rootId) {
					setWorkerState(null)
					return
				}
				const devtools = api.getRootDevtools(rootId)
				const next = devtools?.getWorkerState?.() ?? null
				setWorkerState(next)
			} catch (err) {
				void err
			}
		}

		read()
		const t = window.setInterval(read, 200)
		return () => window.clearInterval(t)
	}, [useWorker])

	const workerProp = useWorker
		? ({ debug: { logEnabled: false, visualize: { nodeBounds: showBounds } } } as const)
		: false

	const applyRowCount = () => {
		const parsed = Number.parseInt(rowCountInput, 10)
		if (!Number.isFinite(parsed)) {
			setRowCountInput(String(rowCount))
			return
		}
		const next = clampInt(parsed, 0, 50000)
		setRowCount(next)
		setRowCountInput(String(next))
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 10,
					alignItems: 'center',
					padding: 10,
					borderRadius: 12,
					border: '1px solid rgba(0,0,0,0.12)',
					background: '#ffffff',
				}}
			>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13 }}>
					<input
						type="checkbox"
						checked={useWorker}
						disabled={!supported}
						onChange={(e) => setUseWorker(e.target.checked)}
					/>
					使用 Worker 绘制（OffscreenCanvas）
				</label>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13 }}>
					<input
						type="checkbox"
						checked={showBounds}
						onChange={(e) => setShowBounds(e.target.checked)}
					/>
					可视化节点边界
				</label>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13 }}>
					<input type="checkbox" checked={running} onChange={(e) => setRunning(e.target.checked)} />
					动画刷新
				</label>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13 }}>
					节点行数
					<input
						value={rowCountInput}
						inputMode="numeric"
						style={{
							width: 120,
							padding: '4px 8px',
							borderRadius: 8,
							border: '1px solid rgba(0,0,0,0.2)',
						}}
						onChange={(e) => setRowCountInput(e.target.value)}
						onBlur={applyRowCount}
						onKeyDown={(e) => {
							if (e.key === 'Enter') applyRowCount()
						}}
					/>
				</label>
				<div style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(17,24,39,0.7)' }}>
					{supported ? '环境支持 OffscreenCanvas Worker' : '环境不支持，自动回退主线程绘制'}
					{supported ? '（切换会重建 canvas）' : ''}
				</div>
			</div>

			{workerState ? (
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						gap: 10,
						alignItems: 'center',
						padding: 10,
						borderRadius: 12,
						border: '1px solid rgba(0,0,0,0.12)',
						background: '#ffffff',
						fontSize: 12,
						color: 'rgba(17,24,39,0.75)',
					}}
				>
					<div>
						<div>requested: {String(workerState.requested)}</div>
						<div>active: {String(workerState.active)}</div>
					</div>
					<div>
						<div>frame: {workerState.lastFrame?.frameIndex ?? '-'}</div>
						<div>
							fps: {workerState.lastFrame?.fps ? workerState.lastFrame.fps.toFixed(1) : '-'}
						</div>
					</div>
					<div>
						<div>drawMs: {workerState.lastFrame?.drawMs?.toFixed?.(2) ?? '-'}</div>
						<div>totalMs: {workerState.lastFrame?.totalMs?.toFixed?.(2) ?? '-'}</div>
					</div>
					<div style={{ flexGrow: 1 }}>
						<div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
							error: {workerState.error ?? '-'}
						</div>
						<div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
							logs:{' '}
							{workerState.logs.length
								? workerState.logs[workerState.logs.length - 1].message
								: '-'}
						</div>
					</div>
				</div>
			) : null}

			<Canvas
				key={useWorker ? 'worker' : 'main'}
				width={960}
				height={560}
				dpr={dpr}
				clearColor="#0b1020"
				worker={workerProp}
				style={{ borderRadius: 14, border: '1px solid rgba(0,0,0,0.15)' }}
			>
				<View
					style={{
						width: 960,
						height: 560,
						padding: 14,
						flexDirection: 'column',
						gap: 10,
					}}
				>
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
					>
						<Text
							text={`Offscreen Worker Demo (tick: ${tick})`}
							style={{ fontSize: 18, fontWeight: 800 }}
							color="#e5e7eb"
						/>
						<View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
							<Image
								src="https://avatars.githubusercontent.com/u/1?v=4"
								style={{ width: 36, height: 36 }}
								objectFit="cover"
								borderRadius={10}
							/>
							<Text
								text={useWorker ? 'worker=on' : 'worker=off'}
								style={{ fontSize: 12 }}
								color="#93c5fd"
							/>
						</View>
					</View>

					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
					>
						<View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
							<Text
								text={`rows: ${rowCount}  (approx nodes: ${rowCount * 3 + 5})`}
								style={{ fontSize: 12 }}
								color="rgba(229,231,235,0.85)"
							/>
							<View
								style={{
									paddingTop: 2,
									paddingBottom: 2,
									paddingLeft: 8,
									paddingRight: 8,
								}}
								background="rgba(59,130,246,0.6)"
								borderRadius={6}
								onClick={() => {
									const next = clampInt(rowCount + 10, 0, 50000)
									setRowCount(next)
									setRowCountInput(String(next))
								}}
							>
								<Text text="+10 Rows" style={{ fontSize: 11 }} color="#ffffff" />
							</View>
							<View
								style={{
									paddingTop: 2,
									paddingBottom: 2,
									paddingLeft: 8,
									paddingRight: 8,
								}}
								background="rgba(239,68,68,0.6)"
								borderRadius={6}
								onClick={() => {
									const next = clampInt(rowCount - 10, 0, 50000)
									setRowCount(next)
									setRowCountInput(String(next))
								}}
							>
								<Text text="-10 Rows" style={{ fontSize: 11 }} color="#ffffff" />
							</View>
						</View>
						<Text
							text="用鼠标滚轮在下方区域滚动"
							style={{ fontSize: 12 }}
							color="rgba(229,231,235,0.65)"
						/>
					</View>

					<View
						scrollY
						scrollbarY
						style={{
							flexGrow: 1,
							flexShrink: 1,
							minHeight: 0,

							width: 932,
							padding: 10,
							flexDirection: 'column',
							gap: 6,
						}}
						background="rgba(255,255,255,0.06)"
						border="1px solid rgba(255,255,255,0.12)"
						borderRadius={12}
					>
						{rows.map((i) => {
							const phase = (tick + i * 3) % 360
							const r = 40 + Math.floor((Math.sin((phase / 180) * Math.PI) + 1) * 80)
							const g = 80 + Math.floor((Math.sin(((phase + 120) / 180) * Math.PI) + 1) * 80)
							const b = 120 + Math.floor((Math.sin(((phase + 240) / 180) * Math.PI) + 1) * 80)
							const fill = `rgb(${r},${g},${b})`
							return (
								<View
									key={i}
									style={{
										width: 932,
										height: 22,
										flexDirection: 'row',
										alignItems: 'center',
										gap: 8,
									}}
									background="rgba(255,255,255,0.03)"
									borderRadius={8}
								>
									<Rect style={{ width: 14, height: 14 }} borderRadius={4} fill={fill} />
									<Text text={`Row #${i}`} style={{ fontSize: 12 }} color="#e5e7eb" />
									<Rect style={{ width: 80, height: 10 }} borderRadius={6} fill={fill} />
								</View>
							)
						})}
					</View>
				</View>
			</Canvas>
		</div>
	)
}
