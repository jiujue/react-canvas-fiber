import type { CSSProperties } from 'react'
import { useCallback, useLayoutEffect, useMemo, useRef } from 'react'
import { createCanvasRoot } from '../runtime'
import type { CanvasProps } from '../types'

/**
 * React 侧桥接组件：
 * - 负责创建/管理 DOM <canvas>
 * - 初始化自定义 renderer 的运行时 root
 * - 将 children 交给 reconciler 渲染为场景树
 */
export function Canvas(props: CanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)
	const rootRef = useRef<ReturnType<typeof createCanvasRoot> | null>(null)

	const dpr = props.dpr ?? 1

	/**
	 * DOM canvas 的 style 尺寸使用“逻辑像素”，实际渲染像素由 width/height attribute 决定。
	 */
	const canvasStyle = useMemo<CSSProperties>(
		() => ({
			width: props.width,
			height: props.height,
			display: 'block',
			touchAction: 'none',
			...props.style,
		}),
		[props.width, props.height, props.style],
	)

	const dispatchPointer = useCallback(
		(type: 'pointerdown' | 'pointermove' | 'pointerup' | 'pointercancel', e: any) => {
			const canvas = canvasRef.current
			const root = rootRef.current
			if (!canvas || !root) return

			const rect = canvas.getBoundingClientRect()
			const scaleX = rect.width ? props.width / rect.width : 1
			const scaleY = rect.height ? props.height / rect.height : 1

			const x = (e.clientX - rect.left) * scaleX
			const y = (e.clientY - rect.top) * scaleY

			const res = root.dispatchPointerEvent(type as any, {
				x,
				y,
				pointerId: e.pointerId ?? 0,
				button: e.button ?? 0,
				buttons: e.buttons ?? 0,
				altKey: !!e.altKey,
				ctrlKey: !!e.ctrlKey,
				shiftKey: !!e.shiftKey,
				metaKey: !!e.metaKey,
			})

			if (res?.defaultPrevented && typeof e.preventDefault === 'function') {
				e.preventDefault()
			}
		},
		[props.width, props.height],
	)

	const handleWheel = useCallback(
		(e: any) => {
			const canvas = canvasRef.current
			const root = rootRef.current
			if (!canvas || !root) return

			const rect = canvas.getBoundingClientRect()
			const scaleX = rect.width ? props.width / rect.width : 1
			const scaleY = rect.height ? props.height / rect.height : 1

			let deltaX = e.deltaX ?? 0
			let deltaY = e.deltaY ?? 0
			if (e.deltaMode === 1) {
				deltaX *= 16
				deltaY *= 16
			} else if (e.deltaMode === 2) {
				deltaX *= props.width
				deltaY *= props.height
			}

			const x = (e.clientX - rect.left) * scaleX
			const y = (e.clientY - rect.top) * scaleY

			const payload = {
				x,
				y,
				deltaX: deltaX * scaleX,
				deltaY: deltaY * scaleY,
				altKey: !!e.altKey,
				ctrlKey: !!e.ctrlKey,
				shiftKey: !!e.shiftKey,
				metaKey: !!e.metaKey,
			}
			const res = root.dispatchWheelEvent(payload)

			if (res?.defaultPrevented && typeof e.preventDefault === 'function') {
				e.preventDefault()
			}
		},
		[props.width, props.height],
	)

	const handlePointerDown = useCallback(
		(e: any) => {
			const canvas = canvasRef.current
			if (canvas && typeof canvas.setPointerCapture === 'function') {
				try {
					canvas.setPointerCapture(e.pointerId)
				} catch (err) {
					void err
				}
			}
			dispatchPointer('pointerdown', e)
		},
		[dispatchPointer],
	)

	useLayoutEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const listener = (e: WheelEvent) => {
			handleWheel(e as any)
		}
		canvas.addEventListener('wheel', listener, { passive: false })
		return () => {
			canvas.removeEventListener('wheel', listener)
		}
	}, [handleWheel])

	/**
	 * 当 canvas 或关键参数变化时，重新创建运行时 root。
	 */
	useLayoutEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		rootRef.current = createCanvasRoot(canvas, {
			width: props.width,
			height: props.height,
			dpr,
			clearColor: props.clearColor,
			fontFamily: props.fontFamily,
			fontSize: props.fontSize,
			fontWeight: props.fontWeight,
			lineHeight: props.lineHeight,
			profiling: props.profiling,
		})

		return () => {
			rootRef.current?.unmount()
			rootRef.current = null
		}
	}, [
		props.width,
		props.height,
		props.clearColor,
		props.fontFamily,
		props.fontSize,
		props.fontWeight,
		props.lineHeight,
		props.profiling,
		dpr,
	])

	/**
	 * children 变更时，推送到 reconciler 触发一次 commit。
	 */
	useLayoutEffect(() => {
		rootRef.current?.render(props.children ?? null)
	}, [props.children])

	return (
		<canvas
			ref={canvasRef}
			style={canvasStyle}
			width={Math.floor(props.width * dpr)}
			height={Math.floor(props.height * dpr)}
			onPointerDown={handlePointerDown}
			onPointerMove={(e) => dispatchPointer('pointermove', e)}
			onPointerUp={(e) => dispatchPointer('pointerup', e)}
			onPointerCancel={(e) => dispatchPointer('pointercancel', e)}
		/>
	)
}
