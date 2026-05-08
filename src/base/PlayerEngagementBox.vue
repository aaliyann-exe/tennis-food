<template>
  <LargeBox icon="pi-chart-line" :info="$t('tooltip.playersEngagement')">
    <template #header
      >{{ $t('player.player') + ' ' + $t('dashboardPage.engagementDistribution') }}
    </template>
    <div class="gap-4 flex mt-8 mb-6">
      <div class="flexbox text-center justify-center w-full bg-orange-500/6 px-6 py-4 rounded-lg">
        <h1 class="text-sm opacity-100 font-light mb-2">
          {{ $t('dashboardPage.avgPlayerScore') }}
        </h1>
        <h1 class="font-bold text-4xl">{{ activePlayers }}/5</h1>
      </div>

      <div class="flexbox text-center justify-center w-full bg-green-500/6 px-6 py-4 rounded-lg">
        <h1 class="text-sm opacity-100 font-light mb-2">
          {{ $t('dashboardPage.highlyEngagedPlayer') }} (≥4)
        </h1>
        <h1 class="font-bold text-4xl text-green-600">0%</h1>
      </div>
    </div>
    <h1 class="font-semibold text-lg mb-4">
      {{ $t('dashboardPage.engagementLevelDistribution') }}
    </h1>

    <div>
      <PlayerEngagementBar color="bg-green-600" label="outstanding" :count="0" />
      <PlayerEngagementBar color="bg-green-400" label="high" :count="0" />
      <PlayerEngagementBar color="bg-yellow-400" label="moderate" :count="0" />
      <PlayerEngagementBar color="bg-orange-500" label="limited" :count="0" />
      <PlayerEngagementBar color="bg-red-500" label="low" :count="2" />
    </div>
  </LargeBox>
</template>

<script setup>
import { useMainStore } from '@/stores/dataStore'

import LargeBox from './LargeBox.vue'
import PlayerEngagementBar from './PlayerEngagementBar.vue'

const mainStore = useMainStore()

const activePlayers = mainStore.activeEntities('players')
</script>
