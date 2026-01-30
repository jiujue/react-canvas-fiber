export function hitTestEllipse(
	x: number,
	y: number,
	left: number,
	top: number,
	width: number,
	height: number,
): boolean {
	const rx = width / 2
	const ry = height / 2
	if (rx <= 0 || ry <= 0) return false
	const cx = left + rx
	const cy = top + ry
	const dx = (x - cx) / rx
	const dy = (y - cy) / ry
	return dx * dx + dy * dy <= 1
}

export function hitTestLineSegment(
	x: number,
	y: number,
	ax: number,
	ay: number,
	bx: number,
	by: number,
	threshold: number,
): boolean {
	const abx = bx - ax
	const aby = by - ay
	const apx = x - ax
	const apy = y - ay
	const abLenSq = abx * abx + aby * aby
	if (abLenSq <= 1e-9) {
		const dx = x - ax
		const dy = y - ay
		return dx * dx + dy * dy <= threshold * threshold
	}
	let t = (apx * abx + apy * aby) / abLenSq
	if (t < 0) t = 0
	else if (t > 1) t = 1
	const px = ax + t * abx
	const py = ay + t * aby
	const dx = x - px
	const dy = y - py
	return dx * dx + dy * dy <= threshold * threshold
}

