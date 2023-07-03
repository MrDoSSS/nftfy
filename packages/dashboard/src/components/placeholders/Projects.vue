<template>
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
