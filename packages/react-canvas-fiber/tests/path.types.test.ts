import type { NodeType, PathProps } from '../src/types'
import { Path } from '../src/jsx'

type Assert<T extends true> = T
type Extends<A, B> = A extends B ? true : false

type _nodeType = Assert<Extends<'Path', NodeType>>

type _pathPropsHasStyle = Assert<Extends<PathProps, { style?: unknown }>>

type _pathIsFunction = Assert<Extends<typeof Path, (props: PathProps) => unknown>>

