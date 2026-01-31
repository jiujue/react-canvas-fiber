---
title: Overflow & BorderRadius 受控实例
---

`overflow: 'hidden'` 配合 `borderRadius` 可以实现圆角裁剪。

## Overflow Hidden with BorderRadius

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [radius, setRadius] = useState(40)
	const [overflow, setOverflow] = useState(true)

	function Card(props: { title: string; overflow: 'visible' | 'hidden' }) {
		return (
			<View style={{ alignItems: 'center', gap: 10 }}>
				<Text
					text={props.title}
					color="rgba(229,231,235,0.92)"
					style={{ fontSize: 14, fontWeight: 700 }}
				/>
				<View
					style={{
						width: 240,
						height: 240,
						overflow: props.overflow,
					}}
					background="rgba(30,41,59,1)"
					border="2px solid rgba(148,163,184,0.55)"
					borderRadius={radius}
				>
					<Rect
						style={{
							position: 'absolute',
							left: -60,
							top: 70,
							width: 360,
							height: 90,
							transform: 'rotate(18deg)',
						}}
						fill="rgba(59,130,246,0.75)"
					/>
					<Rect
						style={{
							position: 'absolute',
							left: -40,
							top: -40,
							width: 130,
							height: 130,
						}}
						fill="rgba(239,68,68,0.88)"
					/>
					<Rect
						style={{
							position: 'absolute',
							right: -60,
							bottom: -35,
							width: 170,
							height: 120,
							transform: 'rotate(-10deg)',
						}}
						fill="rgba(234,179,8,0.82)"
					/>
					<Text
						text="OUT"
						color="rgba(255,255,255,0.95)"
						style={{
							position: 'absolute',
							left: 6,
							top: 6,
							fontSize: 16,
							fontWeight: 900,
						}}
					/>
					<View
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							top: 0,
							bottom: 0,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Text
							text={props.overflow === 'hidden' ? 'CLIPPED' : 'OVERFLOW'}
							color="rgba(15,23,42,0.95)"
							style={{ fontSize: 18, fontWeight: 900 }}
						/>
					</View>
				</View>
			</View>
		)
	}

	return (
		<div>
			<div style={{ display: 'flex', gap: 20, alignItems: 'center', padding: 12 }}>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
					<span>Border Radius</span>
					<input
						type="range"
						min={0}
						max={100}
						value={radius}
						onChange={(e) => setRadius(Number(e.target.value))}
					/>
					<span>{radius}px</span>
				</label>
				<label style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
					<input
						type="checkbox"
						checked={overflow}
						onChange={(e) => setOverflow(e.target.checked)}
					/>
					<span>overflow: hidden</span>
				</label>
			</div>
			<Canvas width={720} height={400} dpr={dpr} clearColor="#0b1020">
				<View style={{ width: 720, height: 400, justifyContent: 'center', alignItems: 'center' }}>
					<View style={{ flexDirection: 'row', gap: 28, alignItems: 'flex-start' }}>
						<Card title="overflow: visible（对照）" overflow="visible" />
						<Card
							title={overflow ? 'overflow: hidden（裁剪）' : 'overflow: visible（未裁剪）'}
							overflow={overflow ? 'hidden' : 'visible'}
						/>
					</View>
					<Text
						text="把圆角调大时，右侧红/黄块在圆角处会被明显裁掉（overflow:hidden）"
						style={{ marginTop: 22, fontSize: 13, maxWidth: 640 }}
						color="rgba(148,163,184,0.9)"
					/>
				</View>
			</Canvas>
		</div>
	)
}
```
