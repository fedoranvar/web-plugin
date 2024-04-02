import { createApp } from 'vue'
import Replication from './Replication.vue'
import { setupApp } from '~/logic/common-setup'

// import { init as init_actions } from './actions'

(() => {

  const refNode = document.querySelector('.top_header .inner')
  const rootNode = document.createElement("div")
  rootNode.setAttribute('id', 'pluginReplication')

  // const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container
  // const shadowDOM =  rootNode

  // const styleEl = document.createElement('link')
  // styleEl.setAttribute('rel', 'stylesheet')
  // styleEl.setAttribute('href', browser.runtime.getURL('dist/docs/style.css'))
  // shadowDOM.appendChild(styleEl)

  refNode?.parentNode?.insertBefore(rootNode, refNode.nextSibling)

  const mPoint = document.getElementById('pluginReplication')
  const mTemplate = createApp(Replication)

  setupApp(mTemplate)
  mTemplate.mount(mPoint)

})()


