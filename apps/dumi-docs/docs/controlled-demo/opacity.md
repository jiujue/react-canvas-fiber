---
title: Opacity 受控实例
---

`opacity` 属性控制节点的透明度。

## Opacity

```tsx | preview
import { Canvas, Rect, Text, View, Image } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [opacity, setOpacity] = useState(0.8)

	return (
		<div>
			<div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12 }}>
				<span style={{ width: 80 }}>Opacity</span>
				<input
					type="range"
					min={0}
					max={1}
					step={0.01}
					value={opacity}
					onChange={(e) => setOpacity(Number(e.target.value))}
				/>
				<span>{opacity.toFixed(2)}</span>
			</div>
			<Canvas width={720} height={360} dpr={dpr} clearColor="#0b1020">
				<View
					style={{
						width: 720,
						height: 360,
						flexDirection: 'row',
						justifyContent: 'space-around',
						alignItems: 'center',
					}}
				>
					<View style={{ alignItems: 'center', gap: 10 }}>
						<Rect style={{ width: 120, height: 120, opacity }} fill="#ef4444" borderRadius={20} />
						<Text text="Rect" color="#ffffff" />
					</View>

					<View style={{ alignItems: 'center', gap: 10 }}>
						<View
							style={{ width: 120, height: 120, opacity }}
							background="#10b981"
							borderRadius={20}
						>
							<Rect style={{ width: 40, height: 40, margin: 40 }} fill="#ffffff" />
						</View>
						<Text text="View (Container)" color="#ffffff" />
					</View>

					<View style={{ alignItems: 'center', gap: 10 }}>
						<Text
							text="Hello Canvas"
							style={{ fontSize: 24, fontWeight: 700, opacity }}
							color="#6366f1"
						/>
						<Text text="Text" color="#ffffff" />
					</View>
				</View>
			</Canvas>
		</div>
	)
}
```
