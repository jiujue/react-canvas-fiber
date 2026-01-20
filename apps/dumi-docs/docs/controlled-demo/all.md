---
title: Rect width 受控实例
---

`Rect` 点击可更改

## Text context / color / width

```tsx | preview
import { Canvas, Rect, Text, View } from 'react-canvas-fiber'
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
							borderRadius={16}
							fill="rgba(255,255,255,0.08)"
							stroke="#22c55e"
							lineWidth={3}
						/>
						<Rect
							style={{ flexGrow: 1, height: 64 }}
							borderRadius={16}
							fill="rgba(255,255,255,0.10)"
						/>
					</View>
				</View>
			</Canvas>
		</div>
	)
}
```
