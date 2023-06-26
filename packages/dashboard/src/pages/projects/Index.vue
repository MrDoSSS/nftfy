<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
import { projects, Project } from '@nftfy/common/collections'
import AddProjectDrawer from '@/components/drawers/AddProject.vue'
import { sliceAddress } from '@nftfy/common'

const addDrawerEl = ref<InstanceType<typeof AddProjectDrawer>>()

const query = projects.query()
const loading = ref(true)
const items = ref<Project[]>()

query.then((v) => (items.value = v)).finally(() => (loading.value = false))
</script>

<template>
  <div
    class="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
  >
    <div
      @click="addDrawerEl?.show()"
      class="card bg-neutral h-[20vmax] max-h-[15rem] cursor-pointer text-white shadow-xl transition-transform hover:scale-[1.01] hover:shadow-2xl"
    >
      <div class="card-body">
        <PlusIcon class="mx-auto w-28 grow" />
      </div>
    </div>
    <RouterLink
      :to="{ name: 'project', params: { id: project.id } }"
      class="card bg-base-200 h-[20vmax] max-h-[15rem] shadow-xl transition-transform hover:scale-[1.01] hover:shadow-2xl"
      v-for="project in items"
      :key="project.id"
    >
      <div class="card-body flex-col justify-between">
        <div class="flex items-center justify-between">
          <h2 class="card-title">{{ project.name }} ({{ project.symbol }})</h2>
          <div class="badge badge-primary">{{ project.chain?.name }}</div>
        </div>

        <div class="text-base-content/80">
          {{ sliceAddress(project.contractAddress, 6) }}
        </div>
      </div>
    </RouterLink>
    <template v-if="loading">
      <div
        class="card bg-base-200 h-[20vmax] max-h-[15rem] shadow-xl"
        v-for="i in 2"
        :key="i"
      >
        <div class="card-body animate-pulse flex-col justify-between">
          <div class="mb-4 flex items-center justify-between">
            <div class="bg-neutral h-5 w-1/2 rounded-full"></div>
            <div class="bg-primary h-5 w-1/3 rounded-full"></div>
          </div>
          <div class="bg-neutral h-4 w-1/2 rounded-full"></div>
        </div>
      </div>
    </template>
  </div>
  <AddProjectDrawer ref="addDrawerEl" />
</template>
