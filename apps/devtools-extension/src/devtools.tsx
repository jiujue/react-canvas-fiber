import panelHtml from 'url:./panels/canvas-renderer/index.html'
import panelScriptUrl from 'url:./panels/canvas-renderer/index.tsx'

const toPath = (urlOrPath: string) => {
	try {
		const u = new URL(urlOrPath)
		return u.pathname.replace(/^\//, '')
	} catch {
		return urlOrPath.replace(/^\//, '')
	}
}

const toExtensionUrl = (urlOrPath: string) => {
	try {
		const u = new URL(urlOrPath)
		if (u.protocol.endsWith('-extension:')) return urlOrPath
	} catch {
		void 0
	}
	return chrome.runtime.getURL(toPath(urlOrPath))
}

const ensurePanelCreated = () => {
	const g = globalThis as any
	if (g.__REACT_CANVAS_FIBER_DEVTOOLS_PANEL_CREATED__) return
	g.__REACT_CANVAS_FIBER_DEVTOOLS_PANEL_CREATED__ = true

	const panelPageUrl = toExtensionUrl(panelHtml)
	chrome.devtools.panels.create('Canvas', '', panelPageUrl, (panel) => {
		panel.onShown.addListener(async (win) => {
			try {
				const w = win as any
				if (w.__RCF_DEVTOOLS_SCRIPT_INJECTED__) return
				w.__RCF_DEVTOOLS_SCRIPT_INJECTED__ = true

				const doc = win.document
				const marker = doc.getElementById('rcf-devtools-js')
				if (marker) marker.textContent = 'JS: injecting from devtools...'

				const abs = toExtensionUrl(panelScriptUrl)

				const script = doc.createElement('script')
				script.src = abs
				script.defer = true
				script.onload = () => {
					const m = doc.getElementById('rcf-devtools-js')
					if (m && m.textContent === 'JS: injecting from devtools...') {
						m.textContent = 'JS: injected bundle loaded'
					}
				}
				script.onerror = () => {
					const m = doc.getElementById('rcf-devtools-js')
					if (m) m.textContent = `JS: injected bundle failed to load (${abs})`
				}

				doc.body.appendChild(script)
			} catch (e: any) {
				console.error('[rcf-devtools] inject failed', e)
			}
		})
	})
}

try {
	if (typeof chrome !== 'undefined' && chrome.devtools?.panels) ensurePanelCreated()
} catch (err) {
	console.error('[rcf-devtools] ensurePanelCreated failed', err)
}

export default function Devtools() {
	return null
}
