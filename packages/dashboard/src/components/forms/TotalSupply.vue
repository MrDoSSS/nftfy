<script setup lang="ts">
import { ref, inject } from 'vue'
import NButton from '@/components/NButton.vue'
import { ERC721DropKey } from '@/di-keys'

const pending = ref(false)

const erc721Drop = inject(ERC721DropKey)!

const maxTotalSupply = erc721Drop.maxTotalSupply()

const save = async () => {
  if (maxTotalSupply.pending) return

  try {
    pending.value = true
    await erc721Drop.setMaxTotalSupply({ args: [maxTotalSupply.value] })
  } catch (e) {
    console.error(e)
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <details class="bg-base-200 collapse-arrow collapse shadow-xl">
    <summary class="collapse-title text-xl font-medium">
      Max Total supply
    </summary>
    <form @submit.prevent="save" class="collapse-content">
      <div class="mb-3" v-if="!maxTotalSupply.pending">
        <input
          type="text"
          class="input input-bordered bg-neutral w-full"
          required
          v-model="maxTotalSupply.value"
        />
      </div>
      <NButton class="btn-primary btn-block btn-sm md:w-auto" :loading="pending"
        >Save <template #loading>Saving...</template></NButton
      >
    </form>
  </details>
</template>
