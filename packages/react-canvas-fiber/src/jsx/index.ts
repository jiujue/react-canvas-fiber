import { createElement } from 'react'
import type { RectProps, TextProps, ViewProps } from '../types/jsx'
export type { RectProps, TextProps, ViewProps, YogaStyle } from '../types/jsx'

/**
 * JSX 层组件：本身不渲染到 DOM。
 *
 * 它们返回 intrinsic element（字符串 type），由自定义 reconciler 接管创建/更新节点：
 * - <View/> -> CanvasNode(type='View')
 * - <Rect/> -> CanvasNode(type='Rect')
 * - <Text/> -> CanvasNode(type='Text')
 */
export function View(props: ViewProps) {
	return createElement('View', props)
}

export function Rect(props: RectProps) {
	return createElement('Rect', props)
}

export function Text(props: TextProps) {
	return createElement('Text', props)
}
