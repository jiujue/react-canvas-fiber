import panelHtml from 'url:./panels/react-canvas-fiber/index.html'
import bootstrapScriptUrl from 'url:./panels/react-canvas-fiber/bootstrap'

const parsePanelPagePath = (urlOrPath: string) => {
	try {
		const u = new URL(urlOrPath)
		return u.pathname.replace(/^\//, '')
	} catch {
		return urlOrPath.replace(/^\//, '')
	}
}

const ensurePanelCreated = () => {
	const g = globalThis as any
	if (g.__REACT_CANVAS_FIBER_DEVTOOLS_PANEL_CREATED__) return
	g.__REACT_CANVAS_FIBER_DEVTOOLS_PANEL_CREATED__ = true

	const panelPage = parsePanelPagePath(panelHtml)
	chrome.devtools.panels.create('Canvas', '', panelPage, (panel) => {
		panel.onShown.addListener(async (win) => {
			const w = win as any
			if (w.__RCF_DEVTOOLS_SCRIPT_INJECTED__) return
			w.__RCF_DEVTOOLS_SCRIPT_INJECTED__ = true

			const marker = win.document.getElementById('rcf-devtools-js')
			if (marker) marker.textContent = 'JS: injecting from devtools...'

			try {
				const abs = chrome.runtime.getURL(parsePanelPagePath(bootstrapScriptUrl))

				const script = win.document.createElement('script')
				script.src = abs
				script.defer = true
				script.onload = () => {
					const m = win.document.getElementById('rcf-devtools-js')
					if (m && m.textContent === 'JS: injecting from devtools...') {
						m.textContent = 'JS: injected bundle loaded'
					}
				}
				script.onerror = () => {
					const m = win.document.getElementById('rcf-devtools-js')
					if (m) m.textContent = `JS: injected bundle failed to load (${abs})`
				}

				win.document.body.appendChild(script)
			} catch (e: any) {
				if (marker) marker.textContent = `JS: inject error: ${e?.message ?? String(e)}`
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
