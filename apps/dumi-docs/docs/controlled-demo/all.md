---
title: Rect width 受控实例
---

`Rect` 点击可更改

## Text context / color / width

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [width, setWidth] = useState(180)
	const [color, setColor] = useState('#60a5fa')
	const [textVal, setTextVal] = useState('Rect')
	return (
		<div>
			<div style={{ flexDirection: 'row', gap: 12, alignItems: 'center', padding: 12 }}>
				<input type="text" value={textVal} onChange={(e) => setTextVal(e.target.value)} />
				<input
					type="range"
					min={100}
					max={500}
					value={width}
					onChange={(e) => setWidth(Number(e.target.value))}
				/>
				<input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
			</div>
			<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020">
				<View style={{ width: 720, height: 320, padding: 16, flexDirection: 'column', gap: 12 }}>
					<Text text={textVal} style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
					<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
						<Rect style={{ width: width, height: 64 }} borderRadius={16} fill={color} />
						<Rect
							style={{ width: width, height: 64 }}
							fill="rgba(255,255,255,0.08)"
							stroke="#22c55e"
							lineWidth={3}
							borderRadius={16}
						/>
						<Rect
							style={{ flexGrow: 1, height: 64 }}
							fill="rgba(255,255,255,0.10)"
							borderRadius={16}
						/>
					</View>
				</View>
			</Canvas>
		</div>
	)
}
```

## transform / opacity / overflow / zIndex

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [opacity, setOpacity] = useState(1)
	const [deg, setDeg] = useState(0)
	const [overflowHidden, setOverflowHidden] = useState(true)
	const [front, setFront] = useState<'green' | 'blue'>('green')

	const viewStyle = useMemo(
		() => ({
			width: 720,
			height: 320,
			padding: 16,
			flexDirection: 'column' as const,
			gap: 12,
			overflow: overflowHidden ? ('hidden' as const) : ('visible' as const),
		}),
		[overflowHidden],
	)

	const greenZ = front === 'green' ? 2 : 1
	const blueZ = front === 'blue' ? 2 : 1

	return (
		<div>
			<div style={{ flexDirection: 'row', gap: 12, alignItems: 'center', padding: 12 }}>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
					<span style={{ width: 70 }}>opacity</span>
					<input
						type="range"
						min={0}
						max={1}
						step={0.01}
						value={opacity}
						onChange={(e) => setOpacity(Number(e.target.value))}
					/>
					<span style={{ width: 50 }}>{opacity.toFixed(2)}</span>
				</label>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
					<span style={{ width: 70 }}>rotate</span>
					<input
						type="range"
						min={-45}
						max={45}
						step={1}
						value={deg}
						onChange={(e) => setDeg(Number(e.target.value))}
					/>
					<span style={{ width: 50 }}>{deg}°</span>
				</label>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
					<input
						type="checkbox"
						checked={overflowHidden}
						onChange={(e) => setOverflowHidden(e.target.checked)}
					/>
					<span>overflow:hidden</span>
				</label>
				<button type="button" onClick={() => setFront((v) => (v === 'green' ? 'blue' : 'green'))}>
					切换前景（zIndex）
				</button>
			</div>
			<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020">
				<View style={viewStyle} background="rgba(255,255,255,0.06)" borderRadius={16}>
					<Text
						text="transform / opacity / overflow / zIndex"
						style={{ fontSize: 18, fontWeight: 700 }}
						color="#e5e7eb"
					/>
					<View style={{ flexDirection: 'row', gap: 12 }}>
						<View style={{ width: 220, height: 180 }}>
							<Rect
								style={{
									width: 140,
									height: 100,
									transform: `rotate(${deg}deg) translate(20, 12)`,
									transformOrigin: 'center',
									opacity,
								}}
								fill="rgba(255,255,255,0.12)"
								stroke="rgba(255,255,255,0.35)"
								lineWidth={2}
								borderRadius={18}
							/>
							<Text
								text="local transform"
								style={{ marginTop: 120, fontSize: 12 }}
								color="#94a3b8"
							/>
						</View>

						<View
							style={{ width: 260, height: 180 }}
							background="rgba(255,255,255,0.05)"
							borderRadius={18}
						>
							<Rect
								style={{ width: 200, height: 140, margin: 20, zIndex: greenZ }}
								fill="rgba(34,197,94,0.55)"
								borderRadius={18}
							/>
							<Rect
								style={{
									width: 200,
									height: 140,
									margin: 20,
									zIndex: blueZ,
									transform: 'translate(30, 20)',
								}}
								fill="rgba(96,165,250,0.55)"
								borderRadius={18}
							/>
							<Text text="overlap + zIndex" style={{ padding: 12, fontSize: 12 }} color="#e5e7eb" />
						</View>
					</View>
				</View>
			</Canvas>
		</div>
	)
}
```
