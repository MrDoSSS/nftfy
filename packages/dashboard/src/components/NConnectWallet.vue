<script lang="ts" setup>
import { useAccount, useWeb3Modal } from '@nftfy/common'
import NButton from './NButton.vue'

const { account, slicedAddress } = useAccount()
const { connect, web3modal, opened } = useWeb3Modal()

const action = () => {
  if (account.value.isConnected) {
    web3modal.openModal()
  } else {
    connect()
  }
}
</script>

<template>
  <NButton
    class="btn-primary"
    @click="action"
    :loading="opened && !account.isConnected"
  >
    <template v-if="account.isConnected">{{ slicedAddress }}t</template>
    <template v-else> Connect wallet </template>
    <template #loading> Connecting </template>
  </NButton>
</template>
