import type { CanvasContainer } from './runtime'
import type {
	CircleProps,
	ImageProps,
	LineProps,
	PathProps,
	RectProps,
	TextProps,
	ViewProps,
} from './jsx'

/**
 * 场景树节点类型集合。
 *
 * Root 只存在于容器层；View/Rect/Text 对应 JSX intrinsic elements。
 */
export type NodeType = 'Root' | 'View' | 'Rect' | 'Circle' | 'Path' | 'Line' | 'Text' | 'Image'

/**
 * 布局结果：由 Yoga 计算得到的最终位置与尺寸（相对父节点坐标系）。
 */
export type Layout = {
	x: number
	y: number
	width: number
	height: number
}

/**
 * 所有节点的共同字段：
 * - parent/children：树结构
 * - props：来自 JSX 的属性
 * - layout：布局输出（Yoga computed layout）
 * - yogaNode：Yoga 的节点对象（WASM 绑定）
 */
export type BaseNode<T extends NodeType, P> = {
	type: T
	debugId: number
	parent: CanvasNode | RootNode | null
	children: CanvasNode[]
	props: P
	layout: Layout
	contentBounds?: Layout
	yogaNode: any | null
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

/**
 * Root 节点没有 props（用 Record<string, never> 表示“空对象”且不允许额外字段）。
 */
export type RootNode = BaseNode<'Root', Record<string, never>> & {
	container?: CanvasContainer
}
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
