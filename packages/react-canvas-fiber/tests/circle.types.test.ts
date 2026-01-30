import type { CircleProps, NodeType } from '../src/types'
import { Circle } from '../src/jsx'

type Assert<T extends true> = T
type Extends<A, B> = A extends B ? true : false

type _nodeType = Assert<Extends<'Circle', NodeType>>

type _circlePropsHasStyle = Assert<Extends<CircleProps, { style?: unknown }>>

type _circleIsFunction = Assert<Extends<typeof Circle, (props: CircleProps) => unknown>>
