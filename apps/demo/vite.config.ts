import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	// demo 只做最小配置：启用 React 插件即可
	plugins: [react()],
})
