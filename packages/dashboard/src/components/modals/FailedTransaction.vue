<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'
import { emitter } from '@/emitter'
import { BaseError } from 'viem'

const error = ref<{
  message?: string
  details?: string
}>()

const modalEl = ref<HTMLDialogElement>()

const handleOpen = (e: BaseError | Error) => {
  if (e instanceof BaseError) {
    error.value = {
      message: e.message,
      details: e.shortMessage,
    }
  } else if (e instanceof Error) {
    error.value = {
      details: e.message,
    }
  } else {
    return
  }

  modalEl.value?.showModal()
}

const handleClose = () => {
  error.value = undefined
  modalEl.value?.close()
}

modalEl.value?.addEventListener('close', handleClose)

emitter.on('FailedTransaction:Open', handleOpen)

onBeforeUnmount(() => {
  emitter.off('FailedTransaction:Open', handleOpen)
  modalEl.value?.removeEventListener('close', handleClose)
})
</script>

<template>
  <dialog
    class="modal max-sm:modal-bottom outline-none backdrop:bg-black/70"
    ref="modalEl"
  >
    <form
      method="dialog"
      class="modal-box"
      :class="{ 'max-w-3xl': error?.message && error.details }"
    >
      <div class="flex flex-col">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <h3 class="mb-4 text-xl font-bold">Failed to send transaction</h3>
        <template v-if="error">
          <div class="bg-base-200 border-neutral rounded-box border p-4">
            <div class="mb-1 text-xl font-medium">Cause</div>
            <div class="text-white/60">
              {{ error.details ? error.details : error.message }}
            </div>
          </div>
          <details
            class="bg-base-200 border-neutral collapse-arrow collapse mt-4 border"
            v-if="error.details && error.message"
          >
            <summary class="collapse-title p-4 text-xl font-medium">
              Details
            </summary>
            <div class="collapse-content whitespace-pre-wrap break-all">
              {{ error.message }}
            </div>
          </details>
        </template>
      </div>
    </form>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
