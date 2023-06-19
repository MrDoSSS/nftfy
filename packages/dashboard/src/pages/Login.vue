<script setup lang="ts">
import NLogo from '@/components/NLogo.vue'
import NConnectWallet from '@/components/NConnectWallet.vue'
</script>

<template>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <NLogo :link="false" class="mb-10 text-[20vmin]" />
        <NConnectWallet />
      </div>
    </div>
  </div>
</template>
