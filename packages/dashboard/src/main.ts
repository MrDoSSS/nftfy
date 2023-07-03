import { createApp } from 'vue'
import { initWeb3Modal } from '@nftfy/common'
import { globalHelpers } from './global'

import { router } from './router'

import App from './App.vue'

import './style.css'
import { localhost, goerli, mainnet } from '@wagmi/core/chains'

initWeb3Modal(
  import.meta.env.VITE_WC_PROJECT_ID,
  [localhost, goerli, mainnet],
  {
    themeVariables: {
      '--w3m-accent-color': 'hsl(var(--p))',
      '--w3m-accent-fill-color': 'hsl(var(--bc)',
      '--w3m-background-color': 'hsl(var(--b3))',
    },
    themeMode: 'dark',
  }
)

createApp(App).use(globalHelpers).use(router).mount('#app')
