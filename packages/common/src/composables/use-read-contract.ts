import {
  readContract,
  watchReadContract,
  ReadContractConfig,
} from '@wagmi/core'
import { Abi, ReadContractReturnType } from 'viem'
import { UnwrapRef, onUnmounted, reactive } from 'vue'
import { ExtractAbiFunctionNames } from 'abitype'

export type ComposeReadContractConfig<
  TAbi extends Abi,
  TFunctioName extends string
> = Omit<ReadContractConfig<TAbi, TFunctioName>, 'functionName' | 'abi'>

export const useReadContract = <
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends TAbi extends Abi
    ? ExtractAbiFunctionNames<TAbi, 'view' | 'pure'>
    : string,
  TReturnType = ReadContractReturnType<TAbi, TFunctionName>
>(
  config: ReadContractConfig<TAbi, TFunctionName> & {
    listenToBlock?: boolean
  },
  watch = false
) => {
  const data = reactive<{ value?: TReturnType; pending: boolean }>({
    pending: true,
  })

  let unwatch: ReturnType<typeof watchReadContract> | undefined = undefined

  readContract(config).then((value) => {
    data.pending = false
    data.value = value as UnwrapRef<TReturnType>

    if (watch) {
      unwatch = watchReadContract(config, (newValue) => {
        data.value = newValue as UnwrapRef<TReturnType>
      })
    }
  })

  if (watch && unwatch) {
    onUnmounted(unwatch)
  }

  return data
}
