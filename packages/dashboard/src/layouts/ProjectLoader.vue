<script setup lang="ts">
import { ref, provide } from 'vue'
import { useDocument } from 'vuefire'
import { projects } from '@nftfy/common/collections'
import { useRoute } from 'vue-router'

const route = useRoute()

const doc = ref(projects.docRef(route.params.id as string))

const project = useDocument(doc)

await project.promise.value

provide('project', project)
</script>

<template>
  <RouterView></RouterView>
</template>
