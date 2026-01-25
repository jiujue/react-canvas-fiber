const setMarker = (next: string) => {
	const el = document.getElementById('rcf-devtools-js')
	if (el) el.textContent = next
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

const pretty = (value: any) => {
	try {
		return JSON.stringify(value, null, 2)
	} catch {
		return String(value)
	}
}

const bootstrap = () => {
	const g = globalThis as any
	if (g.__RCF_DEVTOOLS_MINIMAL_MOUNTED__) return
	g.__RCF_DEVTOOLS_MINIMAL_MOUNTED__ = true

	setMarker('JS: minimal executed')

	const host = document.getElementById('__plasmo') ?? document.body
	const root = document.createElement('div')
	root.style.cssText = 'padding:12px;display:flex;flex-direction:column;gap:10px;'

	const title = document.createElement('div')
	title.textContent = 'Canvas DevTools (Minimal JS)'
	title.style.cssText = 'font-weight:700;'

	const row = document.createElement('div')
	row.style.cssText = 'display:flex;align-items:center;gap:8px;'

	const button = document.createElement('button')
	button.textContent = 'Test inspectedWindow.eval'
	button.style.cssText =
		'border:1px solid rgba(255,255,255,0.14);background:rgba(255,255,255,0.06);' +
		'color:rgba(255,255,255,0.92);border-radius:8px;padding:6px 10px;cursor:pointer;'

	const hint = document.createElement('div')
	hint.textContent = '如果这里能显示结果，调用链路已打通'
	hint.style.cssText = 'opacity:0.7;font-size:12px;'

	const pre = document.createElement('pre')
	pre.textContent = '未执行'
	pre.style.cssText =
		'margin:0;padding:10px;border-radius:10px;background:rgba(255,255,255,0.06);' +
		'border:1px solid rgba(255,255,255,0.10);font-size:12px;line-height:1.4;white-space:pre-wrap;'

	button.addEventListener('click', async () => {
		pre.textContent = '执行中...'
		try {
			const payload = await evalInInspectedWindow<any>(
				`(() => {
  const g = window.__REACT_CANVAS_FIBER_DEVTOOLS__
  return { href: location.href, hasGlobal: !!g, roots: g?.listRoots?.() ?? null }
})()`,
			)
			pre.textContent = pretty(payload)
		} catch (e: any) {
			pre.textContent = `失败: ${e?.message ?? String(e)}`
		}
	})

	row.appendChild(button)
	row.appendChild(hint)
	root.appendChild(title)
	root.appendChild(row)
	root.appendChild(pre)
	host.appendChild(root)
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', bootstrap)
} else {
	bootstrap()
}
