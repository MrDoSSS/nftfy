<script setup lang="ts">
import { ArrowLeftIcon, Squares2X2Icon } from '@heroicons/vue/24/solid'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <li>
    <RouterLink :to="{ name: 'project', params: route.params }"
      ><ArrowLeftIcon /> Back</RouterLink
    >
  </li>
  <li>
    <RouterLink :to="{ name: 'project-website', params: route.params }"
      ><Squares2X2Icon /> Builder</RouterLink
    >
  </li>
</template>
