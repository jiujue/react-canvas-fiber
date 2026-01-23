# react-canvas-fiber

[中文](./README.zh.md.md) | English

A Canvas custom renderer (2D) based on `react-reconciler`, integrated with Yoga Flexbox layout.

## Installation

Once published to npm, you can install it directly:

```bash
pnpm add @jiujue/react-canvas-fiber
```

Inside this monorepo, it is referenced via pnpm workspace (see the demo).

## Usage

```tsx
import { Canvas, Rect, Text, View } from '@jiujue/react-canvas-fiber'

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

## Supported Nodes

- `View`: layout container, supports `background/borderRadius`
- `Rect`: rounded rectangle (fill/stroke/lineWidth/borderRadius)
- `Text`: text (`text/color` + a subset of font styles)

## Layout (Yoga Subset)

Provided mainly via `style`:

- Size: `width/height/min/max`
- Flex: `flexDirection/justifyContent/alignItems/flexGrow/flexShrink/flexBasis/flexWrap/gap`
- Spacing: `padding*`, `margin*`
- Positioning: `position/top/right/bottom/left`

## Implementation Notes

See [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md).

## Contributing

See the repo root [CONTRIBUTING.md](../../CONTRIBUTING.md).

## License

MIT. See [LICENSE](../../LICENSE).
