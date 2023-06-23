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

export const useImplementation = (
  params: ReadParams<'implementation'>,
  watch = false
) =>
  useReadContract(
    {
      abi: erc721FactoryABI,
      functionName: 'implementation',
      ...params,
    },
    watch
  )

export const useClone = (params: ComposeWriteContractConfig) =>
  useWriteContract({
    functionName: 'clone',
    abi: erc721FactoryABI,
    ...params,
  })

export { erc721FactoryABI }
