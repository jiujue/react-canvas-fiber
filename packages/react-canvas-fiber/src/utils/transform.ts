export type Matrix2D = {
	a: number
	b: number
	c: number
	d: number
	e: number
	f: number
}

export type Point2D = { x: number; y: number }

export const IDENTITY_MATRIX: Matrix2D = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }

export function multiplyMatrix(left: Matrix2D, right: Matrix2D): Matrix2D {
	// 中文说明：这里使用 Canvas2D 兼容的 2D 仿射矩阵（a,b,c,d,e,f），与 ctx.transform(a,b,c,d,e,f) 保持一致。
	return {
		a: left.a * right.a + left.c * right.b,
		b: left.b * right.a + left.d * right.b,
		c: left.a * right.c + left.c * right.d,
		d: left.b * right.c + left.d * right.d,
		e: left.a * right.e + left.c * right.f + left.e,
		f: left.b * right.e + left.d * right.f + left.f,
	}
}

export function invertMatrix(m: Matrix2D): Matrix2D | null {
	const det = m.a * m.d - m.b * m.c
	if (!Number.isFinite(det) || Math.abs(det) < 1e-12) return null
	const invDet = 1 / det
	return {
		a: m.d * invDet,
		b: -m.b * invDet,
		c: -m.c * invDet,
		d: m.a * invDet,
		e: (m.c * m.f - m.d * m.e) * invDet,
		f: (m.b * m.e - m.a * m.f) * invDet,
	}
}

export function applyToPoint(m: Matrix2D, x: number, y: number): Point2D {
	return { x: m.a * x + m.c * y + m.e, y: m.b * x + m.d * y + m.f }
}

export function translationMatrix(x: number, y: number): Matrix2D {
	return { a: 1, b: 0, c: 0, d: 1, e: x, f: y }
}

export function scaleMatrix(sx: number, sy: number): Matrix2D {
	return { a: sx, b: 0, c: 0, d: sy, e: 0, f: 0 }
}

export function rotationMatrix(rad: number): Matrix2D {
	const cos = Math.cos(rad)
	const sin = Math.sin(rad)
	return { a: cos, b: sin, c: -sin, d: cos, e: 0, f: 0 }
}

export function skewXMatrix(rad: number): Matrix2D {
	return { a: 1, b: 0, c: Math.tan(rad), d: 1, e: 0, f: 0 }
}

export function skewYMatrix(rad: number): Matrix2D {
	return { a: 1, b: Math.tan(rad), c: 0, d: 1, e: 0, f: 0 }
}

function parseNumberLike(input: string): number | null {
	const raw = input.trim()
	if (!raw) return null
	const normalized = raw.endsWith('px') ? raw.slice(0, -2) : raw
	const n = Number.parseFloat(normalized)
	return Number.isFinite(n) ? n : null
}

function parseAngleToRad(input: string): number | null {
	const raw = input.trim()
	if (!raw) return null
	if (raw.endsWith('deg')) {
		const n = parseNumberLike(raw.slice(0, -3))
		return n == null ? null : (n * Math.PI) / 180
	}
	if (raw.endsWith('rad')) {
		const n = parseNumberLike(raw.slice(0, -3))
		return n == null ? null : n
	}
	if (raw.endsWith('turn')) {
		const n = parseNumberLike(raw.slice(0, -4))
		return n == null ? null : n * Math.PI * 2
	}
	// 中文说明：未带单位时，按 deg 处理（更符合 UI 场景直觉）。
	const n = parseNumberLike(raw)
	return n == null ? null : (n * Math.PI) / 180
}

function splitArgs(raw: string): string[] {
	return raw
		.split(/[,|\s]+/g)
		.map((s) => s.trim())
		.filter(Boolean)
}

export function parseTransform(transform: unknown): Matrix2D {
	if (!transform) return IDENTITY_MATRIX

	if (Array.isArray(transform)) {
		// 支持 matrix 写法：2D (a,b,c,d,e,f) 或 4x4 (取二维仿射部分)
		if (transform.length === 6 && transform.every((v) => typeof v === 'number')) {
			const [a, b, c, d, e, f] = transform
			return { a, b, c, d, e, f }
		}
		if (transform.length === 16 && transform.every((v) => typeof v === 'number')) {
			// DOMMatrix 4x4: [m11,m12,m13,m14, m21,m22,...]
			const a = transform[0]
			const b = transform[1]
			const c = transform[4]
			const d = transform[5]
			const e = transform[12]
			const f = transform[13]
			return { a, b, c, d, e, f }
		}
		return IDENTITY_MATRIX
	}

	if (typeof transform !== 'string') return IDENTITY_MATRIX
	const text = transform.trim()
	if (!text) return IDENTITY_MATRIX

	const re = /([a-zA-Z0-9]+)\(([^)]*)\)/g
	let current: Matrix2D = IDENTITY_MATRIX
	let match: RegExpExecArray | null
	while ((match = re.exec(text))) {
		const fn = match[1]
		const args = splitArgs(match[2] || '')
		const lower = fn.toLowerCase()

		const apply = (m: Matrix2D) => {
			current = multiplyMatrix(current, m)
		}

		if (lower === 'matrix') {
			const nums = args.map((a) => parseNumberLike(a)).filter((n): n is number => n != null)
			if (nums.length >= 6) {
				const [a, b, c, d, e, f] = nums
				apply({ a, b, c, d, e, f })
			}
			continue
		}

		if (lower === 'translate') {
			const x = parseNumberLike(args[0] ?? '0') ?? 0
			const y = parseNumberLike(args[1] ?? '0') ?? 0
			apply(translationMatrix(x, y))
			continue
		}
		if (lower === 'translatex') {
			const x = parseNumberLike(args[0] ?? '0') ?? 0
			apply(translationMatrix(x, 0))
			continue
		}
		if (lower === 'translatey') {
			const y = parseNumberLike(args[0] ?? '0') ?? 0
			apply(translationMatrix(0, y))
			continue
		}

		if (lower === 'scale') {
			const sx = parseNumberLike(args[0] ?? '1') ?? 1
			const sy = parseNumberLike(args[1] ?? String(sx)) ?? sx
			apply(scaleMatrix(sx, sy))
			continue
		}
		if (lower === 'scalex') {
			const sx = parseNumberLike(args[0] ?? '1') ?? 1
			apply(scaleMatrix(sx, 1))
			continue
		}
		if (lower === 'scaley') {
			const sy = parseNumberLike(args[0] ?? '1') ?? 1
			apply(scaleMatrix(1, sy))
			continue
		}

		if (lower === 'rotate') {
			const rad = parseAngleToRad(args[0] ?? '0') ?? 0
			apply(rotationMatrix(rad))
			continue
		}

		if (lower === 'skew') {
			const ax = parseAngleToRad(args[0] ?? '0') ?? 0
			const ay = parseAngleToRad(args[1] ?? '0') ?? 0
			apply(skewXMatrix(ax))
			apply(skewYMatrix(ay))
			continue
		}
		if (lower === 'skewx') {
			const ax = parseAngleToRad(args[0] ?? '0') ?? 0
			apply(skewXMatrix(ax))
			continue
		}
		if (lower === 'skewy') {
			const ay = parseAngleToRad(args[0] ?? '0') ?? 0
			apply(skewYMatrix(ay))
			continue
		}
	}

	return current
}

export function resolveTransformOrigin(origin: unknown, w: number, h: number): Point2D {
	// 中文说明：遵循 CSS transform-origin 直觉：默认居中。
	if (origin == null) return { x: w / 2, y: h / 2 }
	if (typeof origin === 'number') return { x: origin, y: origin }
	if (typeof origin !== 'string') return { x: w / 2, y: h / 2 }

	const raw = origin.trim()
	if (!raw) return { x: w / 2, y: h / 2 }
	if (raw === 'center') return { x: w / 2, y: h / 2 }

	const parts = raw.split(/\s+/g).filter(Boolean)
	const xRaw = parts[0] ?? '50%'
	const yRaw = parts[1] ?? '50%'

	const resolveOne = (v: string, size: number, axis: 'x' | 'y') => {
		const lower = v.toLowerCase()
		if (lower === 'center') return size / 2
		if (axis === 'x' && lower === 'left') return 0
		if (axis === 'x' && lower === 'right') return size
		if (axis === 'y' && lower === 'top') return 0
		if (axis === 'y' && lower === 'bottom') return size
		if (lower.endsWith('%')) {
			const p = parseNumberLike(lower.slice(0, -1))
			return p == null ? size / 2 : (size * p) / 100
		}
		const n = parseNumberLike(lower)
		return n == null ? size / 2 : n
	}

	return { x: resolveOne(xRaw, w, 'x'), y: resolveOne(yRaw, h, 'y') }
}

export function resolveOpacity(value: unknown): number {
	if (typeof value !== 'number' || !Number.isFinite(value)) return 1
	if (value <= 0) return 0
	if (value >= 1) return 1
	return value
}

export function resolveZIndex(value: unknown): number {
	if (typeof value !== 'number' || !Number.isFinite(value)) return 0
	return Math.trunc(value)
}

export function resolveOverflowHidden(value: unknown): boolean {
	return value === 'hidden' || value === true
}

export function estimateUniformScale(m: Matrix2D): number {
	// 中文说明：用于把 lineWidth 等“视觉尺寸”在 hitTest 中近似映射到 canvas 空间。
	const det = m.a * m.d - m.b * m.c
	if (!Number.isFinite(det)) return 1
	const s = Math.sqrt(Math.abs(det))
	return Number.isFinite(s) && s > 0 ? s : 1
}
