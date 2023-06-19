<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import AddDrawer from '@/components/projects/AddDrawer.vue'

const projects = ref([
  {
    id: 1,
    name: 'Project 1',
    image:
      'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg',
  },
])

const addDrawerRef = ref<InstanceType<typeof AddDrawer>>()
</script>

<template>
  <div
    class="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
  >
    <div
      @click="addDrawerRef?.show()"
      class="card bg-neutral cursor-pointer text-white shadow-xl transition-transform hover:scale-[1.01] hover:shadow-2xl"
    >
      <div class="card-body">
        <PlusIcon class="mx-auto w-28 grow" />
      </div>
    </div>
    <RouterLink
      :to="{ name: 'project', params: { id: project.id } }"
      class="card bg-base-200 image-full shadow-xl transition-transform hover:scale-[1.01] hover:shadow-2xl"
      v-for="project in projects"
      :key="project.id"
    >
      <figure>
        <img :src="project.image" />
      </figure>
      <div class="card-body !text-white">
        <h2 class="card-title">{{ project.name }}</h2>
      </div>
    </RouterLink>
  </div>
  <AddDrawer ref="addDrawerRef" />
</template>
