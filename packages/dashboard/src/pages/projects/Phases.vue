<script lang="ts" setup>
import NButton from '@/components/NButton.vue'
import { ProjectKey } from '@/di-keys'
import { injectStrict } from '@/utils'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { useErc721Drop } from '@nftfy/common'
import { PlusIcon } from '@heroicons/vue/24/solid'
import { watch, ref } from 'vue'
import Placeholder from '@/components/placeholders/Phases.vue'
import Phase from '@/components/fieldsets/Phase.vue'

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
    root: `0x${string}`
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

const add = () =>
  phases.value.push({
    supply: 0n,
    totalMinted: 0n,
    maxPerWallet: 0n,
    root: `0x0000000000000000000000000000000000000000000000000000000000000000`,
    isActive: false,
    price: 0n,
    name: `Phase #${phases.value.length + 1}`,
  })

const remove = (id: number) => phases.value.splice(id, 1)

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
  <Placeholder v-if="savedPhases.pending" />
  <template v-else>
    <form @submit.prevent="save" ref="form" v-show="phases.length">
      <Phase
        v-for="(phase, i) in phases"
        :key="i"
        :totalMinted="phase.totalMinted"
        v-model:name="phase.name"
        v-model:supply="phase.supply"
        v-model:max-per-wallet="phase.maxPerWallet"
        v-model:price="phase.price"
        v-model:is-active="phase.isActive"
        v-model:root="phase.root"
        @remove="remove(i)"
      />
    </form>
    <div class="alert alert-warning mb-8" v-if="!phases.length">
      <ExclamationTriangleIcon class="text-4xl" />
      <div>
        <h3 class="font-bold">Missing Minting Phases</h3>
        <span>
          You need to set at least one minting phase for people to mint this
          drop.</span
        >
      </div>
    </div>
    <div class="flex items-center gap-3 max-sm:flex-wrap sm:gap-5">
      <NButton class="btn-outline max-sm:btn-sm max-sm:btn-block" @click="add"
        ><PlusIcon />Add phase</NButton
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
      <NButton
        class="btn btn-primary max-sm:btn-sm max-sm:grow sm:w-32"
        @click="form?.requestSubmit()"
        :loading="pending"
        >Save
        <template #loading> Saving </template>
      </NButton>
    </div>
  </template>
</template>
