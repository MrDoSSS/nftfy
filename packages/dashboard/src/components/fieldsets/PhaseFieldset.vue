<script setup lang="ts">
import { formatEther, parseEther } from 'viem'
import { computed, ref } from 'vue'
import AppButton from '@/components/AppButton.vue'
import { Address } from 'viem'

const props = defineProps<{
  supply: bigint
  totalMinted: bigint
  maxPerWallet: bigint
  root: Address
  isActive: boolean
  price: bigint
  name: string
}>()

const emit = defineEmits<{
  'update:supply': [value: bigint]
  'update:maxPerWallet': [value: bigint]
  'update:root': [value: string]
  'update:isActive': [value: boolean]
  'update:price': [value: bigint]
  'update:name': [value: string]
  remove: []
}>()

const supplyModel = computed({
  get: () => props.supply,
  set: (v) => emit('update:supply', BigInt(v)),
})

const maxPerWalletModel = computed({
  get: () => props.maxPerWallet,
  set: (v) => emit('update:maxPerWallet', BigInt(v)),
})

const priceModel = computed({
  get: () => formatEther(props.price),
  set: (v) => emit('update:price', parseEther(`${parseFloat(v) || 0}`)),
})

const isActiveModel = computed({
  get: () => props.isActive,
  set: (v) => emit('update:isActive', v),
})

const nameModel = computed({
  get: () => props.name,
  set: (v) => emit('update:name', v.trim()),
})

const editing = ref(false)

// const rootModel = computed({
//   get: () => props.root,
//   set: (v) => emit('update:root', v),
// })
</script>

<template>
  <div class="card max-md:card-compact bg-base-200 mb-8 shadow-xl">
    <div class="card-body">
      <div class="flex justify-between gap-5 max-md:flex-col">
        <h2 class="card-title max-md:order-2">
          {{ name }}
          <div
            class="badge badge-outline badge-sm badge-success"
            v-if="isActive"
          >
            Active
          </div>
        </h2>
        <div class="card-actions shrink-0 max-md:order-1">
          <AppButton
            type="button"
            class="btn-sm max-sm:btn-xs btn-ghost btn-outline"
            @click="editing = !editing"
            >{{ editing ? 'Collapse' : 'Edit' }}</AppButton
          >
          <AppButton
            type="button"
            class="btn-outline max-sm:btn-xs btn-error btn-sm"
            @click="$emit('remove')"
            >Remove</AppButton
          >
        </div>
      </div>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2" v-if="editing">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input
            type="text"
            class="input input-bordered w-full"
            required
            v-model="nameModel"
          />
          <label class="label">
            <span class="label-text-alt"
              >This does not affect how your phase functions and is for
              organizational purposes only.
            </span>
          </label>
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Supply </span>
          </label>
          <input
            type="number"
            class="input input-bordered w-full"
            :min="totalMinted.toString()"
            required
            v-model="supplyModel"
          />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Max per wallet </span>
          </label>
          <input
            type="number"
            class="input input-bordered w-full"
            required
            min="0"
            v-model="maxPerWalletModel"
          />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Price</span>
          </label>
          <input
            type="number"
            class="input input-bordered w-full"
            required
            min="0"
            step="0.0001"
            v-model="priceModel"
          />
        </div>
        <div class="form-control md:col-span-2">
          <label class="label cursor-pointer sm:w-fit">
            <span class="label-text sm:mr-10">Active</span>
            <input type="checkbox" class="toggle" v-model="isActiveModel" />
          </label>
        </div>
        <div class="form-control md:col-span-2">
          <label class="label">
            <span class="label-text">Allow list</span>
          </label>
          <input type="file" class="file-input file-input-bordered w-full" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-5 lg:w-3/4" v-else>
        <div>
          <div class="text-white/60">Supply</div>
          <div class="text-xl font-bold">{{ supply.toString() }}</div>
        </div>
        <div>
          <div class="text-white/60">Total Minted</div>
          <div class="text-xl font-bold">{{ totalMinted.toString() }}</div>
        </div>
        <div>
          <div class="text-white/60">Max per wallet</div>
          <div class="text-xl font-bold">{{ maxPerWallet.toString() }}</div>
        </div>
        <div>
          <div class="text-white/60">Price</div>
          <div class="text-xl font-bold">{{ priceModel }} ETH</div>
        </div>
      </div>
    </div>
  </div>
</template>
