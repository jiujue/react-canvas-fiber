import { Canvas, Rect, Text, View, Image } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function FeatureDemo() {
	const [active, setActive] = useState(false)
	const [dragX, setDragX] = useState(24)
	const [dragY, setDragY] = useState(60)
	const [dragging, setDragging] = useState(false)
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
	const [hoveredBtn, setHoveredBtn] = useState<number | null>(null)

	const getAbs = (node: any) => {
		let x = 0
		let y = 0
		let current = node
		while (current) {
			x += current.layout?.x ?? 0
			y += current.layout?.y ?? 0
			current = current.parent
		}
		return { x, y }
	}

	return (
		<div>
			<h2 style={{ margin: '0 0 12px' }}>Canvas JSX Renderer + Yoga</h2>
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
						justifyContent: 'space-between',
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Text
							text="Hello Canvas Renderer"
							style={{ fontSize: 28, fontWeight: 700 }}
							color="#e6edf7"
						/>
						<Rect
							style={{ width: 180, height: 44 }}
							borderRadius={10}
							fill={active ? '#22c55e' : '#2b6cff'}
							onClick={() => setActive((v) => !v)}
						/>
					</View>

					<View
						style={{
							position: 'relative',
							flexGrow: 1,
							flexDirection: 'row',
							gap: 12,
							alignItems: 'stretch',
						}}
					>
						<Rect style={{ flexGrow: 1 }} borderRadius={12} fill="#1a2348" />
						<Rect
							style={{
								position: 'absolute',
								left: dragX,
								top: dragY,
								width: 140,
								height: 44,
							}}
							borderRadius={12}
							fill={dragging ? '#f59e0b' : '#ef4444'}
							onPointerDown={(e: any) => {
								setDragging(true)
								const rectAbs = getAbs(e.currentTarget)
								setDragOffset({ x: e.x - rectAbs.x, y: e.y - rectAbs.y })
							}}
							onPointerMove={(e: any) => {
								if (!dragging) return
								const parentAbs = getAbs(e.currentTarget.parent)
								setDragX(e.x - dragOffset.x - parentAbs.x)
								setDragY(e.y - dragOffset.y - parentAbs.y)
							}}
							onPointerUp={() => setDragging(false)}
							onPointerCancel={() => setDragging(false)}
						/>
						<View
							style={{
								width: 260,
								padding: 12,
								flexDirection: 'row',
								justifyContent: 'space-between',
								gap: 12,
								flexWrap: 'wrap',
							}}
							background="#111a38"
							borderRadius={12}
						>
							<Text text="Yoga Layout" style={{ fontSize: 18 }} color="#c7d2fe" />

							{/* New Image Feature Demo */}
							<View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
								<Image
									src="https://avatars.githubusercontent.com/u/1?v=4"
									style={{ width: 40, height: 40 }}
									objectFit="cover"
								/>
								<View style={{ flexDirection: 'column' }}>
									<Text text="User Avatar" style={{ fontSize: 14 }} color="#e6edf7" />
									<Text text="Supports object-fit" style={{ fontSize: 10 }} color="#94a3b8" />
								</View>
							</View>

							{/* New Hover Feature Demo */}
							<View style={{ flexDirection: 'row', gap: 8, marginVertical: 8, flexWrap: 'wrap' }}>
								{[1, 2, 3].map((id) => (
									<View
										key={id}
										onPointerEnter={() => setHoveredBtn(id)}
										onPointerLeave={() => setHoveredBtn(null)}
										style={{
											padding: 8,
										}}
										borderRadius={6}
										background={hoveredBtn === id ? '#3b82f6' : 'rgba(255,255,255,0.1)'}
									>
										<Text
											text={`Hover Me ${id}`}
											style={{ fontSize: 12 }}
											color={hoveredBtn === id ? '#ffffff' : '#94a3b8'}
										/>
									</View>
								))}
							</View>

							<Text
								text="Rect / Text / View 都是 JSX 节点"
								style={{ fontSize: 14 }}
								color="#93c5fd"
							/>
							<Text
								text="试试：点击右上按钮变色；拖拽红色块"
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
