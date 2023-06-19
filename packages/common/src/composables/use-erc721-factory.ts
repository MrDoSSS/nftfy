import { erc721FactoryABI } from '../generated'
import {
  prepareWriteContract,
  readContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core'
import { SimulateContractParameters, ReadContractParameters } from 'viem'

export const useErc721Factory = (contractAddress: `0x${string}`) => {
  const contractConfig = {
    address: contractAddress,
    abi: erc721FactoryABI,
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

  const clone = async (
    name: string,
    symbol: string,
    payees: `0x${string}`[],
    shares: bigint[]
  ) =>
    writable('clone', {
      args: [name, symbol, payees, shares],
    })

  const implementation = () => readable<`0x${string}`>('implementation')

  return {
    implementation,
    clone,
  }
}
