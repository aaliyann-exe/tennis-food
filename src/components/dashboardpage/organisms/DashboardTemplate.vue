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
          :activeCount="0"
          :totalCount="0"
          :givenPercentage="0"
          :tooltip="$t('tooltip.activeTrainers')"
          :icon="recordIcon"
        />
        <Box
          :title="'Trainers ' + $t('dashboardPage.usageQuality')"
          :activeCount="0"
          :totalCount="5"
          :label="
            $t('dashboardPage.schoolLabel') + ': ' + $t('dashboardPage.low')
          "
          :tooltip="$t('tooltip.trainersUsageQuality')"
          :icon="starIcon"
          special
        />
        <Box
          :title="$t('table.active') + ' ' + $t('player.players')"
          :activeCount="1"
          :totalCount="2"
          :tooltip="$t('tooltip.activePlayers')"
          :icon="recordIcon"
        />
        <Box
          :title="$t('player.players') + ' ' + $t('dashboardPage.engagement')"
          :activeCount="1"
          :totalCount="5"
          :label="$t('dashboardPage.videosWatched') + ' 0%'"
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
