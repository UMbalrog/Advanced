import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime']
    })
  ],
  server:{
    host: '0.0.0.0'
  },
  build:{
    // target: 'es2015',
    outDir: 'dist',
    // lib: {
    //   entry: path.resolve(__dirname, 'src/main.js'),
    //   name: 'um_vitetest'
    // },
    // rollupOptions: {
    //   // 请确保外部化那些你的库中不需要的依赖
    //   external: ['vue'],
    //   output: {
    //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
    //     globals: {
    //       vue: 'Vue'
    //     }
    //   }
    // }
  }
})
