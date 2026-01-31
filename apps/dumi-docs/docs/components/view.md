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

## Border

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 360

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 18, flexDirection: 'column', gap: 12 }}>
				<View
					style={{ flexGrow: 1, padding: 16, flexDirection: 'column', gap: 12 }}
					background="rgba(255,255,255,0.06)"
					border="1px solid rgba(255,255,255,0.18)"
					borderRadius={16}
				>
					<Text text="View Border" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
					<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
						<Rect style={{ width: 120, height: 52 }} borderRadius={14} fill="#22c55e" />
						<Rect style={{ width: 160, height: 52 }} borderRadius={14} fill="#60a5fa" />
						<View
							style={{ flexGrow: 1, height: 52 }}
							background="rgba(255,255,255,0.08)"
							border="2px solid rgba(96,165,250,0.65)"
							borderRadius={14}
						/>
					</View>
				</View>
			</View>
		</Canvas>
	)
}
```

## Background Image

`View` 支持类似 CSS 的背景图片设置。

- `backgroundImage`: 图片 URL
- `backgroundSize`: `cover` | `contain` | `auto` | `100px 50px` | `50% 50%`
- `backgroundPosition`: `center` | `top left` | `10px 20px` | `50% 50%`
- `backgroundRepeat`: `repeat` | `no-repeat` | `repeat-x` | `repeat-y`

```tsx | preview
import { Canvas, View, Text } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 360

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 18, flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
				<View
					style={{ width: 200, height: 200 }}
					borderRadius={16}
					background="#222"
					backgroundImage="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
					backgroundSize="cover"
					backgroundPosition="center"
					border="2px solid rgba(255,255,255,0.2)"
				>
					<Text
						text="Cover + Center"
						style={{ fontSize: 16, fontWeight: 700, padding: 12 }}
						color="#fff"
					/>
				</View>
				<View
					style={{ width: 200, height: 200 }}
					borderRadius={16}
					background="#222"
					backgroundImage="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
					backgroundSize="60px"
					backgroundRepeat="repeat"
					border="2px solid rgba(255,255,255,0.2)"
				>
					<Text text="Repeat" style={{ fontSize: 16, fontWeight: 700, padding: 12 }} color="#fff" />
				</View>
			</View>
		</Canvas>
	)
}
```

## Props 要点

- `style?: YogaStyle`: 布局样式
- `style.transform?: string | number[]`：2D transform（translate/scale/rotate/skew/matrix）
- `style.transformOrigin?: string`：transform 原点（默认 center）
- `style.opacity?: number`：透明度（0~1）
- `style.overflow?: 'visible' | 'hidden'`：裁剪子内容（配合圆角）
- `style.zIndex?: number`：绘制与命中顺序（更大更靠上）
- `background?: string`: 背景色
- `backgroundImage?: string`: 图片 URL
- `backgroundSize?: string`: `cover` | `contain` | `auto` | `100px 50px` | `50% 50%`
- `backgroundPosition?: string`: `center` | `top left` | `10px 20px` | `50% 50%`
- `backgroundRepeat?: string`: `repeat` | `no-repeat` | `repeat-x` | `repeat-y`
- `border?: string`，例如 `1px solid rgba(255,255,255,0.2)`
- `borderRadius?: number`
- `scrollX?: boolean` / `scrollY?: boolean`：启用 X/Y 方向滚动（会裁剪子内容）
- `scrollbarX?: boolean` / `scrollbarY?: boolean`：是否显示滚动条（默认显示；设为 `false` 可隐藏）
- `scrollbarWidth?: number`（默认 `10`）、`scrollbarInset?: number`（默认 `6`）
- `scrollbarTrackColor?: string`（默认 `rgba(255,255,255,0.12)`）、`scrollbarThumbColor?: string`（默认 `rgba(255,255,255,0.35)`）
- `onScrollX?: (scrollLeft) => void` / `onScroll?: (scrollTop) => void`：滚动位置变化回调（支持滚轮与拖拽滚动条）
- `pointerEvents?: 'auto' | 'none'`：是否参与命中
- 事件回调：`onPointerDown/Move/Up/Cancel`、`onPointerEnter/Leave`、`onClick`（含 Capture 版本）
