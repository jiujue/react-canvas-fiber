import type { LineProps, NodeType } from '../src/types'
import { Line } from '../src/jsx'

type Assert<T extends true> = T
type Extends<A, B> = A extends B ? true : false

type _nodeType = Assert<Extends<'Line', NodeType>>

type _linePropsHasStyle = Assert<Extends<LineProps, { style?: unknown }>>

type _lineIsFunction = Assert<Extends<typeof Line, (props: LineProps) => unknown>>

