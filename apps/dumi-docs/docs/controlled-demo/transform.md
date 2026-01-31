---
title: Transform 受控实例
---

`transform` 属性支持 `translate`, `scale`, `rotate`, `skew` 等。

## Transform

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [tx, setTx] = useState(0)
	const [ty, setTy] = useState(0)
	const [scale, setScale] = useState(1)
	const [rotate, setRotate] = useState(0)

	return (
		<div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12 }}>
				<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
					<span style={{ width: 80 }}>Translate X</span>
					<input
						type="range"
						min={-50}
						max={50}
						value={tx}
						onChange={(e) => setTx(Number(e.target.value))}
					/>
					<span>{tx}px</span>
				</div>
				<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
					<span style={{ width: 80 }}>Translate Y</span>
					<input
						type="range"
						min={-50}
						max={50}
						value={ty}
						onChange={(e) => setTy(Number(e.target.value))}
					/>
					<span>{ty}px</span>
				</div>
				<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
					<span style={{ width: 80 }}>Scale</span>
					<input
						type="range"
						min={0.5}
						max={2}
						step={0.1}
						value={scale}
						onChange={(e) => setScale(Number(e.target.value))}
					/>
					<span>{scale.toFixed(1)}x</span>
				</div>
				<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
					<span style={{ width: 80 }}>Rotate</span>
					<input
						type="range"
						min={0}
						max={360}
						value={rotate}
						onChange={(e) => setRotate(Number(e.target.value))}
					/>
					<span>{rotate}°</span>
				</div>
			</div>
			<Canvas width={720} height={360} dpr={dpr} clearColor="#0b1020">
				<View style={{ width: 720, height: 360, justifyContent: 'center', alignItems: 'center' }}>
					<Rect
						style={{
							width: 120,
							height: 120,
							transform: `translate(${tx}, ${ty}) scale(${scale}) rotate(${rotate}deg)`,
							transformOrigin: 'center',
						}}
						fill="#3b82f6"
						borderRadius={20}
						onPointerDown={() => console.log('Rect clicked!')}
					/>
					<Text text="Click me (Hit Test)" style={{ marginTop: 20 }} color="#ffffff" />
				</View>
			</Canvas>
		</div>
	)
}
```
