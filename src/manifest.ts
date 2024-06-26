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
      default_icon: './assets/icon-512.png',
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
          
          // "back/browser-polyfill.js",
          // "back/main_controller/worker/main.js",
          // "back/ds/worker/document.js",
          // "back/ds/worker/ds_statement.js",
          // "back/ds/worker/ds_main.js",
          // "back/ds/worker/ds_fgis.js",
          // "back/ds/worker/ds_advance.js",
          // "back/fgis/worker/token.js",
          // "back/fgis/worker/parser.js",
          // "back/fgis/worker/test_fun.js",
          // "back/background.js"

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
        "matches": [
          "https://*.advance-docs.ru/Assistant",
          "https://*.adv-docs.ru/Assistant"
        ],
        "js": [
          "dist/docs/assistant.js",
        ],
      },
      {
        "matches": [
          "https://srd.fsa.gov.ru/srd"
        ],
        "js": [
          "dist/fgis/srd.js"
        ],
      },
      {
        "matches": [
          "https://*.advance-docs.ru/Claim/Edit/*",
          "https://*.adv-docs.ru/Claim/Edit/*"
        ],
        "js": [
          "dist/docs/claim.js"
        ]
      },

      {
        "matches": [
          "https://*.advance-docs.ru/Replication/Processed*",
          "https://*.adv-docs.ru/Replication/Processed*"
        ],
        "js": [
          "dist/docs/replication.js",
        ]
      },
      {
        "matches": [
          "http://esep.fsa.gov.ru/ESEP-WebApp/sign/preview/*"
        ],
        "js": [
          "dist/fgis/esep.js"
        ]
      }
    ],

    web_accessible_resources: [
      {
        resources: [
          'dist/fgis/style.css',
        ],
        matches: [
          "http://*.fsa.gov.ru/*",
          "https://*.fsa.gov.ru/*",
        ],
      },
      {
        resources: [
          'dist/docs/style.css',
        ],
        matches: [
          "https://*.advance-docs.ru/*",
          "https://*.adv-docs.ru/*"
        ],
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
