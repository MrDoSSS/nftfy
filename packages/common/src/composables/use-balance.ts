import {
  FetchBalanceArgs,
  FetchBalanceResult,
  fetchBalance,
  watchBlockNumber,
} from '@wagmi/core'
import { onUnmounted } from 'vue'

export const useBalance = ({
  watch,
  ...params
}: FetchBalanceArgs & { watch?: boolean }) => {
  const data: { value?: FetchBalanceResult; pending: boolean } = {
    pending: true,
  }

  const fetch = () =>
    fetchBalance(params).then((value) => {
      data.value = value
      data.pending = false
    })

  fetch()

  let unwatch: ReturnType<typeof watchBlockNumber> | undefined = undefined

  if (watch) {
    unwatch = watchBlockNumber({ chainId: params.chainId, listen: true }, fetch)
  }

  if (unwatch) {
    onUnmounted(unwatch)
  }

  return data
}
