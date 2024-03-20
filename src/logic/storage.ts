import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

const storageDemo = useWebExtensionStorage('webext-demo', 'Storage Demo')
const docLink = useWebExtensionStorage('docLink', '')
const docPin = useWebExtensionStorage('docPin', '')
const docType = useWebExtensionStorage('docType', '')
const docIndex = useWebExtensionStorage('docIndex', '')
const canSign = useWebExtensionStorage('fgisDocsCanSign', false)
export {
  storageDemo,
  canSign,
  docLink,
  docPin,
  docType,
  docIndex
}
