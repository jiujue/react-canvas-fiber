import type { ReactNode } from 'react'

export type CanvasPointerEventType =
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

	fontSize?: number
	fontFamily?: string
	fontWeight?: number | string
	lineHeight?: number
}

export type ViewProps = {
	children?: ReactNode
	style?: YogaStyle
	background?: string
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
	children?: ReactNode
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
