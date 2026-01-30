---
title: Line
---

`Line` 是线段图元：在本节点的 local 坐标系内从 `(x1,y1)` 画到 `(x2,y2)`。如果不提供 `x2/y2`，默认从 `(0,0)` 指向布局的 `(width,height)`；支持 stroke/lineWidth/lineCap，并且可以挂载事件。

## Stroke / LineCap

```tsx | preview
import { Canvas, Line, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

	return (
		<Canvas width={720} height={280} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 280, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="Line" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<View style={{ flexDirection: 'column', gap: 14 }}>
					<Line style={{ width: 520, height: 26 }} y1={13} y2={13} stroke="#60a5fa" lineWidth={2} />
					<Line
						style={{ width: 520, height: 26 }}
						y1={13}
						y2={13}
						stroke="#22c55e"
						lineWidth={10}
						lineCap="round"
					/>
					<Line
						style={{ width: 520, height: 80 }}
						x1={0}
						y1={0}
						x2={520}
						y2={80}
						stroke="rgba(229,231,235,0.75)"
						lineWidth={3}
						lineCap="square"
					/>
				</View>
			</View>
		</Canvas>
	)
}
```

## 点击示例

```tsx | preview
import { Canvas, Line, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [on, setOn] = useState(false)

	return (
		<Canvas width={720} height={260} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 260, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text
					text={on ? 'onClick: ACTIVE' : 'onClick: INACTIVE'}
					style={{ fontSize: 18, fontWeight: 700 }}
					color="#e5e7eb"
				/>
				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					<Line
						style={{ width: 260, height: 140 }}
						stroke={on ? '#22c55e' : '#ef4444'}
						lineWidth={on ? 14 : 6}
						lineCap={on ? 'round' : 'butt'}
						onClick={() => setOn((v) => !v)}
					/>
					<Text
						text="点击线段附近可命中并切换状态"
						style={{ fontSize: 14, maxWidth: 360, lineHeight: 18 }}
						color="rgba(229,231,235,0.75)"
					/>
				</View>
			</View>
		</Canvas>
	)
}
```

## Props

| Name      | Type            | Default  | Description                             |
| --------- | --------------- | -------- | --------------------------------------- |
| x1        | `number`        | `0`      | 起点 x（local 坐标）                    |
| y1        | `number`        | `0`      | 起点 y（local 坐标）                    |
| x2        | `number`        | `width`  | 终点 x（local 坐标）                    |
| y2        | `number`        | `height` | 终点 y（local 坐标）                    |
| stroke    | `string`        | -        | 线条颜色                                |
| lineWidth | `number`        | `1`      | 线宽                                    |
| lineCap   | `CanvasLineCap` | -        | 端点样式（`butt` / `round` / `square`） |
| style     | `YogaStyle`     | -        | 布局样式，建议提供 width/height         |
| ...events | -               | -        | `onClick`, `onPointerDown/Move/Up` 等   |
| children  | `ReactNode`     | -        | 子节点（参与布局与绘制）                |
