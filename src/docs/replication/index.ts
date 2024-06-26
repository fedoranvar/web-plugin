import { createApp } from 'vue'
import Replication from './Replication.vue'
import { setupApp } from '~/logic/common-setup'

// import { init as init_actions } from './actions'

(() => {

  const container = document.createElement('div')
  const root = document.createElement('div')
  // const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  const shadowDOM = container

  const styleEl = document.createElement('link')
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/docs/style.css'))
  shadowDOM.appendChild(styleEl)

  shadowDOM.appendChild(root)

  // document.body.appendChild(container)

  document.querySelector('.condensed').insertBefore(container, document.querySelector('#table_processed'))

  const app = createApp(Replication)
  setupApp(app)
  app.mount(root)

})()


