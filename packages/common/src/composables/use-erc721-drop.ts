import { erc721DropABI } from '../generated'
import { ReadContractConfig } from '@wagmi/core'
import { useReadContract, ComposeReadContractConfig } from './use-read-contract'
import {
  useWriteContract,
  ComposeWriteContractConfig,
} from './use-write-contract'
import { useBalance } from './use-balance'
import { MaybeRef, unref } from 'vue'
import { deepUnref } from '../utils'

type ReadParams<TFunctioName extends string> = ComposeReadContractConfig<
  typeof erc721DropABI,
  TFunctioName
>

type WriteParams<TFunctioName extends string> = ComposeWriteContractConfig<
  typeof erc721DropABI,
  TFunctioName
>

export const useErc721Drop = (
  config: Pick<ReadContractConfig, 'address' | 'chainId'>
) => {
  const baseConfig = {
    ...config,
    abi: erc721DropABI,
  }

  const maxTotalSupply = (params: ReadParams<'maxTotalSupply'> = {}) =>
    useReadContract({
      functionName: 'maxTotalSupply',
      ...params,
      ...baseConfig,
    })

  const totalMinted = (params: ReadParams<'totalMinted'> = {}) =>
    useReadContract({
      functionName: 'totalMinted',
      ...params,
      ...baseConfig,
    })

  const baseTokenURI = (params: ReadParams<'baseTokenURI'> = {}) =>
    useReadContract({
      functionName: 'baseTokenURI',
      ...params,
      ...baseConfig,
    })

  const numberMinted = <
    B extends ReadParams<'numberMinted'> = ReadParams<'numberMinted'>
  >(params: {
    args: [MaybeRef<B['args'][number]>]
    blockTag?: MaybeRef<B['blockTag']>
    blockNumber?: MaybeRef<B['blockNumber']>
    watch?: MaybeRef<B['watch']>
  }) => {
    const cfg = {
      args: deepUnref(params.args) as B['args'],
      blockTag: unref(params.blockTag),
      blockNumber: unref(params.blockNumber),
      watch: unref(params.watch),
    }

    return useReadContract({
      functionName: 'numberMinted',
      ...cfg,
      ...baseConfig,
    })
  }

  const phases = (params: ReadParams<'phases'> = {}) =>
    useReadContract({
      functionName: 'phases',
      ...params,
      ...baseConfig,
    })

  const numberMintedPerPhases = (params: ReadParams<'numberMintedPerPhases'>) =>
    useReadContract({
      functionName: 'numberMintedPerPhases',
      ...params,
      ...baseConfig,
    })

  const globalMaxPerWallet = (params: ReadParams<'globalMaxPerWallet'> = {}) =>
    useReadContract({
      functionName: 'globalMaxPerWallet',
      ...params,
      ...baseConfig,
    })

  const burnable = (params: ReadParams<'burnable'> = {}) =>
    useReadContract({
      functionName: 'burnable',
      ...params,
      ...baseConfig,
    })

  const balance = ({ watch }: { watch?: boolean }) =>
    useBalance({
      address: baseConfig.address,
      chainId: baseConfig.chainId,
      watch,
    })

  const mint = (params: WriteParams<'mint'>) =>
    useWriteContract({
      functionName: 'mint',
      ...params,
      ...baseConfig,
    })

  const burn = (params: WriteParams<'burn'>) =>
    useWriteContract({
      functionName: 'burn',
      ...params,
      ...baseConfig,
    })

  const setBaseURI = (params: WriteParams<'setBaseURI'>) =>
    useWriteContract({
      functionName: 'setBaseURI',
      ...params,
      ...baseConfig,
    })

  const setBurnable = (params: WriteParams<'setBurnable'>) =>
    useWriteContract({
      functionName: 'setBurnable',
      ...params,
      ...baseConfig,
    })

  const setGlobalMaxPerWallet = (
    params: WriteParams<'setGlobalMaxPerWallet'>
  ) =>
    useWriteContract({
      functionName: 'setGlobalMaxPerWallet',
      ...params,
      ...baseConfig,
    })

  const setPhases = (params: WriteParams<'setPhases'>) =>
    useWriteContract({
      functionName: 'setPhases',
      ...params,
      ...baseConfig,
    })

  const airdrop = (params: WriteParams<'airdrop'>) =>
    useWriteContract({
      functionName: 'airdrop',
      ...params,
      ...baseConfig,
    })

  const withdraw = (params: WriteParams<'withdraw'>) =>
    useWriteContract({
      functionName: 'withdraw',
      ...params,
      ...baseConfig,
    })

  return {
    totalMinted,
    maxTotalSupply,
    baseTokenURI,
    numberMinted,
    numberMintedPerPhases,
    globalMaxPerWallet,
    burnable,
    phases,
    balance,
    mint,
    setBaseURI,
    airdrop,
    withdraw,
    setBurnable,
    setGlobalMaxPerWallet,
    setPhases,
    burn,
  }
}

export { erc721DropABI }
