import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

const storeLink = useWebExtensionStorage('storeLink', false)
const docLink = useWebExtensionStorage('docLink', '')
const docPin = useWebExtensionStorage('docPin', '')
const docType = useWebExtensionStorage('docType', '')
const docIndex = useWebExtensionStorage('docIndex', '')
const canSign = useWebExtensionStorage('fgisDocsCanSign', true)


export {
  storeLink,
  canSign,
  docLink,
  docPin,
  docType,
  docIndex,
}
