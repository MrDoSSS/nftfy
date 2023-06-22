import { erc721DropABI } from '../generated'
import {
  prepareWriteContract,
  readContract,
  writeContract,
  waitForTransaction,
  getAccount,
} from '@wagmi/core'
import { SimulateContractParameters, ReadContractParameters } from 'viem'
import { Ref, ComputedRef, provide, InjectionKey } from 'vue'
import { fetchBalance, FetchBalanceResult, getPublicClient } from '@wagmi/core'

export interface Statistics {
  maxTotalSupply: bigint
  totalMinted: bigint
  balance?: FetchBalanceResult
  tokensLeft: bigint
  pending: boolean
}

export interface MintRules {
  supply: bigint
  maxPerWallet: bigint
  freePerWallet: bigint
  price: bigint
}

export const injectKey: InjectionKey<ReturnType<typeof useErc721Drop>> =
  Symbol()

export const useErc721Drop = (
  contractAddress:
    | Ref<`0x${string}` | undefined>
    | ComputedRef<`0x${string}` | undefined>,
  chainId?: Ref<number | undefined> | ComputedRef<number | undefined>
) => {
  const readable = <T = unknown>(
    functionName: string,
    params: Omit<
      ReadContractParameters,
      'address' | 'abi' | 'functionName'
    > = {}
  ) => {
    if (!contractAddress.value) return

    return readContract({
      ...params,
      address: contractAddress.value,
      abi: erc721DropABI,
      chainId: chainId?.value,
      functionName,
    }) as Promise<T>
  }

  const writable = async (
    functionName: string,
    params: Omit<
      SimulateContractParameters,
      'address' | 'abi' | 'functionName'
    > = {}
  ) => {
    if (!contractAddress.value) return

    const publicClient = getPublicClient({ chainId: chainId?.value })
    const account = getAccount()

    const gas = await publicClient.estimateContractGas({
      ...params,
      address: contractAddress.value,
      abi: erc721DropABI,
      functionName,
      account: account.address!,
    })

    const { request } = await prepareWriteContract({
      ...params,
      address: contractAddress.value,
      abi: erc721DropABI,
      chainId: chainId?.value,
      functionName,
      gas,
    })
    const { hash } = await writeContract(request)
    const data = await waitForTransaction({ hash })
    return data
  }

  const mint = async (
    amount: bigint,
    value: bigint,
    freeAmount?: bigint,
    proof?: string[]
  ) => writable('mint', { value, args: [amount, freeAmount, proof] })

  const setBaseUri = async (uri: string) =>
    writable('setBaseUri', { args: [uri] })

  const setMintRules = async (mintRules: MintRules) =>
    writable('setMintRules', {
      args: [mintRules],
    })

  const setMaxTotalSupply = async (totalSupply: bigint) =>
    writable('setMaxTotalSupply', { args: [totalSupply] })

  const setRoot = (root: string) => writable('setRoot', { args: [root] })

  const airdrop = (address: `0x${string}`, amount: bigint) =>
    writable('airdrop', { args: [address, amount] })

  const withdraw = () => writable('withdraw')

  const baseTokenURI = () => readable<string>('baseTokenURI')
  const totalMinted = () => readable<bigint>('totalMinted')
  const totalSupply = () => readable<bigint>('totalSupply')
  const maxTotalSupply = () => readable<bigint>('maxTotalSupply')
  const numberMinted = (address: `0x${string}`) =>
    readable<bigint>('numberMinted', { args: [address] })
  const nonFreeAmount = (
    address: `0x${string}`,
    amount: bigint,
    freeAmount: bigint
  ) =>
    readable<bigint>('nonFreeAmount', { args: [address, amount, freeAmount] })
  const mintRules = async () => {
    const [supply, maxPerWallet, freePerWallet, price] = await readable<
      [bigint, bigint, bigint, bigint]
    >('mintRules')!
    return {
      supply,
      maxPerWallet,
      freePerWallet,
      price,
    }
  }

  const balance = () => {
    if (contractAddress.value) {
      return fetchBalance({
        address: contractAddress.value,
        chainId: chainId?.value,
      })
    }
  }

  const statistics = async () => {
    const data: Statistics = {
      maxTotalSupply: 0n,
      totalMinted: 0n,
      get tokensLeft() {
        return this.maxTotalSupply - this.totalMinted
      },
      pending: true,
    }

    await Promise.all([
      maxTotalSupply()?.then((v) => (data.maxTotalSupply = v)),
      totalMinted()?.then((v) => (data.totalMinted = v)),
      balance()?.then((v) => (data.balance = v)),
    ]).finally(() => (data.pending = false))

    return data
  }

  const methods = {
    mint,
    setBaseUri,
    setMintRules,
    setMaxTotalSupply,
    setRoot,
    airdrop,
    withdraw,
    baseTokenURI,
    mintRules,
    maxTotalSupply,
    totalMinted,
    totalSupply,
    numberMinted,
    nonFreeAmount,
    balance,
    statistics,
    abi: erc721DropABI,
  }

  provide(injectKey, methods)

  return methods
}
