import { web3modal } from '../web3-modal'
import { useAccount } from './use-account'
import { ref, onUnmounted } from 'vue'

export const useWeb3Modal = () => {
  const { account } = useAccount()
  const opened = ref(false)

  const connect = () => {
    return new Promise<boolean>((resolve) => {
      web3modal.openModal()

      const unsubscribe = web3modal.subscribeModal(() => {
        unsubscribe()
        resolve(account.value.isConnected)
      })
    })
  }

  const unsubscribeModal = web3modal.subscribeModal(
    (state: { open: boolean }) => {
      opened.value = state.open
    }
  )

  onUnmounted(unsubscribeModal)

  return { connect, web3modal, opened }
}
