// vite.config.mts
import { dirname, relative } from "node:path";
import { defineConfig } from "file:///home/pilot/data/advance/docs/wPlugin/node_modules/.pnpm/vite@5.1.6_@types+node@20.11.26/node_modules/vite/dist/node/index.js";
import Vue from "file:///home/pilot/data/advance/docs/wPlugin/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.1.6_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Icons from "file:///home/pilot/data/advance/docs/wPlugin/node_modules/.pnpm/unplugin-icons@0.18.5_@vue+compiler-sfc@3.4.21/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///home/pilot/data/advance/docs/wPlugin/node_modules/.pnpm/unplugin-icons@0.18.5_@vue+compiler-sfc@3.4.21/node_modules/unplugin-icons/dist/resolver.js";
import Components from "file:///home/pilot/data/advance/docs/wPlugin/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/vite.js";
import AutoImport from "file:///home/pilot/data/advance/docs/wPlugin/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.9.0/node_modules/unplugin-auto-import/dist/vite.js";
import UnoCSS from "file:///home/pilot/data/advance/docs/wPlugin/node_modules/.pnpm/unocss@0.58.5_postcss@8.4.35_vite@5.1.6/node_modules/unocss/dist/vite.mjs";

// scripts/utils.ts
import { resolve } from "node:path";
import process from "node:process";
import { bgCyan, black } from "file:///home/pilot/data/advance/docs/wPlugin/node_modules/.pnpm/kolorist@1.8.0/node_modules/kolorist/dist/esm/index.mjs";
var __vite_injected_original_dirname = "/home/pilot/data/advance/docs/wPlugin/scripts";
var port = Number(process.env.PORT || "") || 3303;
var r = (...args) => resolve(__vite_injected_original_dirname, "..", ...args);
var isDev = process.env.NODE_ENV !== "production";
var isFirefox = process.env.EXTENSION === "firefox";

// package.json
var package_default = {
  name: "docs-fgis-webext",
  displayName: "advance.Docs-Fgis",
  version: "0.0.1",
  private: true,
  packageManager: "pnpm@8.15.4",
  description: "[description]",
  scripts: {
    dev: "npm run clear && cross-env NODE_ENV=development run-p dev:*",
    build: "cross-env NODE_ENV=production run-s clear build:*",
    "dev-firefox": "npm run clear && cross-env NODE_ENV=development EXTENSION=firefox run-p dev:*",
    "build-firefox": "cross-env NODE_ENV=production EXTENSION=firefox run-s clear build:*",
    "dev:prepare": "esno scripts/prepare.ts",
    "build:prepare": "esno scripts/prepare.ts",
    "dev:background": "npm run build:background -- --mode development",
    "build:background": "vite build --config vite.config.background.mts",
    "dev:web": "vite",
    "build:web": "vite build",
    "dev:docs-assistant": "npm run build:docs:assistant -- --mode development",
    "build:docs-assistant": "vite build --config vite.config.docs.assistant.mts",
    "dev:docs-claim": "npm run build:docs:claim -- --mode development",
    "build:docs-claim": "vite build --config vite.config.docs.claim.mts",
    "dev:docs-replication": "npm run build:docs:replication -- --mode development",
    "build:docs-replication": "vite build --config vite.config.docs.replication.mts",
    "dev:fgis": "npm run build:fgis -- --mode development",
    "build:fgis": "vite build --config vite.config.fgis.mts",
    pack: "cross-env NODE_ENV=production run-p pack:*",
    "pack:zip": "rimraf extension.zip && jszip-cli add extension/* -o ./extension.zip",
    "pack:crx": "crx pack extension -o ./extension.crx",
    "pack:xpi": "cross-env WEB_EXT_ARTIFACTS_DIR=./ web-ext build --source-dir ./extension --filename extension.xpi --overwrite-dest",
    "start:chromium": "web-ext run --source-dir ./extension --target=chromium",
    "start:firefox": "web-ext run --source-dir ./extension --target=firefox-desktop",
    clear: "rimraf --glob extension/dist extension/manifest.json extension.*",
    lint: "eslint --cache .",
    test: "vitest test",
    "test:e2e": "playwright test",
    postinstall: "simple-git-hooks",
    typecheck: "tsc --noEmit"
  },
  devDependencies: {
    "@antfu/eslint-config": "^2.8.1",
    "@ffflorian/jszip-cli": "^3.6.2",
    "@iconify/json": "^2.2.191",
    "@playwright/test": "^1.42.1",
    "@types/fs-extra": "^11.0.4",
    "@types/node": "^20.11.26",
    "@types/webextension-polyfill": "^0.10.7",
    "@typescript-eslint/eslint-plugin": "^7.2.0",
    "@unocss/reset": "^0.58.5",
    "@vitejs/plugin-vue": "^5.0.4",
    "@vue/compiler-sfc": "^3.4.21",
    "@vue/test-utils": "^2.4.4",
    "@vueuse/core": "^10.9.0",
    chokidar: "^3.6.0",
    "cross-env": "^7.0.3",
    crx: "^5.0.1",
    eslint: "^8.57.0",
    esno: "^4.7.0",
    "fs-extra": "^11.2.0",
    jsdom: "^24.0.0",
    kolorist: "^1.8.0",
    "lint-staged": "^15.2.2",
    "npm-run-all": "^4.1.5",
    rimraf: "^5.0.5",
    "simple-git-hooks": "^2.10.0",
    typescript: "^5.4.2",
    unocss: "^0.58.5",
    "unplugin-auto-import": "^0.17.5",
    "unplugin-icons": "^0.18.5",
    "unplugin-vue-components": "^0.26.0",
    vite: "^5.1.6",
    vitest: "^1.3.1",
    vue: "^3.4.21",
    "vue-demi": "^0.14.7",
    "web-ext": "^7.11.0",
    "webext-bridge": "^6.0.1",
    "webextension-polyfill": "^0.10.0"
  },
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
};

// vite.config.mts
var sharedConfig = {
  root: r("src"),
  resolve: {
    alias: {
      "~/": `${r("src")}/`
    }
  },
  define: {
    __DEV__: isDev,
    __NAME__: JSON.stringify(package_default.name)
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: [
        "vue",
        {
          "webextension-polyfill": [
            ["*", "browser"]
          ]
        }
      ],
      dts: r("src/auto-imports.d.ts")
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      dirs: [r("src/components")],
      // generate `components.d.ts` for ts support with Volar
      dts: r("src/components.d.ts"),
      resolvers: [
        // auto import icons
        IconsResolver({
          prefix: ""
        })
      ]
    }),
    // https://github.com/antfu/unplugin-icons
    Icons(),
    // https://github.com/unocss/unocss
    UnoCSS(),
    // rewrite assets to use relative path
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(/"\/assets\//g, `"${relative(dirname(path), "/assets")}/`);
      }
    }
  ],
  optimizeDeps: {
    include: [
      "vue",
      "@vueuse/core",
      "webextension-polyfill"
    ],
    exclude: [
      "vue-demi"
    ]
  }
};
var vite_config_default = defineConfig(({ command }) => ({
  ...sharedConfig,
  base: command === "serve" ? `http://localhost:${port}/` : "/dist/",
  server: {
    port,
    hmr: {
      host: "localhost"
    }
  },
  build: {
    watch: isDev ? {} : void 0,
    outDir: r("extension/dist"),
    emptyOutDir: false,
    sourcemap: isDev ? "inline" : false,
    // https://developer.chrome.com/docs/webstore/program_policies/#:~:text=Code%20Readability%20Requirements
    terserOptions: {
      mangle: false
    },
    rollupOptions: {
      input: {
        options: r("src/options/index.html"),
        popup: r("src/popup/index.html")
      }
    }
  },
  test: {
    globals: true,
    environment: "jsdom"
  }
}));
export {
  vite_config_default as default,
  sharedConfig
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcubXRzIiwgInNjcmlwdHMvdXRpbHMudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvcGlsb3QvZGF0YS9hZHZhbmNlL2RvY3Mvd1BsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcGlsb3QvZGF0YS9hZHZhbmNlL2RvY3Mvd1BsdWdpbi92aXRlLmNvbmZpZy5tdHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcGlsb3QvZGF0YS9hZHZhbmNlL2RvY3Mvd1BsdWdpbi92aXRlLmNvbmZpZy5tdHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5cbmltcG9ydCB7IGRpcm5hbWUsIHJlbGF0aXZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuaW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgeyBpc0RldiwgcG9ydCwgciB9IGZyb20gJy4vc2NyaXB0cy91dGlscydcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuL3BhY2thZ2UuanNvbidcblxuZXhwb3J0IGNvbnN0IHNoYXJlZENvbmZpZzogVXNlckNvbmZpZyA9IHtcbiAgcm9vdDogcignc3JjJyksXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ34vJzogYCR7cignc3JjJyl9L2AsXG4gICAgfSxcbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgX19ERVZfXzogaXNEZXYsXG4gICAgX19OQU1FX186IEpTT04uc3RyaW5naWZ5KHBhY2thZ2VKc29uLm5hbWUpLFxuICB9LFxuICBwbHVnaW5zOiBbXG4gICAgVnVlKCksXG5cbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIGltcG9ydHM6IFtcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgIHtcbiAgICAgICAgICAnd2ViZXh0ZW5zaW9uLXBvbHlmaWxsJzogW1xuICAgICAgICAgICAgWycqJywgJ2Jyb3dzZXInXSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGR0czogcignc3JjL2F1dG8taW1wb3J0cy5kLnRzJyksXG4gICAgfSksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIGRpcnM6IFtyKCdzcmMvY29tcG9uZW50cycpXSxcbiAgICAgIC8vIGdlbmVyYXRlIGBjb21wb25lbnRzLmQudHNgIGZvciB0cyBzdXBwb3J0IHdpdGggVm9sYXJcbiAgICAgIGR0czogcignc3JjL2NvbXBvbmVudHMuZC50cycpLFxuICAgICAgcmVzb2x2ZXJzOiBbXG4gICAgICAgIC8vIGF1dG8gaW1wb3J0IGljb25zXG4gICAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICAgIHByZWZpeDogJycsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9KSxcblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bnBsdWdpbi1pY29uc1xuICAgIEljb25zKCksXG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdW5vY3NzL3Vub2Nzc1xuICAgIFVub0NTUygpLFxuXG4gICAgLy8gcmV3cml0ZSBhc3NldHMgdG8gdXNlIHJlbGF0aXZlIHBhdGhcbiAgICB7XG4gICAgICBuYW1lOiAnYXNzZXRzLXJld3JpdGUnLFxuICAgICAgZW5mb3JjZTogJ3Bvc3QnLFxuICAgICAgYXBwbHk6ICdidWlsZCcsXG4gICAgICB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbCwgeyBwYXRoIH0pIHtcbiAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZSgvXCJcXC9hc3NldHNcXC8vZywgYFwiJHtyZWxhdGl2ZShkaXJuYW1lKHBhdGgpLCAnL2Fzc2V0cycpfS9gKVxuICAgICAgfSxcbiAgICB9LFxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbXG4gICAgICAndnVlJyxcbiAgICAgICdAdnVldXNlL2NvcmUnLFxuICAgICAgJ3dlYmV4dGVuc2lvbi1wb2x5ZmlsbCcsXG4gICAgXSxcbiAgICBleGNsdWRlOiBbXG4gICAgICAndnVlLWRlbWknLFxuICAgIF0sXG4gIH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kIH0pID0+ICh7XG4gIC4uLnNoYXJlZENvbmZpZyxcbiAgYmFzZTogY29tbWFuZCA9PT0gJ3NlcnZlJyA/IGBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH0vYCA6ICcvZGlzdC8nLFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0LFxuICAgIGhtcjoge1xuICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICB3YXRjaDogaXNEZXZcbiAgICAgID8ge31cbiAgICAgIDogdW5kZWZpbmVkLFxuICAgIG91dERpcjogcignZXh0ZW5zaW9uL2Rpc3QnKSxcbiAgICBlbXB0eU91dERpcjogZmFsc2UsXG4gICAgc291cmNlbWFwOiBpc0RldiA/ICdpbmxpbmUnIDogZmFsc2UsXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9kb2NzL3dlYnN0b3JlL3Byb2dyYW1fcG9saWNpZXMvIzp+OnRleHQ9Q29kZSUyMFJlYWRhYmlsaXR5JTIwUmVxdWlyZW1lbnRzXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgbWFuZ2xlOiBmYWxzZSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG9wdGlvbnM6IHIoJ3NyYy9vcHRpb25zL2luZGV4Lmh0bWwnKSxcbiAgICAgICAgcG9wdXA6IHIoJ3NyYy9wb3B1cC9pbmRleC5odG1sJyksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHRlc3Q6IHtcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICB9LFxufSkpXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3BpbG90L2RhdGEvYWR2YW5jZS9kb2NzL3dQbHVnaW4vc2NyaXB0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvcGlsb3QvZGF0YS9hZHZhbmNlL2RvY3Mvd1BsdWdpbi9zY3JpcHRzL3V0aWxzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3BpbG90L2RhdGEvYWR2YW5jZS9kb2NzL3dQbHVnaW4vc2NyaXB0cy91dGlscy50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgeyBiZ0N5YW4sIGJsYWNrIH0gZnJvbSAna29sb3Jpc3QnXG5cbmV4cG9ydCBjb25zdCBwb3J0ID0gTnVtYmVyKHByb2Nlc3MuZW52LlBPUlQgfHwgJycpIHx8IDMzMDNcbmV4cG9ydCBjb25zdCByID0gKC4uLmFyZ3M6IHN0cmluZ1tdKSA9PiByZXNvbHZlKF9fZGlybmFtZSwgJy4uJywgLi4uYXJncylcbmV4cG9ydCBjb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbidcbmV4cG9ydCBjb25zdCBpc0ZpcmVmb3ggPSBwcm9jZXNzLmVudi5FWFRFTlNJT04gPT09ICdmaXJlZm94J1xuXG5leHBvcnQgZnVuY3Rpb24gbG9nKG5hbWU6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XG4gIGNvbnNvbGUubG9nKGJsYWNrKGJnQ3lhbihgICR7bmFtZX0gYCkpLCBtZXNzYWdlKVxufVxuIiwgIntcbiAgXCJuYW1lXCI6IFwiZG9jcy1mZ2lzLXdlYmV4dFwiLFxuICBcImRpc3BsYXlOYW1lXCI6IFwiYWR2YW5jZS5Eb2NzLUZnaXNcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4wLjFcIixcbiAgXCJwcml2YXRlXCI6IHRydWUsXG4gIFwicGFja2FnZU1hbmFnZXJcIjogXCJwbnBtQDguMTUuNFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiW2Rlc2NyaXB0aW9uXVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwibnBtIHJ1biBjbGVhciAmJiBjcm9zcy1lbnYgTk9ERV9FTlY9ZGV2ZWxvcG1lbnQgcnVuLXAgZGV2OipcIixcbiAgICBcImJ1aWxkXCI6IFwiY3Jvc3MtZW52IE5PREVfRU5WPXByb2R1Y3Rpb24gcnVuLXMgY2xlYXIgYnVpbGQ6KlwiLFxuICAgIFwiZGV2LWZpcmVmb3hcIjogXCJucG0gcnVuIGNsZWFyICYmIGNyb3NzLWVudiBOT0RFX0VOVj1kZXZlbG9wbWVudCBFWFRFTlNJT049ZmlyZWZveCBydW4tcCBkZXY6KlwiLFxuICAgIFwiYnVpbGQtZmlyZWZveFwiOiBcImNyb3NzLWVudiBOT0RFX0VOVj1wcm9kdWN0aW9uIEVYVEVOU0lPTj1maXJlZm94IHJ1bi1zIGNsZWFyIGJ1aWxkOipcIixcbiAgICBcImRldjpwcmVwYXJlXCI6IFwiZXNubyBzY3JpcHRzL3ByZXBhcmUudHNcIixcbiAgICBcImJ1aWxkOnByZXBhcmVcIjogXCJlc25vIHNjcmlwdHMvcHJlcGFyZS50c1wiLFxuICAgIFwiZGV2OmJhY2tncm91bmRcIjogXCJucG0gcnVuIGJ1aWxkOmJhY2tncm91bmQgLS0gLS1tb2RlIGRldmVsb3BtZW50XCIsXG4gICAgXCJidWlsZDpiYWNrZ3JvdW5kXCI6IFwidml0ZSBidWlsZCAtLWNvbmZpZyB2aXRlLmNvbmZpZy5iYWNrZ3JvdW5kLm10c1wiLFxuICAgIFwiZGV2OndlYlwiOiBcInZpdGVcIixcbiAgICBcImJ1aWxkOndlYlwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcImRldjpkb2NzLWFzc2lzdGFudFwiOiBcIm5wbSBydW4gYnVpbGQ6ZG9jczphc3Npc3RhbnQgLS0gLS1tb2RlIGRldmVsb3BtZW50XCIsXG4gICAgXCJidWlsZDpkb2NzLWFzc2lzdGFudFwiOiBcInZpdGUgYnVpbGQgLS1jb25maWcgdml0ZS5jb25maWcuZG9jcy5hc3Npc3RhbnQubXRzXCIsXG4gICAgXCJkZXY6ZG9jcy1jbGFpbVwiOiBcIm5wbSBydW4gYnVpbGQ6ZG9jczpjbGFpbSAtLSAtLW1vZGUgZGV2ZWxvcG1lbnRcIixcbiAgICBcImJ1aWxkOmRvY3MtY2xhaW1cIjogXCJ2aXRlIGJ1aWxkIC0tY29uZmlnIHZpdGUuY29uZmlnLmRvY3MuY2xhaW0ubXRzXCIsXG4gICAgXCJkZXY6ZG9jcy1yZXBsaWNhdGlvblwiOiBcIm5wbSBydW4gYnVpbGQ6ZG9jczpyZXBsaWNhdGlvbiAtLSAtLW1vZGUgZGV2ZWxvcG1lbnRcIixcbiAgICBcImJ1aWxkOmRvY3MtcmVwbGljYXRpb25cIjogXCJ2aXRlIGJ1aWxkIC0tY29uZmlnIHZpdGUuY29uZmlnLmRvY3MucmVwbGljYXRpb24ubXRzXCIsXG4gICAgXCJkZXY6Zmdpc1wiOiBcIm5wbSBydW4gYnVpbGQ6ZmdpcyAtLSAtLW1vZGUgZGV2ZWxvcG1lbnRcIixcbiAgICBcImJ1aWxkOmZnaXNcIjogXCJ2aXRlIGJ1aWxkIC0tY29uZmlnIHZpdGUuY29uZmlnLmZnaXMubXRzXCIsXG4gICAgXCJwYWNrXCI6IFwiY3Jvc3MtZW52IE5PREVfRU5WPXByb2R1Y3Rpb24gcnVuLXAgcGFjazoqXCIsXG4gICAgXCJwYWNrOnppcFwiOiBcInJpbXJhZiBleHRlbnNpb24uemlwICYmIGpzemlwLWNsaSBhZGQgZXh0ZW5zaW9uLyogLW8gLi9leHRlbnNpb24uemlwXCIsXG4gICAgXCJwYWNrOmNyeFwiOiBcImNyeCBwYWNrIGV4dGVuc2lvbiAtbyAuL2V4dGVuc2lvbi5jcnhcIixcbiAgICBcInBhY2s6eHBpXCI6IFwiY3Jvc3MtZW52IFdFQl9FWFRfQVJUSUZBQ1RTX0RJUj0uLyB3ZWItZXh0IGJ1aWxkIC0tc291cmNlLWRpciAuL2V4dGVuc2lvbiAtLWZpbGVuYW1lIGV4dGVuc2lvbi54cGkgLS1vdmVyd3JpdGUtZGVzdFwiLFxuICAgIFwic3RhcnQ6Y2hyb21pdW1cIjogXCJ3ZWItZXh0IHJ1biAtLXNvdXJjZS1kaXIgLi9leHRlbnNpb24gLS10YXJnZXQ9Y2hyb21pdW1cIixcbiAgICBcInN0YXJ0OmZpcmVmb3hcIjogXCJ3ZWItZXh0IHJ1biAtLXNvdXJjZS1kaXIgLi9leHRlbnNpb24gLS10YXJnZXQ9ZmlyZWZveC1kZXNrdG9wXCIsXG4gICAgXCJjbGVhclwiOiBcInJpbXJhZiAtLWdsb2IgZXh0ZW5zaW9uL2Rpc3QgZXh0ZW5zaW9uL21hbmlmZXN0Lmpzb24gZXh0ZW5zaW9uLipcIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgLS1jYWNoZSAuXCIsXG4gICAgXCJ0ZXN0XCI6IFwidml0ZXN0IHRlc3RcIixcbiAgICBcInRlc3Q6ZTJlXCI6IFwicGxheXdyaWdodCB0ZXN0XCIsXG4gICAgXCJwb3N0aW5zdGFsbFwiOiBcInNpbXBsZS1naXQtaG9va3NcIixcbiAgICBcInR5cGVjaGVja1wiOiBcInRzYyAtLW5vRW1pdFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBhbnRmdS9lc2xpbnQtY29uZmlnXCI6IFwiXjIuOC4xXCIsXG4gICAgXCJAZmZmbG9yaWFuL2pzemlwLWNsaVwiOiBcIl4zLjYuMlwiLFxuICAgIFwiQGljb25pZnkvanNvblwiOiBcIl4yLjIuMTkxXCIsXG4gICAgXCJAcGxheXdyaWdodC90ZXN0XCI6IFwiXjEuNDIuMVwiLFxuICAgIFwiQHR5cGVzL2ZzLWV4dHJhXCI6IFwiXjExLjAuNFwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMTEuMjZcIixcbiAgICBcIkB0eXBlcy93ZWJleHRlbnNpb24tcG9seWZpbGxcIjogXCJeMC4xMC43XCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl43LjIuMFwiLFxuICAgIFwiQHVub2Nzcy9yZXNldFwiOiBcIl4wLjU4LjVcIixcbiAgICBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiOiBcIl41LjAuNFwiLFxuICAgIFwiQHZ1ZS9jb21waWxlci1zZmNcIjogXCJeMy40LjIxXCIsXG4gICAgXCJAdnVlL3Rlc3QtdXRpbHNcIjogXCJeMi40LjRcIixcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMC45LjBcIixcbiAgICBcImNob2tpZGFyXCI6IFwiXjMuNi4wXCIsXG4gICAgXCJjcm9zcy1lbnZcIjogXCJeNy4wLjNcIixcbiAgICBcImNyeFwiOiBcIl41LjAuMVwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNTcuMFwiLFxuICAgIFwiZXNub1wiOiBcIl40LjcuMFwiLFxuICAgIFwiZnMtZXh0cmFcIjogXCJeMTEuMi4wXCIsXG4gICAgXCJqc2RvbVwiOiBcIl4yNC4wLjBcIixcbiAgICBcImtvbG9yaXN0XCI6IFwiXjEuOC4wXCIsXG4gICAgXCJsaW50LXN0YWdlZFwiOiBcIl4xNS4yLjJcIixcbiAgICBcIm5wbS1ydW4tYWxsXCI6IFwiXjQuMS41XCIsXG4gICAgXCJyaW1yYWZcIjogXCJeNS4wLjVcIixcbiAgICBcInNpbXBsZS1naXQtaG9va3NcIjogXCJeMi4xMC4wXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuNC4yXCIsXG4gICAgXCJ1bm9jc3NcIjogXCJeMC41OC41XCIsXG4gICAgXCJ1bnBsdWdpbi1hdXRvLWltcG9ydFwiOiBcIl4wLjE3LjVcIixcbiAgICBcInVucGx1Z2luLWljb25zXCI6IFwiXjAuMTguNVwiLFxuICAgIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcIjogXCJeMC4yNi4wXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMS42XCIsXG4gICAgXCJ2aXRlc3RcIjogXCJeMS4zLjFcIixcbiAgICBcInZ1ZVwiOiBcIl4zLjQuMjFcIixcbiAgICBcInZ1ZS1kZW1pXCI6IFwiXjAuMTQuN1wiLFxuICAgIFwid2ViLWV4dFwiOiBcIl43LjExLjBcIixcbiAgICBcIndlYmV4dC1icmlkZ2VcIjogXCJeNi4wLjFcIixcbiAgICBcIndlYmV4dGVuc2lvbi1wb2x5ZmlsbFwiOiBcIl4wLjEwLjBcIlxuICB9LFxuICBcInNpbXBsZS1naXQtaG9va3NcIjoge1xuICAgIFwicHJlLWNvbW1pdFwiOiBcInBucG0gbGludC1zdGFnZWRcIlxuICB9LFxuICBcImxpbnQtc3RhZ2VkXCI6IHtcbiAgICBcIipcIjogXCJlc2xpbnQgLS1maXhcIlxuICB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLFNBQVMsU0FBUyxnQkFBZ0I7QUFFbEMsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFlBQVk7OztBQ1YwUixTQUFTLGVBQWU7QUFDclUsT0FBTyxhQUFhO0FBQ3BCLFNBQVMsUUFBUSxhQUFhO0FBRjlCLElBQU0sbUNBQW1DO0FBSWxDLElBQU0sT0FBTyxPQUFPLFFBQVEsSUFBSSxRQUFRLEVBQUUsS0FBSztBQUMvQyxJQUFNLElBQUksSUFBSSxTQUFtQixRQUFRLGtDQUFXLE1BQU0sR0FBRyxJQUFJO0FBQ2pFLElBQU0sUUFBUSxRQUFR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
