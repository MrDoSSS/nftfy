<script lang="ts" setup>
import Loader from './Loader.vue'
import TheProjectsPlaceholder from '@/components/placeholders/TheProjectsPlaceholder.vue'
</script>

<template>
  <Suspense>
    <Loader />
    <template #fallback> <TheProjectsPlaceholder /></template>
  </Suspense>
</template>
