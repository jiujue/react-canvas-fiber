/**
 * Demo：展示 Canvas JSX Renderer + Yoga 的最小用法。
 *
 * - Canvas 是 DOM 组件：内部创建自定义 reconciler root，并把 JSX 子树绘制到 2D canvas
 * - View/Rect/Text 是自定义 renderer 的 Host 节点：style 会交给 Yoga 做布局
 */
import { Canvas, Rect, Text, View } from 'react-canvas-fiber'
import { useState } from 'react'
import Perf from './Perf'
import TreeSelectDemo from './TreeSelectDemo'

function ScrollDemo() {
	const [scrollTop, setScrollTop] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)
	const [scrollXYTop, setScrollXYTop] = useState(0)
	const [scrollXYLeft, setScrollXYLeft] = useState(0)

	const items = Array.from({ length: 24 }, (_, i) => i + 1)
	const columns = Array.from({ length: 18 }, (_, i) => i + 1)
	return (
		<div>
			<h2 style={{ margin: '0 0 12px' }}>Canvas JSX Renderer + Yoga</h2>
			<Canvas
				width={900}
				height={520}
				dpr={window.devicePixelRatio || 1}
				clearColor="skyblue"
				fontFamily="Comic Sans MS"
				style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)' }}
			>
				<View
					style={{
						width: 900,
						height: 520,
						padding: 18,
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<View
						style={{
							position: 'relative',
							flexDirection: 'row',
							gap: 12,
						}}
					>
						<View
							scrollX
							scrollY
							scrollbarX
							scrollbarY
							scrollbarWidth={10}
							scrollbarInset={6}
							scrollbarTrackColor="rgba(255,255,255,0.14)"
							scrollbarThumbColor="rgba(255,255,255,0.45)"
							style={{
								padding: 10,
								flexDirection: 'column',
								gap: 8,
								width: 400,
							}}
							background="#0b1430"
							borderRadius={10}
						>
							<Text text="Yoga Layout" style={{ fontSize: 18, width: 800 }} color="#c7d2fe" />
							<Text text="Yoga Layout" style={{ fontSize: 18 }} color="#c7d2fe" />
							<Text text="Yoga Layout" style={{ fontSize: 18 }} color="#c7d2fe" />
							<Text text="Yoga Layout" style={{ fontSize: 18 }} color="#c7d2fe" />
							<Text
								text="全局字体来自 Canvas（Comic Sans）；这里单独覆盖成 system-ui"
								style={{ fontSize: 12, lineHeight: 16, fontFamily: 'system-ui' }}
								color="#a5b4fc"
							/>
							<Text
								text="Rect / Text / View 都是 JSX 节点"
								style={{ fontSize: 14 }}
								color="#93c5fd"
							/>
							<Text
								text={`scrollTop: ${Math.round(scrollTop)}`}
								style={{ fontSize: 12, lineHeight: 16 }}
								color="#a5b4fc"
							/>
							<Text
								text={`scrollLeft: ${Math.round(scrollLeft)}`}
								style={{ fontSize: 12, lineHeight: 16 }}
								color="#a5b4fc"
							/>
							<View
								scrollY
								scrollbarY
								scrollbarWidth={10}
								scrollbarInset={6}
								scrollbarTrackColor="rgba(255,255,255,0.14)"
								scrollbarThumbColor="rgba(255,255,255,0.45)"
								onScroll={(v: number) => setScrollTop(v)}
								style={{
									width: 236,
									height: 140,
									padding: 10,
									flexDirection: 'column',
									gap: 8,
								}}
								background="#0b1430"
								borderRadius={10}
							>
								{items.map((n) => (
									<View
										key={n}
										style={{ height: 28, paddingHorizontal: 10, justifyContent: 'center' }}
										background="rgba(255,255,255,0.08)"
										borderRadius={8}
									>
										<Text
											text={`Item ${n}`}
											style={{ fontSize: 13, lineHeight: 18 }}
											color="#e6edf7"
										/>
									</View>
								))}
							</View>
							<View
								scrollX
								scrollbarX
								scrollbarWidth={10}
								scrollbarInset={6}
								scrollbarTrackColor="rgba(255,255,255,0.14)"
								scrollbarThumbColor="rgba(255,255,255,0.45)"
								onScrollX={(v: number) => setScrollLeft(v)}
								style={{
									width: 236,
									height: 64,
									padding: 10,
									flexDirection: 'row',
									alignItems: 'center',
									gap: 8,
									flexWrap: 'no-wrap',
								}}
								background="#0b1430"
								borderRadius={10}
							>
								{columns.map((n) => (
									<View
										key={n}
										style={{
											width: 72,
											height: 32,
											justifyContent: 'center',
											alignItems: 'center',
										}}
										background="rgba(255,255,255,0.08)"
										borderRadius={8}
									>
										<Text
											text={`Col ${n}`}
											style={{ fontSize: 12, lineHeight: 16 }}
											color="#e6edf7"
										/>
									</View>
								))}
							</View>
							<View
								scrollX
								scrollY
								scrollbarX
								scrollbarY
								scrollbarWidth={10}
								scrollbarInset={6}
								scrollbarTrackColor="rgba(255,255,255,0.14)"
								scrollbarThumbColor="rgba(255,255,255,0.45)"
								onScroll={(v: number) => setScrollXYTop(v)}
								onScrollX={(v: number) => setScrollXYLeft(v)}
								style={{
									width: 236,
									height: 120,
									padding: 10,
									flexDirection: 'column',
									gap: 8,
								}}
								background="#0b1430"
								borderRadius={10}
							>
								<View
									style={{
										width: 520,
										height: 320,
										padding: 10,
										flexDirection: 'column',
										gap: 10,
										fontFamily: 'system-ui',
									}}
									background="rgba(255,255,255,0.06)"
									borderRadius={10}
								>
									<Text
										text={`XY scroll: x=${Math.round(scrollXYLeft)}, y=${Math.round(scrollXYTop)}`}
										style={{ fontSize: 12, lineHeight: 16 }}
										color="#e6edf7"
									/>
									<View style={{ flexDirection: 'row', gap: 10 }}>
										<Rect style={{ width: 120, height: 60 }} borderRadius={10} fill="#22c55e" />
										<Rect style={{ width: 160, height: 60 }} borderRadius={10} fill="#60a5fa" />
										<Rect style={{ width: 180, height: 60 }} borderRadius={10} fill="#f97316" />
									</View>
									<View style={{ flexDirection: 'row', gap: 10 }}>
										<Rect style={{ width: 200, height: 60 }} borderRadius={10} fill="#a78bfa" />
										<Rect style={{ width: 240, height: 60 }} borderRadius={10} fill="#ef4444" />
									</View>
									<View style={{ flexDirection: 'row', gap: 10 }}>
										<Rect style={{ width: 140, height: 60 }} borderRadius={10} fill="#14b8a6" />
										<Rect style={{ width: 260, height: 60 }} borderRadius={10} fill="#facc15" />
									</View>
								</View>
							</View>
							<Text
								text="试试：拖拽红色块；拖拽滚动条滚动内容"
								style={{ fontSize: 12, lineHeight: 16 }}
								color="#a5b4fc"
							/>
						</View>
					</View>
				</View>
			</Canvas>
		</div>
	)
}

export default function App() {
	const [mode, setMode] = useState<'demo' | 'perf' | 'tree'>('demo')

	return (
		<div style={{ padding: 16, fontFamily: 'system-ui' }}>
			<div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
				<button
					type="button"
					onClick={() => setMode('demo')}
					style={{
						padding: '6px 10px',
						borderRadius: 8,
						border: '1px solid rgba(0,0,0,0.15)',
						background: mode === 'demo' ? '#111827' : '#ffffff',
						color: mode === 'demo' ? '#ffffff' : '#111827',
						cursor: 'pointer',
					}}
				>
					Demo
				</button>
				<button
					type="button"
					onClick={() => setMode('perf')}
					style={{
						padding: '6px 10px',
						borderRadius: 8,
						border: '1px solid rgba(0,0,0,0.15)',
						background: mode === 'perf' ? '#111827' : '#ffffff',
						color: mode === 'perf' ? '#ffffff' : '#111827',
						cursor: 'pointer',
					}}
				>
					Perf
				</button>
				<button
					type="button"
					onClick={() => setMode('tree')}
					style={{
						padding: '6px 10px',
						borderRadius: 8,
						border: '1px solid rgba(0,0,0,0.15)',
						background: mode === 'tree' ? '#111827' : '#ffffff',
						color: mode === 'tree' ? '#ffffff' : '#111827',
						cursor: 'pointer',
					}}
				>
					Tree Select
				</button>
				<span style={{ color: 'rgba(17,24,39,0.7)', fontSize: 12 }}>
					{mode === 'demo'
						? '事件/滚动条示例'
						: mode === 'perf'
							? '大量节点 + 动画压力测试'
							: 'HTML Input + Canvas Tree 下拉选择'}
				</span>
			</div>

			{mode === 'demo' ? <ScrollDemo /> : mode === 'perf' ? <Perf /> : <TreeSelectDemo />}
		</div>
	)
}
