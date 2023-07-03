<script setup lang="ts">
import {
  RocketLaunchIcon,
  GlobeAltIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/vue/24/solid'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <li>
    <RouterLink :to="{ name: 'project', params: route.params }"
      ><RocketLaunchIcon /> Overview</RouterLink
    >
  </li>
  <li>
    <RouterLink :to="{ name: 'project-phases', params: route.params }"
      ><AdjustmentsHorizontalIcon /> Minting Phases</RouterLink
    >
  </li>
  <li>
    <RouterLink :to="{ name: 'project-website', params: route.params }"
      ><GlobeAltIcon /> Website</RouterLink
    >
  </li>
</template>
