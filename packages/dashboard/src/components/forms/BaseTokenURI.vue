<script setup lang="ts">
import { ref, inject } from 'vue'
import NButton from '@/components/NButton.vue'
import { ERC721DropKey } from '@/di-keys'

const pending = ref(false)

const erc721Drop = inject(ERC721DropKey)!
const baseTokenURI = erc721Drop.baseTokenURI()

const save = async () => {
  if (baseTokenURI.pending) return

  try {
    pending.value = true
    await erc721Drop.setBaseURI({ args: [baseTokenURI.value] })
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <details class="bg-base-200 collapse-arrow collapse shadow-xl">
    <summary class="collapse-title text-xl font-medium">Base token URI</summary>
    <form @submit.prevent="save" class="collapse-content">
      <div class="mb-3" v-if="!baseTokenURI.pending">
        <input
          type="text"
          class="input input-bordered bg-neutral w-full"
          required
          v-model="baseTokenURI.value"
        />
      </div>
      <div class="card-actions justify-start">
        <NButton
          class="btn-primary btn-block btn-sm md:w-auto"
          :loading="pending"
          >Save <template #loading>Saving...</template></NButton
        >
      </div>
    </form>
  </details>
</template>
