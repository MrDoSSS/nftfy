<script setup lang="ts">
import { RocketLaunchIcon } from '@heroicons/vue/24/solid'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <li>
    <RouterLink :to="{ name: 'project', params: route.params }"
      ><RocketLaunchIcon /> Back</RouterLink
    >
  </li>
</template>
