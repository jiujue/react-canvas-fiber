import { useState } from 'react'
import ScrollDemo from './demos/ScrollDemo'
import FeatureDemo from './demos/FeatureDemo'
import PerfDemo from './demos/PerfDemo'
import TreeSelectDemo from './demos/TreeSelectDemo'
import ScrollCullingDemo from './demos/ScrollCullingDemo'

export default function App() {
	const [mode, setMode] = useState<'scroll' | 'cull' | 'feature' | 'perf' | 'tree'>('scroll')

	return (
		<div style={{ padding: 16, fontFamily: 'system-ui' }}>
			<div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
				<button
					type="button"
					onClick={() => setMode('scroll')}
					style={{
						padding: '6px 10px',
						borderRadius: 8,
						border: '1px solid rgba(0,0,0,0.15)',
						background: mode === 'scroll' ? '#111827' : '#ffffff',
						color: mode === 'scroll' ? '#ffffff' : '#111827',
						cursor: 'pointer',
					}}
				>
					Scroll Demo
				</button>
				<button
					type="button"
					onClick={() => setMode('cull')}
					style={{
						padding: '6px 10px',
						borderRadius: 8,
						border: '1px solid rgba(0,0,0,0.15)',
						background: mode === 'cull' ? '#111827' : '#ffffff',
						color: mode === 'cull' ? '#ffffff' : '#111827',
						cursor: 'pointer',
					}}
				>
					Culling
				</button>
				<button
					type="button"
					onClick={() => setMode('feature')}
					style={{
						padding: '6px 10px',
						borderRadius: 8,
						border: '1px solid rgba(0,0,0,0.15)',
						background: mode === 'feature' ? '#111827' : '#ffffff',
						color: mode === 'feature' ? '#ffffff' : '#111827',
						cursor: 'pointer',
					}}
				>
					Feature Demo
				</button>
				<button
					type="button"
					onClick={() => setMode('perf')}
					style={{
						padding: '6px 10px',
						borderRadius: 8,
						border: '1px solid rgba(0,0,0,0.15)',
						background: mode === 'perf' ? '#111827' : '#ffffff',
						color: mode === 'perf' ? '#ffffff' : '#111827',
						cursor: 'pointer',
					}}
				>
					Perf
				</button>
				<button
					type="button"
					onClick={() => setMode('tree')}
					style={{
						padding: '6px 10px',
						borderRadius: 8,
						border: '1px solid rgba(0,0,0,0.15)',
						background: mode === 'tree' ? '#111827' : '#ffffff',
						color: mode === 'tree' ? '#ffffff' : '#111827',
						cursor: 'pointer',
					}}
				>
					Tree Select
				</button>
				<span style={{ color: 'rgba(17,24,39,0.7)', fontSize: 12 }}>
					{mode === 'scroll'
						? '滚动条 & 布局示例'
						: mode === 'cull'
							? '滚动视口外子树裁剪示例'
							: mode === 'feature'
								? 'Image & Hover 示例'
								: mode === 'perf'
									? '大量节点 + 动画压力测试'
									: 'HTML Input + Canvas Tree 下拉选择'}
				</span>
			</div>

			{mode === 'scroll' && <ScrollDemo />}
			{mode === 'cull' && <ScrollCullingDemo />}
			{mode === 'feature' && <FeatureDemo />}
			{mode === 'perf' && <PerfDemo />}
			{mode === 'tree' && <TreeSelectDemo />}
		</div>
	)
}
