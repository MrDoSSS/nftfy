<script setup lang="ts"></script>

<template>
  <h1 class="mb-8 text-4xl font-bold md:mb-14 md:text-6xl">Project 1</h1>

  <div class="mb-4 flex w-full flex-col gap-4 md:mb-6 md:flex-row md:gap-6">
    <div
      class="stats bg-secondary text-secondary-content min-w-[20rem] shrink-0"
    >
      <div class="stat">
        <div class="stat-title text-secondary-content">Contract Balance</div>
        <div class="stat-value text-secondary-content">22 ETH</div>
        <div class="stat-actions">
          <button class="btn btn-sm">Withdraw</button>
        </div>
      </div>
    </div>

    <div
      class="stats stats-vertical md:stats-horizontal bg-base-200 grow shadow"
    >
      <div class="stat">
        <div class="stat-title">Total Supply</div>
        <div class="stat-value">1600</div>
      </div>
      <div class="stat">
        <div class="stat-title">Total Minted</div>
        <div class="stat-value">400</div>
      </div>

      <div class="stat">
        <div class="stat-title">Tokens Left</div>
        <div class="stat-value">1200</div>
      </div>
    </div>
  </div>

  <div class="card bg-base-200 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Card title!</h2>
    </div>
  </div>
</template>
