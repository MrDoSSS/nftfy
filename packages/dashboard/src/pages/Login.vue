<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import AppConnectWallet from '@/components/AppConnectWallet.vue'
</script>

<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <AppLogo :link="false" class="mb-10 text-[20vmin]" />
        <AppConnectWallet />
      </div>
    </div>
  </div>
</template>
