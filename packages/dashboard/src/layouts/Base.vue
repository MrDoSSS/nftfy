<script setup lang="ts">
import TheDrawer from '@/components/TheDrawer.vue'
import FailedTransaction from '@/components/modals/FailedTransaction.vue'
</script>

<template>
  <TheDrawer>
    <RouterView />
  </TheDrawer>
  <FailedTransaction />
</template>
