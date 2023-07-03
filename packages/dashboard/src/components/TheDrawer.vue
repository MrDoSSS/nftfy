<script setup lang="ts">
import TheHeader from './TheHeader.vue'
import NLogo from './NLogo.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const shown = computed<boolean>(
  () => (route.meta.hasDrawer as boolean) || false
)
</script>

<template>
  <div
    class="drawer min-h-full"
    :class="{
      'xl:drawer-open': shown,
    }"
  >
    <input id="main-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <TheHeader :drawer-toggler="shown" />
      <div class="px-4 pb-16 pt-4 md:px-6">
        <slot />
      </div>
    </div>
    <div class="drawer-side z-40" v-if="shown">
      <label for="main-drawer" class="drawer-overlay"></label>

      <aside class="bg-base-100 h-full w-72 py-4 lg:pt-0">
        <div
          class="bg-base-100 sticky top-0 z-20 hidden h-16 items-center bg-opacity-90 px-2 pt-1 backdrop-blur xl:flex"
        >
          <NLogo class="hidden text-2xl md:text-4xl xl:block" />
        </div>
        <div class="h-4"></div>
        <ul class="menu menu-lg gap-1 px-2 py-0" id="main-drawer-menu">
          <RouterView name="navigation" />
        </ul>
      </aside>
    </div>
  </div>
</template>
