<script setup lang="ts">
import BaseTokenURIForm from '@/components/forms/BaseTokenURI.vue'

import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid'

import { provide } from 'vue'
import { useErc721Drop } from '@nftfy/common'
import { ProjectKey, ERC721DropKey } from '@/di-keys'
import { injectStrict } from '@/utils'

import CopyAddressButton from '@/components/buttons/CopyAddressButton.vue'
import TheDeleteProjectButton from '@/components/buttons/TheDeleteProjectButton.vue'

const project = injectStrict(ProjectKey)

const erc721Drop = useErc721Drop({
  address: project.contractAddress,
  chainId: project.chainId,
})

provide(ERC721DropKey, erc721Drop)

const maxTotalSupply = erc721Drop.maxTotalSupply()
const totalMinted = erc721Drop.totalMinted({ watch: true })
const balance = erc721Drop.balance({ watch: true })

const numberMinted = erc721Drop.numberMinted({args: ['0xasd']})
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="mb-4 text-4xl font-bold md:text-6xl">
      {{ project.name }} ({{ project.symbol }})
    </h1>
    <TheDeleteProjectButton />
  </div>
  <div class="mb-8 flex gap-3 md:mb-14">
    <CopyAddressButton :address="project.contractAddress" />
    <a
      :href="`${project.chain.blockExplorers.etherscan?.url}/address/${project.contractAddress}`"
      class="badge badge-outline hover:badge-ghost p-3"
      v-if="
        project.chain &&
        'blockExplorers' in project.chain &&
        project.chain.blockExplorers.etherscan
      "
      target="_blank"
      ><ArrowTopRightOnSquareIcon class="mr-2" />View on etherscan
    </a>
  </div>

  <div
    class="mb-4 grid w-full grid-cols-1 gap-4 md:mb-6 md:grid-cols-4 md:gap-6"
  >
    <div class="stats bg-secondary text-secondary-content w-full">
      <div class="stat">
        <div class="stat-title text-secondary-content">Contract Balance</div>
        <template v-if="balance.pending">
          <div class="loading loading-spinner loading-lg mt-3"></div>
        </template>
        <template v-else>
          <div class="stat-value text-secondary-content">
            {{ balance.value!.formatted }} {{ balance.value!.symbol }}
          </div>
          <div class="stat-actions">
            <button class="btn btn-sm" :disabled="!balance.value!.value">
              Withdraw
            </button>
          </div>
        </template>
      </div>
    </div>

    <div
      class="stats stats-vertical md:stats-horizontal bg-base-200 grow shadow md:col-span-3"
    >
      <div class="stat">
        <div class="stat-title">Max Total Supply</div>
        <span
          v-if="maxTotalSupply.pending"
          class="loading loading-spinner loading-lg mt-3"
        ></span>
        <div class="stat-value" v-else>
          {{ maxTotalSupply.value }}
        </div>
      </div>
      <div class="stat">
        <div class="stat-title">Total Minted</div>
        <span
          v-if="totalMinted.pending"
          class="loading loading-spinner loading-lg mt-3"
        ></span>
        <div class="stat-value" v-else>
          {{ totalMinted.value }}
        </div>
      </div>

      <div class="stat">
        <div class="stat-title">Tokens Left</div>
        <span
          v-if="maxTotalSupply.pending || totalMinted.pending"
          class="loading loading-spinner loading-lg mt-3"
        ></span>
        <div class="stat-value" v-else>
          {{ maxTotalSupply.value! - totalMinted.value! }}
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
    <BaseTokenURIForm />
  </div>
</template>
