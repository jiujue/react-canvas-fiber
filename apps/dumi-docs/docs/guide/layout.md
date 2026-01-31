---
title: Layout（YogaStyle）
---

`View` / `Rect` / `Text` 都可以传 `style`，布局子集由 Yoga 计算得出。

## Flex + gap

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 360

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="Row + gap" style={{ fontSize: 16, fontWeight: 700 }} color="#e5e7eb" />

				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					<Rect style={{ width: 140, height: 52 }} borderRadius={12} fill="#60a5fa" />
					<Rect
						style={{ flexGrow: 1, height: 52 }}
						borderRadius={12}
						fill="rgba(255,255,255,0.10)"
					/>
					<Rect style={{ width: 90, height: 52 }} borderRadius={12} fill="#22c55e" />
				</View>

				<Text
					text="Column + justifyContent"
					style={{ fontSize: 16, fontWeight: 700 }}
					color="#e5e7eb"
				/>
				<View
					style={{
						flexGrow: 1,
						padding: 12,
						flexDirection: 'column',
						justifyContent: 'space-between',
					}}
					background="rgba(255,255,255,0.06)"
					borderRadius={12}
				>
					<Text text="Top" style={{ fontSize: 14 }} color="rgba(229,231,235,0.9)" />
					<Text text="Bottom" style={{ fontSize: 14 }} color="rgba(229,231,235,0.9)" />
				</View>
			</View>
		</Canvas>
	)
}
```

## Absolute 定位

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 280

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 16, position: 'relative' }}>
				<Rect
					style={{ width: width - 32, height: height - 32 }}
					borderRadius={14}
					fill="rgba(255,255,255,0.06)"
				/>
				<Rect
					style={{ position: 'absolute', left: 34, top: 34, width: 200, height: 56 }}
					borderRadius={14}
					fill="#f59e0b"
				/>
				<Text
					text="absolute"
					style={{ position: 'absolute', left: 52, top: 52, fontSize: 16, fontWeight: 700 }}
					color="#111827"
				/>
			</View>
		</Canvas>
	)
}
```

## 绘制相关 style

以下字段不参与 Yoga 计算，但会影响绘制与命中：

- `style.transform?: string | number[]`：2D 变换（translate/scale/rotate/skew/matrix）
- `style.transformOrigin?: string`：变换原点（默认 center）
- `style.opacity?: number`：透明度（0~1）
- `style.overflow?: 'visible' | 'hidden'`：裁剪子内容（常用于配合圆角）
- `style.zIndex?: number`：影响绘制与命中顺序（更大更靠上）
