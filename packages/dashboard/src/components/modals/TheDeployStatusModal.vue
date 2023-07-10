<script setup lang="ts">
import { ref } from 'vue'
import { SquaresPlusIcon, CheckIcon } from '@heroicons/vue/24/solid'

interface Props {
  status: 'deploying' | 'creating'
}
const modalEl = ref<HTMLDialogElement>()

const show = () => modalEl.value?.showModal()
const hide = () => modalEl.value?.close()

defineExpose({ show, hide })
defineProps<Props>()
</script>

<template>
  <dialog
    class="modal max-sm:modal-bottom outline-none backdrop:bg-black/70"
    ref="modalEl"
    @cancel.prevent=""
  >
    <form method="dialog" class="modal-box">
      <h3 class="mb-4 text-lg font-bold">Deploy Status</h3>

      <div
        class="bg-base-200 border-neutral mb-4 flex items-center gap-4 rounded-lg border p-4"
        :class="{ 'opacity-60': status === 'creating' }"
      >
        <span class="text-[2.5rem]" v-if="status === 'creating'"
          ><CheckIcon
        /></span>
        <span class="loading loading-spinner loading-lg" v-else></span>
        <div>
          <div class="text-lg font-bold">Deploying contract</div>
          <p class="text-base-content/80">
            Your wallet will prompt you to sign the transaction.
          </p>
        </div>
      </div>
      <div
        class="bg-base-200 border-neutral flex items-center gap-4 rounded-lg border p-4"
        :class="{ 'opacity-60': status === 'deploying' }"
      >
        <span class="text-[2.5rem]" v-if="status === 'deploying'"
          ><SquaresPlusIcon
        /></span>
        <span class="loading loading-spinner loading-lg" v-else></span>
        <div>
          <div class="text-lg font-bold">Adding to dashboard</div>
          <p class="text-base-content/80">This step is gasless.</p>
        </div>
      </div>
    </form>
  </dialog>
</template>
