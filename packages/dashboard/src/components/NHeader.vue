<script lang="ts" setup>
import NLogo from './NLogo.vue'
import NConnectWallet from '@/components/NConnectWallet.vue'

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
          class="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-6 w-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <NLogo
        class="text-2xl md:text-4xl"
        :class="{ 'xl:hidden': props.drawerToggler }"
      />
      <div class="ml-auto flex-none pr-2 md:pr-4">
        <NConnectWallet class="btn-sm" />
      </div>
    </nav>
  </header>
</template>
