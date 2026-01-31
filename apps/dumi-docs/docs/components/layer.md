---
title: Layer
---

`Layer` 是“分层容器”节点：Props 与 `View` 相同，但语义更偏向“层”。常用于统一管理一组内容的 zIndex 与裁剪（overflow/圆角/滚动）。

## 分层 + 裁剪 + zIndex

```tsx | preview
import { Canvas, Layer, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 360
	const [offsetX, setOffsetX] = useState(230)
	const [offsetY, setOffsetY] = useState(110)
	const [layerAZ, setLayerAZ] = useState(1)
	const [layerBZ, setLayerBZ] = useState(2)
	const [radius, setRadius] = useState(18)
	const [clipA, setClipA] = useState(true)
	const [clipB, setClipB] = useState(true)

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
			<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>B left</span>
					<input
						type="range"
						min={80}
						max={320}
						step={1}
						value={offsetX}
						onChange={(e) => setOffsetX(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{offsetX}</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>B top</span>
					<input
						type="range"
						min={40}
						max={180}
						step={1}
						value={offsetY}
						onChange={(e) => setOffsetY(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{offsetY}</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>A zIndex</span>
					<input
						type="range"
						min={0}
						max={10}
						step={1}
						value={layerAZ}
						onChange={(e) => setLayerAZ(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{layerAZ}</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>B zIndex</span>
					<input
						type="range"
						min={0}
						max={10}
						step={1}
						value={layerBZ}
						onChange={(e) => setLayerBZ(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{layerBZ}</span>
				</label>
				<button onClick={() => setLayerAZ(layerBZ + 1)}>A 在上</button>
				<button onClick={() => setLayerBZ(layerAZ + 1)}>B 在上</button>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>radius</span>
					<input
						type="range"
						min={0}
						max={32}
						step={1}
						value={radius}
						onChange={(e) => setRadius(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{radius}</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<input type="checkbox" checked={clipA} onChange={(e) => setClipA(e.target.checked)} />
					<span>A overflow: hidden</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<input type="checkbox" checked={clipB} onChange={(e) => setClipB(e.target.checked)} />
					<span>B overflow: hidden</span>
				</label>
				<button
					onClick={() => {
						setOffsetX(230)
						setOffsetY(110)
						setLayerAZ(1)
						setLayerBZ(2)
						setRadius(18)
						setClipA(true)
						setClipB(true)
					}}
				>
					reset
				</button>
				<span style={{ color: 'rgba(255,255,255,0.65)' }}>
					zIndex 越大越靠上；相等时后渲染的节点在上
				</span>
			</div>

			<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
				<View style={{ width, height, padding: 18, flexDirection: 'column', gap: 12 }}>
					<Text
						text="Layer: clip + zIndex"
						style={{ fontSize: 18, fontWeight: 700 }}
						color="#e5e7eb"
					/>
					<View
						style={{
							flexGrow: 1,
							background: 'rgba(255,255,255,0.06)',
							borderRadius: 16,
							position: 'relative',
						}}
					>
						<Layer
							style={{
								position: 'absolute',
								left: 70,
								top: 60,
								width: 320,
								height: 180,
								zIndex: layerAZ,
								overflow: clipA ? 'hidden' : 'visible',
							}}
							background="rgba(96,165,250,0.10)"
							border="2px solid rgba(96,165,250,0.55)"
							borderRadius={radius}
						>
							<Text
								text={`Layer A (zIndex ${layerAZ})`}
								style={{ fontSize: 14, fontWeight: 700, padding: 12 }}
								color="#dbeafe"
							/>
							<Rect
								style={{ position: 'absolute', left: -60, top: 86, width: 220, height: 70 }}
								borderRadius={16}
								fill="#60a5fa"
							/>
						</Layer>

						<Layer
							style={{
								position: 'absolute',
								left: offsetX,
								top: offsetY,
								width: 340,
								height: 190,
								zIndex: layerBZ,
								overflow: clipB ? 'hidden' : 'visible',
							}}
							background="rgba(34,197,94,0.10)"
							border="2px solid rgba(34,197,94,0.55)"
							borderRadius={radius}
						>
							<Text
								text={`Layer B (zIndex ${layerBZ})`}
								style={{ fontSize: 14, fontWeight: 700, padding: 12 }}
								color="#dcfce7"
							/>
							<Rect
								style={{ position: 'absolute', left: 180, top: 96, width: 220, height: 70 }}
								borderRadius={16}
								fill="#22c55e"
							/>
						</Layer>
					</View>
				</View>
			</Canvas>
		</div>
	)
}
```

## Props

`LayerProps = ViewProps`，参考 [View](file:///Users/jiujue/Documents/workspace/webWorkSpace/react-canvas-fiber/apps/dumi-docs/docs/components/view.md)。
