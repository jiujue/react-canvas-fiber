---
title: Text
---

`Text` 是文本图元：通过 `text` 指定内容，支持颜色与部分字体样式，并参与 Yoga 测量。

## 基础文本

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 320

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020" fontFamily="system-ui">
			<View style={{ width, height, padding: 16, flexDirection: 'column', gap: 10 }}>
				<Text text="Text" style={{ fontSize: 22, fontWeight: 800 }} color="#e5e7eb" />
				<Text
					text="fontSize / fontWeight / lineHeight"
					style={{ fontSize: 14, lineHeight: 18 }}
					color="rgba(229,231,235,0.75)"
				/>
				<Rect style={{ width: 260, height: 1 }} fill="rgba(255,255,255,0.16)" />
				<Text text="小号文本" style={{ fontSize: 12 }} color="#93c5fd" />
				<Text text="中号文本" style={{ fontSize: 16, fontWeight: 600 }} color="#a7f3d0" />
				<Text text="大号文本" style={{ fontSize: 24, fontWeight: 800 }} color="#fca5a5" />
			</View>
		</Canvas>
	)
}
```

## 限制宽度（maxWidth）

```tsx | preview
import { Canvas, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 260

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 16, flexDirection: 'column', gap: 10 }}>
				<Text text="maxWidth" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<Text
					text="这是一段较长的文本，用 maxWidth 约束宽度后，会触发测量与换行（取决于当前实现的测量策略）。"
					style={{ fontSize: 14, lineHeight: 18 }}
					maxWidth={360}
					color="rgba(229,231,235,0.80)"
				/>
			</View>
		</Canvas>
	)
}
```

## Props

| Name      | Type        | Default | Description                           |
| --------- | ----------- | ------- | ------------------------------------- |
| text      | `string`    | -       | 文本内容（支持 `\\n`）                |
| color     | `string`    | `#fff`  | 文本颜色                              |
| maxWidth  | `number`    | -       | 测量时的最大宽度                      |
| style     | `YogaStyle` | -       | 布局样式与字体样式（fontSize 等）     |
| ...events | -           | -       | `onClick`, `onPointerDown/Move/Up` 等 |
