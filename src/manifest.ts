import fs from 'fs-extra'
import type { Manifest } from 'webextension-polyfill'
import type PkgType from '../package.json'
import { isDev, isFirefox, port, r } from '../scripts/utils'

export async function getManifest() {
  const pkg = await fs.readJSON(r('package.json')) as typeof PkgType

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    action: {
      // default_icon: './assets/icon-512.png',
      default_icon: './assets/logo_docs1.svg',
      default_popup: './dist/popup/index.html',
    },
    options_ui: {
      page: './dist/options/index.html',
      open_in_tab: true,
    },
    background: isFirefox
      ? {
        scripts: [
          'dist/background/index.mjs',
          // 'dist/background/index.mjs',
          // 'dist/background/token.mjs',
          // 'dist/background/parser.mjs',
        ],
        type: 'module',
      }
      : {
        service_worker: './dist/background/index.mjs',
      },
    icons: {
      16: './assets/icon-512.png',
      48: './assets/icon-512.png',
      128: './assets/icon-512.png',
    },

  "permissions": [
      'activeTab',
    "webRequest",
    "storage",
    "menus",
    "tabs"
  ],
    host_permissions: ['*://*/*'],
    content_scripts: [
      {
        matches: [
          // '<all_urls>',
          "https://srd.fsa.gov.ru/srd"
        ],
        js: [
          'dist/contentScripts/index.global.js',
        ],
      },
      {
        "matches": [
          "https://*.advance-docs.ru/Assistant",
          "https://*.adv-docs.ru/Assistant"
        ],
        "js": [
          "dist/docs/content_assistant.js",
          "dist/docs/actions_assistant.js"
        ],
        // "css": [
        //   "advance/style/content_assistant.css"
        // ]
      },
      // {
      //   "matches": [
      //     "https://srd.fsa.gov.ru/srd"
      //   ],
      //   "js": [
      //     // "dist/utils/spiner/init.js",
      //     "dist/fgis/index.fgis.js"
      //   ],
      //   // "css": [
      //   //   "utils/spiner/style.css",
      //   //   "fgis/style.css"
      //   // ]
      // }

    ],

    web_accessible_resources: [
      {
        resources: ['dist/contentScripts/style.css'],
        matches: ['<all_urls>'],
      },
    ],
    content_security_policy: {
      extension_pages: isDev
        // this is required on dev for Vite script to load
        ? `script-src \'self\' http://localhost:${port}; object-src \'self\'`
        : 'script-src \'self\'; object-src \'self\'',
    },
  }

  // FIXME: not work in MV3
  if (isDev && false) {
    // for content script, as browsers will cache them for each reload,
    // we use a background script to always inject the latest version
    // see src/background/contentScriptHMR.ts
    delete manifest.content_scripts
    manifest.permissions?.push('webNavigation')
  }

  return manifest
}
