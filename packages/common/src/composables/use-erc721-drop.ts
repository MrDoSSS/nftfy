import { erc721DropABI } from '../generated'
import { reactive, watch } from 'vue'
import { ReadContractConfig } from '@wagmi/core'
import { useReadContract, ComposeReadContractConfig } from './use-read-contract'
import {
  useWriteContract,
  ComposeWriteContractConfig,
} from './use-write-contract'
import { useBalance } from './use-balance'

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

  const mintRules = (params: ReadParams<'mintRules'> = {}) => {
    const mintRules = useReadContract({
      functionName: 'mintRules',
      ...params,
      ...baseConfig,
    })
    const data = reactive<
      | {
          pending: true
        }
      | {
          pending: false
          value: {
            supply: bigint
            maxPerWallet: bigint
            freePerWallet: bigint
            price: bigint
          }
        }
    >({
      pending: mintRules.pending as true,
    })

    watch(mintRules, (newValue) => {
      data.pending = newValue.pending

      if (data.pending || newValue.pending) return

      const [supply, maxPerWallet, freePerWallet, price] = newValue.value

      data.value = {
        supply,
        maxPerWallet,
        freePerWallet,
        price,
      }
    })

    return data
  }

  const numberMinted = (params: ReadParams<'numberMinted'>) =>
    useReadContract({
      functionName: 'numberMinted',
      ...params,
      ...baseConfig,
    })

  const nonFreeAmount = (params: ReadParams<'nonFreeAmount'>) =>
    useReadContract({
      functionName: 'nonFreeAmount',
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

  const setBaseURI = (params: WriteParams<'setBaseURI'>) =>
    useWriteContract({
      functionName: 'setBaseURI',
      ...params,
      ...baseConfig,
    })

  const setMintRules = (params: WriteParams<'setMintRules'>) =>
    useWriteContract({
      functionName: 'setMintRules',
      ...params,
      ...baseConfig,
    })

  const setMaxTotalSupply = (params: WriteParams<'setMaxTotalSupply'>) =>
    useWriteContract({
      functionName: 'setMaxTotalSupply',
      ...params,
      ...baseConfig,
    })

  const setRoot = (params: WriteParams<'setRoot'>) =>
    useWriteContract({
      functionName: 'setRoot',
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
    mintRules,
    balance,
    numberMinted,
    nonFreeAmount,
    mint,
    setBaseURI,
    setMaxTotalSupply,
    setMintRules,
    setRoot,
    airdrop,
    withdraw,
  }
}

export { erc721DropABI }
