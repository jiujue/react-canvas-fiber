---
title: Events（指针与点击）
---

`View` / `Rect` / `Circle` / `Path` / `Line` / `Text` / `Image` 支持 `onPointerDown/Move/Up/Cancel` 与 `onClick`（含 Capture 版本），也支持 `onPointerEnter/Leave`（不含 Capture 版本），并支持通过 `pointerEvents` 控制是否参与命中。

## 点击切换

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
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

## 悬停交互（onPointerEnter/Leave）

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function HoverDemo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [hovered, setHovered] = useState(false)

	return (
		<Canvas width={720} height={260} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 260, justifyContent: 'center', alignItems: 'center' }}>
				<Rect
					style={{ width: 200, height: 200 }}
					borderRadius={24}
					fill={hovered ? '#3b82f6' : '#1e293b'}
					onPointerEnter={() => setHovered(true)}
					onPointerLeave={() => setHovered(false)}
				>
					<View style={{ width: 200, height: 200, justifyContent: 'center', alignItems: 'center' }}>
						<Text
							text={hovered ? 'Hovered!' : 'Hover Me'}
							style={{ fontSize: 24, fontWeight: 700 }}
							color={hovered ? '#ffffff' : '#94a3b8'}
						/>
					</View>
				</Rect>
			</View>
		</Canvas>
	)
}
```

## 拖拽移动（pointerdown + pointermove）

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
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

## pointerEvents（穿透）

将某个节点的 `pointerEvents="none"` 可以让它不参与命中，事件会“穿透”到下层节点。

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [count, setCount] = useState(0)

	return (
		<Canvas width={720} height={260} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 260, justifyContent: 'center', alignItems: 'center' }}>
				<View style={{ width: 360, height: 180, position: 'relative' }}>
					<Rect
						style={{ position: 'absolute', left: 60, top: 40, width: 220, height: 100 }}
						borderRadius={16}
						fill="#22c55e"
						onClick={() => setCount((v) => v + 1)}
					/>
					<Rect
						style={{ position: 'absolute', left: 120, top: 70, width: 220, height: 100 }}
						borderRadius={16}
						fill="rgba(96,165,250,0.25)"
						stroke="rgba(96,165,250,0.9)"
						lineWidth={2}
						pointerEvents="none"
					/>
					<Text
						text={`Click count: ${count}（点击蓝色半透明区域也会触发底部绿色）`}
						style={{ position: 'absolute', left: 0, top: 0, fontSize: 12 }}
						color="rgba(229,231,235,0.85)"
						maxWidth={360}
					/>
				</View>
			</View>
		</Canvas>
	)
}
```

## 传播顺序（Capture / Bubble）

对于 `pointerdown/pointermove/pointerup/pointercancel/click`：

- Capture：从根到目标（先父后子），触发 `onXXXCapture`
- Bubble：从目标到根（先子后父），触发 `onXXX`
- `event.stopPropagation()`：会中止后续的 Capture 或 Bubble 派发
- `event.currentTarget`：当前正在执行 handler 的节点；`event.target`：最初命中的节点

## Pointer Capture（拖拽体验）

在一次 `pointerdown` 命中后，同一个 `pointerId` 的后续 `pointermove/pointerup` 会优先派发到该命中目标（即使指针移出该节点），更接近 DOM 的 pointer capture 体验。

## onPointerEnter / onPointerLeave

`onPointerEnter/Leave` 用于模拟 hover：它们按“进入链/离开链”逐个触发，不参与 Capture/Bubble，也不提供 `stopPropagation/preventDefault` 语义。
