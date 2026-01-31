---
title: zIndex 受控实例
---

`zIndex` 属性控制节点的层叠顺序。数值越大越靠前。

## zIndex

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [redZ, setRedZ] = useState(1)
	const [greenZ, setGreenZ] = useState(2)
	const [blueZ, setBlueZ] = useState(3)

	return (
		<div>
			<div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12 }}>
				<label>
					Red Z:{' '}
					<input
						type="number"
						value={redZ}
						onChange={(e) => setRedZ(Number(e.target.value))}
						style={{ width: 50 }}
					/>
				</label>
				<label>
					Green Z:{' '}
					<input
						type="number"
						value={greenZ}
						onChange={(e) => setGreenZ(Number(e.target.value))}
						style={{ width: 50 }}
					/>
				</label>
				<label>
					Blue Z:{' '}
					<input
						type="number"
						value={blueZ}
						onChange={(e) => setBlueZ(Number(e.target.value))}
						style={{ width: 50 }}
					/>
				</label>
			</div>
			<Canvas width={720} height={360} dpr={dpr} clearColor="#0b1020">
				<View style={{ width: 720, height: 360, position: 'relative' }}>
					<Rect
						style={{
							position: 'absolute',
							top: 105,
							left: 285,
							width: 150,
							height: 150,
							zIndex: redZ,
							transform: 'translate(-40, -40)',
						}}
						fill="#ef4444"
						borderRadius={20}
					/>
					<Rect
						style={{
							position: 'absolute',
							top: 105,
							left: 285,
							width: 150,
							height: 150,
							zIndex: greenZ,
							transform: 'translate(0, 0)',
						}}
						fill="#10b981"
						borderRadius={20}
					/>
					<Rect
						style={{
							position: 'absolute',
							top: 105,
							left: 285,
							width: 150,
							height: 150,
							zIndex: blueZ,
							transform: 'translate(40, 40)',
						}}
						fill="#3b82f6"
						borderRadius={20}
					/>
					<Text
						text={`Red: ${redZ}, Green: ${greenZ}, Blue: ${blueZ}`}
						style={{ position: 'absolute', left: 12, bottom: 12 }}
						color="#ffffff"
					/>
				</View>
			</Canvas>
		</div>
	)
}
```
