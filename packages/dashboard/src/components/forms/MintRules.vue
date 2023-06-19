<template>
  <details class="bg-base-200 collapse-arrow collapse shadow-xl">
    <summary class="collapse-title text-xl font-medium">Mint rules</summary>
    <form @submit.prevent="" class="collapse-content">
      <div class="mb-3 grid grid-cols-1 gap-3">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Supply</span>
          </label>
          <input
            type="text"
            class="input input-bordered bg-neutral w-full"
            required
          />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Max per wallet</span>
          </label>
          <input
            type="text"
            class="input input-bordered bg-neutral w-full"
            required
          />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Free per wallet</span>
          </label>
          <input
            type="text"
            class="input input-bordered bg-neutral w-full"
            required
          />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Price</span>
          </label>
          <input
            type="text"
            class="input input-bordered bg-neutral w-full"
            required
          />
        </div>
      </div>
      <button class="btn btn-primary btn-block md:w-48">Save</button>
    </form>
  </details>
</template>
