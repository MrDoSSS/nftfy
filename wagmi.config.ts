import { defineConfig } from '@wagmi/cli'
import { hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'packages/common/src/generated.ts',
  plugins: [
    hardhat({
      project: 'packages/web3',
      deployments: {
        ERC721Factory: '0xa8b3a287c3bbf5b282c1cae005ea7b3838779ff5',
      },
    }),
  ],
})
