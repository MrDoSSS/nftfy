<script lang="ts" setup>
defineProps({ link: { type: Boolean, default: true } })
</script>

<template>
  <component
    :is="link ? 'RouterLink' : 'div'"
    to="/"
    class="font-bold"
    :class="{ 'flex-0 btn btn-ghost px-2': link }"
  >
    <div
      class="font-title text-primary inline-flex transition-all duration-200"
    >
      <span class="text-primary uppercase">nft</span>
      <span class="text-base-content lowercase">fy</span>
    </div>
  </component>
</template>
