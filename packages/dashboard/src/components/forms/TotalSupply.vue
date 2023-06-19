<template>
  <details class="bg-base-200 collapse-arrow collapse shadow-xl">
    <summary class="collapse-title text-xl font-medium">Total supply</summary>
    <form @submit.prevent="" class="collapse-content">
      <div class="mb-3">
        <input
          type="text"
          class="input input-bordered bg-neutral w-full"
          required
        />
      </div>
      <button class="btn btn-primary btn-block md:w-48">Save</button>
    </form>
  </details>
</template>
