/* eslint-disable no-console */
// import { onMessage } from 'webext-bridge/content-script'
import { createApp } from 'vue'
import App from './App.vue'
import { setupApp } from '~/logic/common-setup'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {

  // mount component to context window
  const container = document.createElement('div')
  container.id = __NAME__
  container.style.position = 'absolute'
  container.style.zIndex = "999"

  const root = document.createElement('div')
  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container

  const styleEl = document.createElement('link')
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/fgis/style.css'))
  shadowDOM.appendChild(styleEl)

  shadowDOM.appendChild(root)
  document.body.appendChild(container)
  const app = createApp(App)
  setupApp(app)
  app.mount(root)
})()
