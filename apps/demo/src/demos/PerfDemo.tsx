/**
 * PerfDemo: 压力测试与性能监控组件
 *
 * 功能概述：
 * 1. 大量静态节点渲染：通过网格系统生成数千个静态矩形（staticRects），模拟复杂的 UI 背景。
 * 2. 动态节点动画：生成数百个“精灵”节点（animatedSprites），在画布上随机移动、碰撞反弹。
 * 3. 实时性能监控：内置 FPS 计数器，显示帧率和平均帧耗时。
 * 4. 可调节参数：支持实时调整列数、行数、精灵数量，用于寻找性能瓶颈。
 *
 * 性能瓶颈分析点：
 * - Layout: 节点数量增多时，Yoga 布局计算耗时增加。
 * - Draw: Canvas 2D API 绘制指令增多带来的 GPU/CPU 开销。
 * - Reconciler: 每一帧都通过 React 状态更新触发重绘，测试 React Diff 开销。
 */
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useEffect, useMemo, useRef, useState } from 'react'

type Sprite = { x: number; y: number; vx: number; vy: number; size: number }

function clamp(v: number, min: number, max: number) {
	return Math.max(min, Math.min(max, v))
}

export default function Perf() {
	const [gridCols, setGridCols] = useState(80)
	const [gridRows, setGridRows] = useState(45)
	const [cellSize, setCellSize] = useState(10)
	const [spriteCount, setSpriteCount] = useState(180)
	const [running, setRunning] = useState(true)

	const presets = [
		{ label: 'Low', cols: 20, rows: 15, sprites: 50 },
		{ label: 'Medium', cols: 60, rows: 40, sprites: 200 },
		{ label: 'High', cols: 120, rows: 80, sprites: 500 },
		{ label: 'Stress', cols: 200, rows: 120, sprites: 800 },
	]

	const applyPreset = (p: (typeof presets)[0]) => {
		setGridCols(p.cols)
		setGridRows(p.rows)
		setSpriteCount(p.sprites)
	}

	const [fps, setFps] = useState(0)
	const [frameMs, setFrameMs] = useState(0)

	const [tick, setTick] = useState(0)
	const rafRef = useRef<number | null>(null)
	const samplesRef = useRef<number[]>([])

	const settings = useMemo(() => {
		const cols = clamp(Number.isFinite(gridCols) ? gridCols : 80, 10, 220)
		const rows = clamp(Number.isFinite(gridRows) ? gridRows : 45, 10, 140)
		const size = clamp(Number.isFinite(cellSize) ? cellSize : 10, 6, 18)
		return { cols, rows, size }
	}, [gridCols, gridRows, cellSize])

	const sprites = useMemo(() => {
		const next: Sprite[] = []
		const w = 900
		const h = 520
		for (let i = 0; i < spriteCount; i += 1) {
			const size = 8 + (i % 6)
			next.push({
				x: (i * 13) % (w - size),
				y: (i * 29) % (h - size),
				vx: ((i % 7) - 3) * 0.9,
				vy: (((i + 3) % 7) - 3) * 0.9,
				size,
			})
		}
		return next
	}, [spriteCount])

	const spritesRef = useRef<Sprite[]>(sprites)
	useEffect(() => {
		spritesRef.current = sprites
	}, [sprites])

	useEffect(() => {
		if (!running) {
			if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
			rafRef.current = null
			return
		}

		let last = performance.now()

		const loop = () => {
			const now = performance.now()
			const dt = now - last
			last = now

			const samples = samplesRef.current
			samples.push(dt)
			if (samples.length > 60) samples.shift()

			const avg = samples.reduce((a, b) => a + b, 0) / samples.length
			setFrameMs(avg)
			setFps(avg > 0 ? Math.round(1000 / avg) : 0)

			setTick((v) => v + 1)
			rafRef.current = requestAnimationFrame(loop)
		}

		rafRef.current = requestAnimationFrame(loop)
		return () => {
			if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
			rafRef.current = null
		}
	}, [running])

	const staticRects = useMemo(() => {
		const rects: { key: string; x: number; y: number; fill: string }[] = []
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
	}, [settings])

	const animatedSprites = useMemo(() => {
		const w = 900
		const h = 520
		const next: { key: string; x: number; y: number; size: number; fill: string }[] = []
		const s = spritesRef.current
		for (let i = 0; i < s.length; i += 1) {
			const sp = s[i]
			let x = sp.x + sp.vx
			let y = sp.y + sp.vy
			if (x <= 0 || x >= w - sp.size) sp.vx *= -1
			if (y <= 0 || y >= h - sp.size) sp.vy *= -1
			x = clamp(x, 0, w - sp.size)
			y = clamp(y, 0, h - sp.size)
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

	return (
		<div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: 8,
					marginBottom: 12,
					padding: 12,
					background: '#f8fafc',
					borderRadius: 8,
					border: '1px solid #e2e8f0',
				}}
			>
				<h3 style={{ margin: 0, fontSize: 16 }}>压力测试说明</h3>
				<ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#475569' }}>
					<li>
						<b>静态网格 (Grid):</b> 生成 {settings.cols}x{settings.rows} ={' '}
						{settings.cols * settings.rows} 个静态矩形，模拟复杂 UI 背景
					</li>
					<li>
						<b>动态精灵 (Sprites):</b> {spriteCount} 个随机运动的节点，每一帧都在更新位置和颜色
					</li>
					<li>
						<b>测试目标:</b> 观察在大量节点 + 高频更新下的 FPS (Layout + Paint + React Diff
						综合性能)
					</li>
				</ul>
			</div>

			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 10,
					alignItems: 'center',
					marginBottom: 12,
				}}
			>
				<div style={{ display: 'flex', gap: 4, marginRight: 8 }}>
					{presets.map((p) => (
						<button
							key={p.label}
							type="button"
							onClick={() => applyPreset(p)}
							style={{
								padding: '4px 8px',
								borderRadius: 6,
								border: '1px solid #cbd5e1',
								background: '#f1f5f9',
								fontSize: 12,
								cursor: 'pointer',
							}}
						>
							{p.label}
						</button>
					))}
				</div>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12 }}>
					Cols
					<input
						type="number"
						value={gridCols}
						min={10}
						max={220}
						onChange={(e) => {
							const v = Number(e.target.value)
							if (!Number.isFinite(v)) return
							setGridCols(v)
						}}
						style={{ width: 70 }}
					/>
				</label>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12 }}>
					Rows
					<input
						type="number"
						value={gridRows}
						min={10}
						max={140}
						onChange={(e) => {
							const v = Number(e.target.value)
							if (!Number.isFinite(v)) return
							setGridRows(v)
						}}
						style={{ width: 70 }}
					/>
				</label>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12 }}>
					Cell
					<input
						type="number"
						value={cellSize}
						min={6}
						max={18}
						onChange={(e) => {
							const v = Number(e.target.value)
							if (!Number.isFinite(v)) return
							setCellSize(v)
						}}
						style={{ width: 70 }}
					/>
				</label>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12 }}>
					Sprites
					<input
						type="number"
						value={spriteCount}
						min={0}
						max={800}
						onChange={(e) => {
							const v = Number(e.target.value)
							if (!Number.isFinite(v)) return
							setSpriteCount(v)
						}}
						style={{ width: 80 }}
					/>
				</label>
				<button
					type="button"
					onClick={() => setRunning((v) => !v)}
					style={{
						padding: '6px 10px',
						borderRadius: 8,
						border: '1px solid rgba(0,0,0,0.15)',
						background: running ? '#ef4444' : '#22c55e',
						color: '#ffffff',
						cursor: 'pointer',
					}}
				>
					{running ? 'Stop' : 'Start'}
				</button>
				<span style={{ fontSize: 12, color: 'rgba(17,24,39,0.75)' }}>
					FPS {fps} · avg {frameMs.toFixed(1)}ms · nodes ~
					{staticRects.length + animatedSprites.length + 8}
				</span>
			</div>

			<Canvas
				width={900}
				height={520}
				dpr={window.devicePixelRatio || 1}
				clearColor="#0b1020"
				style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)' }}
			>
				<View style={{ width: 900, height: 520, padding: 0 }}>
					<View style={{ width: 900, height: 520 }} background="#0b1020">
						<View style={{ width: 900, height: 520, position: 'relative' }}>
							{staticRects.map((r) => (
								<Rect
									key={`bg_${r.key}`}
									style={{
										position: 'absolute',
										left: r.x,
										top: r.y,
										width: settings.size,
										height: settings.size,
									}}
									borderRadius={2}
									fill={r.fill}
								/>
							))}
							{animatedSprites.map((sp) => (
								<Rect
									key={`sp_${sp.key}`}
									style={{
										position: 'absolute',
										left: sp.x,
										top: sp.y,
										width: sp.size,
										height: sp.size,
									}}
									borderRadius={4}
									fill={sp.fill}
								/>
							))}
							<View
								style={{
									position: 'absolute',
									left: 14,
									top: 14,
									padding: 10,
									width: 320,
									flexDirection: 'column',
									gap: 6,
									fontFamily: 'system-ui',
								}}
								background="rgba(17,24,39,0.55)"
								borderRadius={10}
							>
								<Text
									text="Perf: 大量静态节点 + 少量动态节点"
									style={{ fontSize: 14, fontWeight: 700, lineHeight: 18 }}
									color="#e5e7eb"
								/>
								<Text
									text={`FPS ${fps} · avg ${frameMs.toFixed(1)}ms`}
									style={{ fontSize: 12, lineHeight: 16 }}
									color="#c7d2fe"
								/>
								<Text
									text={`Static ${staticRects.length} · Sprites ${animatedSprites.length}`}
									style={{ fontSize: 12, lineHeight: 16 }}
									color="#93c5fd"
								/>
								<Text
									text="把 Cols/Rows 调大可以快速压测 layout+draw"
									style={{ fontSize: 12, lineHeight: 16 }}
									color="#a5b4fc"
								/>
							</View>
						</View>
					</View>
				</View>
			</Canvas>
		</div>
	)
}
