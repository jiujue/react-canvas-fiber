# react-canvas-fiber

中文 | [English](./README.md)

基于 `react-reconciler` 的 Canvas 自定义渲染器（2D），并集成 Yoga Flexbox 布局。

## 安装

发布到 npm 后可直接安装：

```bash
pnpm add @jiujue/react-canvas-fiber
```

### Note: 本项目基于 React 内部机制实现，仅支持 React 18（>=18 <19），不兼容其他主版本。

本仓库内通过 pnpm workspace 引用（见 demo）。

## 使用

```tsx
import { Canvas, Image, Rect, Text, View } from '@jiujue/react-canvas-fiber'

export function Example() {
	return (
		<Canvas width={600} height={400} dpr={devicePixelRatio} clearColor="#0b1020">
			<View style={{ width: 600, height: 400, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="Hello" style={{ fontSize: 24, fontWeight: 700 }} color="#e6edf7" />
				<Rect style={{ width: 180, height: 44 }} borderRadius={10} fill="#2b6cff" />
				<Image
					src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503149779833-1de50ebe5f8a.webp"
					style={{ width: 100, height: 100 }}
					borderRadius={12}
					objectFit="cover"
				/>
			</View>
		</Canvas>
	)
}
```

## 组件与属性

### `Canvas`

桥接组件：负责创建/管理 DOM `<canvas>`、初始化自定义 renderer root，并转发 pointer/wheel 事件。

常用 props：

- `width: number` / `height: number`：逻辑尺寸（CSS 像素）
- `dpr?: number`（默认 `1`）：设备像素比；真实像素尺寸为 `width * dpr`、`height * dpr`
- `clearColor?: string`：每帧清屏颜色
- `fontFamily?: string`、`fontSize?: number`、`fontWeight?: number | string`、`lineHeight?: number`：文本默认样式（当 `Text`/祖先未提供时生效）
- `style?: CSSProperties`：应用到 DOM `<canvas>` 的样式（逻辑尺寸、display 等）
- `children?: ReactNode`：场景树

### `View`

布局容器（Yoga）+ 可选背景/边框 + 可选滚动。

常用 props：

- `style?: YogaStyle`：布局样式，见下方「布局（Yoga 子集）」
- `background?: string`：背景填充色
- `border?: string`：类似 CSS 的 border，支持：
  - `"<number>px solid <color>"`（例如 `1px solid rgba(255,255,255,0.2)`）
  - `"<number> <color>"`（例如 `2 #fff`）
  - `"<color>"`（等价于 `1px`，例如 `#fff`）
- `borderRadius?: number`
- `scrollX?: boolean`、`scrollY?: boolean`：开启滚动与裁剪
- `scrollbarX?: boolean`、`scrollbarY?: boolean`：是否显示滚动条（开启滚动时默认 `true`）
- `scrollbarWidth?: number`（默认 `10`）
- `scrollbarInset?: number`（默认 `6`）
- `scrollbarTrackColor?: string`（默认 `rgba(255,255,255,0.12)`）
- `scrollbarThumbColor?: string`（默认 `rgba(255,255,255,0.35)`）
- `onScrollX?: (scrollLeft: number) => void`
- `onScroll?: (scrollTop: number) => void`

### `Rect`

圆角矩形图元（也可以作为容器包含 children）。

常用 props：

- `style?: YogaStyle`
- `fill?: string`（默认 `#ffffff`）
- `stroke?: string`
- `lineWidth?: number`（默认 `1`）
- `borderRadius?: number`

### `Text`

文本图元。使用 `text`，不要传 children。

常用 props：

- `text: string`（必填）。支持 `\n` 手动换行。
- `style?: YogaStyle`：支持 `fontSize/fontFamily/fontWeight/lineHeight`（也会从祖先 / `Canvas` 默认值继承）
- `color?: string`（默认 `#ffffff`）
- `maxWidth?: number`：用于布局测量时限制测得的宽度（绘制阶段不会自动换行）

### `Image`

图片图元。使用 `src`，不要传 children。

常用 props：

- `src: string`（必填）
- `style?: YogaStyle`
- `objectFit?: 'cover' | 'contain' | 'fill'`（默认 `contain`）
- `borderRadius?: number`

## 事件

`View` / `Rect` / `Text` / `Image` 支持 pointer 事件：

- 命中测试受 `pointerEvents?: 'auto' | 'none'` 影响（`none` 会让节点对命中测试“透明”）。
- 支持冒泡 + 捕获：`onPointerDown/Move/Up/Cancel`、`onClick`，以及对应的 `*Capture`。
- Hover 事件：`onPointerEnter`、`onPointerLeave`（不走捕获/冒泡）。
- `click` 会在 `pointerup` 时触发：按下与抬起命中的是同一节点且 `button === 0`。

如果在事件回调里调用 `event.preventDefault()`，底层 `<canvas>` 对应的 DOM 事件会尽可能执行 `preventDefault()`。

## 布局（Yoga 子集）

主要通过 `style` 提供：

- 尺寸：`width/height/min/max`
- Flex：`flexDirection/justifyContent/alignItems/flexGrow/flexShrink/flexBasis/flexWrap/gap`
- 边距：`padding*`、`margin*`
- 定位：`position/top/right/bottom/left`
- 文本样式（供 `Text` 使用）：`fontSize/fontFamily/fontWeight/lineHeight`

## 实现说明

详见 [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)。

## 参与贡献

见仓库根目录的 [CONTRIBUTING.md](../../CONTRIBUTING.md)。

## License

MIT，见 [LICENSE](../../LICENSE)。
