import { describe, expect, test } from 'vitest'
import {
	parseTransform,
	resolveOpacity,
	resolveOverflowHidden,
	resolveTransformOrigin,
	resolveZIndex,
} from '../src/utils'

describe('parseTransform', () => {
	test('parses translate', () => {
		expect(parseTransform('translate(10px, 20)')).toEqual({ a: 1, b: 0, c: 0, d: 1, e: 10, f: 20 })
	})

	test('parses rotate(deg)', () => {
		const m = parseTransform('rotate(90deg)')
		expect(m.a).toBeCloseTo(0, 6)
		expect(m.b).toBeCloseTo(1, 6)
		expect(m.c).toBeCloseTo(-1, 6)
		expect(m.d).toBeCloseTo(0, 6)
	})

	test('parses scale', () => {
		expect(parseTransform('scale(2, 3)')).toEqual({ a: 2, b: 0, c: 0, d: 3, e: 0, f: 0 })
	})

	test('parses matrix', () => {
		expect(parseTransform('matrix(1, 2, 3, 4, 5, 6)')).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 })
	})
})

describe('style resolvers', () => {
	test('resolveOpacity clamps', () => {
		expect(resolveOpacity(-1)).toBe(0)
		expect(resolveOpacity(2)).toBe(1)
		expect(resolveOpacity(0.4)).toBe(0.4)
		expect(resolveOpacity('0.4')).toBe(1)
	})

	test('resolveOverflowHidden accepts hidden and true', () => {
		expect(resolveOverflowHidden('hidden')).toBe(true)
		expect(resolveOverflowHidden(true)).toBe(true)
		expect(resolveOverflowHidden('visible')).toBe(false)
	})

	test('resolveZIndex truncates numbers', () => {
		expect(resolveZIndex(1.9)).toBe(1)
		expect(resolveZIndex(-2.1)).toBe(-2)
		expect(resolveZIndex('2')).toBe(0)
	})

	test('resolveTransformOrigin supports keywords and percentages', () => {
		expect(resolveTransformOrigin('left top', 200, 100)).toEqual({ x: 0, y: 0 })
		expect(resolveTransformOrigin('50% 100%', 200, 100)).toEqual({ x: 100, y: 100 })
		expect(resolveTransformOrigin(undefined, 200, 100)).toEqual({ x: 100, y: 50 })
	})
})

