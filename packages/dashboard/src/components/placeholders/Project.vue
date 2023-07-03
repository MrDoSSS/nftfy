<template>
  <div class="animate-pulse">
    <div class="bg-neutral mb-4 h-7 w-1/2 rounded-full"></div>
    <div class="bg-neutral mb-8 h-4 w-36 rounded-full md:mb-14"></div>
    <div class="mb-4 flex w-full flex-col gap-4 md:mb-6 md:flex-row md:gap-6">
      <div
        class="stats bg-secondary text-secondary-content h-28 min-w-[20rem] shrink-0"
      >
        <div class="stat"></div>
      </div>

      <div
        class="stats stats-vertical md:stats-horizontal bg-base-200 h-28 grow shadow"
      >
        <div class="stat"></div>
      </div>
    </div>
  </div>
</template>
