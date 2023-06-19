<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import AddProjectDrawer from '@/components/drawers/AddProject.vue'

const projects = ref([
  {
    id: 1,
    name: 'Project 1',
    image:
      'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  },
])

const addDrawerEl = ref<InstanceType<typeof AddProjectDrawer>>()
</script>

<template>
  <div
    class="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
  >
    <div
      @click="addDrawerEl?.show()"
      class="card bg-neutral cursor-pointer text-white shadow-xl transition-transform hover:scale-[1.01] hover:shadow-2xl"
    >
      <div class="card-body">
        <PlusIcon class="mx-auto w-28 grow" />
      </div>
    </div>
    <RouterLink
      :to="{ name: 'project', params: { id: project.id } }"
      class="card bg-base-200 h-[20vmax] max-h-[15rem] shadow-xl transition-transform hover:scale-[1.01] hover:shadow-2xl"
      v-for="project in projects"
      :key="project.id"
    >
      <div class="card-body !text-white">
        <h2 class="card-title">{{ project.name }}</h2>
      </div>
    </RouterLink>
  </div>
  <AddProjectDrawer ref="addDrawerEl" />
</template>
