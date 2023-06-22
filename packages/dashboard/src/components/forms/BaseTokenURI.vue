<script setup lang="ts">
import { inject, ref } from 'vue'
import { injectKey } from '@nftfy/common'
import NButton from '@/components/NButton.vue'

const erc721Drop = inject(injectKey)

const pending = ref(false)

const baseTokenURI = ref('')

erc721Drop?.baseTokenURI()?.then((v) => (baseTokenURI.value = v))

const save = async () => {
  try {
    pending.value = true
    await erc721Drop?.setBaseUri(baseTokenURI.value)
  } catch (e) {
    console.error(e)
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <details class="bg-base-200 collapse-arrow collapse shadow-xl">
    <summary class="collapse-title text-xl font-medium">Base token URI</summary>
    <form @submit.prevent="save" class="collapse-content">
      <div class="mb-3">
        <input
          type="text"
          class="input input-bordered bg-neutral w-full"
          required
          v-model="baseTokenURI"
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
