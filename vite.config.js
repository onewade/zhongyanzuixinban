import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// elementPlus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const Timestamp = new Date().getTime();
const serveRootIndex = () => ({
  name: 'serve-root-index',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url || ''
      const isPageRoute = req.method === 'GET'
        && !url.startsWith('/@vite')
        && !url.startsWith('/@id')
        && !url.startsWith('/src/')
        && !url.startsWith('/node_modules/')
        && !url.startsWith('/api/')
        && !url.startsWith('/__vite')
        && !url.includes('.')
      if (url === '/' || url === '' || isPageRoute) {
        req.url = '/index.html'
      }
      next()
    })
  },
})
// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    serveRootIndex(),
    vue(),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        // 1.配置elementPlus采用sass样式配色系统
        ElementPlusResolver({importStyle:'sass'}),],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
 server:{
    port: 10087,
    proxy: {
      '/api': {
        target: 'http://laoyanghome.cn:10087/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // 打印实际的地址
         onProxyReq: (proxyReq, req, res, options) => {
          console.log('proxyReq:', proxyReq.path);
        },
      }
    }
  },
  build: {
    sourcemap: false, // 生产环境不输出sourcemap
    outDir: 'tobacco', // 输出目录
    assetsDir: 'assets', // 静态资源目录
    rollupOptions: {
      output: {
        chunkFileNames: `assets/js/[name].[hash].js`,
        entryFileNames: `assets/js/[name].[hash].js`,
        assetFileNames: `assets/[ext]/[name].[hash].[ext]`,
      },
    }
  },
})
