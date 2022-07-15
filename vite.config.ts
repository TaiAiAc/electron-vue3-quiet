import { loadEnv, defineConfig } from 'vite'
import { resolveConfig, viteDefine, resolvePath, setupVitePlugins, electronEngine } from './build'
import { resolve } from 'path'

export default defineConfig(configEnv => {
  const { root, renderer } = resolvePath('./', import.meta.url)
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv

  return {
    base: './',
    root: renderer,
    resolve: resolveConfig(renderer),
    define: viteDefine,
    build: {
      outDir: resolve(root, 'dist'),
      target: 'esnext',
      minify: 'esbuild',
      reportCompressedSize: false,
      emptyOutDir: false,
      chunkSizeWarningLimit: 2000
    },
    server: {
      host: '0.0.0.0'
    },
    plugins: [...setupVitePlugins(configEnv, renderer), electronEngine(configEnv, viteEnv)],
    publicDir: resolve(root, 'public')
  }
})
