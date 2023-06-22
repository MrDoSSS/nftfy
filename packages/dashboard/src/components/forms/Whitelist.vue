<template>
  <details class="bg-base-200 collapse-arrow collapse shadow-xl">
    <summary class="collapse-title text-xl font-medium">Whitelist</summary>
    <form @submit.prevent="" class="collapse-content">
      <textarea
        class="textarea bg-neutral mb-3 h-full w-full leading-4"
        required
        rows="20"
      />
      <button class="btn btn-primary btn-block btn-sm md:w-auto">Save</button>
    </form>
  </details>
</template>
