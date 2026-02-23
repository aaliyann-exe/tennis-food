<script setup>
import Header from "/src/components/header/molecules/Header.vue";
import Box from "../atoms/Box.vue";
import TrainerUsageCard from "../atoms/TrainerUsageCard.vue";
import PlayerStatsCard from "../atoms/PlayerStatsCard.vue";

import recordIcon from "/src/assets/recordIcon.svg";
import starIcon from "/src/assets/starIcon.svg";
import cogwheelIcon from "/src/assets/cogwheelIcon.svg";
import hashtagIcon from "/src/assets/hashtagIcon.svg";
import peopleIcon from "/src/assets/peopleIcon.svg";
import statsIcon from "/src/assets/statsIcon.svg";
import tennisIcon from "/src/assets/tennisIcon.svg";
</script>

<template>
  <div class="min-h-screen w-full bg-gray-50">
    <Header text="Dashboard" dashboard />

    <div class="max-w-360 mx-auto p-6">
      <div class="flex flex-nowrap justify-center gap-4 overflow-x-hidden mb-8">
        <Box
          :title="$t('table.active') + ' Trainers'"
          :activeCount="0"
          :totalCount="0"
          :givenPercentage="0"
          :icon="recordIcon"
        />
        <Box
          :title="'Trainers ' + $t('dashboardPage.usageQuality')"
          :activeCount="0"
          :totalCount="5"
          :label="
            $t('dashboardPage.schoolLabel') + ': ' + $t('dashboardPage.low')
          "
          :icon="starIcon"
          special
        />
        <Box
          :title="$t('table.active') + ' ' + $t('player.players')"
          :activeCount="1"
          :totalCount="2"
          :icon="recordIcon"
        />
        <Box
          :title="$t('player.players') + ' ' + $t('dashboardPage.engagement')"
          :activeCount="1"
          :totalCount="5"
          :label="$t('dashboardPage.videosWatched') + ' 0%'"
          :icon="cogwheelIcon"
          special
        />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <TrainerUsageCard />
        <PlayerStatsCard />
      </div>
    </div>
  </div>
</template>
