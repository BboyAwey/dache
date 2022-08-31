import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import packageInfo from './package.json'

export default defineConfig({
  build: {
    outDir: 'lib',
    minify: false,
    lib: {
      entry: resolve(__dirname, './dache/dache.ts'),
      name: packageInfo.name,
      formats: ['es', 'umd', 'cjs'],
      fileName: 'dache'
    }
  },
  plugins: [
    dts({
      entryRoot: resolve(__dirname, './dache')
    })
  ]
})