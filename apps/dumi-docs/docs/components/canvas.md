---
title: Canvas
---

`Canvas` 是 React DOM 侧桥接组件：创建 `<canvas>`，初始化/销毁运行时 root，并把子树交给自定义 reconciler 渲染。

## 基础用法

```tsx | preview
import { Canvas, Rect, Text, View } from 'react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

	return (
		<Canvas
			width={720}
			height={360}
			dpr={dpr}
			clearColor="#0b1020"
			style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)' }}
		>
			<View style={{ width: 720, height: 360, padding: 16, flexDirection: 'column', gap: 10 }}>
				<Text text="Canvas" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<Rect style={{ width: 240, height: 54 }} borderRadius={14} fill="#60a5fa" />
			</View>
		</Canvas>
	)
}
```

## Props

```ts
type CanvasProps = {
	width: number
	height: number
	dpr?: number
	clearColor?: string
	fontFamily?: string
	fontSize?: number
	fontWeight?: number | string
	lineHeight?: number
	style?: import('react').CSSProperties
	children?: import('react').ReactNode
}
```

## 字体默认值

`Canvas` 上的 `fontFamily/fontSize/fontWeight/lineHeight` 用作默认值，供 `Text` 节点绘制与测量使用。
