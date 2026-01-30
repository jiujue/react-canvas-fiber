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
		'data:image/svg+xml;utf8,' +
		encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#60a5fa"/>
      <stop offset="1" stop-color="#22c55e"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#g)"/>
  <circle cx="256" cy="256" r="168" fill="rgba(0,0,0,0.22)"/>
  <text x="256" y="252" text-anchor="middle" font-size="44" font-family="system-ui" fill="#ffffff" font-weight="700">Image</text>
  <text x="256" y="304" text-anchor="middle" font-size="22" font-family="system-ui" fill="rgba(255,255,255,0.85)">CORS-safe demo</text>
</svg>
`)

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

## 跨域注意事项（CORS）

`Image` 内部会把 `HTMLImageElement.crossOrigin` 设为 `anonymous`，因此如果你使用跨域图片地址，目标服务器必须返回允许跨域访问的响应头（例如 `Access-Control-Allow-Origin: *` 或包含当前站点域名）。否则图片会加载失败，从而表现为“只显示文字，图片不出现”。

## Props

| Name         | Type                             | Default  | Description                           |
| ------------ | -------------------------------- | -------- | ------------------------------------- |
| src          | `string`                         | -        | 图片地址                              |
| objectFit    | `'cover' \| 'contain' \| 'fill'` | `'fill'` | 图片填充模式                          |
| borderRadius | `number`                         | -        | 圆角半径                              |
| style        | `YogaStyle`                      | -        | 布局样式，支持 width/height 等        |
| ...events    | -                                | -        | `onClick`, `onPointerDown/Move/Up` 等 |
