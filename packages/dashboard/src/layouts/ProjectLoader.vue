<script setup lang="ts">
import { ref, provide } from 'vue'
import { projects } from '@nftfy/common/collections'
import { useRoute, useRouter } from 'vue-router'
import { ProjectKey } from '@/di-keys'

const route = useRoute()
const router = useRouter()

const project = ref(await projects.get(route.params.id as string))

if (!project.value) {
  router.replace({ name: 'projects' })
} else {
  provide(ProjectKey, project.value)
}
</script>

<template>
  <RouterView></RouterView>
</template>
