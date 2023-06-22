import { ref, computed, onUnmounted } from 'vue'
import { watchAccount, getAccount } from '@wagmi/core'
import { sliceAddress } from '../utils'

export const useAccount = () => {
  const account = ref(getAccount())

  const slicedAddress = computed(() => sliceAddress(account.value.address))
  const unwatch = watchAccount((data) => {
    account.value = data
  })

  onUnmounted(unwatch)

  return { account, slicedAddress }
}
