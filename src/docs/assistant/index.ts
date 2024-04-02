import { createApp } from 'vue'
import Assistant from './Assistant.vue'
import { setupApp } from '~/logic/common-setup'

import { init as init_actions } from './actions'

(() => {
  const mPoint = document.getElementById('pluginarea')
  const assistant = createApp(Assistant)
  setupApp(assistant)
  assistant.mount(mPoint)
  init_actions()
})()
