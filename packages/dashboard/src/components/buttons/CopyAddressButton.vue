<script lang="ts" setup>
import { Address } from 'viem'
import { computed, ref } from 'vue'
import { sliceAddress } from '@nftfy/common'
import { Square2StackIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{ address: Address }>()

const copyAddress = async () => {
  if (!props.address) return

  await navigator.clipboard.writeText(props.address)

  copyTooltip.value = 'Copied'

  setTimeout(() => (copyTooltip.value = 'Copy to clipboard'), 1000)
}

const copyTooltip = ref('Copy to clipboard')

const slicedAddress = computed(() => sliceAddress(props.address, 6))
</script>

<template>
  <div class="tooltip tooltip-bottom" :data-tip="copyTooltip">
    <button
      class="badge badge-outline hover:badge-ghost p-3"
      @click="copyAddress"
    >
      <Square2StackIcon class="mr-2" />
      {{ slicedAddress }}
    </button>
  </div>
</template>
