import { erc721DropABI } from '../generated'
import { reactive, watch as vueWatch } from 'vue'
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

export const useErc721Drop = (
  params: Pick<ReadContractConfig, 'address' | 'chainId'>
) => {
  const baseConfig = {
    ...params,
    abi: erc721DropABI,
  }

  const maxTotalSupply = <TParams extends Parameters<typeof useMaxTotalSupply>>(
    params?: Omit<TParams[0], 'address' | 'abi'>,
    watch?: TParams[1]
  ) => {
    const config = {
      ...baseConfig,
      ...params,
    }
    return useMaxTotalSupply(config, watch)
  }

  const totalMinted = <TParams extends Parameters<typeof useTotalMinted>>(
    params?: Omit<TParams[0], 'address' | 'abi'>,
    watch?: TParams[1]
  ) => {
    const config = {
      ...baseConfig,
      ...params,
    }
    return useTotalMinted(config, watch)
  }

  const baseTokenURI = <TParams extends Parameters<typeof useBaseTokenURI>>(
    params?: Omit<TParams[0], 'address' | 'abi'>,
    watch?: TParams[1]
  ) => {
    const config = {
      ...baseConfig,
      ...params,
    }
    return useBaseTokenURI(config, watch)
  }

  const mintRules = <TParams extends Parameters<typeof useMintRules>>(
    params?: Omit<TParams[0], 'address' | 'abi'>,
    watch?: TParams[1]
  ) => {
    const config = {
      ...baseConfig,
      ...params,
    }
    return useMintRules(config, watch)
  }

  const numberMinted = <TParams extends Parameters<typeof useNumberMinted>>(
    params: Omit<TParams[0], 'address' | 'abi'>,
    watch?: TParams[1]
  ) => {
    const config = {
      ...baseConfig,
      ...params,
    }
    return useNumberMinted(config, watch)
  }

  const nonFreeAmount = <TParams extends Parameters<typeof useNonFreeAmount>>(
    params: Omit<TParams[0], 'address' | 'abi'>,
    watch?: TParams[1]
  ) => {
    const config = {
      ...baseConfig,
      ...params,
    }
    return useNonFreeAmount(config, watch)
  }

  const balance = () =>
    useBalance({ address: baseConfig.address, chainId: baseConfig.chainId })

  return {
    totalMinted,
    maxTotalSupply,
    baseTokenURI,
    mintRules,
    balance,
    numberMinted,
    nonFreeAmount,
  }
}

export const useTotalMinted = (
  params: ReadParams<'totalMinted'>,
  watch = false
) =>
  useReadContract(
    {
      functionName: 'totalMinted',
      abi: erc721DropABI,
      ...params,
    },
    watch
  )
export const useMaxTotalSupply = (
  params: ReadParams<'maxTotalSupply'>,
  watch = false
) =>
  useReadContract(
    {
      functionName: 'maxTotalSupply',
      abi: erc721DropABI,
      ...params,
    },
    watch
  )
export const useBaseTokenURI = (
  params: ReadParams<'baseTokenURI'>,
  watch = false
) =>
  useReadContract(
    {
      functionName: 'baseTokenURI',
      abi: erc721DropABI,
      ...params,
    },
    watch
  )

export const useMintRules = (
  params: ReadParams<'mintRules'>,
  watch = false
) => {
  const mintRules = useReadContract(
    {
      functionName: 'mintRules',
      abi: erc721DropABI,
      ...params,
    },
    watch
  )
  const data = reactive<{
    pending: boolean
    value?: {
      supply: bigint
      maxPerWallet: bigint
      freePerWallet: bigint
      price: bigint
    }
  }>({
    pending: mintRules.pending,
  })

  vueWatch(mintRules, ({ pending, value }) => {
    data.pending = pending

    if (!value) return

    const [supply, maxPerWallet, freePerWallet, price] = value

    data.value = {
      supply,
      maxPerWallet,
      freePerWallet,
      price,
    }
  })

  return data
}

export const useNumberMinted = (
  params: ReadParams<'numberMinted'>,
  watch = false
) =>
  useReadContract(
    {
      functionName: 'numberMinted',
      abi: erc721DropABI,
      ...params,
    },
    watch
  )
export const useNonFreeAmount = (
  params: ReadParams<'nonFreeAmount'>,
  watch = false
) =>
  useReadContract(
    {
      functionName: 'nonFreeAmount',
      abi: erc721DropABI,
      ...params,
    },
    watch
  )

export const useMint = (params: ComposeWriteContractConfig) =>
  useWriteContract({
    functionName: 'mint',
    abi: erc721DropABI,
    ...params,
  })

export const useSetBaseURI = (params: ComposeWriteContractConfig) =>
  useWriteContract({
    functionName: 'setBaseURI',
    abi: erc721DropABI,
    ...params,
  })

export const useSetMintRules = (params: ComposeWriteContractConfig) =>
  useWriteContract({
    functionName: 'setMintRules',
    abi: erc721DropABI,
    ...params,
  })

export const useSetMaxTotalSupply = (params: ComposeWriteContractConfig) =>
  useWriteContract({
    functionName: 'setMaxTotalSupply',
    abi: erc721DropABI,
    ...params,
  })

export const useSetRoot = (params: ComposeWriteContractConfig) =>
  useWriteContract({
    functionName: 'setRoot',
    abi: erc721DropABI,
    ...params,
  })

export const useAirdrop = (params: ComposeWriteContractConfig) =>
  useWriteContract({
    functionName: 'airdrop',
    abi: erc721DropABI,
    ...params,
  })

export const useWithdraw = (params: ComposeWriteContractConfig) =>
  useWriteContract({
    functionName: 'airdrop',
    abi: erc721DropABI,
    ...params,
  })

export { erc721DropABI }

