<script setup lang="ts">
import { ref, computed } from 'vue'
import { parseEther, formatEther } from 'viem'
import { injectStrict } from '@/utils'

import NButton from '@/components/NButton.vue'

import { ERC721DropKey } from '@/di-keys'

const pending = ref(false)

const erc721Drop = injectStrict(ERC721DropKey)

const mintRules = erc721Drop.mintRules()

const price = computed<string>({
  get() {
    if (mintRules.pending) return '0'
    return formatEther(mintRules.value.price)
  },
  set(v: string) {
    if (mintRules.pending) return

    mintRules.value.price = parseEther(`${parseFloat(v)}`)
  },
})

const save = async () => {
  if (mintRules.pending) return

  try {
    pending.value = true
    await erc721Drop.setMintRules({ args: [mintRules.value] })
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
      <div class="mb-3 grid grid-cols-1 gap-3" v-if="!mintRules.pending">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Supply</span>
          </label>
          <input
            type="text"
            class="input input-bordered bg-neutral w-full"
            required
            v-model="mintRules.value.supply"
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
            v-model="mintRules.value.maxPerWallet"
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
            v-model="mintRules.value.freePerWallet"
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
