<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { PlusIcon, MinusIcon } from '@heroicons/vue/24/solid'
import { useErc721Factory, erc721FactoryABI } from '@nftfy/common'
import { decodeEventLog, Address } from 'viem'
import { useRouter } from 'vue-router'
import { projects } from '@nftfy/common/collections'
import { getNetwork, watchNetwork } from '@wagmi/core'
import { useDrawer } from '@/composables/use-drawer'

import AppButton from '@/components/AppButton.vue'
import TheDeployStatusModal from '@/components/modals/TheDeployStatusModal.vue'

const router = useRouter()

const { shown, show, hide } = useDrawer()
defineExpose({ show, hide })

const deployStatusModalEl = ref<InstanceType<typeof TheDeployStatusModal>>()

const { chain } = getNetwork()

const factoryConfig = reactive({
  address: import.meta.env.VITE_FACTORY_ADDRESS,
  chainId: chain?.id,
})

watchNetwork(({ chain }) => {
  factoryConfig.chainId = chain?.id
})

const erc721Factory = useErc721Factory(factoryConfig)

const data = reactive({
  name: '',
  symbol: '',
  payees: [
    {
      address: '',
      share: '',
    },
  ],
  enforceRoyalties: false,
})

const payees = computed(() =>
  data.payees.map((item) => item.address as Address)
)
const shares = computed(() => data.payees.map((item) => BigInt(item.share)))

const addPayee = () =>
  data.payees.push({
    address: '',
    share: '',
  })

const removePayee = (index: number) => data.payees.splice(index, 1)

const status = ref<'deploying' | 'creating'>('deploying')

const deployContract = async () => {
  status.value = 'deploying'

  const DEFAULT_OPERATOR_FILTER = '0x3cc6CddA760b79bAfa08dF41ECFA224f810dCeB6'

  deployStatusModalEl.value?.show()

  try {
    const { logs } = await erc721Factory.clone({
      args: [
        data.name,
        data.symbol,
        payees.value,
        shares.value,
        data.enforceRoyalties
          ? DEFAULT_OPERATOR_FILTER
          : '0x0000000000000000000000000000000000000000',
      ],
    })

    const events = logs
      .filter(
        (log) =>
          log.address.toLowerCase() ===
          import.meta.env.VITE_FACTORY_ADDRESS.toLowerCase()
      )
      .map((log) =>
        decodeEventLog({
          abi: erc721FactoryABI,
          data: log.data,
          topics: log.topics,
          strict: false,
        })
      )

    const contractCreatedEvent = events.find(
      (e) => e.eventName === 'ContractCreated'
    )

    if (!contractCreatedEvent) {
      throw Error('ContractCreated event not found')
    }

    const { contractAddress } = contractCreatedEvent.args as {
      contractAddress: Address
    }

    await addProject(contractAddress)
  } finally {
    deployStatusModalEl.value?.hide()
  }
}

const addProject = async (contractAddress: Address) => {
  status.value = 'creating'

  const { chain } = getNetwork()

  const project = await projects.add({
    contractAddress,
    name: data.name,
    symbol: data.symbol,
    chainId: chain?.id,
  })

  router.push({ name: 'project', params: { id: project.id } })
}
</script>

<template>
  <TheDeployStatusModal ref="deployStatusModalEl" :status="status" />
  <div class="drawer drawer-end">
    <input type="checkbox" :checked="shown" class="drawer-toggle" />
    <div class="drawer-side z-50">
      <div class="drawer-overlay !cursor-default" @click="hide"></div>
      <div
        class="bg-base-100 text-base-content flex min-h-full w-full flex-col p-4 lg:w-1/2"
      >
        <div class="flex items-center justify-between">
          <button class="btn btn-circle btn-ghost" @click="hide">✕</button>
          <div>
            Already deployed? <a href="#" class="link-secondary">Attach</a>
          </div>
        </div>
        <div class="h-2"></div>
        <div class="mb-8">
          <h2 class="mb-1 text-4xl">Contract Parameters</h2>
          <p>
            Parameters the contract specifies to be passed in during deployment.
          </p>
        </div>
        <form
          @submit.prevent="deployContract"
          class="flex grow flex-col gap-10"
        >
          <div>
            <h3 class="mb-4 text-2xl">Token info</h3>
            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-4">
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Name</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                  required
                  v-model="data.name"
                />
              </div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Symbol</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                  required
                  v-model="data.symbol"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 class="mb-4 text-2xl">Enforce Royalties</h3>

            <p class="mb-4">
              This will use OpenSea's Operator Filter Registry to prevent your
              tokens from being traded on marketplaces that do not enforce
              creator royalties.
            </p>
            <input
              type="checkbox"
              class="toggle"
              v-model="data.enforceRoyalties"
            />
          </div>
          <div>
            <div class="mb-4">
              <h3 class="mb-1 text-2xl">Payees</h3>
              <p>
                Determine the addresses that should receive the revenue from
                initial sales of the assets.
              </p>
            </div>
            <div
              class="payee mb-2 grid grid-flow-row-dense grid-cols-9 items-end gap-2 md:gap-4"
              v-for="(item, i) in data.payees"
              :key="i"
            >
              <div class="form-control col-span-6">
                <label class="label">
                  <span class="label-text">Address</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                  required
                  v-model="item.address"
                />
              </div>
              <div class="form-control col-span-2">
                <label class="label">
                  <span class="label-text">Share</span>
                </label>
                <input
                  type="text"
                  class="input input-bordered bg-base-200 w-full"
                  required
                  v-model="item.share"
                />
              </div>
              <button
                type="button"
                class="btn p-0 text-xl"
                v-if="i === 0"
                @click="addPayee"
              >
                <PlusIcon />
              </button>
              <button
                type="button"
                class="btn p-0 text-xl"
                v-else
                @click="removePayee(i)"
              >
                <MinusIcon />
              </button>
            </div>
          </div>
          <AppButton class="btn-primary btn-block mt-auto"
            >Deploy <template #loading>Deploying...</template></AppButton
          >
        </form>
      </div>
    </div>
  </div>
</template>
