import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import path from 'path' // 不再需要 path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // 使用 URL 对象来解析路径，对 ESM 更友好
      { find: '@', replacement: new URL('./src', import.meta.url).pathname }
    ]
    // 旧的 alias 配置可以注释掉或删除
    // alias: {
    //   '@': path.resolve(__dirname, './src'),
    // },
  },
}) 