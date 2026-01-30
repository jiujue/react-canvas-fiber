import { createElement } from 'react'
import type {
	CircleProps,
	ImageProps,
	LineProps,
	PathProps,
	RectProps,
	TextProps,
	ViewProps,
} from '../types/jsx'
export type {
	CircleProps,
	ImageProps,
	LineProps,
	PathProps,
	RectProps,
	TextProps,
	ViewProps,
	YogaStyle,
} from '../types/jsx'

/**
 * JSX 层组件：本身不渲染到 DOM。
 *
 * 它们返回 intrinsic element（字符串 type），由自定义 reconciler 接管创建/更新节点：
 * - <View/> -> CanvasNode(type='View')
 * - <Rect/> -> CanvasNode(type='Rect')
 * - <Circle/> -> CanvasNode(type='Circle')
 * - <Path/> -> CanvasNode(type='Path')
 * - <Line/> -> CanvasNode(type='Line')
 * - <Text/> -> CanvasNode(type='Text')
 * - <Image/> -> CanvasNode(type='Image')
 */
export function View(props: ViewProps) {
	return createElement('View', props)
}

export function Rect(props: RectProps) {
	return createElement('Rect', props)
}

export function Circle(props: CircleProps) {
	return createElement('Circle', props)
}

export function Path(props: PathProps) {
	return createElement('Path', props)
}

export function Line(props: LineProps) {
	return createElement('Line', props)
}

export function Text(props: TextProps) {
	return createElement('Text', props)
}

export function Image(props: ImageProps) {
	return createElement('Image', props)
}
