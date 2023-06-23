<script setup lang="ts">
import { ref, inject } from 'vue'
import { useMaxTotalSupply, useSetMaxTotalSupply } from '@nftfy/common'
import NButton from '@/components/NButton.vue'
import { _RefFirestore } from 'vuefire'
import { Project } from '@nftfy/common/collections'

const pending = ref(false)

const project = inject<_RefFirestore<Project>>('project')!

const maxTotalSupply = useMaxTotalSupply({
  address: project.value.contractAddress,
  chainId: project.value.chainId,
})
const setMaxTotalSupply = useSetMaxTotalSupply()

const save = async () => {
  if (!maxTotalSupply.value) return

  try {
    pending.value = true
    await setMaxTotalSupply({ args: [maxTotalSupply.value] })
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
          v-model="maxTotalSupply.value"
        />
      </div>
      <NButton class="btn-primary btn-block btn-sm md:w-auto" :loading="pending"
        >Save <template #loading>Saving...</template></NButton
      >
    </form>
  </details>
</template>
