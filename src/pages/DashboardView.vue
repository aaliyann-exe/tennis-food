<template>
  <div class="bg-gray-100 w-screen min-h-screen no-scrollbar overflow-auto flexbox scrollbar-hide">
    <div class="mt-21 mx-4 mb-8">
      <HeaderSection>Dashboard</HeaderSection>
      <div class="gap-4 mt-8 flex">
        <ActiveBox trainers />
        <QualityBox trainers />
        <ActiveBox players />
        <QualityBox players />
      </div>
      <div class="gap-4 mt-4 flex">
        <TrainerUsageBox />
        <PlayerEngagementBox />
      </div>
      <div class="gap-4 mt-4 flex">
        <UsersAgeBox />
        <HashtagAnalysisBox />
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderSection from '@/base/HeaderSection.vue'
import ActiveBox from '@/base/ActiveBox.vue'
import QualityBox from '@/base/QualityBox.vue'
import TrainerUsageBox from '@/base/TrainerUsageBox.vue'
import PlayerEngagementBox from '@/base/PlayerEngagementBox.vue'
import UsersAgeBox from '@/base/UsersAgeBox.vue'
import HashtagAnalysisBox from '@/base/HashtagAnalysisBox.vue'
</script>
