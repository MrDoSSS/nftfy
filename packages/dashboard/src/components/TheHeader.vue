<script lang="ts" setup>
import AppLogo from './AppLogo.vue'
import AppConnectWallet from '@/components/AppConnectWallet.vue'
import { Bars3Icon } from '@heroicons/vue/24/solid'

interface Props {
  drawerToggler: boolean
}

const props = withDefaults(defineProps<Props>(), { drawerToggler: true })
</script>

<template>
  <header
    class="bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100"
  >
    <nav class="navbar">
      <div class="flex-none xl:hidden">
        <label
          v-if="drawerToggler"
          for="main-drawer"
          class="btn btn-square btn-ghost text-2xl"
        >
          <Bars3Icon />
        </label>
      </div>
      <AppLogo
        class="text-2xl md:text-4xl"
        :class="{ 'xl:hidden': props.drawerToggler }"
      />
      <div class="ml-auto flex-none pr-2 md:pr-4">
        <AppConnectWallet class="btn-sm" />
      </div>
    </nav>
  </header>
</template>
