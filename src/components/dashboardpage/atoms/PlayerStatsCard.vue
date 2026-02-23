<script setup>
import { computed } from "vue";
import { usePlayerStore } from "/src/components/stores/playerStore";
import { useI18n } from "vue-i18n";

import statsIcon from "/src/assets/statsIcon.svg";
import calendarIcon from "/src/assets/calendarIcon.svg";

const { t } = useI18n();

const playerStore = usePlayerStore();

const levels = [
  {
    key: "outstanding",
    label: t("dashboardPage.outstanding"),
    color: "bg-green-500",
    weight: 5,
  },
  {
    key: "high",
    label: t("dashboardPage.high"),
    color: "bg-emerald-400",
    weight: 4,
  },
  {
    key: "moderate",
    label: t("dashboardPage.moderate"),
    color: "bg-yellow-400",
    weight: 3,
  },
  {
    key: "limited",
    label: t("dashboardPage.limited"),
    color: "bg-orange-400",
    weight: 2,
  },
  {
    key: "low",
    label: t("dashboardPage.low"),
    color: "bg-red-500",
    weight: 1,
  },
];

const stats = computed(() => {
  const total = playerStore.players.length;
  if (total === 0)
    return { counts: {}, average: "0", highlyEngagedPct: 0, total: 0 };

  const counts = { outstanding: 0, high: 0, moderate: 0, limited: 0, low: 0 };
  let totalScore = 0;

  playerStore.players.forEach((p) => {
    const level = p.engagement?.toLowerCase() || "low";
    if (counts[level] !== undefined) {
      counts[level]++;
      const weight = levels.find((l) => l.key === level)?.weight || 1;
      totalScore += weight;
    }
  });

  const highlyEngagedCount = counts.outstanding + counts.high;

  return {
    counts,
    total,
    average: (totalScore / total).toFixed(0),
    highlyEngagedPct: Math.round((highlyEngagedCount / total) * 100),
  };
});

const getPercentage = (count) => {
  if (!stats.value.total) return 0;
  return Math.round((count / stats.value.total) * 100);
};
</script>

<template>
  <div class="bg-white rounded-3xl p-6 border border-gray-200 h-full">
    <div class="flex justify-between items-start mb-6">
      <img :src="statsIcon" alt="Engagement" class="h-12 w-12 object-contain" />
      <button
        class="border border-gray-200 hover:bg-gray-50 hover:cursor-pointer rounded-full p-3"
      >
        <img :src="calendarIcon" class="h-4 w-4" />
      </button>
    </div>

    <h3 class="text-2xl font-semibold text-gray-800 flex items-center gap-2">
      {{ $t("player.player") }} {{ $t("dashboardPage.engagementDistribution") }}
      <button class="cursor-pointer">
        <div class="flex items-center justify-center">
          <div
            class="flex h-4 w-4 items-center justify-center rounded-full border-2 border-gray-500 bg-none"
          >
            <span class="text-[10px] font-bold text-gray-500">i</span>
          </div>
        </div>
      </button>
    </h3>

    <div class="grid grid-cols-2 gap-4 mt-6">
      <div class="bg-orange-50 p-4 rounded-xl text-center">
        <p class="text-sm font-normal opacity-70 mb-1">
          {{ $t("dashboardPage.avgPlayerScore") }}
        </p>
        <p class="text-3xl font-bold text-gray-800">{{ stats.average }}/5</p>
      </div>
      <div class="bg-green-50 p-4 rounded-xl text-center">
        <p class="text-sm font-normal opacity-70 mb-1">
          {{ $t("dashboardPage.highlyEngagedPlayer") }} (≥4)
        </p>
        <p class="text-3xl font-bold text-green-600">
          {{ stats.highlyEngagedPct }}%
        </p>
      </div>
    </div>

    <div class="mt-8 space-y-5">
      <h4 class="text-lg font-semibold text-gray-800">
        {{ $t("dashboardPage.engagementLevelDistribution") }}
      </h4>

      <div v-for="level in levels" :key="level.key" class="space-y-1">
        <div class="flex justify-between text-sm">
          <div class="flex items-center gap-2">
            <span :class="['w-3 h-3 rounded-full', level.color]"></span>
            <span class="text-gray-700 font-medium">{{ level.label }}</span>
            <button class="cursor-pointer">
              <div class="flex items-center justify-center">
                <div
                  class="flex h-3 w-3 items-center justify-center rounded-full border border-gray-600 bg-none"
                >
                  <span class="text-[8px] font-bold text-gray-600">i</span>
                </div>
              </div>
            </button>
          </div>
          <span class="text-gray-600">
            {{ stats.counts[level.key] || 0 }}
            {{ $t("player.players").toLowerCase() }} ({{
              getPercentage(stats.counts[level.key])
            }}%)
          </span>
        </div>
        <div
          class="w-full bg-gray-200 rounded-full h-8 overflow-hidden cursor-pointer"
        >
          <div
            :class="[
              'h-full transition-all duration-700 ease-out',
              level.color,
            ]"
            :style="{ width: getPercentage(stats.counts[level.key]) + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
