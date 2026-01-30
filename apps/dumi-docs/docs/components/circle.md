---
title: Circle
---

`Circle` 是圆形/椭圆图元：根据布局得到的 `width/height` 绘制（`rx = width / 2`, `ry = height / 2`），支持填充、描边、线宽，并且可以挂载事件。

## Fill / Stroke

```tsx | preview
import { Canvas, Circle, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

	return (
		<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 320, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="Circle" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
					<Circle style={{ width: 72, height: 72 }} fill="#60a5fa" />
					<Circle
						style={{ width: 72, height: 72 }}
						fill="rgba(255,255,255,0.08)"
						stroke="#22c55e"
						lineWidth={3}
					/>
					<Circle
						style={{ width: 120, height: 72 }}
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

## 点击示例（椭圆命中）

```tsx | preview
import { Canvas, Circle, Text, View } from '@jiujue/react-canvas-fiber'
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
					<Circle
						style={{ width: 160, height: 160 }}
						fill={on ? '#22c55e' : '#ef4444'}
						onClick={() => setOn((v) => !v)}
					/>
					<Text
						text="点击圆形区域切换；矩形外但在包围盒内的区域不会命中"
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

| Name      | Type        | Default | Description                           |
| --------- | ----------- | ------- | ------------------------------------- |
| fill      | `string`    | -       | 填充色                                |
| stroke    | `string`    | -       | 描边色                                |
| lineWidth | `number`    | `1`     | 描边线宽                              |
| style     | `YogaStyle` | -       | 布局样式，建议提供 width/height       |
| ...events | -           | -       | `onClick`, `onPointerDown/Move/Up` 等 |
| children  | `ReactNode` | -       | 子节点（参与布局与绘制）              |
