<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import NButton from '@/components/NButton.vue'
import DeployStatusModal from './DeployStatusModal.vue'

const shown = ref(false)

const show = () => (shown.value = true)
const hide = () => (shown.value = false)

const deployStatusModalEl = ref<InstanceType<typeof DeployStatusModal>>()

defineExpose({ show, hide })

const data = reactive({
  name: '',
  symbol: '',
  payees: [
    {
      address: '',
      share: '',
    },
  ],
})

const addPayee = () =>
  data.payees.push({
    address: '',
    share: '',
  })
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
        <div class="flex items-center justify-between">
          <button class="btn btn-circle btn-ghost" @click="hide">✕</button>
          <div>
            Already deployed? <a href="#" class="link-secondary">Attach</a>
          </div>
        </div>
        <div class="h-2"></div>
        <div class="mb-8">
          <h2 class="mb-1 text-4xl">Contract Parameters</h2>
          <p>
            Parameters the contract specifies to be passed in during deployment.
          </p>
        </div>
        <form
          @submit.prevent="deployStatusModalEl?.show()"
          class="flex grow flex-col gap-10"
        >
          <div>
            <h3 class="mb-4 text-2xl">Token info</h3>
            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-4">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Name</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                  required
                />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Symbol</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <div class="mb-4">
              <h3 class="mb-1 text-2xl">Payees</h3>
              <p>
                Determine the addresses that should receive the revenue from
                initial sales of the assets.
              </p>
            </div>
            <div
              class="payee mb-2 grid grid-flow-row-dense grid-cols-6 items-end gap-2 md:gap-4"
              v-for="(item, i) in data.payees"
              :key="i"
            >
              <div class="form-control col-span-3">
                <label class="label">
                  <span class="label-text">Address</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                  :required="i === 0"
                  v-model="item.address"
                />
              </div>
              <div class="form-control col-span-2">
                <label class="label">
                  <span class="label-text">Share</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                  :required="i === 0"
                  v-model="item.share"
                />
              </div>
              <button
                type="button"
                class="btn w-1/10 text-xl"
                v-if="i === data.payees.length - 1"
                @click="addPayee"
              >
                <PlusIcon />
              </button>
              <div v-else class="w-1/10"></div>
            </div>
          </div>
          <NButton class="btn-primary btn-block mt-auto"
            >Deploy <template #loading>Deploying...</template></NButton
          >
        </form>
      </div>
    </div>
  </div>
</template>
