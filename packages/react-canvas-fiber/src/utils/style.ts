import type { YogaStyle } from '../types'

/**
 * 将类似 CSS 的 padding/margin 简写归一化为四边值。
 *
 * 支持：
 * - padding / paddingHorizontal / paddingVertical / paddingTop/Right/Bottom/Left
 * - margin / marginHorizontal / marginVertical / marginTop/Right/Bottom/Left
 */
export function normalizeInsets(style?: YogaStyle) {
	const paddingHorizontal = style?.paddingHorizontal ?? style?.padding ?? 0
	const paddingVertical = style?.paddingVertical ?? style?.padding ?? 0
	const marginHorizontal = style?.marginHorizontal ?? style?.margin ?? 0
	const marginVertical = style?.marginVertical ?? style?.margin ?? 0

	return {
		paddingTop: style?.paddingTop ?? paddingVertical,
		paddingRight: style?.paddingRight ?? paddingHorizontal,
		paddingBottom: style?.paddingBottom ?? paddingVertical,
		paddingLeft: style?.paddingLeft ?? paddingHorizontal,
		marginTop: style?.marginTop ?? marginVertical,
		marginRight: style?.marginRight ?? marginHorizontal,
		marginBottom: style?.marginBottom ?? marginVertical,
		marginLeft: style?.marginLeft ?? marginHorizontal,
	}
}
