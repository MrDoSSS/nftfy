import { erc721FactoryABI } from '../generated'
import {
  prepareWriteContract,
  readContract,
  writeContract,
  waitForTransaction,
} from '@wagmi/core'
import { SimulateContractParameters, ReadContractParameters } from 'viem'
import { Ref, ComputedRef } from 'vue'

export const useErc721Factory = (
  contractAddress:
    | Ref<`0x${string | undefined}`>
    | ComputedRef<`0x${string | undefined}`>,
  chainId?: Ref<number | undefined> | ComputedRef<number | undefined>
) => {
  const readable = <T = unknown>(
    functionName: string,
    params: Omit<
      ReadContractParameters,
      'address' | 'abi' | 'functionName'
    > = {}
  ) =>
    readContract({
      ...params,
      address: contractAddress.value,
      abi: erc721FactoryABI,
      chainId: chainId?.value,
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
      ...params,
      address: contractAddress.value,
      abi: erc721FactoryABI,
      chainId: chainId?.value,
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
    abi: erc721FactoryABI,
  }
}
