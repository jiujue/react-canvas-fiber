---
title: Image
---

`Image` 用于渲染图片：支持网络图片地址、圆角（通过 borderRadius 属性）以及 objectFit 模式。

## 基础用法

```tsx | preview
import { Canvas, Image, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

	const src =
		'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503149779833-1de50ebe5f8a.webp'

	return (
		<Canvas width={720} height={400} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 400, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="Image" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					{/* Cover + Rounded */}
					<View style={{ flexDirection: 'column', gap: 8 }}>
						<Text text="objectFit: cover" style={{ fontSize: 14 }} color="#94a3b8" />
						<Image
							src={src}
							style={{ width: 200, height: 200 }}
							borderRadius={16}
							objectFit="cover"
						/>
					</View>
					{/* Contain */}
					<View style={{ flexDirection: 'column', gap: 8 }}>
						<Text text="objectFit: contain" style={{ fontSize: 14 }} color="#94a3b8" />
						<Image
							src={src}
							style={{ width: 200, height: 200, borderRadius: 16, background: '#1e293b' }}
							objectFit="contain"
						/>
					</View>
					{/* Fill (Default) */}
					<View style={{ flexDirection: 'column', gap: 8 }}>
						<Text text="objectFit: fill" style={{ fontSize: 14 }} color="#94a3b8" />
						<Image
							src={src}
							style={{ width: 200, height: 200, borderRadius: 16 }}
							objectFit="fill"
						/>
					</View>
				</View>
			</View>
		</Canvas>
	)
}
```

## Props

| Name         | Type                             | Default  | Description                           |
| ------------ | -------------------------------- | -------- | ------------------------------------- |
| src          | `string`                         | -        | 图片地址                              |
| objectFit    | `'cover' \| 'contain' \| 'fill'` | `'fill'` | 图片填充模式                          |
| borderRadius | `number`                         | -        | 圆角半径                              |
| style        | `YogaStyle`                      | -        | 布局样式，支持 width/height 等        |
| ...events    | -                                | -        | `onClick`, `onPointerDown/Move/Up` 等 |
