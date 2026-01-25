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

export const typePalette = ['系统', '模块', '目录', '数据', '接口']
export const ownerPalette = ['平台组', '数据组', '增长组', '业务组', '架构组']

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

type TreePlan = {
	depth: number
	nodesPerLevel: number[]
	childCounts: number[][]
}

function clampInt(value: number, min: number, max: number) {
	if (!Number.isFinite(value)) return min
	return Math.max(min, Math.min(max, Math.trunc(value)))
}

function createRng(seed: number) {
	let state = (seed | 0) ^ 0x9e3779b9
	const nextU32 = () => {
		state = (Math.imul(state, 1664525) + 1013904223) | 0
		return state >>> 0
	}
	return {
		nextU32,
		nextInt(maxExclusive: number) {
			if (maxExclusive <= 0) return 0
			return nextU32() % maxExclusive
		},
	}
}

function planTree(total: number, maxDepth: number, seed = 0): TreePlan {
	const clampedTotal = clampInt(total, 1, Number.MAX_SAFE_INTEGER)
	const requestedDepth = clampInt(maxDepth, 1, 32)
	const depth = Math.max(1, Math.min(requestedDepth, clampedTotal))
	const rng = createRng(seed)

	const nodesPerLevel = new Array(depth).fill(1)
	nodesPerLevel[0] = 1

	if (depth > 1) {
		const remaining = clampedTotal - depth
		const weights = new Array(depth).fill(0).map((_, level) => (level === 0 ? 0 : depth - level))
		const weightSum = weights.reduce((acc, w) => acc + w, 0)
		const fractional: Array<{ level: number; frac: number }> = []
		let allocated = 0

		for (let level = 1; level < depth; level += 1) {
			const raw = (remaining * weights[level]) / weightSum
			const add = Math.floor(raw)
			nodesPerLevel[level] += add
			allocated += add
			fractional.push({ level, frac: raw - add })
		}

		const left = remaining - allocated
		fractional.sort((a, b) => (b.frac !== a.frac ? b.frac - a.frac : a.level - b.level))
		for (let i = 0; i < left; i += 1) {
			nodesPerLevel[fractional[i % fractional.length].level] += 1
		}
	}

	const childCounts: number[][] = []
	for (let level = 0; level < depth - 1; level += 1) {
		const parentCount = nodesPerLevel[level]
		const childTotal = nodesPerLevel[level + 1]
		const base = Math.floor(childTotal / parentCount)
		const rem = childTotal % parentCount
		const counts = new Array(parentCount).fill(base)
		const offset = rng.nextInt(parentCount)
		for (let i = 0; i < rem; i += 1) {
			counts[(offset + i) % parentCount] += 1
		}
		childCounts.push(counts)
	}

	return { depth, nodesPerLevel, childCounts }
}

export function buildTree(total: number, maxDepth: number, seed = 0) {
	const plan = planTree(total, maxDepth, seed)
	const seedOffset = Math.abs(seed) % 997
	let cursor = 0

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

	const levels: TreeNode[][] = new Array(plan.depth)
	levels[0] = [makeNode()]
	for (let level = 0; level < plan.depth - 1; level += 1) {
		const parents = levels[level]
		const counts = plan.childCounts[level]
		const next: TreeNode[] = []
		for (let pIndex = 0; pIndex < parents.length; pIndex += 1) {
			const parent = parents[pIndex]
			const childCount = counts[pIndex] ?? 0
			for (let i = 0; i < childCount; i += 1) {
				const child = makeNode()
				parent.children.push(child)
				next.push(child)
			}
		}
		levels[level + 1] = next
	}

	return levels[0]
}

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
