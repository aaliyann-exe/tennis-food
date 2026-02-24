<script setup>
import { computed } from "vue";
import { usePlayerStore } from "/src/components/stores/playerStore";
import { useI18n } from "vue-i18n";

import Tooltip from "../atoms/Tooltip.vue";

import groupIcon from "/src/assets/groupIcon.svg";
import calendarIcon from "/src/assets/calendarIcon.svg";

const props = defineProps({
  tooltip: {
    type: String,
    default: "",
  },
});

const { t } = useI18n();

const playerStore = usePlayerStore();

const categories = computed(() => [
  { label: t("player.a50"), key: "a50", color: "bg-orange-500" },
  { label: t("player.a30"), key: "a30", color: "bg-orange-500" },
  { label: t("player.a18"), key: "a18", color: "bg-[#E67E43]" },
  { label: t("player.a12"), key: "a12", color: "bg-orange-500" },
  { label: t("player.u12"), key: "u12", color: "bg-[#F5C289]" },
]);

const stats = computed(() => {
  const total = playerStore.players.length;
  const counts = { a50: 0, a30: 0, a18: 0, a12: 0, u12: 0 };

  playerStore.players.forEach((p) => {
    if (!p.ageGroup) return;

    if (p.ageGroup === t("player.a50")) counts.a50++;
    else if (p.ageGroup === t("player.a30")) counts.a30++;
    else if (p.ageGroup === t("player.a18")) counts.a18++;
    else if (p.ageGroup === t("player.a12")) counts.a12++;
    else if (p.ageGroup === t("player.u12")) counts.u12++;
  });

  return { counts, total };
});

const getPercentage = (count) => {
  if (!stats.value.total) return 0;
  return Math.round((count / stats.value.total) * 100);
};
</script>

<template>
  <div
    class="bg-white rounded-3xl p-6 border border-gray-200 h-full flex flex-col"
  >
    <div class="flex justify-between items-start mb-8">
      <img :src="groupIcon" alt="Group Icon" class="h-12 w-12 object-contain" />
      <button
        class="border border-gray-200 hover:bg-gray-50 hover:cursor-pointer rounded-full p-3"
      >
        <img :src="calendarIcon" class="h-4 w-4" />
      </button>
    </div>

    <h3
      class="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-12"
    >
      {{ $t("dashboardPage.usersByAgeCategory") }}
      <Tooltip :text="props.tooltip" />
    </h3>

    <div class="space-y-6 flex-1 flex flex-col justify-center">
      <div
        v-for="cat in categories"
        :key="cat.key"
        class="flex items-center gap-4"
      >
        <span class="text-sm font-medium w-16">{{ cat.label }}</span>

        <div
          class="flex-1 bg-gray-100 rounded-lg h-10 overflow-hidden cursor-pointer"
        >
          <div
            :class="['h-full transition-all duration-700', cat.color]"
            :style="{ width: getPercentage(stats.counts[cat.key]) + '%' }"
          ></div>
        </div>

        <span class="text-sm text-gray-500 w-32">
          {{ stats.counts[cat.key] }}
          {{ $t("player.players").toLowerCase() }} ({{
            getPercentage(stats.counts[cat.key])
          }}%)
        </span>
      </div>
    </div>
  </div>
</template>
