---
title: Rect
---

`Rect` 是矩形图元：支持填充、描边、线宽与圆角，并且可以挂载事件。

## Fill / Stroke / Radius

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

	return (
		<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 320, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="Rect" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					<Rect style={{ width: 180, height: 64 }} borderRadius={16} fill="#60a5fa" />
					<Rect
						style={{ width: 180, height: 64 }}
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
	)
}
```

## 点击示例

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [on, setOn] = useState(false)

	return (
		<Canvas width={720} height={240} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 240, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text={on ? 'ON' : 'OFF'} style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<Rect
					style={{ width: 240, height: 56 }}
					borderRadius={14}
					fill={on ? '#22c55e' : '#ef4444'}
					onClick={() => setOn((v) => !v)}
				/>
			</View>
		</Canvas>
	)
}
```
