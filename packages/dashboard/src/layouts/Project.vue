<script setup lang="ts">
import { inject } from 'vue'
import { RocketLaunchIcon, GlobeAltIcon } from '@heroicons/vue/24/solid'

const layoutMounted = inject('layoutMounted')
</script>

<template>
  <div>
    <Teleport v-if="layoutMounted" to="#main-drawer-menu">
      <li>
        <RouterLink :to="{ name: 'project', params: { id: 1 } }"
          ><RocketLaunchIcon /> Overview</RouterLink
        >
      </li>
      <li>
        <RouterLink :to="{ name: 'project-website', params: { id: 1 } }"
          ><GlobeAltIcon /> Website</RouterLink
        >
      </li>
    </Teleport>

    <RouterView />
  </div>
</template>
