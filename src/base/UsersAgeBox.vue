<template>
  <LargeBox icon="pi-chart-line" :info="$t('tooltip.usersAgeCategory')">
    <template #header>{{ $t('dashboardPage.usersByAgeCategory') }} </template>

    <div class="mt-10">
      <PlayerAgeBar color="bg-green-600" label="a50" :count="0" />
      <PlayerAgeBar color="bg-green-400" label="a30" :count="0" />
      <PlayerAgeBar color="bg-yellow-400" label="a18" :count="1" />
      <PlayerAgeBar color="bg-orange-500" label="a12" :count="0" />
      <PlayerAgeBar color="bg-red-500" label="u12" :count="1" />
    </div>
  </LargeBox>
</template>

<script setup>
import { useMainStore } from '@/stores/dataStore'

import LargeBox from './LargeBox.vue'
import PlayerAgeBar from './PlayerAgeBar.vue'

const activePlayers = useMainStore().activePlayers.length
</script>
