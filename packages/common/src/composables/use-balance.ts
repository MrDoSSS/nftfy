import { FetchBalanceArgs, FetchBalanceResult, fetchBalance } from '@wagmi/core'

export const useBalance = (params: FetchBalanceArgs) => {
  const data: { value?: FetchBalanceResult; pending: boolean } = {
    pending: true,
  }

  fetchBalance(params).then((value) => {
    data.value = value
    data.pending = false
  })

  return data
}
