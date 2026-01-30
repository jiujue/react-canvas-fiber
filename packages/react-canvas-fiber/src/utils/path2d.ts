import type { PathNode } from '../types'

export function resolvePath2D(node: PathNode): Path2D | null {
	const d = (node.props as any)?.d
	if (typeof d !== 'string' || !d.trim()) {
		node.path2d = null
		node.pathSource = null
		return null
	}

	if (node.pathSource === d && node.path2d) return node.path2d

	try {
		const path = new Path2D(d)
		node.path2d = path
		node.pathSource = d
		return path
	} catch {
		node.path2d = null
		node.pathSource = d
		return null
	}
}

