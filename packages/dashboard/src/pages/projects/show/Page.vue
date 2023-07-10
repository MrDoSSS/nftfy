<script lang="ts" setup>
import Loader from './Loader.vue'
import TheProjectPlaceholder from '@/components/placeholders/TheProjectPlaceholder.vue'
</script>

<template>
  <Suspense>
    <Loader />
    <template #fallback> <TheProjectPlaceholder /> </template>
  </Suspense>
</template>
