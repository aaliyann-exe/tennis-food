<template>
  <LargeBox icon="pi-key" :info="$t('tooltip.trainersUsageQuality')">
    <template #header>
      {{ $t('dashboardPage.trainerActivityHeading') }}
    </template>
    <h1 class="text-sm opacity-80 font-medium">
      School Trainer {{ $t('dashboardPage.usageScore') }}:
      <span class="ml-2 text-sm opacity-100 font-bold text-green-700">
        {{ $t('dashboardPage.good') }} (0)</span
      >
    </h1>
    <h1 class="text-sm opacity-70 font-normal">{{ $t('dashboardPage.overallCoverage') }}: 0.0%</h1>
  </LargeBox>
</template>

<script setup>
import LargeBox from './LargeBox.vue'
</script>
