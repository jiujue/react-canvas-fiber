---
name: 'react-canvas-fiber'
description: 'react-canvas-fiber 的使用与排障手册。使用 Canvas/View/Rect/Text/Image，处理布局/事件/滚动/性能与常见问题时参考。'
---

# react-canvas-fiber 使用指南（Skill）

这份文件面向“使用者”，用于在项目里快速上手 `@jiujue/react-canvas-fiber`：如何写 UI、如何做布局/事件/滚动，以及遇到问题时该从哪里查。

如果你在对话式编码场景中使用它，也可以把你的诉求前缀写成：

- `使用 react-canvas-fiber：<你的需求>`（例如：使用 react-canvas-fiber：做一个可滚动列表并支持点击）

## 最短上手

### 安装

```bash
npm i @jiujue/react-canvas-fiber react react-dom
```

### 最小示例

```tsx
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export function App() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

	return (
		<Canvas width={720} height={320} dpr={dpr} clearColor="#0b1020" style={{ borderRadius: 12 }}>
			<View style={{ width: 720, height: 320, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="Hello Canvas" style={{ fontSize: 18, fontWeight: 700 }} color="#e5e7eb" />
				<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
					<Rect style={{ width: 140, height: 56 }} borderRadius={14} fill="#60a5fa" />
					<Rect
						style={{ flexGrow: 1, height: 56 }}
						borderRadius={14}
						fill="rgba(255,255,255,0.10)"
					/>
				</View>
			</View>
		</Canvas>
	)
}
```

## 核心概念（理解这 4 点就够用）

1. 这是一个自定义 React Renderer：JSX 渲染到 Canvas2D，而不是 DOM。
2. `View/Rect/Text/Image` 都是“Host 节点”，布局交给 Yoga（Flexbox）。
3. `Canvas width/height` 是“逻辑尺寸”，实际渲染像素由 `dpr` 影响。
4. React commit 会被合帧：commit 后触发下一帧执行 layout + draw。

## API 速查

### Canvas

- `width`, `height`: 逻辑尺寸（number）
- `dpr?: number`: 设备像素比，建议传 `window.devicePixelRatio || 1`
- `clearColor?: string`: 每帧清屏颜色
- `fontFamily/fontSize/fontWeight/lineHeight`: 默认字体参数（影响 Text 测量与绘制）
- `style?: CSSProperties`: 作用于 DOM `<canvas>`（例如圆角/边框）

### View（容器）

- `style?: YogaStyle`: 布局与尺寸
- `background?: string`, `border?: string`, `borderRadius?: number`
- 滚动：
  - `scrollX?: boolean`, `scrollY?: boolean`
  - `scrollbarX/scrollbarY?: boolean`
  - `scrollbarWidth?: number`, `scrollbarInset?: number`
  - `scrollbarTrackColor?: string`, `scrollbarThumbColor?: string`
  - `onScroll?(scrollTop: number)`, `onScrollX?(scrollLeft: number)`
- 事件：支持 `onPointer* / onClick / onPointerEnter/Leave`，也支持 `Capture` 版本
- `pointerEvents?: 'auto' | 'none'`: 设置为 `none` 可让该节点及其子树不参与命中

### Rect（矩形）

- `fill?: string`, `stroke?: string`, `lineWidth?: number`, `borderRadius?: number`
- 事件与 `pointerEvents` 同 View

### Text（文本）

- `text: string`：必须用这个传文本
- `children?: never`：不支持 `<Text>xxx</Text>`
- `color?: string`
- `maxWidth?: number`: 约束宽度用于测量/换行
- 字体相关放在 `style`: `fontSize/fontFamily/fontWeight/lineHeight`

### Image（图片）

- `src: string`：必填
- `objectFit?: 'cover' | 'contain' | 'fill'`（默认 `contain`）
- `borderRadius?: number`
- `children?: never`

## YogaStyle（支持的布局能力）

YogaStyle 接受的值基本都是 number（不支持百分比字符串）。常用字段：

- 尺寸：`width/height/minWidth/minHeight/maxWidth/maxHeight`
- Flex：`flexDirection/justifyContent/alignItems/alignContent/flexWrap`
- Flex 子项：`flexGrow/flexShrink/flexBasis`
- 间距：`padding* / margin* / gap`
- 定位：`position ('relative'|'absolute')` + `top/right/bottom/left`
- 文本：`fontSize/fontFamily/fontWeight/lineHeight`

## 事件系统（指针与点击）

支持事件：

- `onPointerDown/Move/Up/Cancel`（含 Capture 版本）
- `onClick`（含 Capture 版本）
- `onPointerEnter/onPointerLeave`

事件对象关键字段：

- `x/y`: 相对 Canvas 左上角的逻辑坐标
- `target/currentTarget`: 命中的节点（运行时对象）
- `stopPropagation()`, `preventDefault()`

### 示例：点击切换

```tsx
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export function ClickToggle() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const [active, setActive] = useState(false)

	return (
		<Canvas width={480} height={200} dpr={dpr} clearColor="#0b1020">
			<View style={{ width: 480, height: 200, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text
					text={active ? 'ACTIVE' : 'INACTIVE'}
					style={{ fontSize: 18, fontWeight: 700 }}
					color="#e5e7eb"
				/>
				<Rect
					style={{ width: 220, height: 54 }}
					borderRadius={14}
					fill={active ? '#22c55e' : '#ef4444'}
					onClick={() => setActive((v) => !v)}
				/>
			</View>
		</Canvas>
	)
}
```

### 示例：拖拽移动（pointerdown + pointermove）

```tsx
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useState } from 'react'

export function DragRect() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 520
	const height = 260

	const [dragging, setDragging] = useState(false)
	const [pos, setPos] = useState({ x: 60, y: 90 })
	const [offset, setOffset] = useState({ x: 0, y: 0 })

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 16, position: 'relative' }}>
				<Text
					text={dragging ? 'Dragging…' : 'Drag the rect'}
					style={{ fontSize: 16, fontWeight: 700 }}
					color="#e5e7eb"
				/>
				<Rect
					style={{ position: 'absolute', left: pos.x, top: pos.y, width: 200, height: 54 }}
					borderRadius={14}
					fill="#f59e0b"
					onPointerDown={(e) => {
						setDragging(true)
						setOffset({ x: e.x - pos.x, y: e.y - pos.y })
					}}
					onPointerMove={(e) => {
						if (!dragging) return
						setPos({ x: e.x - offset.x, y: e.y - offset.y })
					}}
					onPointerUp={() => setDragging(false)}
					onPointerCancel={() => setDragging(false)}
				/>
			</View>
		</Canvas>
	)
}
```

## 滚动（View 滚动容器）

开启滚动只需要在 View 上打开 `scrollY` 或 `scrollX`，并确保该 View 具有确定的可视尺寸（例如 `style.width/style.height` 或在父布局里能推导出明确尺寸）。

### 示例：纵向滚动列表

```tsx
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'
import { useMemo, useState } from 'react'

export function ScrollList() {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 520
	const height = 360

	const items = useMemo(() => Array.from({ length: 30 }, (_, i) => i + 1), [])
	const [scrollTop, setScrollTop] = useState(0)

	return (
		<Canvas width={width} height={height} dpr={dpr} clearColor="#0b1020">
			<View style={{ width, height, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text
					text={`scrollTop: ${Math.round(scrollTop)}`}
					style={{ fontSize: 14, fontWeight: 700 }}
					color="#e5e7eb"
				/>

				<View
					scrollY
					scrollbarY
					scrollbarWidth={10}
					scrollbarInset={6}
					scrollbarTrackColor="rgba(255,255,255,0.10)"
					scrollbarThumbColor="rgba(255,255,255,0.35)"
					onScroll={setScrollTop}
					style={{ width: 360, height: 260, padding: 12, flexDirection: 'column', gap: 10 }}
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

## 常见坑（高频）

- Text 只能用 `text`，不支持 children
- YogaStyle 里大部分字段都是 number，不支持 `'100%'` 这类字符串
- 开启 `scrollX/scrollY` 的 View 必须有明确的可视尺寸，否则“看起来像不滚动”
- 命中顺序按“从后往前遍历子节点”处理，后绘制的更容易被命中
- `pointerEvents="none"` 会让节点及其子树直接跳过命中

## 想做更复杂的 UI（建议直接看这些）

- 使用示例与架构说明：`AI_GUIDE.md`
- dumi 文档（组件/布局/事件/滚动）：仓库的 `apps/dumi-docs/docs`
- demo 代码：仓库的 `apps/demo/src/demos`

## 需要扩展（新增一个节点类型）时怎么做

1. 定义节点与字段：`src/types/nodes.ts`
2. 定义 JSX props：`src/types/jsx.ts`
3. 注册 intrinsic：`src/intrinsics.d.ts`
4. 接入创建/更新：`src/runtime/reconciler.ts`
5. 接入布局同步（如需参与 Yoga）：`src/layout/layoutTree.ts`
6. 接入绘制：`src/render/drawTree.ts`
7. 接入交互（可命中/冒泡/滚动相关）：`src/runtime/root.ts`

## 排障从哪里开始查（按问题类型）

- 不重绘/合帧：`src/runtime/reconciler.ts`（commit 后 invalidate）→ `src/runtime/root.ts`（rAF）
- 布局不对：`src/layout/layoutTree.ts`
- 绘制不对：`src/render/drawTree.ts`
- 事件命中/滚动：`src/runtime/root.ts`（hitTest、滚动条命中、派发链路）
