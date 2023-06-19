<script lang="ts" setup>
import { ref } from 'vue'
import NButton from '@/components/NButton.vue'

const shown = ref(false)

const show = () => (shown.value = true)
const hide = () => (shown.value = false)

defineExpose({ show, hide })
</script>

<template>
  <DeployStatusModal status="deploying" ref="deployStatusModalEl" />
  <div class="drawer drawer-end">
    <input type="checkbox" :checked="shown" class="drawer-toggle" />
    <div class="drawer-side z-50">
      <div class="drawer-overlay !cursor-default" @click="hide"></div>
      <div
        class="bg-base-100 text-base-content flex min-h-full w-full flex-col p-4 lg:w-1/2"
      >
        <button class="btn btn-circle btn-ghost" @click="hide">✕</button>
        <div class="h-2"></div>
        <form
          @submit.prevent=""
          class="flex grow flex-col gap-6"
          v-show="shown"
        >
          <details open class="collapse-arrow border-neutral collapse border">
            <summary class="collapse-title text-2xl">General</summary>

            <div class="collapse-content grid grid-cols-1 gap-2">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Domain</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                  required
                />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Title</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                  required
                />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Twitter</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">OpenSea</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Favicon</span>
                </label>
                <input
                  type="file"
                  class="file-input file-input-bordered bg-base-200 w-full"
                />
              </div>
            </div>
          </details>
          <details class="collapse-arrow border-neutral collapse border p-2">
            <summary class="collapse-title text-2xl">Background</summary>
            <div class="collapse-content grid grid-cols-1 gap-2">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Color</span>
                </label>
                <input type="color" class="input w-full p-0" required />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Image</span>
                </label>
                <input
                  type="file"
                  class="file-input file-input-bordered bg-base-200 w-full"
                />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Repeat</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Position</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Size</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Attachment</span>
                </label>
                <select class="select select-bordered bg-base-200 w-full">
                  <option value="unset">Unset</option>
                  <option value="scroll">Scroll</option>
                  <option value="fixed">Fixed</option>
                  <option value="local">Local</option>
                </select>
              </div>
            </div>
          </details>
          <details class="collapse-arrow border-neutral collapse border p-2">
            <summary class="collapse-title text-2xl">Font</summary>
            <div class="collapse-content grid grid-cols-1 gap-2">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Google Fonts url</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Family</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Text size</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                />
              </div>
            </div>
          </details>
          <details class="collapse-arrow border-neutral collapse border p-2">
            <summary class="collapse-title text-2xl">Colors</summary>
            <div class="collapse-content grid grid-cols-1 gap-2">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Text</span>
                </label>
                <input type="color" class="input w-full p-0" required />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Primary</span>
                </label>
                <input type="color" class="input w-full p-0" required />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Secondary</span>
                </label>
                <input type="color" class="input w-full p-0" required />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Accent</span>
                </label>
                <input type="color" class="input w-full p-0" required />
              </div>
            </div>
          </details>
          <NButton class="btn-primary btn-block mt-auto"
            >Save <template #loading>Saving...</template></NButton
          >
        </form>
      </div>
    </div>
  </div>
</template>
