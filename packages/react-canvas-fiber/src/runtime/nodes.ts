import type { CanvasNode, NodeType, RootNode } from '../types'
export type {
	CanvasNode,
	CircleNode,
	LineNode,
	Layout,
	NodeType,
	PathNode,
	RootNode,
	RectNode,
	TextNode,
	ViewNode,
	ImageNode,
} from '../types'

let nextDebugId = 1

/**
 * 场景树节点的运行时实现。
 *
 * 类型定义集中在 src/types，runtime 侧只保留“创建节点”的行为：
 * - createRootNode: 容器根节点（不对应 JSX）
 * - createNode: JSX intrinsic element 对应的节点
 */
export function createRootNode(): RootNode {
	return {
		type: 'Root',
		debugId: nextDebugId++,
		parent: null,
		children: [],
		props: {},
		layout: { x: 0, y: 0, width: 0, height: 0 },
		contentBounds: undefined,
		yogaNode: null,
		scrollLeft: 0,
		scrollTop: 0,
		scrollContentWidth: 0,
		scrollContentHeight: 0,
		scrollbarDrag: null,
	}
}

/**
 * 根据 intrinsic element type 创建场景节点。
 */
export function createNode(type: Exclude<NodeType, 'Root'>, props: any): CanvasNode {
	const node = {
		type,
		debugId: nextDebugId++,
		parent: null,
		children: [],
		props,
		layout: { x: 0, y: 0, width: 0, height: 0 },
		contentBounds: undefined,
		yogaNode: null,
		scrollLeft: 0,
		scrollTop: 0,
		scrollContentWidth: 0,
		scrollContentHeight: 0,
		scrollbarDrag: null,
	} as CanvasNode

	if (type === 'Image') {
		;(node as any).imageInstance = null
	} else if (type === 'View') {
		;(node as any).backgroundImageInstance = null
	} else if (type === 'Path') {
		;(node as any).path2d = null
		;(node as any).pathSource = null
	}

	return node
}
