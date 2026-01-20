import { Canvas, Rect, Text, View } from 'react-canvas-fiber'
import { Card, Col, Divider, Row, Typography } from 'antd'
import { Link } from 'dumi'
import React from 'react'

const { Title, Paragraph } = Typography

const Demo = () => {
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const width = 720
	const height = 380

	return (
		<div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
			<Canvas
				width={width}
				height={height}
				dpr={dpr}
				clearColor="#0b1020"
				style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.12)' }}
			>
				<View style={{ width, height, padding: 18, flexDirection: 'column', gap: 12 }}>
					<View style={{ flexDirection: 'column', gap: 8 }}>
						<Text
							text="Canvas Renderer"
							style={{ fontSize: 22, fontWeight: 800 }}
							color="#e5e7eb"
						/>
						<Text
							text="JSX 描述 UI / Yoga 负责布局 / Canvas2D 负责绘制"
							style={{ fontSize: 14, lineHeight: 18 }}
							color="rgba(229,231,235,0.70)"
						/>
					</View>

					<View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
						<Rect style={{ width: 220, height: 56 }} borderRadius={14} fill="#60a5fa" />
						<Rect
							style={{ flexGrow: 1, height: 56 }}
							borderRadius={14}
							fill="rgba(255,255,255,0.08)"
						/>
						<Rect style={{ width: 120, height: 56 }} borderRadius={14} fill="#22c55e" />
					</View>
				</View>
			</Canvas>
		</div>
	)
}

const IndexPage: React.FC = () => {
	return (
		<div style={{ padding: '48px 24px', maxWidth: 1200, margin: '0 auto' }}>
			<Typography style={{ textAlign: 'center', marginBottom: 48 }}>
				<Title level={1} style={{ fontSize: 48, marginBottom: 24 }}>
					Canvas Renderer
				</Title>
				<Paragraph style={{ fontSize: 20, color: '#666' }}>
					<code>react-canvas-fiber</code> 是一个 Canvas 2D 的自定义 React renderer： 用 JSX
					声明图元树，React 负责 diff，commit 后执行 <code>layout -&gt; draw</code> 绘制到{' '}
					<code>&lt;canvas&gt;</code>。
				</Paragraph>
			</Typography>

			<Divider />

			<Row gutter={[32, 32]} style={{ marginBottom: 48 }}>
				<Col xs={24} lg={16}>
					<Card
						title="一分钟预览"
						bordered={false}
						styles={{ body: { padding: 0, background: '#0b1020', borderRadius: '0 0 8px 8px' } }}
					>
						<Demo />
					</Card>
				</Col>
				<Col xs={24} lg={8}>
					<Card title="快速入口" bordered={false} style={{ height: '100%' }}>
						<Title level={5}>指南</Title>
						<ul style={{ paddingLeft: 20, marginBottom: 24 }}>
							<li>
								<Link to="/guide/getting-started">Getting Started</Link>
							</li>
							<li>
								<Link to="/guide/layout">Layout（YogaStyle）</Link>
							</li>
							<li>
								<Link to="/guide/events">Events（指针与点击）</Link>
							</li>
							<li>
								<Link to="/guide/scroll">Scroll（View 滚动）</Link>
							</li>
						</ul>
						<Title level={5}>组件</Title>
						<ul style={{ paddingLeft: 20, marginBottom: 24 }}>
							<li>
								<Link to="/components/canvas">Canvas</Link>
							</li>
							<li>
								<Link to="/components/view">View</Link>
							</li>
							<li>
								<Link to="/components/rect">Rect</Link>
							</li>
							<li>
								<Link to="/components/text">Text</Link>
							</li>
						</ul>
						<Title level={5}>类型</Title>
						<ul style={{ paddingLeft: 20 }}>
							<li>
								<Link to="/types">类型索引</Link>
							</li>
						</ul>
					</Card>
				</Col>
			</Row>

			<Row gutter={[32, 32]}>
				<Col span={24}>
					<Card title="导出内容" bordered={false}>
						<Row gutter={24}>
							<Col xs={24} md={12}>
								<Title level={5}>Canvas</Title>
								<Paragraph>
									DOM 侧桥接组件，负责创建 <code>&lt;canvas&gt;</code>{' '}
									并驱动渲染。它是整个渲染树的根容器。
								</Paragraph>
							</Col>
							<Col xs={24} md={12}>
								<Title level={5}>View / Rect / Text</Title>
								<Paragraph>
									JSX 组件，渲染为自定义节点树（不直接渲染到 DOM）。通过 Yoga 引擎实现类似 Flexbox
									的布局能力。
								</Paragraph>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default IndexPage
