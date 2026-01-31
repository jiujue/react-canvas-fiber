import { NavLink, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import ScrollDemo from './demos/ScrollDemo'
import FeatureDemo from './demos/FeatureDemo'
import PerfDemo from './demos/PerfDemo'
import TreeSelectDemo from './demos/TreeSelectDemo'
import ScrollCullingDemo from './demos/ScrollCullingDemo'
import BackgroundDemo from './demos/BackgroundDemo'
import ProfilingDemo from './demos/ProfilingDemo'

type DemoRoute = {
	key: string
	path: string
	label: string
	description: string
	element: JSX.Element
}

const demoRoutes: DemoRoute[] = [
	{
		key: 'scroll',
		path: 'scroll',
		label: 'Scroll',
		description: '滚动条 & 布局示例',
		element: <ScrollDemo />,
	},
	{
		key: 'culling',
		path: 'culling',
		label: 'Culling',
		description: '滚动视口外子树裁剪示例',
		element: <ScrollCullingDemo />,
	},
	{
		key: 'feature',
		path: 'feature',
		label: 'Feature',
		description: 'Image & Hover 示例',
		element: <FeatureDemo />,
	},
	{
		key: 'perf',
		path: 'perf',
		label: 'Perf',
		description: '大量节点 + 动画压力测试',
		element: <PerfDemo />,
	},
	{
		key: 'profiling',
		path: 'profiling',
		label: 'Profiling',
		description: '开启 profiling 的性能采样示例',
		element: <ProfilingDemo />,
	},
	{
		key: 'tree',
		path: 'tree',
		label: 'Tree Select',
		description: 'HTML Input + Canvas Tree 下拉选择',
		element: <TreeSelectDemo />,
	},
	{
		key: 'background',
		path: 'background',
		label: 'Background',
		description: 'Background Image Demo',
		element: <BackgroundDemo />,
	},
]

function Layout() {
	const { pathname } = useLocation()
	const currentKey = pathname.replace(/^\//, '').split('/')[0] || ''
	const current =
		demoRoutes.find((r) => r.path === currentKey || (currentKey === '' && r.path === 'background')) ??
		demoRoutes.find((r) => r.path === 'background') ??
		demoRoutes[0]

	return (
		<div
			style={{
				padding: 16,
				fontFamily: 'system-ui',
				display: 'grid',
				gridTemplateColumns: '220px 1fr',
				gap: 16,
				alignItems: 'start',
			}}
		>
			<div
				style={{
					position: 'sticky',
					top: 16,
					alignSelf: 'start',
					borderRadius: 12,
					border: '1px solid rgba(0,0,0,0.15)',
					padding: 10,
					background: '#ffffff',
				}}
			>
				<div style={{ fontWeight: 800, marginBottom: 10 }}>Demo</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
					{demoRoutes.map((r) => (
						<NavLink
							key={r.key}
							to={`/${r.path}`}
							style={({ isActive }) => ({
								padding: '6px 10px',
								borderRadius: 10,
								border: '1px solid rgba(0,0,0,0.12)',
								background: isActive ? '#111827' : '#ffffff',
								color: isActive ? '#ffffff' : '#111827',
								textDecoration: 'none',
								fontSize: 13,
								fontWeight: 650,
							})}
						>
							{r.label}
						</NavLink>
					))}
				</div>
			</div>

			<div>
				<div
					style={{
						display: 'flex',
						gap: 10,
						alignItems: 'baseline',
						marginBottom: 12,
					}}
				>
					<div style={{ fontSize: 18, fontWeight: 800 }}>{current?.label}</div>
					<div style={{ color: 'rgba(17,24,39,0.7)', fontSize: 12 }}>
						{current?.description}
					</div>
					<div style={{ marginLeft: 'auto', color: 'rgba(17,24,39,0.5)', fontSize: 12 }}>
						{pathname}
					</div>
				</div>

				<Outlet />
			</div>
		</div>
	)
}

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Navigate to="/background" replace />} />
				{demoRoutes.map((r) => (
					<Route key={r.key} path={r.path} element={r.element} />
				))}
			</Route>
			<Route path="*" element={<Navigate to="/background" replace />} />
		</Routes>
	)
}
