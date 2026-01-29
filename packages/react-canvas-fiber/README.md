# react-canvas-fiber

[中文](./README.zh.md) | English

A Canvas custom renderer (2D) based on `react-reconciler`, integrated with Yoga Flexbox layout.

**Keywords**: react, canvas, renderer, fiber, yoga, layout, flexbox, 2d, ui, graphics

## Installation

Once published to npm, you can install it directly:

```bash
pnpm add @jiujue/react-canvas-fiber
```

#### Note: This is a custom React renderer and must use the same major React version (18.x) as its reconciler. Mixing versions will break at runtime.

Inside this monorepo, it is referenced via pnpm workspace (see the demo).

## 📖 Development & AI Guides

- [AI Guide](./AI_GUIDE.md) - A comprehensive guide for AI agents to understand, use, and extend this project.
- [Skill Manual](./SKILL.md) - A manual for users and AI to quickly master the usage and troubleshooting of this renderer.

## Usage

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

## Components

### `Canvas`

Bridge component that owns a DOM `<canvas>`, creates the custom renderer root, and forwards pointer/wheel events.

Common props:

- `width: number` / `height: number`: logical size (CSS pixels)
- `dpr?: number` (default `1`): device pixel ratio; the backing canvas uses `width * dpr`, `height * dpr`
- `clearColor?: string`: clears the whole canvas each frame
- `fontFamily?: string`, `fontSize?: number`, `fontWeight?: number | string`, `lineHeight?: number`: default text style (used when `Text`/ancestors don't provide them)
- `style?: CSSProperties`: applied to the DOM `<canvas>` (logical size, display, etc.)
- `children?: ReactNode`: scene tree

### `View`

Layout container (Yoga) + optional background/border + optional scrolling.

Common props:

- `style?: YogaStyle`: layout box; see Layout section below
- `background?: string`: background fill color
- `backgroundImage?: string`: image URL
- `backgroundSize?: string`: `cover` | `contain` | `auto` | `100px 50px` | `50% 50%`
- `backgroundPosition?: string`: `center` | `top left` | `10px 20px` | `50% 50%`
- `backgroundRepeat?: string`: `repeat` | `no-repeat` | `repeat-x` | `repeat-y`
- `border?: string`: CSS-like border. Supported forms:
  - `"<number>px solid <color>"` (e.g. `1px solid rgba(255,255,255,0.2)`)
  - `"<number> <color>"` (e.g. `2 #fff`)
  - `"<color>"` (means `1px`, e.g. `#fff`)
- `borderRadius?: number`
- `scrollX?: boolean`, `scrollY?: boolean`: enable scrolling + clipping
- `scrollbarX?: boolean`, `scrollbarY?: boolean`: show scrollbars (default `true` when scrolling is enabled)
- `scrollbarWidth?: number` (default `10`)
- `scrollbarInset?: number` (default `6`)
- `scrollbarTrackColor?: string` (default `rgba(255,255,255,0.12)`)
- `scrollbarThumbColor?: string` (default `rgba(255,255,255,0.35)`)
- `onScrollX?: (scrollLeft: number) => void`
- `onScroll?: (scrollTop: number) => void`

### `Rect`

Rounded rectangle primitive (can also contain children).

Common props:

- `style?: YogaStyle`
- `fill?: string` (default `#ffffff`)
- `stroke?: string`
- `lineWidth?: number` (default `1`)
- `borderRadius?: number`

### `Text`

Text primitive. Use `text`, do not pass children.

Common props:

- `text: string` (required). `\n` is supported for manual line breaks.
- `style?: YogaStyle`: supports `fontSize/fontFamily/fontWeight/lineHeight` (also inherited from ancestors / `Canvas` defaults)
- `color?: string` (default `#ffffff`)
- `maxWidth?: number`: used by layout measurement to clamp measured width (does not auto-wrap during drawing)

### `Image`

Image primitive. Use `src`, do not pass children.

Common props:

- `src: string` (required)
- `style?: YogaStyle`
- `objectFit?: 'cover' | 'contain' | 'fill'` (default `contain`)
- `borderRadius?: number`

## Events

`View` / `Rect` / `Text` / `Image` support pointer events:

- Hit test respects `pointerEvents?: 'auto' | 'none'` (`none` makes the node transparent to hit testing).
- Bubble + capture events: `onPointerDown/Move/Up/Cancel`, `onClick`, plus `*Capture` variants.
- Hover events: `onPointerEnter`, `onPointerLeave` (no capture/bubble).
- `click` fires on `pointerup` when the down/up target is the same node and `button === 0`.

If an event handler calls `event.preventDefault()`, the DOM event will be `preventDefault()`'d on the underlying `<canvas>` when possible.

## Layout (Yoga Subset)

Provided mainly via `style`:

- Size: `width/height/min/max`
- Flex: `flexDirection/justifyContent/alignItems/flexGrow/flexShrink/flexBasis/flexWrap/gap`
- Spacing: `padding*`, `margin*`
- Positioning: `position/top/right/bottom/left`
- Text style (used by `Text`): `fontSize/fontFamily/fontWeight/lineHeight`

## Implementation Notes

See [docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md).

## Contributing

See the repo root [CONTRIBUTING.md](../../CONTRIBUTING.md).

## License

MIT. See [LICENSE](../../LICENSE).
