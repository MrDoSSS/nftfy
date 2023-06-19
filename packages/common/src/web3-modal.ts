import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { configureChains, createConfig } from '@wagmi/core'
import { goerli } from '@wagmi/core/chains'

const chains = [goerli]
const projectId = '6d14a9384efee5a229414069f0a565ca'

export const provider = w3mProvider({ projectId })

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
})

const ethereumClient = new EthereumClient(wagmiConfig, chains)

export const web3modal = new Web3Modal({ projectId }, ethereumClient)
