<script setup lang="ts">
import { ProjectKey } from '@/di-keys'
import { injectStrict } from '@/utils'
import { projects } from '@nftfy/common/collections'
import { useRouter } from 'vue-router'
import { TrashIcon } from '@heroicons/vue/24/outline'

const project = injectStrict(ProjectKey)
const router = useRouter()

const deleteProject = async () => {
  if (!project) return

  await projects.delete(project.id)

  router.replace({ name: 'projects' })
}
</script>

<template>
  <button class="btn btn-outline btn-error text-xl" @click="deleteProject">
    <TrashIcon />
  </button>
</template>
