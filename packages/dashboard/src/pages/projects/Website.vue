<script setup lang="ts">
import { ref } from 'vue'
import WebsiteSettingsDrawer from '@/components/drawers/WebsiteSettings.vue'
import {
  Cog6ToothIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/vue/24/solid'

const websiteSettingsDrawerEl =
  ref<InstanceType<typeof WebsiteSettingsDrawer>>()
</script>

<template>
  <WebsiteSettingsDrawer ref="websiteSettingsDrawerEl" />
  <div class="mb-5 flex gap-2">
    <button class="btn btn-sm" @click="websiteSettingsDrawerEl?.show">
      <Cog6ToothIcon />
    </button>
    <a class="btn btn-sm">
      <ArrowTopRightOnSquareIcon />
    </a>
  </div>
  <div class="mockup-window bg-base-200">
    <div class="bg-primary flex justify-center px-4 py-16">Hello!</div>
  </div>
</template>
