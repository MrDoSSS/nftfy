<script setup lang="ts">
import { ref } from 'vue'
import { projects } from '@nftfy/common/collections'
import TheAddProjectDrawer from '@/components/drawers/TheAddProjectDrawer.vue'
import ProjectCard from '@/components/cards/ProjectCard.vue'
import AddProjectCard from '@/components/cards/AddProjectCard.vue'

const items = ref(await projects.query())

const addDrawerEl = ref<InstanceType<typeof TheAddProjectDrawer>>()
</script>

<template>
  <div
    class="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
  >
    <AddProjectCard @click="addDrawerEl?.show()" />
    <ProjectCard
      v-for="project in items"
      :key="project.id"
      :id="project.id"
      :name="project.name"
      :symbol="project.symbol"
      :chain="project.chain"
      :contract-address="project.contractAddress"
    />
  </div>
  <TheAddProjectDrawer ref="addDrawerEl" />
</template>
