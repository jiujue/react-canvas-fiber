import { defineConfig } from 'dumi'

const pathPreFix = '@jiujue/react-canvas-fiber-dumi-pages'
export default defineConfig({
	title: 'Canvas Renderer',
	logo: `/${pathPreFix}/logo.svg`,
	base: `/${pathPreFix}/`,
	publicPath: `/${pathPreFix}/`,
	favicons: [`/${pathPreFix}/logo.svg`],

	outputPath: `dist`,
	// ① 启用 antd 主题
	theme: {
		'@dumi-theme-antd': {},
	},

	// ② pnpm + monorepo 稳定性配置（很重要）
	mfsu: false,

	// ③ 组件解析（你是组件库，一定要有）
	resolve: {
		atomDirs: [{ type: 'component', dir: 'src' }],
		entryFile: 'src/pages/index.tsx', // 指定首页入口
	},

	// ④ antd v5 样式（否则会看起来“怪”）
	styles: [
		`
    body { margin: 0; padding: 0; }
    `,
	],

	// ⑤ 主题配置（你原来的，保持不变）
	themeConfig: {
		name: 'react-canvas-fiber',
		nav: [
			{ title: '指南', link: '/guide/getting-started' },
			{ title: '调研', link: '/research/overview' },
			{ title: '组件', link: '/components/canvas' },
			{ title: '受控实例', link: '/controlled-demo/width' },
			{ title: '复杂示例', link: '/complex-example/tree-select' },
			{ title: '类型', link: '/types' },
		],

		sidebar: {
			'/guide': [
				{
					title: '指南',
					children: [
						{ title: 'Getting Started', link: '/guide/getting-started' },
						{ title: 'Layout（YogaStyle）', link: '/guide/layout' },
						{ title: 'Events（指针与点击）', link: '/guide/events' },
						{ title: 'Scroll（View 滚动）', link: '/guide/scroll' },
						{ title: 'DevTools', link: '/guide/devtools' },
					],
				},
			],
			'/components': [
				{
					title: '组件',
					children: [
						{ title: 'Canvas', link: '/components/canvas' },
						{ title: 'View', link: '/components/view' },
						{ title: 'Rect', link: '/components/rect' },
						{ title: 'Text', link: '/components/text' },
					],
				},
			],
			'/controlled-demo': [
				{
					title: '受控实例',
					children: [
						{ title: 'Rect width', link: '/controlled-demo/width' },
						{ title: 'Rect color', link: '/controlled-demo/color' },
						{ title: 'Text', link: '/controlled-demo/txt' },
						{ title: 'All', link: '/controlled-demo/all' },
					],
				},
			],
			'/complex-example': [
				{
					title: '复杂示例',
					children: [{ title: 'Tree Select', link: '/complex-example/tree-select' }],
				},
			],
			'/types': [
				{
					title: '类型',
					children: [{ title: '类型索引', link: '/types' }],
				},
			],
			'/research': [
				{
					title: '调研',
					children: [{ title: '竞品与定位', link: '/research/overview' }],
				},
			],
		},
		footer: 'Copyright © 2026 | Powered by jiujue',
	},
})
