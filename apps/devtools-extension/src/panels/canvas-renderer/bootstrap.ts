import fullPanelScriptUrl from 'url:./index.tsx'

const setMarker = (next: string) => {
	const el = document.getElementById('rcf-devtools-js')
	if (el) el.textContent = next
}

const ensureErrorBox = () => {
	let el = document.getElementById('rcf-devtools-errors') as HTMLPreElement | null
	if (el) return el
	el = document.createElement('pre')
	el.id = 'rcf-devtools-errors'
	el.style.cssText =
		'margin:0;padding:10px;border-radius:10px;background:rgba(239,68,68,0.10);' +
		'border:1px solid rgba(239,68,68,0.25);font-size:12px;line-height:1.4;white-space:pre-wrap;'
	const host = document.getElementById('__plasmo') ?? document.body
	host.appendChild(el)
	return el
}

const appendError = (label: string, value: unknown) => {
	const el = ensureErrorBox()
	const msg = value instanceof Error ? value.stack ?? value.message : String(value)
	el.textContent = (el.textContent ? `${el.textContent}\n\n` : '') + `${label}\n${msg}`
}

const toAssetName = (urlOrPath: string) => {
	try {
		const u = new URL(urlOrPath)
		const parts = u.pathname.split('/').filter(Boolean)
		return parts[parts.length - 1] ?? u.pathname.replace(/^\//, '')
	} catch {
		const s = urlOrPath.replace(/^\//, '')
		const parts = s.split('/').filter(Boolean)
		return parts[parts.length - 1] ?? s
	}
}

const loadScript = (absUrl: string) => {
	return new Promise<void>((resolve, reject) => {
		const script = document.createElement('script')
		script.src = absUrl
		script.defer = true
		script.onload = () => resolve()
		script.onerror = () => reject(new Error(`failed to load: ${absUrl}`))
		document.body.appendChild(script)
	})
}

const bootstrap = async () => {
	const g = globalThis as any
	if (g.__RCF_DEVTOOLS_BOOTSTRAP_LOADED__) return
	g.__RCF_DEVTOOLS_BOOTSTRAP_LOADED__ = true

	setMarker('JS: bootstrap executed')

	window.addEventListener('error', (e) => {
		appendError('window.error', (e as any).error ?? (e as any).message ?? e)
	})
	window.addEventListener('unhandledrejection', (e) => {
		appendError('unhandledrejection', (e as any).reason ?? e)
	})

	try {
		const assetName = toAssetName(fullPanelScriptUrl)
		const abs = chrome.runtime.getURL(assetName)
		await loadScript(abs)
		setTimeout(() => {
			const ready = !!(globalThis as any).__RCF_DEVTOOLS_REACT_ROOT__
			if (!ready) {
				appendError('full panel', 'loaded but did not mount react root')
			}
		}, 600)
	} catch (e) {
		setMarker('JS: bootstrap failed')
		appendError('bootstrap', e)
	}
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => void bootstrap())
} else {
	void bootstrap()
}
