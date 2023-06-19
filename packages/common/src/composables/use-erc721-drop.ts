import { erc721DropABI } from '../generated'
import {
  prepareWriteContract,
  readContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core'
import { SimulateContractParameters, ReadContractParameters } from 'viem'

export const useErc721Drop = (contractAddress: `0x${string}`) => {
  const contractConfig = {
    address: contractAddress,
    abi: erc721DropABI,
  }

  const readable = <T = unknown>(
    functionName: string,
    params: Omit<
      ReadContractParameters,
      'address' | 'abi' | 'functionName'
    > = {}
  ) =>
    readContract({
      ...contractConfig,
      ...params,
      functionName,
    }) as Promise<T>

  const writable = async (
    functionName: string,
    params: Omit<
      SimulateContractParameters,
      'address' | 'abi' | 'functionName'
    > = {}
  ) => {
    const { request } = await prepareWriteContract({
      ...contractConfig,
      ...params,
      functionName,
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

  const setMintRules = async (
    supply: bigint,
    maxPerWallet: bigint,
    freePerWallet: bigint,
    price: bigint
  ) =>
    writable('setMintRules', {
      args: [supply, maxPerWallet, freePerWallet, price],
    })

  const setMaxTotalSupply = async (totalSupply: bigint) =>
    writable('setMaxTotalSupply', { args: [totalSupply] })

  const setRoot = (root: string) => writable('setRoot', { args: [root] })

  const airdrop = (address: `0x${string}`, amount: bigint) =>
    writable('airdrop', { args: [address, amount] })

  const withdraw = () => writable('withdraw')

  const totalMinted = () => readable<bigint>('totalMinted')
  const numberMinted = (address: `0x${string}`) =>
    readable<bigint>('numberMinted', { args: [address] })
  const nonFreeAmount = (
    address: `0x${string}`,
    amount: bigint,
    freeAmount: bigint
  ) =>
    readable<bigint>('nonFreeAmount', { args: [address, amount, freeAmount] })
  const mintRules = () => readable('mintRules')

  return {
    mint,
    setBaseUri,
    setMintRules,
    setMaxTotalSupply,
    setRoot,
    airdrop,
    withdraw,
    mintRules,
    totalMinted,
    numberMinted,
    nonFreeAmount,
  }
}
