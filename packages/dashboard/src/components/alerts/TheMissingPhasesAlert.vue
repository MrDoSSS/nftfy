<script lang="ts" setup>
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="alert alert-warning mb-8">
    <ExclamationTriangleIcon class="text-4xl" />
    <div>
      <h3 class="font-bold">Missing Minting Phases</h3>
      <span>
        You need to set at least one minting phase for people to mint this
        drop.</span
      >
    </div>
  </div>
</template>
