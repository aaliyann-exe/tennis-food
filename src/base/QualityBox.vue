<template>
  <div class="bg-white rounded-3xl shadow-sm block w-full p-6">
    <div class="bg-orange-500/8 rounded-full w-12 h-12 flex items-center justify-center mb-4">
      <i :class="[props.trainers ? 'pi-star' : 'pi-cog', 'pi text-orange-500 text-2xl']"></i>
    </div>
    <div class="flex items-center">
      <h1 class="text-bg font-medium mr-2">
        {{
          props.trainers
            ? 'Trainers ' + $t('dashboardPage.usageQuality')
            : $t('player.players') + ' ' + $t('dashboardPage.engagement')
        }}
      </h1>
      <InfoButton size="text-xs">{{
        props.trainers ? $t('tooltip.trainersUsageQuality') : $t('tooltip.playersEngagement')
      }}</InfoButton>
    </div>
    <div>
      <h1 class="font-semibold text-3xl">{{ activeNumber }}/5</h1>
      <h1 class="text-sm opacity-60">
        {{
          props.trainers
            ? $t('dashboardPage.schoolLabel') + ': Low'
            : $t('dashboardPage.videosWatched') + ' 0%'
        }}
      </h1>
      <h1 class="text-sm opacity-60">
        0 <span class="font-semibold">(0)% </span
        >{{ props.trainers ? 'Trainers' : $t('player.players') }} ≥ 4
      </h1>
      <h1 class="text-sm font-normal mt-2">– 0 {{ $t('dashboardPage.vsLastPeriod') }}</h1>
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
</script>
