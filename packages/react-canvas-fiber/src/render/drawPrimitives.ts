import type { LineNode, PathNode } from '../types'
import { resolvePath2D } from '../utils'

export function drawPathNode(
	ctx: CanvasRenderingContext2D,
	node: PathNode,
	x: number,
	y: number,
	perf?: { count: (name: string, delta?: number) => void },
) {
	const path = resolvePath2D(node)
	if (!path) return
	const fill = (node.props as any).fill ?? '#ffffff'
	const fillRule = (node.props as any).fillRule
	const stroke = (node.props as any).stroke
	const lineWidth = (node.props as any).lineWidth ?? 1
	perf?.count('ctx.save')
	ctx.save()
	perf?.count('ctx.translate')
	ctx.translate(x, y)
	if (fill) {
		perf?.count('ctx.fillStyle.set')
		ctx.fillStyle = fill
		perf?.count('ctx.fill')
		ctx.fill(path as any, fillRule)
	}
	if (stroke) {
		perf?.count('ctx.strokeStyle.set')
		ctx.strokeStyle = stroke
		perf?.count('ctx.lineWidth.set')
		ctx.lineWidth = lineWidth
		perf?.count('ctx.stroke')
		ctx.stroke(path as any)
	}
	perf?.count('ctx.restore')
	ctx.restore()
}

export function drawLineNode(
	ctx: CanvasRenderingContext2D,
	node: LineNode,
	x: number,
	y: number,
	w: number,
	h: number,
	perf?: { count: (name: string, delta?: number) => void },
) {
	const stroke = (node.props as any).stroke ?? '#ffffff'
	const lineWidth = (node.props as any).lineWidth ?? 1
	const lineCap = (node.props as any).lineCap
	const x1 = (node.props as any).x1 ?? 0
	const y1 = (node.props as any).y1 ?? 0
	const x2 = (node.props as any).x2 ?? w
	const y2 = (node.props as any).y2 ?? h
	perf?.count('ctx.save')
	ctx.save()
	perf?.count('ctx.beginPath')
	ctx.beginPath()
	perf?.count('ctx.moveTo')
	ctx.moveTo(x + x1, y + y1)
	perf?.count('ctx.lineTo')
	ctx.lineTo(x + x2, y + y2)
	perf?.count('ctx.strokeStyle.set')
	ctx.strokeStyle = stroke
	perf?.count('ctx.lineWidth.set')
	ctx.lineWidth = lineWidth
	if (lineCap) perf?.count('ctx.lineCap.set')
	if (lineCap) ctx.lineCap = lineCap
	perf?.count('ctx.stroke')
	ctx.stroke()
	perf?.count('ctx.restore')
	ctx.restore()
}
