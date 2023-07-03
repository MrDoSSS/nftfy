<script setup lang="ts">
import Placeholder from '@/components/placeholders/Project.vue'
</script>

<template>
  <div>
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <KeepAlive>
          <Suspense>
            <component :is="Component"></component>
            <template #fallback>
              <Placeholder />
            </template>
          </Suspense>
        </KeepAlive>
      </template>
    </RouterView>
  </div>
</template>
