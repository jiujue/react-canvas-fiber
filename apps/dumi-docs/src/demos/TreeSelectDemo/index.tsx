import { Canvas, Text, View } from 'react-canvas-fiber'
import { useEffect, useMemo, useState } from 'react'
import { buildTree, flattenTree, themes } from './utils'

export default function TreeSelectDemo() {
	// 下拉显隐、数据规模与树状态
	const [open, setOpen] = useState(true)
	const [totalCount, setTotalCount] = useState(120)
	const [maxDepth, setMaxDepth] = useState(4)
	const [selectedId, setSelectedId] = useState<string | null>(null)
	const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
	const [themeName, setThemeName] = useState<'dark' | 'light'>('dark')
	const [dataVersion, setDataVersion] = useState(0)

	// 根据总量/深度生成树
	const data = useMemo(
		() => buildTree(totalCount, maxDepth, dataVersion),
		[dataVersion, totalCount, maxDepth],
	)

	// 数据变化时：默认展开一级，并确保选中项仍然存在
	useEffect(() => {
		const next = new Set<string>()
		for (const root of data) next.add(root.id)
		setExpandedIds(next)
		setSelectedId((prev) => {
			if (!prev) return prev
			const exists = flattenTree(data, next).some((item) => item.node.id === prev)
			return exists ? prev : null
		})
	}, [data])

	// 生成扁平列表与当前选中节点
	const flatNodes = useMemo(() => flattenTree(data, expandedIds), [data, expandedIds])
	const selectedNode = useMemo(
		() => flatNodes.find((item) => item.node.id === selectedId)?.node ?? null,
		[flatNodes, selectedId],
	)

	// 展开/收起某个节点
	const toggleExpanded = (id: string) => {
		setExpandedIds((prev) => {
			const next = new Set(prev)
			if (next.has(id)) next.delete(id)
			else next.add(id)
			return next
		})
	}

	// 选中节点并收起下拉
	const selectNode = (id: string) => {
		setSelectedId(id)
		setOpen(false)
	}

	// 渲染所需的主题与画布参数
	const theme = themes[themeName]
	const width = 560
	const height = 340
	const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
	const renderKey = `${totalCount}-${maxDepth}-${dataVersion}`

	return (
		<div style={{ fontFamily: 'system-ui', maxWidth: 640 }}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
				{/* 顶部工具栏：数据规模、主题与开关 */}
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
					<label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
						总条数
						<input
							type="number"
							min={20}
							max={360}
							value={totalCount}
							onChange={(e) => {
								const v = Number(e.target.value)
								if (!Number.isFinite(v)) return
								setTotalCount(v)
							}}
							style={{ width: 90 }}
						/>
					</label>
					<label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
						深度
						<input
							type="number"
							min={2}
							max={8}
							value={maxDepth}
							onChange={(e) => {
								const v = Number(e.target.value)
								if (!Number.isFinite(v)) return
								setMaxDepth(v)
							}}
							style={{ width: 70 }}
						/>
					</label>
					<label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
						主题
						<select
							value={themeName}
							onChange={(e) => setThemeName(e.target.value as 'dark' | 'light')}
							style={{ height: 28 }}
						>
							<option value="dark">Dark</option>
							<option value="light">Light</option>
						</select>
					</label>
					<button
						type="button"
						onClick={() => setDataVersion((v) => v + 1)}
						style={{
							padding: '5px 10px',
							borderRadius: 7,
							border: '1px solid rgba(0,0,0,0.15)',
							background: theme.buttonBg,
							color: theme.buttonText,
							cursor: 'pointer',
						}}
					>
						重新生成
					</button>
					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						style={{
							padding: '5px 10px',
							borderRadius: 7,
							border: '1px solid rgba(0,0,0,0.15)',
							background: open ? '#111827' : theme.buttonBg,
							color: open ? '#ffffff' : theme.buttonText,
							cursor: 'pointer',
						}}
					>
						{open ? '收起下拉' : '展开下拉'}
					</button>
				</div>

				{/* HTML 输入区：展示选中项并驱动下拉显隐 */}
				<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
					<label style={{ fontSize: 12, color: 'rgba(17,24,39,0.75)' }}>Tree Select</label>
					<div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
						<input
							readOnly
							value={selectedNode ? `${selectedNode.label} · ${selectedNode.code}` : ''}
							placeholder="请选择一个节点"
							onClick={() => setOpen((v) => !v)}
							style={{
								flex: 1,
								height: 34,
								padding: '0 10px',
								borderRadius: 8,
								border: '1px solid rgba(0,0,0,0.2)',
								background: theme.inputBg,
								color: theme.inputText,
								boxShadow: open ? '0 0 0 2px rgba(59,130,246,0.18)' : 'none',
							}}
						/>
						<button
							type="button"
							onClick={() => setSelectedId(null)}
							style={{
								padding: '5px 10px',
								borderRadius: 7,
								border: '1px solid rgba(0,0,0,0.15)',
								background: theme.buttonBg,
								color: theme.buttonText,
								cursor: 'pointer',
							}}
						>
							清空
						</button>
					</div>
				</div>

				{/* Canvas 下拉渲染区：树节点绘制与滚动都发生在 Canvas 内 */}
				{open ? (
					<Canvas
						key={renderKey}
						width={width}
						height={height}
						dpr={dpr}
						clearColor={theme.canvasBg}
						fontFamily="system-ui"
						style={{ borderRadius: 12, border: '1px solid rgba(0,0,0,0.12)' }}
					>
						{/* 外层容器：提供 padding 与布局排版 */}
						<View
							scrollY
							scrollbarY
							style={{ width, height, padding: 12, flexDirection: 'column', gap: 8 }}
						>
							{/* 头部信息：标题与节点计数 */}
							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<Text
									text="Canvas Tree 下拉"
									style={{ fontSize: 15, fontWeight: 700 }}
									color={theme.titleText}
								/>
								<Text
									text={`节点 ${flatNodes.length} / ${totalCount}`}
									style={{ fontSize: 11 }}
									color={theme.metaText}
								/>
							</View>
							{/* 列表容器：启用滚动与滚动条 */}
							<View
								scrollY
								scrollbarY
								scrollbarWidth={10}
								scrollbarInset={6}
								scrollbarTrackColor={theme.scrollbarTrack}
								scrollbarThumbColor={theme.scrollbarThumb}
								style={{
									flexGrow: 1,
									padding: 8,
									flexDirection: 'column',
									gap: 6,
								}}
								background={theme.panelBg}
								borderRadius={9}
							>
								{/* 扁平节点逐行渲染：缩进 + 图标 + 文本 + 标签 */}
								{flatNodes.map(({ node, depth }) => {
									const expanded = expandedIds.has(node.id)
									const hasChildren = node.children.length > 0
									const selected = node.id === selectedId
									return (
										<View
											key={node.id}
											onClick={() => selectNode(node.id)}
											style={{
												height: 48,
												paddingHorizontal: 10,
												flexDirection: 'row',
												alignItems: 'center',
												gap: 8,
											}}
											background={selected ? theme.rowActive : theme.rowBg}
											borderRadius={9}
										>
											{/* 缩进占位：用宽度模拟层级缩进 */}
											<View style={{ width: 12 + depth * 10, height: 1 }} />
											{/* 展开/收起图标：阻止冒泡避免触发选中 */}
											<Text
												text={hasChildren ? (expanded ? '▾' : '▸') : '•'}
												onClick={(e) => {
													e.stopPropagation()
													if (hasChildren) toggleExpanded(node.id)
												}}
												style={{ fontSize: 30, width: 20 }}
												color={hasChildren ? theme.iconText : theme.iconMuted}
											/>
											{/* 主体信息区：名称、类型、编码、负责人、指标 */}
											<View style={{ flexDirection: 'column', gap: 3, flexGrow: 1 }}>
												<View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
													<Text
														text={node.label}
														style={{ fontSize: 13, fontWeight: 700 }}
														color={theme.titleText}
													/>
													<View
														style={{
															height: 18,
															paddingHorizontal: 6,
															alignItems: 'center',
															justifyContent: 'center',
														}}
														background={theme.tagBg}
														borderRadius={5}
													>
														<Text text={node.type} style={{ fontSize: 10 }} color={theme.tagText} />
													</View>
													<Text text={node.code} style={{ fontSize: 10 }} color={theme.codeText} />
												</View>
												<View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
													<Text
														text={`负责人 · ${node.owner}`}
														style={{ fontSize: 10 }}
														color={theme.labelText}
													/>
													<View
														style={{
															height: 16,
															paddingHorizontal: 6,
															alignItems: 'center',
															justifyContent: 'center',
														}}
														background={theme.countBg}
														borderRadius={5}
													>
														<Text
															text={`指标 ${node.count}`}
															style={{ fontSize: 10 }}
															color={theme.countText}
														/>
													</View>
												</View>
											</View>
											{/* 右侧辅助信息 */}
											<View style={{ width: 70, alignItems: 'flex-end' }}>
												<Text
													text={hasChildren ? `${node.children.length} 子级` : '叶子节点'}
													style={{ fontSize: 10 }}
													color={theme.metaText}
												/>
											</View>
										</View>
									)
								})}
							</View>
							{/* 底部提示：交互说明 */}
							<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
								<Text
									text="点击节点选中，点击箭头展开/收起"
									style={{ fontSize: 10 }}
									color={theme.metaText}
								/>
								<Text
									text="下拉内容完全由 Canvas 渲染"
									style={{ fontSize: 10 }}
									color={theme.codeText}
								/>
							</View>
						</View>
					</Canvas>
				) : null}
			</div>
		</div>
	)
}
