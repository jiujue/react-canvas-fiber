---
title: Scroll（View 滚动）
---

`View` 提供 `scrollX/scrollY` 与滚动条相关属性，用于实现画布内滚动容器。

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 420

	const items = useMemo(() => Array.from({ length: 30 }, (_, i) => i + 1), [])
	const [scrollTop, setScrollTop] = useState(0)

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text
					text={`scrollTop: ${Math.round(scrollTop)}`}
					style={{ fontSize: 16, fontWeight: 700 }}
					color="#e5e7eb"
				/>

				<View
					scrollY
					scrollbarY
					scrollbarWidth={10}
					scrollbarInset={6}
					scrollbarTrackColor="rgba(255,255,255,0.10)"
					scrollbarThumbColor="rgba(255,255,255,0.35)"
					onScroll={(y) => setScrollTop(y)}
					style={{ width: 360, height: 320, padding: 12, flexDirection: 'column', gap: 10 }}
					background="rgba(255,255,255,0.06)"
					borderRadius={14}
				>
					{items.map((n) => (
						<View
							key={n}
							style={{
								width: 560,
								height: 44,
								flexDirection: 'row',
								alignItems: 'center',
								gap: 10,
							}}
						>
							<Rect
								style={{ width: 44, height: 44 }}
								borderRadius={12}
								fill={n % 2 ? '#60a5fa' : '#22c55e'}
							/>
							<Text text={`Item ${n}`} style={{ fontSize: 14 }} color="rgba(229,231,235,0.90)" />
						</View>
					))}
				</View>
			</View>
		</Canvas>
	)
}
```

## Scrollbar Customization

当 `scrollX/scrollY` 启用且内容超出容器尺寸时，会自动绘制滚动条；你也可以通过以下属性自定义外观：

- `scrollbarX/scrollbarY`: 是否显示滚动条（默认：滚动启用时显示；设为 `false` 可隐藏）
- `scrollbarWidth`: 滚动条宽度（默认 `10`）
- `scrollbarInset`: 滚动条距边缘的内缩（默认 `6`）
- `scrollbarTrackColor`: 轨道颜色（默认 `rgba(255,255,255,0.12)`）
- `scrollbarThumbColor`: 滑块颜色（默认 `rgba(255,255,255,0.35)`）

## 交互行为

- 鼠标滚轮会在命中路径上由内向外尝试消费 `deltaX/deltaY`，优先让最近的可滚动 `View` 滚动
- 支持拖拽滚动条滑块进行滚动

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useState } from 'react'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 420

	const items = useMemo(() => Array.from({ length: 30 }, (_, i) => i + 1), [])
	const [scrollLeft, setScrollLeft] = useState(0)

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text
					text={`scrollLeft: ${Math.round(scrollLeft)}`}
					style={{ fontSize: 16, fontWeight: 700 }}
					color="#e5e7eb"
				/>

				<View
					scrollX
					scrollbarX
					scrollbarWidth={10}
					scrollbarInset={6}
					scrollbarTrackColor="rgba(255,255,255,0.10)"
					scrollbarThumbColor="rgba(255,255,255,0.35)"
					onScrollX={(x) => setScrollLeft(x)}
					style={{ width: 360, height: 320, padding: 12, flexDirection: 'column', gap: 10 }}
					background="rgba(255,255,255,0.06)"
					borderRadius={14}
				>
					{items.map((n) => (
						<View
							key={n}
							style={{
								width: 560,
								height: 44,
								flexDirection: 'row',
								alignItems: 'center',
								gap: 10,
							}}
							background={'green'}
						>
							<Rect
								style={{ width: 44, height: 44 }}
								borderRadius={12}
								fill={n % 2 ? '#60a5fa' : '#22c55e'}
							/>
							<Text text={`Item ${n}`} style={{ fontSize: 14 }} color="rgba(229,231,235,0.90)" />
						</View>
					))}
				</View>
			</View>
		</Canvas>
	)
}
```

## Rounded Rect Clipping

`View` 在滚动时也会遵循 `borderRadius` 进行圆角裁剪。

```tsx | preview
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export default function Demo() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	return (
		<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 720, height: 320, justifyContent: 'center', alignItems: 'center' }}>
				<View scrollY style={{ width: 200, height: 200 }} background="#1e293b" borderRadius={60}>
					<Rect style={{ width: 200, height: 400 }} fill="#3b82f6" />
					<Text
						text="Scroll Me"
						color="#ffffff"
						style={{ zIndex: 1, marginTop: -300, marginLeft: 50 }}
					/>
				</View>
			</View>
		</Canvas>
	)
}
```
