<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import AppLogo from '@/components/AppLogo.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import TheFailedTransactionModal from '@/components/modals/TheFailedTransactionModal.vue'

const route = useRoute()

const drawerShown = computed<boolean>(() => route.meta.hasDrawer || false)

const open = ref(false)
</script>

<template>
  <div
    class="drawer min-h-full"
    :class="{
      'xl:drawer-open': drawerShown,
    }"
  >
    <input
      id="main-drawer"
      type="checkbox"
      class="drawer-toggle"
      v-model="open"
    />
    <div class="drawer-content flex flex-col">
      <TheHeader :drawer-toggler="drawerShown" />
      <div class="px-4 pb-16 pt-4 md:px-6">
        <RouterView v-slot="{ Component }">
          <template v-if="Component">
            <Suspense>
              <component :is="Component"></component>
            </Suspense>
          </template>
        </RouterView>
      </div>
    </div>
    <div class="drawer-side z-40" v-if="drawerShown">
      <label for="main-drawer" class="drawer-overlay"></label>

      <aside class="bg-base-100 h-full w-72 py-4 lg:pt-0">
        <div
          class="bg-base-100 sticky top-0 z-20 hidden h-16 items-center bg-opacity-90 px-2 pt-1 backdrop-blur xl:flex"
        >
          <AppLogo class="hidden text-2xl md:text-4xl xl:block" />
        </div>
        <div class="h-4"></div>
        <ul
          class="menu menu-lg gap-1 px-2 py-0"
          id="main-drawer-menu"
          @click="open = false"
        >
          <RouterView name="navigation" />
        </ul>
      </aside>
    </div>
  </div>
  <TheFailedTransactionModal />
</template>
