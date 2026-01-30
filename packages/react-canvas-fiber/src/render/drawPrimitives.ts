import type { LineNode, PathNode } from '../types'
import { resolvePath2D } from '../utils'

export function drawPathNode(
	ctx: CanvasRenderingContext2D,
	node: PathNode,
	x: number,
	y: number,
) {
	const path = resolvePath2D(node)
	if (!path) return
	const fill = (node.props as any).fill ?? '#ffffff'
	const fillRule = (node.props as any).fillRule
	const stroke = (node.props as any).stroke
	const lineWidth = (node.props as any).lineWidth ?? 1
	ctx.save()
	ctx.translate(x, y)
	if (fill) {
		ctx.fillStyle = fill
		ctx.fill(path as any, fillRule)
	}
	if (stroke) {
		ctx.strokeStyle = stroke
		ctx.lineWidth = lineWidth
		ctx.stroke(path as any)
	}
	ctx.restore()
}

export function drawLineNode(
	ctx: CanvasRenderingContext2D,
	node: LineNode,
	x: number,
	y: number,
	w: number,
	h: number,
) {
	const stroke = (node.props as any).stroke ?? '#ffffff'
	const lineWidth = (node.props as any).lineWidth ?? 1
	const lineCap = (node.props as any).lineCap
	const x1 = (node.props as any).x1 ?? 0
	const y1 = (node.props as any).y1 ?? 0
	const x2 = (node.props as any).x2 ?? w
	const y2 = (node.props as any).y2 ?? h
	ctx.save()
	ctx.beginPath()
	ctx.moveTo(x + x1, y + y1)
	ctx.lineTo(x + x2, y + y2)
	ctx.strokeStyle = stroke
	ctx.lineWidth = lineWidth
	if (lineCap) ctx.lineCap = lineCap
	ctx.stroke()
	ctx.restore()
}

