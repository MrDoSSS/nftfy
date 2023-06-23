import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  PrepareWriteContractConfig,
} from '@wagmi/core'

export type ComposeWriteContractConfig = Pick<
  PrepareWriteContractConfig,
  'address' | 'chainId'
>

export const useWriteContract = (
  baseConfig: Pick<
    PrepareWriteContractConfig,
    'address' | 'chainId' | 'abi' | 'functionName'
  >
) => {
  return async (
    params: Omit<
      PrepareWriteContractConfig,
      'address' | 'chainId' | 'abi' | 'functionName'
    >
  ) => {
    const { request } = await prepareWriteContract({ ...baseConfig, ...params })

    const { hash } = await writeContract(request)
    const data = await waitForTransaction({ hash })

    return data
  }
}

// export const useWriteContract = <
//   TAbi extends Abi | readonly unknown[],
//   TFunctionName extends TAbi extends Abi
//     ? ExtractAbiFunctionNames<TAbi, 'view' | 'pure'>
//     : string
// >(
//   config: Pick<
//     PrepareWriteContractConfig<TAbi, TFunctionName>,
//     'abi' | 'functionName' | 'address'
//   >
// ) => {
//   return async (
//     params: Omit<
//       PrepareWriteContractConfig<TAbi, TFunctionName>,
//       'abi' | 'functionName' | 'address'
//     >
//   ) => {
//     const { request } = await prepareWriteContract({ ...config, ...params })

//     const { hash } = await writeContract(request)
//     const data = await waitForTransaction({ hash })

//     return data
//   }
// }
