"use strict";(self.webpackChunkreact_canvas_fiber_docs=self.webpackChunkreact_canvas_fiber_docs||[]).push([[2311,9614],{54293:function(i,a,e){e.r(a);var o=e(23883),v=e(48274),p=e(31618),u=e(49290),c=e(15050),r=e(74908),m=e(82047),P=e(9129),C=e(3717),b=e(38418),E=e(15131),h=e(67531),x=e(19673),s=e(67029),_=e(29374),d=e(44194),t=e(35429),n=e(31549);function l(){return(0,n.jsx)(s.dY,{children:(0,n.jsx)(d.Suspense,{fallback:(0,n.jsx)(_.Z,{}),children:(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:"markdown",children:[(0,n.jsxs)("p",{children:[t.texts[0].value,(0,n.jsx)("code",{children:t.texts[1].value}),t.texts[2].value]}),(0,n.jsxs)("h2",{id:"typesindexts\u5BFC\u51FA\u5217\u8868",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#typesindexts\u5BFC\u51FA\u5217\u8868",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"types/index.ts\uFF08\u5BFC\u51FA\u5217\u8868\uFF09"]}),(0,n.jsx)(r.Z,{lang:"ts",children:t.texts[3].value}),(0,n.jsxs)("h2",{id:"canvasprops",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#canvasprops",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"CanvasProps"]}),(0,n.jsx)(r.Z,{lang:"ts",children:t.texts[4].value}),(0,n.jsxs)("h2",{id:"jsx--events--style",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#jsx--events--style",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"JSX / Events / Style"]}),(0,n.jsx)(r.Z,{lang:"ts",children:t.texts[5].value}),(0,n.jsxs)("h2",{id:"layoutengine",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#layoutengine",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"LayoutEngine"]}),(0,n.jsx)(r.Z,{lang:"ts",children:t.texts[6].value}),(0,n.jsxs)("h2",{id:"node-types",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#node-types",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"Node Types"]}),(0,n.jsx)(r.Z,{lang:"ts",children:t.texts[7].value}),(0,n.jsxs)("h2",{id:"runtime-types",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#runtime-types",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"Runtime Types"]}),(0,n.jsx)(r.Z,{lang:"ts",children:t.texts[8].value}),(0,n.jsxs)("h2",{id:"render-types",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#render-types",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"Render Types"]}),(0,n.jsx)(r.Z,{lang:"ts",children:t.texts[9].value}),(0,n.jsxs)("h2",{id:"jsx-intrinsicelementsintrinsicsdts",children:[(0,n.jsx)("a",{"aria-hidden":"true",tabIndex:"-1",href:"#jsx-intrinsicelementsintrinsicsdts",children:(0,n.jsx)("span",{className:"icon icon-link"})}),"JSX IntrinsicElements\uFF08intrinsics.d.ts\uFF09"]}),(0,n.jsx)(r.Z,{lang:"ts",children:t.texts[10].value})]})})})})}a.default=l},41418:function(i,a,e){e.d(a,{Z:function(){return o.Z}});var o=e(97505)},35429:function(i,a,e){e.r(a),e.d(a,{texts:function(){return o}});const o=[{value:"\u672C\u9875\u6C47\u603B ",paraId:0},{value:"react-canvas-fiber",paraId:0},{value:" \u7684 TypeScript \u7C7B\u578B\u5B9A\u4E49\uFF08\u4EE5\u6E90\u7801\u4E3A\u51C6\uFF09\u3002",paraId:0},{value:`export type { CanvasProps } from './canvas'
export type { LayoutEngine } from './layout'
export type {
	CanvasNode,
	CircleNode,
	ImageNode,
	Layout,
	LineNode,
	NodeType,
	PathNode,
	RectNode,
	RootNode,
	TextNode,
	ViewNode,
} from './nodes'
export type {
	CanvasPointerEvent,
	CanvasPointerEventHandler,
	CanvasPointerEventType,
	CircleProps,
	ImageProps,
	LineProps,
	PathProps,
	PointerEventsMode,
	RectProps,
	TextProps,
	ViewProps,
	YogaStyle,
} from './jsx'
export type { CanvasContainer, CanvasRootOptions, MeasureTextFn } from './runtime'
export type { DrawState } from './render'
`,paraId:1,tocIndex:0},{value:`export type CanvasProps = {
	width: number
	height: number
	dpr?: number
	clearColor?: string
	fontFamily?: string
	fontSize?: number
	fontWeight?: number | string
	lineHeight?: number
	style?: import('react').CSSProperties
	children?: import('react').ReactNode
}
`,paraId:2,tocIndex:1},{value:`export type CanvasPointerEventType =
	| 'pointerdown'
	| 'pointermove'
	| 'pointerup'
	| 'pointercancel'
	| 'click'
	| 'pointerenter'
	| 'pointerleave'

export type CanvasPointerEvent = {
	type: CanvasPointerEventType
	x: number
	y: number
	pointerId: number
	button: number
	buttons: number
	altKey: boolean
	ctrlKey: boolean
	shiftKey: boolean
	metaKey: boolean
	target: any
	currentTarget: any
	defaultPrevented: boolean
	stopPropagation: () => void
	preventDefault: () => void
}

export type CanvasPointerEventHandler = (event: CanvasPointerEvent) => void

export type PointerEventsMode = 'auto' | 'none'

export type YogaStyle = {
	width?: number
	height?: number
	minWidth?: number
	minHeight?: number
	maxWidth?: number
	maxHeight?: number

	flexDirection?: 'row' | 'column'
	justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
	alignItems?: 'stretch' | 'flex-start' | 'center' | 'flex-end'
	alignContent?: 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
	flexWrap?: 'no-wrap' | 'wrap'

	flexGrow?: number
	flexShrink?: number
	flexBasis?: number

	padding?: number
	paddingHorizontal?: number
	paddingVertical?: number
	paddingTop?: number
	paddingRight?: number
	paddingBottom?: number
	paddingLeft?: number

	margin?: number
	marginHorizontal?: number
	marginVertical?: number
	marginTop?: number
	marginRight?: number
	marginBottom?: number
	marginLeft?: number

	position?: 'relative' | 'absolute'
	top?: number
	right?: number
	bottom?: number
	left?: number

	gap?: number

	transform?: string | number[]
	transformOrigin?: string
	overflow?: 'visible' | 'hidden'
	zIndex?: number
	opacity?: number

	fontSize?: number
	fontFamily?: string
	fontWeight?: number | string
	lineHeight?: number
}

export type ViewProps = {
	children?: import('react').ReactNode
	style?: YogaStyle
	background?: string
	backgroundImage?: string
	backgroundPosition?: string
	backgroundSize?: string
	backgroundRepeat?: string
	border?: string
	borderRadius?: number
	scrollX?: boolean
	scrollY?: boolean
	scrollbarX?: boolean
	scrollbarY?: boolean
	scrollbarWidth?: number
	scrollbarInset?: number
	scrollbarTrackColor?: string
	scrollbarThumbColor?: string
	onScrollX?: (scrollLeft: number) => void
	onScroll?: (scrollTop: number) => void
	pointerEvents?: PointerEventsMode
	onPointerDownCapture?: CanvasPointerEventHandler
	onPointerDown?: CanvasPointerEventHandler
	onPointerMoveCapture?: CanvasPointerEventHandler
	onPointerMove?: CanvasPointerEventHandler
	onPointerUpCapture?: CanvasPointerEventHandler
	onPointerUp?: CanvasPointerEventHandler
	onPointerCancelCapture?: CanvasPointerEventHandler
	onPointerCancel?: CanvasPointerEventHandler
	onClickCapture?: CanvasPointerEventHandler
	onClick?: CanvasPointerEventHandler
	onPointerEnter?: CanvasPointerEventHandler
	onPointerLeave?: CanvasPointerEventHandler
}

export type RectProps = {
	children?: import('react').ReactNode
	style?: YogaStyle
	fill?: string
	stroke?: string
	lineWidth?: number
	borderRadius?: number
	pointerEvents?: PointerEventsMode
	onPointerDownCapture?: CanvasPointerEventHandler
	onPointerDown?: CanvasPointerEventHandler
	onPointerMoveCapture?: CanvasPointerEventHandler
	onPointerMove?: CanvasPointerEventHandler
	onPointerUpCapture?: CanvasPointerEventHandler
	onPointerUp?: CanvasPointerEventHandler
	onPointerCancelCapture?: CanvasPointerEventHandler
	onPointerCancel?: CanvasPointerEventHandler
	onClickCapture?: CanvasPointerEventHandler
	onClick?: CanvasPointerEventHandler
	onPointerEnter?: CanvasPointerEventHandler
	onPointerLeave?: CanvasPointerEventHandler
}

export type CircleProps = {
	children?: import('react').ReactNode
	style?: YogaStyle
	fill?: string
	stroke?: string
	lineWidth?: number
	pointerEvents?: PointerEventsMode
	onPointerDownCapture?: CanvasPointerEventHandler
	onPointerDown?: CanvasPointerEventHandler
	onPointerMoveCapture?: CanvasPointerEventHandler
	onPointerMove?: CanvasPointerEventHandler
	onPointerUpCapture?: CanvasPointerEventHandler
	onPointerUp?: CanvasPointerEventHandler
	onPointerCancelCapture?: CanvasPointerEventHandler
	onPointerCancel?: CanvasPointerEventHandler
	onClickCapture?: CanvasPointerEventHandler
	onClick?: CanvasPointerEventHandler
	onPointerEnter?: CanvasPointerEventHandler
	onPointerLeave?: CanvasPointerEventHandler
}

export type PathProps = {
	children?: import('react').ReactNode
	style?: YogaStyle
	d: string
	fill?: string
	fillRule?: CanvasFillRule
	stroke?: string
	lineWidth?: number
	pointerEvents?: PointerEventsMode
	onPointerDownCapture?: CanvasPointerEventHandler
	onPointerDown?: CanvasPointerEventHandler
	onPointerMoveCapture?: CanvasPointerEventHandler
	onPointerMove?: CanvasPointerEventHandler
	onPointerUpCapture?: CanvasPointerEventHandler
	onPointerUp?: CanvasPointerEventHandler
	onPointerCancelCapture?: CanvasPointerEventHandler
	onPointerCancel?: CanvasPointerEventHandler
	onClickCapture?: CanvasPointerEventHandler
	onClick?: CanvasPointerEventHandler
	onPointerEnter?: CanvasPointerEventHandler
	onPointerLeave?: CanvasPointerEventHandler
}

export type LineProps = {
	children?: import('react').ReactNode
	style?: YogaStyle
	x1?: number
	y1?: number
	x2?: number
	y2?: number
	stroke?: string
	lineWidth?: number
	lineCap?: CanvasLineCap
	pointerEvents?: PointerEventsMode
	onPointerDownCapture?: CanvasPointerEventHandler
	onPointerDown?: CanvasPointerEventHandler
	onPointerMoveCapture?: CanvasPointerEventHandler
	onPointerMove?: CanvasPointerEventHandler
	onPointerUpCapture?: CanvasPointerEventHandler
	onPointerUp?: CanvasPointerEventHandler
	onPointerCancelCapture?: CanvasPointerEventHandler
	onPointerCancel?: CanvasPointerEventHandler
	onClickCapture?: CanvasPointerEventHandler
	onClick?: CanvasPointerEventHandler
	onPointerEnter?: CanvasPointerEventHandler
	onPointerLeave?: CanvasPointerEventHandler
}

export type TextProps = {
	children?: never
	text: string
	style?: YogaStyle
	color?: string
	maxWidth?: number
	pointerEvents?: PointerEventsMode
	onPointerDownCapture?: CanvasPointerEventHandler
	onPointerDown?: CanvasPointerEventHandler
	onPointerMoveCapture?: CanvasPointerEventHandler
	onPointerMove?: CanvasPointerEventHandler
	onPointerUpCapture?: CanvasPointerEventHandler
	onPointerUp?: CanvasPointerEventHandler
	onPointerCancelCapture?: CanvasPointerEventHandler
	onPointerCancel?: CanvasPointerEventHandler
	onClickCapture?: CanvasPointerEventHandler
	onClick?: CanvasPointerEventHandler
	onPointerEnter?: CanvasPointerEventHandler
	onPointerLeave?: CanvasPointerEventHandler
}

export type ImageProps = {
	children?: never
	style?: YogaStyle
	src: string
	objectFit?: 'cover' | 'contain' | 'fill'
	borderRadius?: number
	pointerEvents?: PointerEventsMode
	onPointerDownCapture?: CanvasPointerEventHandler
	onPointerDown?: CanvasPointerEventHandler
	onPointerMoveCapture?: CanvasPointerEventHandler
	onPointerMove?: CanvasPointerEventHandler
	onPointerUpCapture?: CanvasPointerEventHandler
	onPointerUp?: CanvasPointerEventHandler
	onPointerCancelCapture?: CanvasPointerEventHandler
	onPointerCancel?: CanvasPointerEventHandler
	onClickCapture?: CanvasPointerEventHandler
	onClick?: CanvasPointerEventHandler
	onPointerEnter?: CanvasPointerEventHandler
	onPointerLeave?: CanvasPointerEventHandler
}
`,paraId:3,tocIndex:2},{value:`export type LayoutEngine = {
	yoga: Awaited<ReturnType<import('yoga-layout/load').loadYoga>>
}
`,paraId:4,tocIndex:3},{value:`export type NodeType = 'Root' | 'View' | 'Rect' | 'Circle' | 'Path' | 'Line' | 'Text' | 'Image'

export type Layout = {
	x: number
	y: number
	width: number
	height: number
}

export type BaseNode<T extends NodeType, P> = {
	type: T
	parent: CanvasNode | RootNode | null
	children: CanvasNode[]
	props: P
	layout: Layout
	contentBounds?: Layout
	yogaNode: any | null
	debugId: number
	scrollLeft?: number
	scrollTop?: number
	scrollContentWidth?: number
	scrollContentHeight?: number
	scrollbarDrag?: {
		axis: 'x' | 'y'
		pointerId: number
		startPointer: number
		startScroll: number
	} | null
}

export type RootNode = BaseNode<'Root', Record<string, never>>
export type ViewNode = BaseNode<'View', ViewProps> & {
	backgroundImageInstance: HTMLImageElement | null
}
export type RectNode = BaseNode<'Rect', RectProps>
export type CircleNode = BaseNode<'Circle', CircleProps>
export type PathNode = BaseNode<'Path', PathProps> & {
	path2d: Path2D | null
	pathSource: string | null
}
export type LineNode = BaseNode<'Line', LineProps>
export type TextNode = BaseNode<'Text', TextProps>
export type ImageNode = BaseNode<'Image', ImageProps> & {
	imageInstance: HTMLImageElement | null
}

export type CanvasNode =
	| ViewNode
	| RectNode
	| CircleNode
	| PathNode
	| LineNode
	| TextNode
	| ImageNode
`,paraId:5,tocIndex:4},{value:`export type CanvasContainer = {
	root: RootNode
	invalidate: () => void
	notifyCommit?: () => void
}

export type CanvasRootOptions = {
	width: number
	height: number
	dpr: number
	clearColor?: string
	fontFamily?: string
	fontSize?: number
	fontWeight?: number | string
	lineHeight?: number
}

export type MeasureTextFn = (
	text: string,
	font: string,
	maxWidth?: number,
) => { width: number; height: number }
`,paraId:6,tocIndex:5},{value:`export type DrawState = {
	ctx: CanvasRenderingContext2D
	dpr: number
	defaults?: CanvasRootOptions
}
`,paraId:7,tocIndex:6},{value:`declare global {
	namespace JSX {
		interface IntrinsicElements {
			View: ViewProps
			Rect: RectProps
			Circle: CircleProps
			Path: PathProps
			Line: LineProps
			Text: TextProps
			Image: ImageProps
		}
	}
}
`,paraId:8,tocIndex:7}]}}]);
