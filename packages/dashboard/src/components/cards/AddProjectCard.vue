<script lang="ts" setup>
import { PlusIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div
    class="card bg-neutral h-[20vmax] max-h-[15rem] cursor-pointer text-white shadow-xl transition-transform hover:scale-[1.01] hover:shadow-2xl"
  >
    <div class="card-body">
      <PlusIcon class="mx-auto w-28 grow" />
    </div>
  </div>
</template>
