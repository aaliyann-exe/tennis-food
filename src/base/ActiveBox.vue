<template>
  <div class="bg-white rounded-3xl shadow-sm block w-full p-6">
    <div class="bg-orange-500/8 rounded-full w-12 h-12 flex items-center justify-center mb-4">
      <i class="pi pi-stop-circle text-orange-500 text-2xl"></i>
    </div>
    <div class="flex items-center">
      <h1 class="text-bg font-medium mr-2 text-black">
        {{ $t('table.active') + ' ' + (props.trainers ? 'Trainers' : $t('player.players')) }}
      </h1>
      <InfoButton size="text-xs text-black">
        {{ props.trainers ? $t('tooltip.activeTrainers') : $t('tooltip.activePlayers') }}
      </InfoButton>
    </div>
    <div>
      <h1 class="font-semibold text-3xl text-black">
        {{ activeNumber }}
        <span class="text-xs font-semibold"
          >({{ ((activeNumber / totalNumber) * 100).toFixed(0) }}%)</span
        >
      </h1>
      <h1 class="text-sm opacity-60 text-black">
        {{ $t('table.inactive') }}: {{ inactiveNumber }}. {{ $t('table.total') }}:
        {{ totalNumber }}
      </h1>

      <h1 class="text-sm font-normal mt-7 text-black">– 0 {{ $t('dashboardPage.this') }} Week</h1>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useMainStore } from '@/stores/dataStore'
import InfoButton from './InfoButton.vue'

const props = defineProps({
  trainers: Boolean,
  players: Boolean,
})

const totalNumber = ref(0)
const activeNumber = ref(0)
const inactiveNumber = ref(0)

if (props.trainers) {
  totalNumber.value = useMainStore().totalTrainers
  activeNumber.value = useMainStore().activeTrainers.length
} else if (props.players) {
  totalNumber.value = useMainStore().totalPlayers
  activeNumber.value = useMainStore().activePlayers.length
}

inactiveNumber.value = totalNumber.value - activeNumber.value

const infoHover = ref(false)
</script>
