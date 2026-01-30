import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'node',
		include: ['tests/**/*.spec.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'lcov'],
			thresholds: {
				lines: 90,
				functions: 90,
				branches: 90,
				statements: 90,
			},
			include: [
				'src/runtime/hitTestPrimitives.ts',
				'src/utils/path2d.ts',
				'src/render/drawPrimitives.ts',
			],
		},
	},
})

