<script lang="ts" setup>
import { useSlots } from 'vue'

defineProps({ loading: { type: Boolean, default: false } })
const slots = useSlots()
</script>

<template>
  <button class="btn" :disabled="loading">
    <span class="loading loading-spinner" v-if="loading"></span>
    <slot v-if="!(loading && slots.loading)" />
    <slot v-if="loading" name="loading"></slot>
  </button>
</template>
