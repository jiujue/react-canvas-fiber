import { describe, expect, test } from 'vitest'
import { hitTestEllipse, hitTestLineSegment } from '../src/runtime/hitTestPrimitives'

describe('hitTestEllipse', () => {
	test('returns true for center', () => {
		expect(hitTestEllipse(5, 5, 0, 0, 10, 10)).toBe(true)
	})

	test('returns false outside', () => {
		expect(hitTestEllipse(11, 5, 0, 0, 10, 10)).toBe(false)
	})

	test('returns false for non-positive radii', () => {
		expect(hitTestEllipse(0, 0, 0, 0, 0, 10)).toBe(false)
		expect(hitTestEllipse(0, 0, 0, 0, 10, 0)).toBe(false)
	})
})

describe('hitTestLineSegment', () => {
	test('hits near a horizontal segment', () => {
		expect(hitTestLineSegment(5, 0.5, 0, 0, 10, 0, 1)).toBe(true)
	})

	test('misses far from segment', () => {
		expect(hitTestLineSegment(5, 5, 0, 0, 10, 0, 1)).toBe(false)
	})

	test('clamps projection before segment start', () => {
		expect(hitTestLineSegment(-0.5, 0, 0, 0, 10, 0, 1)).toBe(true)
		expect(hitTestLineSegment(-2, 0, 0, 0, 10, 0, 1)).toBe(false)
	})

	test('clamps projection after segment end', () => {
		expect(hitTestLineSegment(10.5, 0, 0, 0, 10, 0, 1)).toBe(true)
		expect(hitTestLineSegment(12, 0, 0, 0, 10, 0, 1)).toBe(false)
	})

	test('handles degenerate segment', () => {
		expect(hitTestLineSegment(0.5, 0.5, 0, 0, 0, 0, 1)).toBe(true)
		expect(hitTestLineSegment(2, 2, 0, 0, 0, 0, 1)).toBe(false)
	})
})
