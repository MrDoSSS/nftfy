import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/html'
import { ThemeCtrlState } from '@web3modal/core'
import { configureChains, createConfig } from '@wagmi/core'
import { Chain } from '@wagmi/core/chains'
import { publicProvider } from '@wagmi/core/providers/public'

export let web3Modal: Web3Modal

export const initWeb3Modal = (
  projectId: string,
  chains: Chain[],
  theme: ThemeCtrlState = {}
) => {
  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
    publicProvider(),
  ])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  })

  const ethereumClient = new EthereumClient(wagmiConfig, chains)

  web3Modal = new Web3Modal({ projectId }, ethereumClient)
  web3Modal.setTheme(theme)
}
