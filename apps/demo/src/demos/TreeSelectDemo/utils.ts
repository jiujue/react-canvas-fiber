// 树节点的数据结构：用于生成原始层级树
export type TreeNode = {
	id: string
	label: string
	code: string
	type: string
	owner: string
	count: number
	children: TreeNode[]
}

// 展开后用于渲染的扁平节点：包含层级深度
export type FlatNode = {
	node: TreeNode
	depth: number
}

// 模拟业务字段：类型与负责人
export const typePalette = ['系统', '模块', '目录', '数据', '接口']
export const ownerPalette = ['平台组', '数据组', '增长组', '业务组', '架构组']

// 主题配置：统一控制 Canvas 与下拉内容颜色
export const themes = {
	dark: {
		canvasBg: '#0b1226',
		panelBg: 'rgba(15,23,42,0.9)',
		rowBg: 'rgba(148,163,184,0.08)',
		rowActive: 'rgba(59,130,246,0.35)',
		titleText: '#e2e8f0',
		metaText: '#94a3b8',
		labelText: '#cbd5f5',
		codeText: '#94a3b8',
		iconText: '#93c5fd',
		iconMuted: '#64748b',
		tagBg: 'rgba(59,130,246,0.2)',
		tagText: '#bfdbfe',
		countBg: 'rgba(34,197,94,0.2)',
		countText: '#86efac',
		scrollbarTrack: 'rgba(148,163,184,0.18)',
		scrollbarThumb: 'rgba(148,163,184,0.5)',
		inputBg: '#ffffff',
		inputText: '#0f172a',
		buttonBg: '#ffffff',
		buttonText: '#111827',
	},
	light: {
		canvasBg: '#f8fafc',
		panelBg: 'rgba(255,255,255,0.9)',
		rowBg: 'rgba(15,23,42,0.06)',
		rowActive: 'rgba(37,99,235,0.18)',
		titleText: '#0f172a',
		metaText: '#475569',
		labelText: '#334155',
		codeText: '#64748b',
		iconText: '#1d4ed8',
		iconMuted: '#94a3b8',
		tagBg: 'rgba(59,130,246,0.18)',
		tagText: '#1d4ed8',
		countBg: 'rgba(34,197,94,0.18)',
		countText: '#15803d',
		scrollbarTrack: 'rgba(100,116,139,0.2)',
		scrollbarThumb: 'rgba(100,116,139,0.55)',
		inputBg: '#ffffff',
		inputText: '#0f172a',
		buttonBg: '#ffffff',
		buttonText: '#111827',
	},
}

// 按总量与深度生成一棵树，便于调整性能与滚动演示规模
export function buildTree(total: number, maxDepth: number, seed = 0) {
	// 约束输入范围，避免极端值
	const clampedTotal = Math.max(8, Math.min(total, 360))
	const clampedDepth = Math.max(2, Math.min(maxDepth, 8))
	const seedOffset = Math.abs(seed) % 997
	let cursor = 0

	// 生成一个节点，并带上业务字段
	const makeNode = (): TreeNode => {
		const id = `node-${cursor}`
		const index = cursor
		const variant = index + seedOffset
		cursor += 1
		return {
			id,
			label: `节点 ${index + 1}`,
			code: `T${String(1000 + variant)}`,
			type: typePalette[variant % typePalette.length],
			owner: ownerPalette[(variant * 3) % ownerPalette.length],
			count: 6 + ((variant * 7) % 42),
			children: [],
		}
	}

	const roots: TreeNode[] = []
	const queue: Array<{ node: TreeNode; depth: number }> = []
	const rootCount = Math.min(4, clampedTotal)

	// 初始化若干根节点
	for (let i = 0; i < rootCount; i += 1) {
		const node = makeNode()
		roots.push(node)
		queue.push({ node, depth: 0 })
	}

	// 广度优先扩展，保证层级均匀增长
	while (queue.length && cursor < clampedTotal) {
		const current = queue.shift()
		if (!current) break
		if (current.depth >= clampedDepth - 1) continue

		const remaining = clampedTotal - cursor
		const baseCount = 1 + ((Number(current.node.id.split('-')[1]) + seedOffset) % 3)
		let childCount = baseCount + (current.depth % 2)
		if (clampedDepth === 2 && current.depth === 0) {
			const remainingParents = queue.length + 1
			const target = Math.ceil(remaining / remainingParents)
			childCount = Math.max(1, target)
		}
		childCount = Math.min(remaining, childCount)
		for (let i = 0; i < childCount; i += 1) {
			const child = makeNode()
			current.node.children.push(child)
			queue.push({ node: child, depth: current.depth + 1 })
			if (cursor >= clampedTotal) break
		}
	}

	return roots
}

// 根据展开状态把树拍平成列表，方便滚动渲染
export function flattenTree(nodes: TreeNode[], expanded: Set<string>) {
	const list: FlatNode[] = []
	const walk = (items: TreeNode[], depth: number) => {
		for (const node of items) {
			list.push({ node, depth })
			if (node.children.length && expanded.has(node.id)) {
				walk(node.children, depth + 1)
			}
		}
	}
	walk(nodes, 0)
	return list
}
