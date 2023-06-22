<script setup lang="ts">
import { inject } from 'vue'
import { RocketLaunchIcon, GlobeAltIcon } from '@heroicons/vue/24/solid'
import { useRoute } from 'vue-router'

const layoutMounted = inject('layoutMounted')
const route = useRoute()
</script>

<template>
  <div>
    <Teleport v-if="layoutMounted" to="#main-drawer-menu">
      <li>
        <RouterLink :to="{ name: 'project', params: route.params }"
          ><RocketLaunchIcon /> Overview</RouterLink
        >
      </li>
      <li>
        <RouterLink :to="{ name: 'project-website', params: route.params }"
          ><GlobeAltIcon /> Website</RouterLink
        >
      </li>
    </Teleport>

    <RouterView />
  </div>
</template>
