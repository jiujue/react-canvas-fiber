---
title: Events（指针与点击）
---

`View` / `Rect` / `Text` 支持 `onPointerDown/Move/Up/Cancel` 与 `onClick`（含 Capture 版本）。

## 点击切换

```tsx | preview
import { Canvas, Rect, Text, View } from 'react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [active, setActive] = useState(false)

	return (
		<Canvas width={720} height={260} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 260, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text
					text={active ? 'onClick: ACTIVE' : 'onClick: INACTIVE'}
					style={{ fontSize: 18, fontWeight: 700 }}
					color="#e5e7eb"
				/>
				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					<Rect
						style={{ width: 220, height: 54 }}
						borderRadius={14}
						fill={active ? '#22c55e' : '#ef4444'}
						onClick={() => setActive((v) => !v)}
					/>
					<Text
						text="点击左侧色块切换状态"
						style={{ fontSize: 14 }}
						color="rgba(229,231,235,0.75)"
					/>
				</View>
			</View>
		</Canvas>
	)
}
```

## 拖拽移动（pointerdown + pointermove）

```tsx | preview
import { Canvas, Rect, Text, View } from 'react-canvas-fiber'
import { useMemo, useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 320

	const [dragging, setDragging] = useState(false)
	const [pos, setPos] = useState({ x: 80, y: 120 })
	const [offset, setOffset] = useState({ x: 0, y: 0 })

	const label = useMemo(() => {
		return dragging ? 'Dragging…' : 'Drag the orange rect'
	}, [dragging])

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 16, position: 'relative' }}>
				<Text text={label} style={{ fontSize: 16, fontWeight: 700 }} color="#e5e7eb" />
				<Rect
					style={{ position: 'absolute', left: pos.x, top: pos.y, width: 200, height: 54 }}
					borderRadius={14}
					fill="#f59e0b"
					onPointerDown={(e) => {
						setDragging(true)
						setOffset({ x: e.x - pos.x, y: e.y - pos.y })
					}}
					onPointerMove={(e) => {
						if (!dragging) return
						setPos({ x: e.x - offset.x, y: e.y - offset.y })
					}}
					onPointerUp={() => setDragging(false)}
					onPointerCancel={() => setDragging(false)}
				/>
			</View>
		</Canvas>
	)
}
```
