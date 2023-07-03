import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
  PrepareWriteContractConfig,
} from '@wagmi/core'
import { Abi } from 'viem'
import { getAccount, getPublicClient } from '@wagmi/core'

export type ComposeWriteContractConfig<
  TAbi extends Abi,
  TFunctioName extends string
> = Omit<
  PrepareWriteContractConfig<TAbi, TFunctioName>,
  'abi' | 'address' | 'functionName' | 'chainId'
>

export const useWriteContract = async (params: PrepareWriteContractConfig) => {
  const publicClient = getPublicClient({ chainId: params.chainId })
  const account = getAccount()
  const gas = await publicClient.estimateContractGas({
    address: params.address,
    abi: params.abi,
    functionName: params.functionName,
    args: params.args,
    value: params.value,
    account: account.address!,
  })

  const { request } = await prepareWriteContract({ ...params, gas })

  const { hash } = await writeContract(request)
  const data = await waitForTransaction({ hash })

  return data
}
