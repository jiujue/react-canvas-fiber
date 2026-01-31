import type { CanvasRootOptions } from './runtime'

export type DrawState = {
	ctx: CanvasRenderingContext2D
	dpr: number
	defaults?: CanvasRootOptions
	perf?: { count: (name: string, delta?: number) => void }
}
