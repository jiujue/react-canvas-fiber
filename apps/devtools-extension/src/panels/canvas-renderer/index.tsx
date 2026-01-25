import type { ChangeEvent, CSSProperties, MouseEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'

const MINIMAL = false

const setJsMarker = (next: string) => {
	try {
		const el = document.getElementById('rcf-devtools-js')
		if (el) el.textContent = next
	} catch {
		void 0
	}
}

const setBootText = (next: string) => {
	const g = globalThis as any
	if (typeof document === 'undefined') {
		g.__RCF_DEVTOOLS_BOOT_TEXT__ = next
		return
	}

	const el = document.getElementById('__rcf_devtools_boot')
	if (el) el.textContent = next
	g.__RCF_DEVTOOLS_BOOT_TEXT__ = next
}

setJsMarker('JS: top-level executed')
setBootText('[rcf-devtools] panel script loaded')
console.log('[rcf-devtools] panel script loaded', {
	href: typeof location !== 'undefined' ? location.href : null,
	readyState: typeof document !== 'undefined' ? document.readyState : null,
})

type RootInfo = {
	id: number
	rect: { left: number; top: number; width: number; height: number }
	options: { width: number; height: number; dpr: number }
	revision: number
}

type Snapshot = {
	rootId: number
	rootChildrenIds: number[]
	nodesById: Record<
		number,
		{
			id: number
			type: string
			parentId: number | null
			childrenIds: number[]
			layout: { x: number; y: number; width: number; height: number }
		}
	>
}

type PickerState = {
	enabled: boolean
	rootInstanceId: number | null
	hoverId: number | null
	selectedId: number | null
}

const evalInInspectedWindow = async <T,>(expression: string): Promise<T> => {
	return await new Promise((resolve, reject) => {
		chrome.devtools.inspectedWindow.eval(expression, (result: unknown, exceptionInfo: any) => {
			if (exceptionInfo?.isException) {
				reject(new Error(exceptionInfo.value ?? exceptionInfo.description ?? 'Eval failed'))
				return
			}
			resolve(result as T)
		})
	})
}

const devtoolsGlobalExpr = 'window.__REACT_CANVAS_FIBER_DEVTOOLS__'

const listRoots = async (): Promise<RootInfo[]> => {
	return await evalInInspectedWindow<RootInfo[]>(`${devtoolsGlobalExpr}?.listRoots?.() ?? []`)
}

const getSnapshot = async (rootInstanceId: number): Promise<Snapshot | null> => {
	return await evalInInspectedWindow<Snapshot | null>(
		`${devtoolsGlobalExpr}?.getSnapshot?.(${rootInstanceId}) ?? null`,
	)
}

const getNodeProps = async (
	rootInstanceId: number,
	nodeId: number,
): Promise<Record<string, any> | null> => {
	return await evalInInspectedWindow<Record<string, any> | null>(
		`${devtoolsGlobalExpr}?.getNodeProps?.(${rootInstanceId}, ${nodeId}) ?? null`,
	)
}

const setHighlight = async (
	rootInstanceId: number,
	next: { hoverId?: number | null; selectedId?: number | null },
) => {
	const payload = JSON.stringify(next)
	await evalInInspectedWindow<void>(
		`${devtoolsGlobalExpr}?.setHighlight?.(${rootInstanceId}, ${payload})`,
	)
}

const startPicker = async (rootInstanceId: number) => {
	await evalInInspectedWindow<void>(`${devtoolsGlobalExpr}?.startPicker?.(${rootInstanceId})`)
}

const getPickerState = async (): Promise<PickerState | null> => {
	return await evalInInspectedWindow<PickerState | null>(
		`${devtoolsGlobalExpr}?.getPickerState?.() ?? null`,
	)
}

const pretty = (value: any) => {
	try {
		return JSON.stringify(value, null, 2)
	} catch {
		return String(value)
	}
}

const rowStyle: CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	gap: 8,
}

const buttonStyle: CSSProperties = {
	border: '1px solid rgba(255,255,255,0.14)',
	background: 'rgba(255,255,255,0.06)',
	color: 'rgba(255,255,255,0.92)',
	borderRadius: 8,
	padding: '6px 10px',
	cursor: 'pointer',
}

const selectStyle: CSSProperties = {
	border: '1px solid rgba(255,255,255,0.14)',
	background: 'rgba(255,255,255,0.04)',
	color: 'rgba(255,255,255,0.92)',
	borderRadius: 8,
	padding: '6px 10px',
	minWidth: 220,
}

export default function CanvasRendererPanel() {
	useEffect(() => {
		console.log('[rcf-devtools] CanvasRendererPanel mounted')
		setBootText('[rcf-devtools] CanvasRendererPanel mounted')
	}, [])

	const [roots, setRoots] = useState<RootInfo[]>([])
	const [rootInstanceId, setRootInstanceId] = useState<number | null>(null)
	const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
	const [expanded, setExpanded] = useState<Set<number>>(() => new Set())
	const [selectedId, setSelectedId] = useState<number | null>(null)
	const [selectedProps, setSelectedProps] = useState<Record<string, any> | null>(null)
	const [picker, setPicker] = useState<PickerState | null>(null)
	const [error, setError] = useState<string | null>(null)
	const lastRootRevisionRef = useRef<number>(0)
	const hoverIdRef = useRef<number | null>(null)

	useEffect(() => {
		let cancelled = false
		const tick = async () => {
			try {
				console.log('[rcf-devtools] tick: listRoots start')
				setBootText('[rcf-devtools] tick: listRoots start')
				const nextRoots = await listRoots()
				console.log('[rcf-devtools] tick: listRoots ok', nextRoots)
				setBootText(`[rcf-devtools] tick: listRoots ok (${nextRoots.length})`)
				if (cancelled) return
				setRoots(nextRoots)
				if (rootInstanceId == null && nextRoots.length) {
					lastRootRevisionRef.current = 0
					setRootInstanceId(nextRoots[0].id)
					return
				}
				if (
					rootInstanceId != null &&
					nextRoots.length &&
					!nextRoots.some((r) => r.id === rootInstanceId)
				) {
					lastRootRevisionRef.current = 0
					setRootInstanceId(nextRoots[0].id)
					return
				}
				if (rootInstanceId != null && !nextRoots.length) {
					lastRootRevisionRef.current = 0
					setRootInstanceId(null)
					return
				}
				const current = nextRoots.find((r: RootInfo) => r.id === rootInstanceId)
				const currentRevision = current?.revision ?? 0
				if (rootInstanceId != null && currentRevision !== lastRootRevisionRef.current) {
					lastRootRevisionRef.current = currentRevision
					console.log('[rcf-devtools] tick: snapshot start', { rootInstanceId, currentRevision })
					setBootText('[rcf-devtools] tick: snapshot start')
					const nextSnapshot = await getSnapshot(rootInstanceId)
					console.log('[rcf-devtools] tick: snapshot ok', nextSnapshot)
					setBootText('[rcf-devtools] tick: snapshot ok')
					if (!cancelled) setSnapshot(nextSnapshot)
				}
				setError(null)
			} catch (e: any) {
				console.error('[rcf-devtools] tick error', e)
				setBootText(`[rcf-devtools] tick error: ${e?.message ?? String(e)}`)
				if (!cancelled) setError(e?.message ?? String(e))
			}
		}
		void tick()
		const id = window.setInterval(() => void tick(), 800)
		return () => {
			cancelled = true
			window.clearInterval(id)
		}
	}, [rootInstanceId])

	useEffect(() => {
		let cancelled = false
		const run = async () => {
			if (rootInstanceId == null) {
				setSnapshot(null)
				setSelectedId(null)
				setSelectedProps(null)
				return
			}
			const nextSnapshot = await getSnapshot(rootInstanceId)
			if (cancelled) return
			setSnapshot(nextSnapshot)
			setExpanded((prev: Set<number>) => {
				const next = new Set(prev)
				if (nextSnapshot) for (const id of nextSnapshot.rootChildrenIds) next.add(id)
				return next
			})
		}
		void run()
		return () => {
			cancelled = true
		}
	}, [rootInstanceId])

	useEffect(() => {
		let cancelled = false
		const run = async () => {
			if (rootInstanceId == null || selectedId == null) {
				setSelectedProps(null)
				return
			}
			const props = await getNodeProps(rootInstanceId, selectedId)
			if (!cancelled) setSelectedProps(props)
		}
		void run()
		return () => {
			cancelled = true
		}
	}, [rootInstanceId, selectedId])

	useEffect(() => {
		if (rootInstanceId == null) return
		const id = window.setInterval(async () => {
			const state = await getPickerState()
			setPicker(state)
			if (!state?.enabled && state?.selectedId != null && state.rootInstanceId === rootInstanceId) {
				setSelectedId(state.selectedId)
				await setHighlight(rootInstanceId, { selectedId: state.selectedId, hoverId: null })
			}
		}, 80)
		return () => window.clearInterval(id)
	}, [rootInstanceId])

	const selectedMeta = useMemo(() => {
		if (!snapshot || selectedId == null) return null
		return snapshot.nodesById[selectedId] ?? null
	}, [snapshot, selectedId])

	const rootOptions = useMemo(() => {
		if (rootInstanceId == null) return null
		return roots.find((r: RootInfo) => r.id === rootInstanceId)?.options ?? null
	}, [roots, rootInstanceId])

	const treeRootIds = useMemo(() => snapshot?.rootChildrenIds ?? [], [snapshot])

	const toggleExpand = (id: number) => {
		setExpanded((prev: Set<number>) => {
			const next = new Set(prev)
			if (next.has(id)) next.delete(id)
			else next.add(id)
			return next
		})
	}

	const onHoverNode = async (id: number | null) => {
		if (rootInstanceId == null) return
		if (hoverIdRef.current === id) return
		hoverIdRef.current = id
		await setHighlight(rootInstanceId, { hoverId: id, selectedId })
	}

	const onSelectNode = async (id: number) => {
		if (rootInstanceId == null) return
		setSelectedId(id)
		await setHighlight(rootInstanceId, { selectedId: id, hoverId: null })
	}

	const renderNode = (id: number, depth: number) => {
		const meta = snapshot?.nodesById[id]
		if (!meta) return null
		const hasChildren = meta.childrenIds.length > 0
		const isExpanded = expanded.has(id)
		const isSelected = selectedId === id
		return (
			<div key={id}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						paddingLeft: 8 + depth * 12,
						height: 24,
						cursor: 'default',
						background: isSelected ? 'rgba(16,185,129,0.14)' : undefined,
						borderRadius: 6,
					}}
					onMouseEnter={() => {
						void onHoverNode(id)
					}}
					onMouseLeave={() => {
						void onHoverNode(null)
					}}
					onClick={() => void onSelectNode(id)}
				>
					<div
						style={{
							width: 14,
							userSelect: 'none',
							opacity: hasChildren ? 1 : 0.25,
							cursor: hasChildren ? 'pointer' : 'default',
						}}
						onClick={(e: MouseEvent<HTMLDivElement>) => {
							e.stopPropagation()
							if (hasChildren) toggleExpand(id)
						}}
					>
						{hasChildren ? (isExpanded ? '▾' : '▸') : '·'}
					</div>
					<div
						style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 12 }}
					>
						{meta.type} <span style={{ opacity: 0.6 }}>#{id}</span>
					</div>
				</div>
				{hasChildren && isExpanded
					? meta.childrenIds.map((cid: number) => renderNode(cid, depth + 1))
					: null}
			</div>
		)
	}

	return (
		<div
			style={{
				height: '100vh',
				display: 'grid',
				gridTemplateRows: 'auto 1fr',
				background: '#0b1020',
				color: 'rgba(255,255,255,0.92)',
				fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
			}}
		>
			<div
				style={{
					padding: 12,
					borderBottom: '1px solid rgba(255,255,255,0.10)',
					display: 'flex',
					flexDirection: 'column',
					gap: 10,
				}}
			>
				<div style={rowStyle}>
					<div style={{ fontWeight: 700 }}>Canvas</div>
					<div style={{ opacity: 0.7, fontSize: 12 }}>
						{rootOptions
							? `${rootOptions.width}×${rootOptions.height} @ ${rootOptions.dpr}`
							: '未连接'}
					</div>
					<div style={{ flex: 1 }} />
					<button
						style={buttonStyle}
						onClick={() => {
							if (rootInstanceId == null) return
							void startPicker(rootInstanceId)
						}}
					>
						取点
					</button>
				</div>
				<div style={rowStyle}>
					<select
						style={selectStyle}
						value={rootInstanceId ?? ''}
						onChange={(e: ChangeEvent<HTMLSelectElement>) =>
							setRootInstanceId(e.target.value ? Number(e.target.value) : null)
						}
					>
						{roots.length ? null : <option value="">未发现 Canvas Root</option>}
						{roots.map((r) => (
							<option key={r.id} value={r.id}>
								Root {r.id} ({Math.round(r.rect.width)}×{Math.round(r.rect.height)})
							</option>
						))}
					</select>
					<div style={{ opacity: 0.7, fontSize: 12 }}>
						{picker?.enabled ? `取点中（hover: ${picker.hoverId ?? '-'}）` : '空闲'}
					</div>
				</div>
				{error ? (
					<div
						style={{
							padding: 10,
							borderRadius: 10,
							background: 'rgba(239,68,68,0.10)',
							border: '1px solid rgba(239,68,68,0.25)',
							fontSize: 12,
							whiteSpace: 'pre-wrap',
						}}
					>
						{error}
					</div>
				) : null}
			</div>

			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>
				<div
					style={{ padding: 10, borderRight: '1px solid rgba(255,255,255,0.10)', overflow: 'auto' }}
				>
					<div style={{ fontWeight: 700, marginBottom: 8 }}>Scene Tree</div>
					{snapshot ? (
						treeRootIds.map((id) => renderNode(id, 0))
					) : (
						<div style={{ opacity: 0.7 }}>无数据</div>
					)}
				</div>
				<div style={{ padding: 10, overflow: 'auto' }}>
					<div style={{ fontWeight: 700, marginBottom: 8 }}>Props</div>
					{selectedId == null ? (
						<div style={{ opacity: 0.7 }}>未选择节点</div>
					) : (
						<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
							<div style={{ opacity: 0.85, fontSize: 12 }}>
								{selectedMeta ? (
									<div>
										{selectedMeta.type} #{selectedMeta.id} — layout(
										{Math.round(selectedMeta.layout.x)},{Math.round(selectedMeta.layout.y)},{' '}
										{Math.round(selectedMeta.layout.width)}×{Math.round(selectedMeta.layout.height)}
										)
									</div>
								) : (
									<div>#{selectedId}</div>
								)}
							</div>
							<pre
								style={{
									margin: 0,
									padding: 10,
									borderRadius: 10,
									background: 'rgba(255,255,255,0.06)',
									border: '1px solid rgba(255,255,255,0.10)',
									fontSize: 12,
									lineHeight: 1.4,
									whiteSpace: 'pre-wrap',
								}}
							>
								{pretty(selectedProps)}
							</pre>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

function MinimalPanel() {
	const [result, setResult] = useState<string>('未执行')
	const [error, setError] = useState<string | null>(null)

	const run = async () => {
		try {
			setError(null)
			setResult('执行中...')
			const payload = await evalInInspectedWindow<any>(
				`(() => {
  const g = window.__REACT_CANVAS_FIBER_DEVTOOLS__
  return {
    hasGlobal: !!g,
    roots: g?.listRoots?.() ?? null,
    href: location.href
  }
})()`,
			)
			setResult(pretty(payload))
		} catch (e: any) {
			setError(e?.message ?? String(e))
			setResult('失败')
		}
	}

	return (
		<div style={{ padding: 12 }}>
			<div style={{ fontWeight: 700, marginBottom: 8 }}>Canvas DevTools (Minimal)</div>
			<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
				<button style={buttonStyle} onClick={() => void run()}>
					Test inspectedWindow.eval
				</button>
				<div style={{ opacity: 0.7, fontSize: 12 }}>如果这里能显示结果，链路已打通</div>
			</div>
			{error ? (
				<div
					style={{
						marginTop: 10,
						padding: 10,
						borderRadius: 10,
						background: 'rgba(239,68,68,0.10)',
						border: '1px solid rgba(239,68,68,0.25)',
						fontSize: 12,
						whiteSpace: 'pre-wrap',
					}}
				>
					{error}
				</div>
			) : null}
			<pre
				style={{
					marginTop: 10,
					marginBottom: 0,
					padding: 10,
					borderRadius: 10,
					background: 'rgba(255,255,255,0.06)',
					border: '1px solid rgba(255,255,255,0.10)',
					fontSize: 12,
					lineHeight: 1.4,
					whiteSpace: 'pre-wrap',
				}}
			>
				{result}
			</pre>
		</div>
	)
}

const bootstrap = () => {
	const g = globalThis as any
	setJsMarker('JS: bootstrap called')

	setBootText('[rcf-devtools] bootstrap start')
	console.log('[rcf-devtools] bootstrap start', {
		readyState: document.readyState,
		hasBody: !!document.body,
	})

	const bootElId = '__rcf_devtools_boot'
	let bootEl = document.getElementById(bootElId)
	if (!bootEl) {
		bootEl = document.createElement('pre')
		bootEl.id = bootElId
		bootEl.style.cssText =
			'position:fixed;top:0;left:0;right:0;z-index:999999;padding:6px 10px;margin:0;' +
			'background:rgba(0,0,0,0.75);color:#e6edf7;font-size:12px;line-height:1.4;' +
			'font-family:ui-monospace, SFMono-Regular, Menlo, monospace;white-space:pre-wrap;'
		bootEl.textContent = String(g.__RCF_DEVTOOLS_BOOT_TEXT__ ?? '[rcf-devtools] boot')
		document.body.appendChild(bootEl)
	}

	let rootEl = document.getElementById('__plasmo')
	if (!rootEl) {
		console.log('[rcf-devtools] __plasmo not found, creating')
		setBootText('[rcf-devtools] __plasmo not found, creating')
		rootEl = document.createElement('div')
		rootEl.id = '__plasmo'
		document.body.appendChild(rootEl)
	}

	console.log('[rcf-devtools] rendering react root', rootEl)
	setBootText('[rcf-devtools] rendering react root')
	if (!g.__RCF_DEVTOOLS_REACT_ROOT__) {
		g.__RCF_DEVTOOLS_REACT_ROOT__ = createRoot(rootEl)
	}
	g.__RCF_DEVTOOLS_REACT_ROOT__.render(MINIMAL ? <MinimalPanel /> : <CanvasRendererPanel />)
	console.log('[rcf-devtools] render called')
	setBootText('[rcf-devtools] render called')
}

if (typeof document !== 'undefined') {
	window.addEventListener('error', (e) => {
		console.error('[rcf-devtools] window error', e.error ?? e.message ?? e)
		setBootText(`[rcf-devtools] window error: ${String((e as any).message ?? e)}`)
	})
	window.addEventListener('unhandledrejection', (e) => {
		console.error('[rcf-devtools] unhandledrejection', (e as any).reason ?? e)
		setBootText(
			`[rcf-devtools] unhandledrejection: ${String((e as any).reason ?? 'unknown reason')}`,
		)
	})

	if (document.readyState === 'loading') {
		console.log('[rcf-devtools] waiting DOMContentLoaded')
		setBootText('[rcf-devtools] waiting DOMContentLoaded')
		document.addEventListener('DOMContentLoaded', bootstrap)
	} else {
		bootstrap()
	}
}
