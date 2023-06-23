<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { useMintRules, useSetMintRules } from '@nftfy/common'
import { parseEther, formatEther } from 'viem'

import NButton from '@/components/NButton.vue'

import { _RefFirestore } from 'vuefire'
import { Project } from '@nftfy/common/collections'

const pending = ref(false)

const project = inject<_RefFirestore<Project>>('project')!

const mintRules = useMintRules({
  address: project.value.contractAddress,
  chainId: project.value.chainId,
})
const setMintRules = useSetMintRules()

const price = computed<string>({
  get() {
    return formatEther(mintRules.value?.price || 0n)
  },
  set(v: string) {
    if (!mintRules.value) return

    mintRules.value.price = parseEther(`${parseFloat(v)}`)
  },
})

const save = async () => {
  if (!mintRules.value) return

  try {
    pending.value = true
    await setMintRules({ args: [mintRules.value] })
  } catch (e) {
    console.error(e)
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <details class="bg-base-200 collapse-arrow collapse shadow-xl">
    <summary class="collapse-title text-xl font-medium">Mint rules</summary>
    <form @submit.prevent="save" class="collapse-content">
      <div class="mb-3 grid grid-cols-1 gap-3">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Supply</span>
          </label>
          <input
            type="text"
            class="input input-bordered bg-neutral w-full"
            required
            v-model="mintRules.value?.supply"
          />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Max per wallet</span>
          </label>
          <input
            type="text"
            class="input input-bordered bg-neutral w-full"
            required
            v-model="mintRules.value?.maxPerWallet"
          />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Free per wallet</span>
          </label>
          <input
            type="text"
            class="input input-bordered bg-neutral w-full"
            required
            v-model="mintRules.value?.freePerWallet"
          />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Price</span>
          </label>
          <input
            type="text"
            class="input input-bordered bg-neutral w-full"
            required
            v-model="price"
          />
        </div>
      </div>
      <NButton class="btn-primary btn-block btn-sm md:w-auto" :loading="pending"
        >Save <template #loading>Saving...</template></NButton
      >
    </form>
  </details>
</template>
