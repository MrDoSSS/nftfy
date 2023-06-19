<script setup lang="ts">
import { inject } from 'vue'
import {
  RocketLaunchIcon,
  Cog6ToothIcon,
  AdjustmentsHorizontalIcon,
  DocumentIcon,
} from '@heroicons/vue/24/solid'

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
        <RouterLink :to="{ name: 'project-mint-rules', params: { id: 1 } }"
          ><AdjustmentsHorizontalIcon /> Mint rules</RouterLink
        >
      </li>
      <li>
        <RouterLink :to="{ name: 'project-whitelist', params: { id: 1 } }"
          ><DocumentIcon /> Whitelist</RouterLink
        >
      </li>
      <li>
        <RouterLink :to="{ name: 'project-settings', params: { id: 1 } }"
          ><Cog6ToothIcon /> Settings</RouterLink
        >
      </li>
    </Teleport>

    <RouterView />
  </div>
</template>
