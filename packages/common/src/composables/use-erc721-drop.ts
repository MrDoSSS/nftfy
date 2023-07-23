import { erc721DropABI } from '../generated'
import { ReadContractConfig } from '@wagmi/core'
import { useReadContract, ComposeReadContractConfig } from './use-read-contract'
import {
  useWriteContract,
  ComposeWriteContractConfig,
} from './use-write-contract'
import { useBalance } from './use-balance'
import { isReactive, reactive, toRefs } from 'vue'

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
    ...(isReactive(config) ? toRefs(config) : config),
    abi: erc721DropABI,
  }

  const maxTotalSupply = (params: ReadParams<'maxTotalSupply'> = {}) =>
    useReadContract(
      reactive({
        functionName: 'maxTotalSupply',
        ...(isReactive(params) ? toRefs(params) : params),
        ...baseConfig,
      })
    )

  const totalMinted = (params: ReadParams<'totalMinted'> = {}) =>
    useReadContract(
      reactive({
        functionName: 'totalMinted',
        ...(isReactive(params) ? toRefs(params) : params),
        ...baseConfig,
      })
    )

  const baseTokenURI = (params: ReadParams<'baseTokenURI'> = {}) =>
    useReadContract(
      reactive({
        functionName: 'baseTokenURI',
        ...(isReactive(params) ? toRefs(params) : params),
        ...baseConfig,
      })
    )

  const numberMinted = (params: ReadParams<'numberMinted'>) =>
    useReadContract(
      reactive({
        functionName: 'numberMinted',
        ...(isReactive(params) ? toRefs(params) : params),
        ...baseConfig,
      })
    )

  const phases = (params: ReadParams<'phases'> = {}) =>
    useReadContract(
      reactive({
        functionName: 'phases',
        ...(isReactive(params) ? toRefs(params) : params),
        ...baseConfig,
      })
    )

  const numberMintedPerPhases = (params: ReadParams<'numberMintedPerPhases'>) =>
    useReadContract(
      reactive({
        functionName: 'numberMintedPerPhases',
        ...(isReactive(params) ? toRefs(params) : params),
        ...baseConfig,
      })
    )

  const globalMaxPerWallet = (params: ReadParams<'globalMaxPerWallet'> = {}) =>
    useReadContract(
      reactive({
        functionName: 'globalMaxPerWallet',
        ...(isReactive(params) ? toRefs(params) : params),
        ...baseConfig,
      })
    )

  const burnable = (params: ReadParams<'burnable'> = {}) =>
    useReadContract(
      reactive({
        functionName: 'burnable',
        ...(isReactive(params) ? toRefs(params) : params),
        ...baseConfig,
      })
    )

  const balance = ({ watch }: { watch?: boolean }) =>
    useBalance(
      reactive({
        address: baseConfig.address,
        chainId: baseConfig.chainId,
        watch,
      })
    )

  const mint = (params: WriteParams<'mint'>) =>
    useWriteContract(
      reactive({
        functionName: 'mint',
        ...params,
        ...baseConfig,
      })
    )

  const burn = (params: WriteParams<'burn'>) =>
    useWriteContract(
      reactive({
        functionName: 'burn',
        ...params,
        ...baseConfig,
      })
    )

  const setBaseURI = (params: WriteParams<'setBaseURI'>) =>
    useWriteContract(
      reactive({
        functionName: 'setBaseURI',
        ...params,
        ...baseConfig,
      })
    )

  const setBurnable = (params: WriteParams<'setBurnable'>) =>
    useWriteContract(
      reactive({
        functionName: 'setBurnable',
        ...params,
        ...baseConfig,
      })
    )

  const setGlobalMaxPerWallet = (
    params: WriteParams<'setGlobalMaxPerWallet'>
  ) =>
    useWriteContract(
      reactive({
        functionName: 'setGlobalMaxPerWallet',
        ...params,
        ...baseConfig,
      })
    )

  const setPhases = (params: WriteParams<'setPhases'>) =>
    useWriteContract(
      reactive({
        functionName: 'setPhases',
        ...params,
        ...baseConfig,
      })
    )

  const airdrop = (params: WriteParams<'airdrop'>) =>
    useWriteContract(
      reactive({
        functionName: 'airdrop',
        ...params,
        ...baseConfig,
      })
    )

  const withdraw = (params: WriteParams<'withdraw'>) =>
    useWriteContract(
      reactive({
        functionName: 'withdraw',
        ...params,
        ...baseConfig,
      })
    )

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
