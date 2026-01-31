import type { CSSProperties, ReactNode } from 'react'
import type { CanvasWorkerDebugOptions } from './runtime'

/**
 * <Canvas/> 桥接组件 props。
 *
 * width/height 是“逻辑尺寸”；真实像素由 dpr 影响：
 * canvas.width  = width * dpr
 * canvas.height = height * dpr
 */
export type CanvasProps = {
	width: number
	height: number
	dpr?: number
	clearColor?: string
	fontFamily?: string
	fontSize?: number
	fontWeight?: number | string
	lineHeight?: number
	profiling?: boolean | { maxFrames?: number; sceneSampleEveryNFrames?: number }
	worker?: boolean | { debug?: CanvasWorkerDebugOptions | null }
	style?: CSSProperties
	children?: ReactNode
}
