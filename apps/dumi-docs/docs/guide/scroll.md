---
title: Scroll（View 滚动）
---

`View` 提供 `scrollX/scrollY` 与滚动条相关属性，用于实现画布内滚动容器。

```tsx | preview
import { Canvas, Rect, Text, View } from 'react-canvas-fiber'
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

```tsx | preview
import { Canvas, Rect, Text, View } from 'react-canvas-fiber'
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
					scrollX
					scrollbarX
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
