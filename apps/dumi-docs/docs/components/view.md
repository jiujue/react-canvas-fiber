---
title: View
---

`View` 是容器节点：主要用于布局与承载背景/圆角/滚动/事件。

## 容器 + 背景

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 360

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View
				style={{ width, height, padding: 18, flexDirection: 'column', gap: 12 }}
				background="rgba(255,255,255,0.06)"
				borderRadius={16}
			>
				<Text text="View Container" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					<Rect style={{ width: 120, height: 52 }} borderRadius={14} fill="#22c55e" />
					<Rect style={{ width: 160, height: 52 }} borderRadius={14} fill="#60a5fa" />
					<Rect
						style={{ flexGrow: 1, height: 52 }}
						borderRadius={14}
						fill="rgba(255,255,255,0.10)"
					/>
				</View>
			</View>
		</Canvas>
	)
}
```

## Props 要点

- `style?: YogaStyle`
- `background?: string`
- `borderRadius?: number`
- `scrollX/scrollY` 与滚动条相关属性
- `pointerEvents?: 'auto' | 'none'` 与事件回调
