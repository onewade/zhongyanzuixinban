import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// elementPlus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const Timestamp = new Date().getTime();
// https://vitejs.dev/config/
export default defineConfig({
  // base:'./',
  plugins: [
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
    host:'localhost',
  },
  // build: {
  //   sourcemap: false, // 输出.map文件,默认是false
  //   rollupOptions: {
  //     output: {
  //       chunkFileNames: `static/js/[name].[hash]${Timestamp}.js`,
  //       entryFileNames: `static/js/[name].[hash]${Timestamp}.js`,
  //       assetFileNames: `static/[ext]/[name].[hash]${Timestamp}.[ext]`,
  //     },
  //   }
  // },

  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       // 自动导入定制化样式文件进行样式覆盖
  //       additionalData: `
  //         @use "@/styles/element/index.scss" as *;
  //         @use "@/styles/var.scss" as *;
  //       `,
  //     }
  //   }
  // }
})
