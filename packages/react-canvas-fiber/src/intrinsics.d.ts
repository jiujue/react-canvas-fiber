import type {
	CircleProps,
	GroupProps,
	ImageProps,
	LayerProps,
	LineProps,
	PathProps,
	RectProps,
	TextProps,
	ViewProps,
} from './types'

// 让 TS 能识别 <View /> <Rect /> <Text /> 这种“自定义 Host 组件”。
// 它们不是 React DOM 的 intrinsic elements，而是我们自定义 renderer 的 intrinsic elements。
declare global {
	namespace JSX {
		interface IntrinsicElements {
			View: ViewProps
			Group: GroupProps
			Layer: LayerProps
			Rect: RectProps
			Circle: CircleProps
			Path: PathProps
			Line: LineProps
			Text: TextProps
			Image: ImageProps
		}
	}
}

export {}
