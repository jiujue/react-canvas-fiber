import { describe, expect, test } from 'vitest'
import { drawLineNode, drawPathNode } from '../src/render/drawPrimitives'

class FakePath2D {
	readonly d: string
	constructor(d: string) {
		this.d = d
	}
}

function createMockCtx() {
	const calls: any[] = []
	const ctx: any = {
		save: () => calls.push(['save']),
		restore: () => calls.push(['restore']),
		translate: (x: number, y: number) => calls.push(['translate', x, y]),
		beginPath: () => calls.push(['beginPath']),
		moveTo: (x: number, y: number) => calls.push(['moveTo', x, y]),
		lineTo: (x: number, y: number) => calls.push(['lineTo', x, y]),
		stroke: (p?: any) => calls.push(['stroke', p]),
		fill: (p?: any, rule?: any) => calls.push(['fill', p, rule]),
		set strokeStyle(v: any) {
			calls.push(['strokeStyle', v])
		},
		set fillStyle(v: any) {
			calls.push(['fillStyle', v])
		},
		set lineWidth(v: any) {
			calls.push(['lineWidth', v])
		},
		set lineCap(v: any) {
			calls.push(['lineCap', v])
		},
	}
	return { ctx, calls }
}

describe('drawLineNode', () => {
	test('draws with defaults derived from layout', () => {
		const { ctx, calls } = createMockCtx()
		const node: any = { props: {} }
		drawLineNode(ctx, node, 10, 20, 100, 50)
		expect(calls).toContainEqual(['moveTo', 10, 20])
		expect(calls).toContainEqual(['lineTo', 110, 70])
		expect(calls).toContainEqual(['strokeStyle', '#ffffff'])
	})

	test('applies lineCap when provided', () => {
		const { ctx, calls } = createMockCtx()
		const node: any = { props: { lineCap: 'round', x1: 1, y1: 2, x2: 3, y2: 4 } }
		drawLineNode(ctx, node, 10, 20, 100, 50)
		expect(calls).toContainEqual(['lineCap', 'round'])
		expect(calls).toContainEqual(['moveTo', 11, 22])
		expect(calls).toContainEqual(['lineTo', 13, 24])
	})
})

describe('drawPathNode', () => {
	test('fills and strokes with translation', () => {
		;(globalThis as any).Path2D = FakePath2D
		const { ctx, calls } = createMockCtx()
		const node: any = {
			props: { d: 'M0 0', fill: '#0f0', stroke: '#00f', lineWidth: 3 },
			path2d: null,
			pathSource: null,
		}
		drawPathNode(ctx, node, 7, 9)
		expect(calls[0]).toEqual(['save'])
		expect(calls).toContainEqual(['translate', 7, 9])
		expect(calls).toContainEqual(['fillStyle', '#0f0'])
		expect(calls).toContainEqual(['strokeStyle', '#00f'])
		expect(calls).toContainEqual(['lineWidth', 3])
	})

	test('returns early when path is unavailable', () => {
		;(globalThis as any).Path2D = FakePath2D
		const { ctx, calls } = createMockCtx()
		const node: any = { props: { d: '' }, path2d: null, pathSource: null }
		drawPathNode(ctx, node, 7, 9)
		expect(calls.length).toBe(0)
	})

	test('skips fill and stroke when not provided', () => {
		;(globalThis as any).Path2D = FakePath2D
		const { ctx, calls } = createMockCtx()
		const node: any = { props: { d: 'M0 0', fill: '' }, path2d: null, pathSource: null }
		drawPathNode(ctx, node, 7, 9)
		expect(calls).toContainEqual(['save'])
		expect(calls).toContainEqual(['translate', 7, 9])
		expect(calls).not.toContainEqual(['fillStyle', ''])
		expect(calls.find((c) => c[0] === 'fill')).toBeUndefined()
		expect(calls.find((c) => c[0] === 'stroke')).toBeUndefined()
	})
})
