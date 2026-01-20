---
title: Getting Started
---

## 安装与使用

核心包名为 `react-canvas-fiber`：

```tsx | preview
import { Canvas, Rect, Text, View } from 'react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 380

	return (
		<Canvas
			width={width}
			height={height}
			dpr={dpr}
			clearColor="#0b1020"
			style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)' }}
		>
			<View
				style={{
					width,
					height,
					padding: 18,
					flexDirection: 'column',
					gap: 12,
					justifyContent: 'space-between',
				}}
			>
				<View style={{ flexDirection: 'column', gap: 8 }}>
					<Text text="Canvas Renderer" style={{ fontSize: 22, fontWeight: 700 }} color="#e5e7eb" />
					<Text
						text="用 JSX 声明图元树，React 负责 diff，renderer 在 commit 后 layout -> draw。"
						style={{ fontSize: 14, lineHeight: 18, maxWidth: 520 }}
						color="rgba(229,231,235,0.75)"
					/>
				</View>

				<View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
					<Rect style={{ width: 180, height: 44 }} borderRadius={12} fill="#22c55e" />
					<Rect style={{ width: 120, height: 44 }} borderRadius={12} fill="#60a5fa" />
					<Rect
						style={{ flexGrow: 1, height: 44 }}
						borderRadius={12}
						fill="rgba(255,255,255,0.10)"
					/>
				</View>
			</View>
		</Canvas>
	)
}
```

## 基本概念

- `Canvas`：DOM 侧桥接组件，负责创建 `<canvas>` 并管理渲染 root
- `View/Rect/Text`：自定义 renderer 的 Host 节点，交给 Yoga 布局，最后用 Canvas2D 绘制
