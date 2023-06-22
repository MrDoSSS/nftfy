<script setup lang="ts">
import { inject, ref } from 'vue'
import { injectKey } from '@nftfy/common'
import NButton from '@/components/NButton.vue'

const erc721Drop = inject(injectKey)

const pending = ref(false)

const maxTotalSupply = ref(0n)

erc721Drop?.maxTotalSupply()?.then((v) => (maxTotalSupply.value = v))

const save = async () => {
  try {
    pending.value = true
    await erc721Drop?.setMaxTotalSupply(maxTotalSupply.value)
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
      <div class="mb-3">
        <input
          type="text"
          class="input input-bordered bg-neutral w-full"
          required
          v-model="maxTotalSupply"
        />
      </div>
      <NButton class="btn-primary btn-block btn-sm md:w-auto" :loading="pending"
        >Save <template #loading>Saving...</template></NButton
      >
    </form>
  </details>
</template>
