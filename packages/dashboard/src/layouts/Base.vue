<script setup lang="ts">
import TheDrawer from '@/components/TheDrawer.vue'
import { onMounted, provide, ref, readonly } from 'vue'

const mounted = ref(false)

provide('layoutMounted', readonly(mounted))

onMounted(() => (mounted.value = true))
</script>

<template>
  <TheDrawer>
    <RouterView />
  </TheDrawer>
</template>
