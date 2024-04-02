import { defineConfig } from 'vite'
import { sharedConfig } from './vite.config.mjs'
import { isDev, r } from './scripts/utils'
import packageJson from './package.json'

// bundling the content script using Vite
export default defineConfig({
  ...sharedConfig,
  define: {
    '__DEV__': isDev,
    '__NAME__': JSON.stringify(packageJson.name),
    // https://github.com/vitejs/vite/issues/9320
    // https://github.com/vitejs/vite/issues/9186
    'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
  },
  build: {
    watch: isDev
      ? {}
      : undefined,
    outDir: r('extension/dist/docs'),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    lib: {
      // lib: {
      // entry: {
      //   'assistant/content': r('src/docs/assistant/content.ts'),
      //   'assistant/actions': r('src/docs/assistant/actions.ts'),

      //   'replication/actions': r('src/docs/replication/actions.ts'),
      //   'replication/after_init': r('src/docs/replication/after_init.ts'),
      //   'replication/batch_replication': r('src/docs/replication/batch_replication.ts'),
      //   'replication/bot_replication': r('src/docs/replication/bot_replication.ts'),
      //   'replication/common': r('src/docs/replication/common.ts'),

      //   'claim/content_advance_wizard': r('src/docs/claim/content_advance_wizard.ts'),
      //   // 'index.assistant': r('src/docs/index.ts'),
      //   },
      // entry: r('src/docs/index.ts'),
      entry: r('src/docs/assistant/index.ts'),
      name: packageJson.name,
      // formats: ['cjs'],
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assistant.js',
        extend: true,
      },
    },
  },
})
