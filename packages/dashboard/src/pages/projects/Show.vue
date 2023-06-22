<script setup lang="ts">
import TotalSupplyForm from '@/components/forms/TotalSupply.vue'
import BaseTokenURIForm from '@/components/forms/BaseTokenURI.vue'
import MintRulesForm from '@/components/forms/MintRules.vue'
import WhitelistForm from '@/components/forms/Whitelist.vue'

import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid'
import { Square2StackIcon, TrashIcon } from '@heroicons/vue/24/outline'

import { ref, computed } from 'vue'
import { useDocument } from 'vuefire'
import { projects } from '@nftfy/common/collections'
import { useRoute, useRouter } from 'vue-router'
import { useErc721Drop, Statistics } from '@nftfy/common'
import { sliceAddress } from '@nftfy/common'

const router = useRouter()
const route = useRoute()

const doc = ref(projects.docRef(route.params.id as string))

const project = useDocument(doc)
const loading = project.pending

const contractAddress = computed(() => project.value?.contractAddress)
const chainId = computed(() => project.value?.chainId)

const erc721Drop = useErc721Drop(contractAddress, chainId)

const statistics = ref<Statistics>({ pending: true } as Statistics)

project.promise.value.then(async () => {
  erc721Drop.statistics()?.then((v) => (statistics.value = v))
})

const copyAddress = async () => {
  if (!project.value?.contractAddress) return

  await navigator.clipboard.writeText(project.value.contractAddress)

  copyTooltip.value = 'Copied'

  setTimeout(() => (copyTooltip.value = 'Copy to clipboard'), 1000)
}

const copyTooltip = ref('Copy to clipboard')

const deleteProject = async () => {
  await projects.delete(doc.value.id)

  router.replace({ name: 'projects' })
}
</script>

<template>
  <template v-if="project">
    <div class="flex items-center justify-between">
      <h1 class="mb-4 text-4xl font-bold md:text-6xl">
        {{ project.name }} ({{ project.symbol }})
      </h1>
      <button class="btn btn-outline btn-error text-xl" @click="deleteProject">
        <TrashIcon />
      </button>
    </div>
    <div class="mb-8 flex gap-3 md:mb-14">
      <div class="tooltip tooltip-bottom" :data-tip="copyTooltip">
        <button
          class="badge badge-outline hover:badge-ghost p-3"
          @click="copyAddress"
        >
          <Square2StackIcon class="mr-2" />
          {{ sliceAddress(project.contractAddress, 6) }}
        </button>
      </div>
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
          <template v-if="statistics?.balance">
            <div class="stat-value text-secondary-content">
              {{ statistics.balance.formatted }} {{ statistics.balance.symbol }}
            </div>
            <div class="stat-actions">
              <button class="btn btn-sm" :disabled="!statistics.balance.value">
                Withdraw
              </button>
            </div>
          </template>
          <template v-else>
            <div class="loading loading-spinner loading-lg mt-3"></div>
          </template>
        </div>
      </div>

      <div
        class="stats stats-vertical md:stats-horizontal bg-base-200 grow shadow md:col-span-3"
      >
        <div class="stat">
          <div class="stat-title">Max Total Supply</div>
          <span
            v-if="statistics.pending"
            class="loading loading-spinner loading-lg mt-3"
          ></span>
          <div class="stat-value" v-else>
            {{ statistics.maxTotalSupply }}
          </div>
        </div>
        <div class="stat">
          <div class="stat-title">Total Minted</div>
          <span
            v-if="statistics.pending"
            class="loading loading-spinner loading-lg mt-3"
          ></span>
          <div class="stat-value" v-else>
            {{ statistics.totalMinted }}
          </div>
        </div>

        <div class="stat">
          <div class="stat-title">Tokens Left</div>
          <span
            v-if="statistics.pending"
            class="loading loading-spinner loading-lg mt-3"
          ></span>
          <div class="stat-value" v-else>
            {{ statistics.tokensLeft }}
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
      <TotalSupplyForm />
      <BaseTokenURIForm />
      <MintRulesForm />
      <WhitelistForm />
    </div>
  </template>
  <div v-else-if="loading" class="animate-pulse">
    <div class="bg-neutral mb-4 h-7 w-1/2 rounded-full"></div>
    <div class="bg-neutral mb-8 h-4 w-36 rounded-full md:mb-14"></div>
    <div class="mb-4 flex w-full flex-col gap-4 md:mb-6 md:flex-row md:gap-6">
      <div
        class="stats bg-secondary text-secondary-content h-28 min-w-[20rem] shrink-0"
      >
        <div class="stat"></div>
      </div>

      <div
        class="stats stats-vertical md:stats-horizontal bg-base-200 h-28 grow shadow"
      >
        <div class="stat"></div>
      </div>
    </div>
  </div>
  <div v-else>
    <h1>Project not found</h1>
  </div>
</template>
