<script setup lang="ts">
import TotalSupplyForm from '@/components/forms/TotalSupply.vue'
import BaseTokenURIForm from '@/components/forms/BaseTokenURI.vue'
import MintRulesForm from '@/components/forms/MintRules.vue'
import WhitelistForm from '@/components/forms/Whitelist.vue'

import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/solid'
import { Square2StackIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <h1 class="mb-4 text-4xl font-bold md:text-6xl">Project 1</h1>
  <div class="mb-8 flex gap-3 md:mb-14">
    <div class="tooltip tooltip-bottom" data-tip="Copy to clipboard">
      <button class="badge badge-outline hover:badge-ghost p-3">
        <Square2StackIcon class="mr-2" />
        0x2A7...7aB0D
      </button>
    </div>
    <a href="#" class="badge badge-outline hover:badge-ghost p-3"
      ><ArrowTopRightOnSquareIcon class="mr-2" />View on etherscan</a
    >
  </div>

  <div class="mb-4 flex w-full flex-col gap-4 md:mb-6 md:flex-row md:gap-6">
    <div
      class="stats bg-secondary text-secondary-content min-w-[20rem] shrink-0"
    >
      <div class="stat">
        <div class="stat-title text-secondary-content">Contract Balance</div>
        <div class="stat-value text-secondary-content">22 ETH</div>
        <div class="stat-actions">
          <button class="btn btn-sm">Withdraw</button>
        </div>
      </div>
    </div>

    <div
      class="stats stats-vertical md:stats-horizontal bg-base-200 grow shadow"
    >
      <div class="stat">
        <div class="stat-title">Total Supply</div>
        <div class="stat-value">1600</div>
      </div>
      <div class="stat">
        <div class="stat-title">Total Minted</div>
        <div class="stat-value">400</div>
      </div>

      <div class="stat">
        <div class="stat-title">Tokens Left</div>
        <div class="stat-value">1200</div>
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
