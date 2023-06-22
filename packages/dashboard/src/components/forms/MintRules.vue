<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import { MintRules, injectKey } from '@nftfy/common'
import { parseEther, formatEther } from 'viem'

import NButton from '@/components/NButton.vue'

const erc721Drop = inject(injectKey)

const pending = ref(false)
const data = ref<MintRules>()

erc721Drop?.mintRules().then((v) => (data.value = v))

const price = computed<string>({
  get() {
    if (!data.value) return '0'

    return formatEther(data.value.price)
  },
  set(v: string) {
    if (!data.value) return

    data.value.price = parseEther(`${parseFloat(v)}`)
  },
})

const save = async () => {
  if (!data.value) return

  try {
    pending.value = true
    await erc721Drop?.setMintRules(data.value)
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
      <div class="mb-3 grid grid-cols-1 gap-3" v-if="data">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Supply</span>
          </label>
          <input
            type="text"
            class="input input-bordered bg-neutral w-full"
            required
            v-model="data.supply"
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
            v-model="data.maxPerWallet"
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
            v-model="data.freePerWallet"
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
