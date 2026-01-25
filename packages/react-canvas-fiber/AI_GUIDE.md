# AI Guide for react-canvas-fiber

This document provides a comprehensive guide for AI agents to understand, use, and extend the `react-canvas-fiber` project. It covers the architecture, core concepts, usage patterns, and development guidelines.

## 1. Project Overview

`react-canvas-fiber` is a custom React Renderer that renders React components to an HTML5 Canvas. It leverages `react-reconciler` for state management and updates, and integrates **Yoga Layout** (via `yoga-layout-prebuilt`) for a web-like Flexbox layout system.

### Key Characteristics

- **Renderer**: Custom Host Config implementation mapping React Virtual DOM to Canvas Scene Graph.
- **Layout**: Full Flexbox support powered by Yoga.
- **Rendering**: Canvas 2D API based rendering pipeline.
- **Events**: Synthetic event system simulating DOM events (bubbling, capturing) within the Canvas.
- **Runtime**: Supports high-performance updates using `requestAnimationFrame` loop (batched updates).

## 2. Directory Structure

- `src/components/`: Public React components (e.g., `<Canvas />`).
- `src/jsx/`: JSX type definitions.
- `src/layout/`: Layout calculation logic bridging internal nodes and Yoga.
- `src/render/`: Painting logic (draw calls).
- `src/runtime/`: Core runtime logic.
  - `reconciler.ts`: `react-reconciler` HostConfig implementation.
  - `nodes.ts`: Scene graph node definitions (`ViewNode`, `RectNode`, `TextNode`).
  - `root.ts`: Root container managing the render loop and event dispatching.
- `src/types/`: TypeScript type definitions.
- `src/utils/`: Utility functions.

## 3. Usage & Supported Elements

### Entry Point

The entry point is the `<Canvas />` component.

```tsx
import { Canvas } from 'react-canvas-fiber'

function App() {
	return (
		<Canvas width={800} height={600} style={{ border: '1px solid black' }}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text text="Hello World" style={{ fontSize: 20 }} color="black" />
			</View>
		</Canvas>
	)
}
```

- **Props**: `CanvasProps`
- **Key Attributes**:
  - `width`, `height`: Logical size (number).
  - `dpr`: Device pixel ratio (default 1).
  - `clearColor`: Frame clear color string.
  - `style`: CSS properties for the DOM canvas element.
  - `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`: Default text styles.

### Intrinsic Elements

#### `<View />`

Container element for layout and grouping.

- **Props**: `ViewProps`
- **Key Attributes**:
  - `style`: `YogaStyle` (flex, padding, margin, position, etc.)
  - `background`: Background color string.
  - `border`: Border string (e.g., `"1px solid red"`).
  - `borderRadius`: Number.
  - `scrollX`, `scrollY`: Booleans to enable scrolling.
  - `scrollbarX`, `scrollbarY`: Booleans to show/hide scrollbars (default `true` if scrolling enabled).
  - `scrollbarWidth`, `scrollbarInset`: Number (custom scrollbar appearance).
  - `scrollbarTrackColor`, `scrollbarThumbColor`: Color strings.
  - `onScroll`, `onScrollX`: Scroll callbacks.
  - `pointerEvents`: `'auto' | 'none'`.
  - Event handlers: `onClick`, `onPointerDown`, etc.

#### `<Image />`

Image primitive.

- **Props**: `ImageProps`
- **Key Attributes**:
  - `src`: **Mandatory** string (URL).
  - `style`: `YogaStyle`.
  - `objectFit`: `'cover' | 'contain' | 'fill'` (default `contain`).
  - `borderRadius`: Number.

#### `<Text />`

Text rendering element.

- **Props**: `TextProps`
- **Key Attributes**:
  - `text`: **Mandatory** string content (do not use children).
  - `style`: `YogaStyle` (supports `fontSize`, `fontFamily`, `fontWeight`, `lineHeight`).
  - `color`: Text color string.
  - `maxWidth`: Max width for wrapping.

#### `<Rect />`

Basic rectangle shape.

- **Props**: `RectProps`
- **Key Attributes**:
  - `style`: `YogaStyle`.
  - `fill`: Fill color.
  - `stroke`: Stroke color.
  - `lineWidth`: Stroke width.
  - `borderRadius`: Corner radius.

### Style Properties (`YogaStyle`)

Supports standard Flexbox properties:

- Layout: `width`, `height`, `flexDirection`, `justifyContent`, `alignItems`, `flexWrap`, `flexGrow`, `padding`, `margin`.
- Positioning: `position` ('relative' | 'absolute'), `top`, `left`, `right`, `bottom`.

## 4. Internal Architecture

### The Render Loop

1.  **React Updates**: React commits changes via `reconciler.ts`.
2.  **Invalidation**: `commitUpdate` triggers `container.invalidate()`.
3.  **rAF Loop**: `requestAnimationFrame` calls `renderFrame` in `root.ts`.
4.  **Layout Pass**:
    - Syncs Scene Graph props to Yoga Nodes.
    - Calculates layout via `yogaNode.calculateLayout()`.
    - Writes computed layout (x, y, w, h) back to Scene Graph nodes.
5.  **Draw Pass**:
    - Clears canvas.
    - Recursively calls `drawNode` (in `src/render/drawTree.ts`).

### Event System

- **Hit Testing**: `hitTest` function in `root.ts` traverses the Scene Graph (accounting for scroll offsets) to find the target node.
- **Dispatch**: Simulates `capture` and `bubble` phases.
- **Pointer Capture**: Supports implicit and explicit pointer capture for drag operations (e.g., scrollbars).

## 5. Development & Extension

### Adding a New Node Type

1.  **Define Node**: Add a new type in `src/types/nodes.ts` (e.g., `ImageNode`).
2.  **Define Props**: Add props interface in `src/types/jsx.ts`.
3.  **Register Intrinsic**: Add to `JSX.IntrinsicElements` in `src/intrinsics.d.ts`.
4.  **Implement Creation**: Update `createInstance` in `src/runtime/reconciler.ts` to instantiate the new node.
5.  **Implement Drawing**: Update `drawNode` in `src/render/drawTree.ts` to handle the new node type.

### Debugging

- Nodes have a `debugId`.
- Layout issues usually stem from Yoga configuration or `syncYogaTree` logic in `src/layout/layoutTree.ts`.
- Rendering issues are handled in `src/render/drawTree.ts`.

### Build & Watch

- **Build**: `npm run build` (uses tsup)
- **Watch**: `npm run dev`

## 6. Common Pitfalls for AI

- **Text Children**: `<Text>Content</Text>` is **NOT** supported. Must use `<Text text="Content" />`.
- **Z-Index**: Currently determined by tree order (painting order). No explicit `zIndex` support in styles yet.
- **Scrolling**: Requires `scrollX` or `scrollY` prop on `<View>` AND fixed dimensions (or flex constraints) to work.
