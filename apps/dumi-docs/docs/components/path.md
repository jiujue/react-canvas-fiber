---
title: Path
---

`Path` 是基于 SVG path data（`d` 字符串）的图元节点：内部使用 `Path2D(d)` 绘制，支持 fill/stroke/lineWidth/fillRule，并且可以挂载事件。

## Fill / Stroke

```tsx | preview
import { Canvas, Path, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

	return (
		<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 320, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="Path" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
					<Path style={{ width: 120, height: 60 }} d="M 0 60 L 60 0 L 120 60 Z" fill="#60a5fa" />
					<Path
						style={{ width: 120, height: 60 }}
						d="M 0 60 L 60 0 L 120 60 Z"
						fill="rgba(255,255,255,0.08)"
						stroke="#22c55e"
						lineWidth={3}
					/>
					<Path
						style={{ width: 140, height: 72 }}
						d="M 0 36 C 18 4, 48 4, 70 28 C 92 52, 122 52, 140 20 L 140 72 L 0 72 Z"
						fill="rgba(255,255,255,0.10)"
						stroke="rgba(229,231,235,0.6)"
						lineWidth={2}
					/>
				</View>
			</View>
		</Canvas>
	)
}
```

## FillRule（evenodd）

```tsx | preview
import { Canvas, Path, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const d = 'M 0 0 H 160 V 160 H 0 Z M 40 40 H 120 V 120 H 40 Z'

	return (
		<Canvas width={720} height={300} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 300, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="fillRule" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
					<View style={{ width: 160, gap: 8 }}>
						<Text text="默认（nonzero）" style={{ fontSize: 12 }} color="rgba(229,231,235,0.75)" />
						<Path style={{ width: 160, height: 160 }} d={d} fill="#60a5fa" />
					</View>
					<View style={{ width: 160, gap: 8 }}>
						<Text
							text="evenodd（中间空洞）"
							style={{ fontSize: 12 }}
							color="rgba(229,231,235,0.75)"
						/>
						<Path style={{ width: 160, height: 160 }} d={d} fill="#22c55e" fillRule="evenodd" />
					</View>
				</View>
			</View>
		</Canvas>
	)
}
```

## 点击示例（空洞不命中）

```tsx | preview
import { Canvas, Path, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [on, setOn] = useState(false)
	const d = 'M 0 0 H 180 V 180 H 0 Z M 52 52 H 128 V 128 H 52 Z'

	return (
		<Canvas width={720} height={280} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 280, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text
					text={on ? 'onClick: ACTIVE' : 'onClick: INACTIVE'}
					style={{ fontSize: 18, fontWeight: 700 }}
					color="#e5e7eb"
				/>
				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					<Path
						style={{ width: 180, height: 180 }}
						d={d}
						fill={on ? '#22c55e' : '#ef4444'}
						fillRule="evenodd"
						onClick={() => setOn((v) => !v)}
					/>
					<Text
						text="点击外圈切换；中间空洞区域不会命中"
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

| Name      | Type             | Default | Description                           |
| --------- | ---------------- | ------- | ------------------------------------- |
| d         | `string`         | -       | SVG path data                         |
| fill      | `string`         | -       | 填充色                                |
| fillRule  | `CanvasFillRule` | -       | 填充规则（`nonzero` / `evenodd`）     |
| stroke    | `string`         | -       | 描边色                                |
| lineWidth | `number`         | `1`     | 描边线宽                              |
| style     | `YogaStyle`      | -       | 布局样式，建议提供 width/height       |
| ...events | -                | -       | `onClick`, `onPointerDown/Move/Up` 等 |
| children  | `ReactNode`      | -       | 子节点（参与布局与绘制）              |
