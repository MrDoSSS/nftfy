<script lang="ts" setup>
import { ProjectKey } from '@/di-keys'
import { injectStrict } from '@/utils'
import { useErc721Drop } from '@nftfy/common'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { watch, ref } from 'vue'
import { Address } from 'viem'

import AppButton from '@/components/AppButton.vue'
import PhaseFieldset from '@/components/fieldsets/PhaseFieldset.vue'
import TheMissingPhasesAlert from '@/components/alerts/TheMissingPhasesAlert.vue'

const project = injectStrict(ProjectKey)

const erc721Drop = useErc721Drop({
  address: project.contractAddress,
  chainId: project.chainId,
})

const savedPhases = erc721Drop.phases()

const form = ref<HTMLFormElement>()

const phases = ref<
  {
    supply: bigint
    totalMinted: bigint
    maxPerWallet: bigint
    root: Address
    isActive: boolean
    price: bigint
    name: string
  }[]
>([])

const resetEligibility = ref(false)

const pending = ref(false)

const unwatch = watch(
  () => savedPhases.pending,
  () => {
    if (savedPhases.pending) return

    phases.value = [...savedPhases.value]
    unwatch()
  }
)

const addPhase = () =>
  phases.value.push({
    supply: 0n,
    totalMinted: 0n,
    maxPerWallet: 0n,
    root: `0x0000000000000000000000000000000000000000000000000000000000000000`,
    isActive: false,
    price: 0n,
    name: `Phase #${phases.value.length + 1}`,
  })

const removePhase = (id: number) => phases.value.splice(id, 1)

const save = async () => {
  try {
    pending.value = true
    await erc721Drop.setPhases({ args: [phases.value, resetEligibility.value] })
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <h2 class="mb-2 text-3xl font-bold md:text-4xl">Minting Phases</h2>
  <p class="mb-10">
    Add various Minting Phases with their own Token Pricing, Supply, Wallet
    Limits and Allow List.
  </p>
  <form @submit.prevent="save" ref="form" v-show="phases.length">
    <PhaseFieldset
      v-for="(phase, i) in phases"
      :key="i"
      :totalMinted="phase.totalMinted"
      v-model:name="phase.name"
      v-model:supply="phase.supply"
      v-model:max-per-wallet="phase.maxPerWallet"
      v-model:price="phase.price"
      v-model:is-active="phase.isActive"
      v-model:root="phase.root"
      @remove="removePhase(i)"
    />
  </form>
  <TheMissingPhasesAlert v-if="!phases.length" />
  <div class="flex items-center gap-3 max-sm:flex-wrap sm:gap-5">
    <AppButton
      class="btn-outline max-sm:btn-sm max-sm:btn-block"
      @click="addPhase"
      ><PlusIcon />Add phase</AppButton
    >
    <div
      class="tooltip join-item sm:ml-auto"
      data-tip="This contract stores who has already minted NFTs from this contract and carries across minting phases. Resetting mint eligibility will reset this state permanently, and wallets that have already minted to their limit will be able to mint again."
    >
      <div class="form-control md:col-span-2">
        <label class="label cursor-pointer">
          <span class="label-text mr-3">Reset Eligibility</span>
          <input type="checkbox" class="toggle" v-model="resetEligibility" />
        </label>
      </div>
    </div>
    <AppButton
      class="btn btn-primary max-sm:btn-sm max-sm:grow sm:w-32"
      @click="form?.requestSubmit()"
      :loading="pending"
      >Save
      <template #loading> Saving </template>
    </AppButton>
  </div>
</template>
