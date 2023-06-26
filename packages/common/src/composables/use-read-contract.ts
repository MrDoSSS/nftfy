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
> = Omit<
  ReadContractConfig<TAbi, TFunctioName>,
  'functionName' | 'abi' | 'address' | 'chainId'
> & { watch?: boolean }

export const useReadContract = <
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends TAbi extends Abi
    ? ExtractAbiFunctionNames<TAbi, 'view' | 'pure'>
    : string,
  TReturnType = ReadContractReturnType<TAbi, TFunctionName>
>(
  config: ReadContractConfig<TAbi, TFunctionName> & {
    watch?: boolean
  }
) => {
  const data = reactive<
    { pending: true } | { pending: false; value: TReturnType }
  >({
    pending: true,
  })

  let unwatch: ReturnType<typeof watchReadContract> | undefined = undefined

  readContract(config).then((value) => {
    data.pending = false

    if (data.pending === false) data.value = value as UnwrapRef<TReturnType>

    unwatch = watchReadContract(
      { ...config, listenToBlock: config.watch },
      (newValue) => {
        if (data.pending === false)
          data.value = newValue as UnwrapRef<TReturnType>
      }
    )
  })

  if (unwatch) {
    onUnmounted(unwatch)
  }

  return data
}
