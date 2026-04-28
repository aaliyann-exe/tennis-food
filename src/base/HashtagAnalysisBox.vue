<template>
  <LargeBox icon="pi-hashtag" :info="$t('tooltip.hashtagsAnalysis')">
    <template #header> Hashtag {{ $t('dashboardPage.analysis') }} </template>
    <hr class="opacity-10 w-130 mx-auto mt-2 mb-2" />
    <div class="flex justify-between items-center px-3">
      <h1 class="text-bg opacity-80 font-medium">
        1. #TennisLife<span class="text-2xl font-light ml-12">-</span>
      </h1>
      <h1 class="text-bg opacity-80 font-medium">0 Videos</h1>
    </div>
  </LargeBox>
</template>

<script setup>
import LargeBox from './LargeBox.vue'
</script>
