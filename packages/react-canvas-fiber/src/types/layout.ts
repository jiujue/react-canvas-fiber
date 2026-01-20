import type { loadYoga } from 'yoga-layout/load'

type YogaModule = Awaited<ReturnType<typeof loadYoga>>

export type LayoutEngine = {
	yoga: YogaModule
}
