import { ReadContractConfig } from '@wagmi/core'
import { erc721FactoryABI } from '../generated'
import { useReadContract, ComposeReadContractConfig } from './use-read-contract'
import {
  useWriteContract,
  ComposeWriteContractConfig,
} from './use-write-contract'

type ReadParams<TFunctioName extends string> = ComposeReadContractConfig<
  typeof erc721FactoryABI,
  TFunctioName
>

type WriteParams<TFunctioName extends string> = ComposeWriteContractConfig<
  typeof erc721FactoryABI,
  TFunctioName
>

export const useErc721Factory = (
  config: Pick<ReadContractConfig, 'address' | 'chainId'>
) => {
  const baseConfig = {
    ...config,
    abi: erc721FactoryABI,
  }

  const implementation = (params: ReadParams<'implementation'>) =>
    useReadContract({
      functionName: 'implementation',
      ...params,
      ...baseConfig,
    })

  const clone = (params: WriteParams<'clone'>) =>
    useWriteContract({
      functionName: 'clone',
      ...params,
      ...baseConfig,
    })

  return { implementation, clone }
}

export { erc721FactoryABI }
