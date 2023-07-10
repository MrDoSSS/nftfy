<script lang="ts" setup>
import { localhost, goerli, mainnet } from '@wagmi/core/chains'
import { computed } from 'vue'
import { sliceAddress } from '@nftfy/common'
import { Address } from 'viem'

const props = defineProps<{
  id: string
  name: string
  symbol: string
  chain?: typeof localhost | typeof goerli | typeof mainnet
  contractAddress: Address
}>()

const slicedAddress = computed(() => sliceAddress(props.contractAddress, 6))
</script>

<template>
  <RouterLink
    :to="{ name: 'project', params: { id } }"
    class="card bg-base-200 h-[20vmax] max-h-[15rem] shadow-xl transition-transform hover:scale-[1.01] hover:shadow-2xl"
  >
    <div class="card-body flex-col justify-between">
      <div class="flex items-center justify-between">
        <h2 class="card-title">{{ name }} ({{ symbol }})</h2>
        <div class="badge badge-primary">{{ chain?.name }}</div>
      </div>

      <div class="text-base-content/80">
        {{ slicedAddress }}
      </div>
    </div>
  </RouterLink>
</template>
