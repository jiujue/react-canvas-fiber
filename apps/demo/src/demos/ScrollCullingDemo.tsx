import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useRef } from 'react'

export default function ScrollCullingDemo() {
	const scrollTopElRef = useRef<HTMLSpanElement | null>(null)
	const visibleRangeElRef = useRef<HTMLSpanElement | null>(null)

	const viewportH = 420
	const itemH = 26
	const items = useMemo(() => Array.from({ length: 1200 }, (_, i) => i + 1), [])

	const onScroll = (nextScrollTop: number) => {
		if (scrollTopElRef.current) scrollTopElRef.current.textContent = String(Math.round(nextScrollTop))
		if (visibleRangeElRef.current) {
			const approxVisible = Math.ceil(viewportH / itemH) + 2
			const approxFirst = Math.max(0, Math.floor(nextScrollTop / itemH) - 1)
			const approxLast = Math.min(items.length - 1, approxFirst + approxVisible - 1)
			visibleRangeElRef.current.textContent = `${approxFirst + 1}-${approxLast + 1} / ${items.length}`
		}
	}

	return (
		<div>
			<h2 style={{ margin: '0 0 12px' }}>Scroll Culling Demo</h2>
			<div style={{ margin: '0 0 12px', fontSize: 12, color: 'rgba(17,24,39,0.7)' }}>
				<span>
					scrollTop: <span ref={scrollTopElRef}>0</span>
				</span>
				<span style={{ marginLeft: 12 }}>
					approx visible: <span ref={visibleRangeElRef}>1-1 / {items.length}</span>
				</span>
			</div>
			<Canvas
				width={900}
				height={520}
				dpr={window.devicePixelRatio || 1}
				clearColor="skyblue"
				style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)' }}
			>
				<View
					style={{
						width: 900,
						height: 520,
						padding: 18,
						flexDirection: 'column',
						gap: 12,
					}}
				>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
						<Text
							text="Scroll View Subtree Culling"
							style={{ fontSize: 24, fontWeight: 700 }}
							color="#e6edf7"
						/>
						<Text text="提示：用滚轮或拖拽滚动条" style={{ fontSize: 12 }} color="#a5b4fc" />
					</View>

					<View style={{ flexGrow: 1, flexDirection: 'row', gap: 12, alignItems: 'stretch' }}>
						<View
							scrollY
							onScroll={onScroll}
							style={{
								flexGrow: 1,
								height: viewportH,
								padding: 10,
								flexDirection: 'column',
								gap: 8,
							}}
							background="#0b1430"
							borderRadius={12}
						>
							<View style={{ flexDirection: 'column', gap: 6 }}>
								{items.map((n) => (
									<View
										key={n}
										style={{
											height: itemH,
											paddingHorizontal: 10,
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
										background={n % 2 === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)'}
										borderRadius={8}
									>
										<Text text={`Row ${n}`} style={{ fontSize: 12 }} color="#e6edf7" />
										<View style={{ flexDirection: 'row', gap: 4 }}>
											{Array.from({ length: 8 }).map((_, i) => (
												<Rect
													key={i}
													style={{ width: 6, height: 6 }}
													borderRadius={3}
													fill="rgba(147,197,253,0.9)"
												/>
											))}
										</View>
									</View>
								))}
							</View>
						</View>

						<View
							style={{
								width: 260,
								height: viewportH,
								padding: 12,
								flexDirection: 'column',
								gap: 10,
							}}
							background="#111a38"
							borderRadius={12}
						>
							<Text text="说明" style={{ fontSize: 16, fontWeight: 700 }} color="#c7d2fe" />
							<Text
								text="这个列表会渲染很多行，每行还有子节点。滚动时 draw 会跳过视口外的子树递归。"
								style={{ fontSize: 12, lineHeight: 16 }}
								color="#a5b4fc"
							/>
							<Text
								text="对比：若不做裁剪，滚动视口外节点仍会进入 drawNode（只是被 clip 掉）。"
								style={{ fontSize: 12, lineHeight: 16 }}
								color="#a5b4fc"
							/>
							<Text
								text={`viewportH=${viewportH}, rowH=${itemH}, rows=${items.length}`}
								style={{ fontSize: 12, lineHeight: 16 }}
								color="#93c5fd"
							/>
						</View>
					</View>
				</View>
			</Canvas>
		</div>
	)
}
