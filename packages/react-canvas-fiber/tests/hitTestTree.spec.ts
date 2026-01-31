import { describe, expect, test } from 'vitest'
import { createNode } from '../src/runtime/nodes'
import { hitTestTree } from '../src/runtime/root'

describe('hitTestTree', () => {
	test('picks topmost node by zIndex', () => {
		const low: any = createNode('Rect', { style: { zIndex: 1 } })
		low.layout = { x: 0, y: 0, width: 10, height: 10 }
		const high: any = createNode('Rect', { style: { zIndex: 2 } })
		high.layout = { x: 0, y: 0, width: 10, height: 10 }
		expect(hitTestTree([low, high], 5, 5, null)).toBe(high)
	})

	test('handles rotated rect hit area', () => {
		const rect: any = createNode('Rect', { style: { transform: 'rotate(90deg)' } })
		rect.layout = { x: 0, y: 0, width: 20, height: 10 }
		expect(hitTestTree([rect], 10, 14, null)).toBe(rect)
		expect(hitTestTree([rect], 10, 16, null)).toBe(null)
	})

	test('respects overflow:hidden for children outside', () => {
		const view: any = createNode('View', { style: { overflow: 'hidden' } })
		view.layout = { x: 0, y: 0, width: 10, height: 10 }

		const child: any = createNode('Rect', {})
		child.layout = { x: 12, y: 0, width: 5, height: 5 }
		child.parent = view
		view.children = [child]

		expect(hitTestTree([view], 13, 2, null)).toBe(null)
	})

	test('allows overflow:visible for children outside', () => {
		const view: any = createNode('View', { style: { overflow: 'visible' } })
		view.layout = { x: 0, y: 0, width: 10, height: 10 }

		const child: any = createNode('Rect', {})
		child.layout = { x: 12, y: 0, width: 5, height: 5 }
		child.parent = view
		view.children = [child]

		expect(hitTestTree([view], 13, 2, null)).toBe(child)
	})

	test('clips hit area by borderRadius when overflow:hidden', () => {
		const view: any = createNode('View', { style: { overflow: 'hidden' }, borderRadius: 5 })
		view.layout = { x: 0, y: 0, width: 10, height: 10 }

		expect(hitTestTree([view], 1, 1, null)).toBe(null)
		expect(hitTestTree([view], 5, 5, null)).toBe(view)
	})
})
