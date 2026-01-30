import { describe, expect, test } from 'vitest'
import { resolvePath2D } from '../src/utils/path2d'

class FakePath2D {
	readonly d: string
	constructor(d: string) {
		if (d === 'throw') throw new Error('invalid')
		this.d = d
	}
}

describe('resolvePath2D', () => {
	test('returns null for empty d', () => {
		;(globalThis as any).Path2D = FakePath2D
		const node: any = { props: { d: '' }, path2d: null, pathSource: null }
		expect(resolvePath2D(node)).toBeNull()
		expect(node.path2d).toBeNull()
		expect(node.pathSource).toBeNull()
	})

	test('caches by d string', () => {
		;(globalThis as any).Path2D = FakePath2D
		const node: any = { props: { d: 'M0 0' }, path2d: null, pathSource: null }
		const p1 = resolvePath2D(node)
		const p2 = resolvePath2D(node)
		expect(p1).toBe(p2)
	})

	test('returns null for invalid path', () => {
		;(globalThis as any).Path2D = FakePath2D
		const node: any = { props: { d: 'throw' }, path2d: null, pathSource: null }
		expect(resolvePath2D(node)).toBeNull()
		expect(node.path2d).toBeNull()
		expect(node.pathSource).toBe('throw')
	})
})

