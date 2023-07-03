<script lang="ts" setup>
import { useAccount, useWeb3Modal } from '@nftfy/common'
import NButton from './NButton.vue'

const { account, slicedAddress } = useAccount()
const { connect, web3Modal, opened } = useWeb3Modal()

const action = () => {
  if (account.value.isConnected) {
    web3Modal.openModal()
  } else {
    connect()
  }
}
</script>

<template>
  <NButton
    :class="{
      'btn-outline': account.isConnected,
      'btn-primary': !account.isConnected,
    }"
    @click="action"
    :loading="opened && !account.isConnected"
  >
    <template v-if="account.isConnected">{{ slicedAddress }}</template>
    <template v-else> Connect wallet </template>
    <template #loading> Connecting </template>
  </NButton>
</template>
