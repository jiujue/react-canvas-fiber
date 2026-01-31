---
title: Group
---

`Group` 是“纯容器”节点：用于把一组子节点当作整体做 transform / opacity / zIndex 管理，并让这些效果自然传递到子树。

## 统一 Transform

```tsx | preview
import { Canvas, Group, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 360
	const [angle, setAngle] = useState(-12)
	const [scale, setScale] = useState(1.05)
	const [opacity, setOpacity] = useState(1)
	const [zIndex, setZIndex] = useState(2)
	const [overflowHidden, setOverflowHidden] = useState(false)
	const transform = useMemo(() => `rotate(${angle}deg) scale(${scale})`, [angle, scale])

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
			<div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>angle</span>
					<input
						type="range"
						min={-45}
						max={45}
						step={1}
						value={angle}
						onChange={(e) => setAngle(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{angle}°</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>scale</span>
					<input
						type="range"
						min={0.5}
						max={1.8}
						step={0.01}
						value={scale}
						onChange={(e) => setScale(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{scale.toFixed(2)}</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>opacity</span>
					<input
						type="range"
						min={0}
						max={1}
						step={0.05}
						value={opacity}
						onChange={(e) => setOpacity(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{opacity.toFixed(2)}</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<span style={{ width: 92 }}>zIndex</span>
					<input
						type="range"
						min={0}
						max={10}
						step={1}
						value={zIndex}
						onChange={(e) => setZIndex(Number(e.target.value))}
					/>
					<span style={{ width: 52 }}>{zIndex}</span>
				</label>
				<label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
					<input
						type="checkbox"
						checked={overflowHidden}
						onChange={(e) => setOverflowHidden(e.target.checked)}
					/>
					<span>overflow: hidden</span>
				</label>
				<button
					onClick={() => {
						setAngle(-12)
						setScale(1.05)
						setOpacity(1)
						setZIndex(2)
						setOverflowHidden(false)
					}}
				>
					reset
				</button>
			</div>

			<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
				<View style={{ width, height, padding: 18, flexDirection: 'column', gap: 12 }}>
					<Text
						text="Group: unified transform"
						style={{ fontSize: 18, fontWeight: 700 }}
						color="#e5e7eb"
					/>

					<View
						style={{
							flexGrow: 1,
							background: 'rgba(255,255,255,0.06)',
							borderRadius: 16,
							padding: 18,
							position: 'relative',
						}}
					>
						<Group
							style={{
								position: 'absolute',
								left: 240,
								top: 70,
								width: 240,
								height: 160,
								transform,
								transformOrigin: 'center',
								opacity,
								zIndex,
								overflow: overflowHidden ? 'hidden' : 'visible',
							}}
						>
							<Rect
								style={{ width: 240, height: 160 }}
								borderRadius={18}
								fill="rgba(255,255,255,0.10)"
							/>
							<Rect
								style={{ position: 'absolute', left: -22, top: 28, width: 140, height: 56 }}
								borderRadius={14}
								fill="#60a5fa"
							/>
							<Rect
								style={{ position: 'absolute', left: 122, top: 76, width: 140, height: 56 }}
								borderRadius={14}
								fill="#22c55e"
							/>
							<Text
								text={`zIndex ${zIndex}`}
								style={{ position: 'absolute', left: 16, top: 10, fontSize: 14, fontWeight: 700 }}
								color="#e5e7eb"
							/>
						</Group>

						<Rect
							style={{
								position: 'absolute',
								left: 70,
								top: 120,
								width: 220,
								height: 84,
								zIndex: 1,
							}}
							borderRadius={18}
							fill="rgba(239,68,68,0.35)"
						/>
						<Text
							text="Underlay (zIndex 1)"
							style={{ position: 'absolute', left: 84, top: 132, fontSize: 14, fontWeight: 700 }}
							color="#fecaca"
						/>
					</View>
				</View>
			</Canvas>
		</div>
	)
}
```

## Props 要点

- `style?: YogaStyle`：参与布局；并支持 `transform / transformOrigin / opacity / overflow / zIndex`
- `children?: ReactNode`
- `pointerEvents?: 'auto' | 'none'`
- 事件回调：`onPointerDown/Move/Up/Cancel`、`onPointerEnter/Leave`、`onClick`（含 Capture 版本）
