import Reconciler from 'react-reconciler'
import type { ReactNode } from 'react'
import type { CanvasNode } from './nodes'
import { createNode } from './nodes'
import { freeYogaSubtree } from '../layout'
import type { CanvasContainer } from '../types'

type UpdatePayload = any

/**
 * React Reconciler HostConfig（Mutation 模式）。
 *
 * 它的职责是把 React element 的增删改映射到我们的场景树：
 * - createInstance: 由 JSX intrinsic element 创建 CanvasNode
 * - append/remove/insert: 维护 parent.children 数组与 parent 指针
 * - resetAfterCommit: commit 结束后触发一次 invalidate（下一帧 layout+draw）
 *
 * 这里选择 Mutation 模式是为了实现简单：直接改 children 数组即可。
 */
const hostConfig: any = {
	now: Date.now,
	supportsMutation: true,
	isPrimaryRenderer: false,
	scheduleTimeout: setTimeout,
	cancelTimeout: clearTimeout,
	noTimeout: -1,

	getRootHostContext() {
		return null
	},
	getChildHostContext() {
		return null
	},
	shouldSetTextContent() {
		return false
	},

	createInstance(type: string, props: any) {
		return createNode(type as any, props)
	},
	createTextInstance() {
		/**
		 * 为了避免 React 字符串子节点与我们自定义 Text 节点语义冲突：
		 * 只支持 <Text text="..."/>，不支持 <Text>string</Text>。
		 */
		throw new Error('Text instances are not supported. Use <Text text="..."/>.')
	},
	appendInitialChild(parent: any, child: any) {
		hostConfig.appendChild(parent, child)
	},
	appendChild(parent: CanvasNode, child: CanvasNode) {
		child.parent = parent
		parent.children.push(child)
	},
	appendChildToContainer(container: CanvasContainer, child: CanvasNode) {
		child.parent = null
		container.root.children.push(child)
		container.invalidate()
	},
	insertBefore(parent: CanvasNode, child: CanvasNode, beforeChild: CanvasNode) {
		child.parent = parent
		const idx = parent.children.indexOf(beforeChild)
		if (idx >= 0) parent.children.splice(idx, 0, child)
		else parent.children.push(child)
	},
	insertInContainerBefore(container: CanvasContainer, child: CanvasNode, beforeChild: CanvasNode) {
		child.parent = null
		const idx = container.root.children.indexOf(beforeChild)
		if (idx >= 0) container.root.children.splice(idx, 0, child)
		else container.root.children.push(child)
		container.invalidate()
	},
	removeChild(parent: CanvasNode, child: CanvasNode) {
		const idx = parent.children.indexOf(child)
		if (idx >= 0) parent.children.splice(idx, 1)
		child.parent = null
		/**
		 * Yoga WASM 对象需要显式释放，否则频繁增删节点会导致内存泄漏。
		 */
		freeYogaSubtree(child)
	},
	removeChildFromContainer(container: CanvasContainer, child: CanvasNode) {
		const idx = container.root.children.indexOf(child)
		if (idx >= 0) container.root.children.splice(idx, 1)
		child.parent = null
		freeYogaSubtree(child)
		container.invalidate()
	},

	finalizeInitialChildren() {
		return false
	},
	prepareUpdate(_instance: CanvasNode, _type: string, _oldProps: any, newProps: any) {
		/**
		 * 为了保持实现最小：不做细粒度 diff，直接把 newProps 作为 updatePayload。
		 * commitUpdate 时整体替换 props，然后统一在 resetAfterCommit 做 invalidate。
		 */
		return newProps as UpdatePayload
	},
	commitUpdate(instance: CanvasNode, updatePayload: UpdatePayload) {
		instance.props = updatePayload
	},
	commitTextUpdate() {},
	resetTextContent() {},

	prepareForCommit() {
		return null
	},
	resetAfterCommit(container: CanvasContainer) {
		/**
		 * React commit 完成后安排下一帧渲染。
		 * 多次同步 commit 也会被 rAF 合帧。
		 */
		container.invalidate()
		container.notifyCommit?.()
	},
	clearContainer(container: CanvasContainer) {
		container.root.children = []
		container.invalidate()
		return false
	},

	getPublicInstance(instance: any) {
		return instance
	},

	hideInstance() {},
	unhideInstance() {},
	hideTextInstance() {},
	unhideTextInstance() {},
	detachDeletedInstance() {},
}

export const CanvasReconciler: any = Reconciler(hostConfig)

/**
 * 提供更接近 ReactDOMRoot 的接口：render/unmount。
 */
export function createReconcilerRoot(container: CanvasContainer) {
	const root = CanvasReconciler.createContainer(
		container,
		0,
		null,
		false,
		null,
		'',
		console.error,
		null,
	)
	return {
		render(element: ReactNode) {
			CanvasReconciler.updateContainer(element, root, null, () => {})
		},
		unmount() {
			CanvasReconciler.updateContainer(null, root, null, () => {})
		},
	}
}
