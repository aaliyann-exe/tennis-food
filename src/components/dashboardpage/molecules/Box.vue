<script setup>
import { computed } from "vue";
import { usePlayerStore } from "/src/components/stores/playerStore";
import { useTrainerStore } from "/src/components/stores/trainerStore.js";

import Tooltip from "../atoms/Tooltip.vue";

const props = defineProps({
  special: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  secondLabel: {
    type: String,
    default: "Trainers",
  },
  tooltip: {
    type: String,
    default: "",
  },
  isTrainer: {
    type: Boolean,
    default: false,
  },
});

const playerStore = usePlayerStore();
const trainerStore = useTrainerStore();

const activeCount = computed(() =>
  props.isTrainer ? trainerStore.activeTrainers : playerStore.activePlayers,
);

const inactiveCount = computed(() =>
  props.isTrainer ? trainerStore.inactiveTrainers : playerStore.inactivePlayers,
);

const totalCount = computed(() =>
  props.isTrainer ? trainerStore.totalTrainers : playerStore.totalPlayers,
);

const activePercentage = computed(() => {
  if (totalCount.value === 0) return 0;
  return ((activeCount.value / totalCount.value) * 100).toFixed(0);
});
</script>

<template>
  <div
    class="w-full max-w-[18rem] h-60 bg-white p-6 rounded-3xl border border-gray-200 flex flex-col"
  >
    <div class="mb-4">
      <img :src="icon" class="h-12 w-12 object-contain" />
    </div>

    <div class="flex items-center gap-2">
      <h3 class="text-base font-medium text-gray-900 leading-tight">
        {{ props.title }}
      </h3>

      <Tooltip :text="props.tooltip" />
    </div>

    <div class="flex items-baseline gap-2">
      <span class="text-3xl font-semibold text-black">
        {{ activeCount }}<span v-if="special">/{{ totalCount }}</span>
      </span>
      <span v-if="!special" class="text-xs font-bold text-gray-900">
        ({{ activePercentage }}%)
      </span>
    </div>

    <div v-if="!special" class="text-gray-500 text-sm">
      {{ $t("table.inactive") }}: {{ inactiveCount }}. {{ $t("table.total") }}:
      {{ totalCount }}
    </div>

    <div v-else class="text-gray-500 text-sm">
      {{ label }}
      <br />
      0
      <span class="font-bold">(0%)</span> {{ props.secondLabel }} ≥ 4
    </div>

    <div v-if="!special" class="text-slate-800 text-sm pt-2 mt-auto">
      <span class="mr-1">—</span>0 {{ $t("dashboardPage.this") }} Week
    </div>

    <div v-else class="text-slate-800 text-sm pt-2 mt-auto">
      <span class="mr-1">—</span>0 {{ $t("dashboardPage.vsLastPeriod") }}
    </div>
  </div>
</template>
