import type { RootNode } from './nodes'

/**
 * react-reconciler 的 Host Root “容器对象”。
 * root 保存场景树根节点；invalidate 用于通知外层在下一帧执行 layout+draw。
 */
export type CanvasContainer = {
	root: RootNode
	invalidate: () => void
	invalidateDrawOnly?: () => void
	notifyCommit?: () => void
	__rcfNeedsLayout?: boolean
	__rcfNeedsDraw?: boolean
}

/**
 * 创建运行时 Root 时需要的画布参数。
 */
export type CanvasRootOptions = {
	width: number
	height: number
	dpr: number
	clearColor?: string
	fontFamily?: string
	fontSize?: number
	fontWeight?: number | string
	lineHeight?: number
	profiling?: boolean | { maxFrames?: number; sceneSampleEveryNFrames?: number }
}

/**
 * Text 布局测量函数：
 * 给定 text + font + 可选 maxWidth，返回测量后的 width/height。
 */
export type MeasureTextFn = (
	text: string,
	font: string,
	maxWidth?: number,
) => { width: number; height: number }
