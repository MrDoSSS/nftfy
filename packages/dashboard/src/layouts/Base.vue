<script setup lang="ts">
import NDrawer from '@/components/NDrawer.vue'
import { onMounted, provide, ref, readonly } from 'vue'

const mounted = ref(false)

provide('layoutMounted', readonly(mounted))

onMounted(() => (mounted.value = true))
</script>

<template>
  <NDrawer>
    <RouterView />
  </NDrawer>
</template>
