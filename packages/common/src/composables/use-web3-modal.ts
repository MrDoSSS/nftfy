import { web3Modal } from '../web3-modal'
import { useAccount } from './use-account'
import { ref, onUnmounted } from 'vue'

export const useWeb3Modal = () => {
  const { account } = useAccount()
  const opened = ref(false)

  const connect = () => {
    return new Promise<boolean>((resolve) => {
      web3Modal.openModal()

      const unsubscribe = web3Modal.subscribeModal(() => {
        unsubscribe()
        resolve(account.value.isConnected)
      })
    })
  }

  const unsubscribeModal = web3Modal.subscribeModal(
    (state: { open: boolean }) => {
      opened.value = state.open
    }
  )

  onUnmounted(unsubscribeModal)

  return { connect, web3Modal, opened }
}
