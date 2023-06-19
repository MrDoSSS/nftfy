import { ref, computed, onUnmounted } from 'vue'
import { watchAccount, getAccount } from '@wagmi/core'

export const useAccount = () => {
  const account = ref(getAccount())

  const slicedAddress = computed(() => {
    if (!account.value.address) return ''

    return `${account.value.address.slice(
      0,
      4
    )}...${account.value.address.slice(account.value.address.length - 4)}`
  })

  const unwatch = watchAccount((data) => {
    account.value = data
  })

  onUnmounted(unwatch)

  return { account, slicedAddress }
}
