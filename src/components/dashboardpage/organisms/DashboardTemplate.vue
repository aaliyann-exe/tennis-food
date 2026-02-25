<script setup>
import Header from "/src/components/header/molecules/Header.vue";
import Box from "../molecules/Box.vue";
import TrainerUsageCard from "../molecules/TrainerUsageCard.vue";
import PlayerStatsCard from "../molecules/PlayerStatsCard.vue";
import UsersByAgeCard from "../molecules/UsersByAgeCard.vue";
import HashtagAnalysisCard from "../molecules/HashtagAnalysisCard.vue";

import recordIcon from "/src/assets/recordIcon.svg";
import starIcon from "/src/assets/starIcon.svg";
import cogwheelIcon from "/src/assets/cogwheelIcon.svg";
</script>

<template>
  <div class="min-h-screen w-full bg-gray-50">
    <Header text="Dashboard" dashboard />

    <div class="max-w-360 mx-auto p-6">
      <div class="flex flex-nowrap justify-center gap-4 mb-8">
        <Box
          :title="$t('table.active') + ' Trainers'"
          :tooltip="$t('tooltip.activeTrainers')"
          :icon="recordIcon"
          isTrainer
        />
        <Box
          :title="'Trainers ' + $t('dashboardPage.usageQuality')"
          :label="
            $t('dashboardPage.schoolLabel') + ': ' + $t('dashboardPage.low')
          "
          secondLabel="Trainers"
          :tooltip="$t('tooltip.trainersUsageQuality')"
          :icon="starIcon"
          isTrainer
          special
        />
        <Box
          :title="$t('table.active') + ' ' + $t('player.players')"
          :tooltip="$t('tooltip.activePlayers')"
          :icon="recordIcon"
        />
        <Box
          :title="$t('player.players') + ' ' + $t('dashboardPage.engagement')"
          :label="$t('dashboardPage.videosWatched') + ' 0%'"
          :secondLabel="$t('player.players')"
          :tooltip="$t('tooltip.playersEngagement')"
          :icon="cogwheelIcon"
          special
        />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <TrainerUsageCard :tooltip="$t('tooltip.trainersUsageQuality')" />
        <PlayerStatsCard :tooltip="$t('tooltip.playersEngagement')" />
        <UsersByAgeCard :tooltip="$t('tooltip.usersAgeCategory')" />
        <HashtagAnalysisCard :tooltip="$t('tooltip.hashtagsAnalysis')" />
      </div>
    </div>
  </div>
</template>
