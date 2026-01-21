# react-canvas-fiber

基于 `react-reconciler` 的 Canvas 自定义渲染器（2D），并集成 Yoga Flexbox 布局。

## 安装

发布到 npm 后可直接安装：

```bash
pnpm add react-canvas-fiber
```

本仓库内通过 pnpm workspace 引用（见 demo）。

## 使用

```tsx
import { Canvas, Rect, Text, View } from 'react-canvas-fiber'

export function Example() {
	return (
		<Canvas width={600} height={400} dpr={devicePixelRatio} clearColor="#0b1020">
			<View style={{ width: 600, height: 400, padding: 16, flexDirection: 'column', gap: 12 }}>
				<Text text="Hello" style={{ fontSize: 24, fontWeight: 700 }} color="#e6edf7" />
				<Rect style={{ width: 180, height: 44 }} borderRadius={10} fill="#2b6cff" />
			</View>
		</Canvas>
	)
}
```

## 已支持的节点

- `View`：布局容器，可设置 `background/borderRadius`
- `Rect`：圆角矩形（fill/stroke/lineWidth/borderRadius）
- `Text`：文本（text/color + font style 子集）

## 布局（Yoga 子集）

主要通过 `style` 提供：

- 尺寸：`width/height/min/max`
- Flex：`flexDirection/justifyContent/alignItems/flexGrow/flexShrink/flexBasis/flexWrap/gap`
- 边距：`padding*`、`margin*`
- 定位：`position/top/right/bottom/left`

## 实现说明

详见 [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)。

## 参与贡献

见仓库根目录的 [CONTRIBUTING.md](../../CONTRIBUTING.md)。

## License

MIT，见 [LICENSE](../../LICENSE)。
