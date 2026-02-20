<script setup>
import { computed } from "vue";

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
  activeCount: {
    type: Number,
    default: 0,
  },
  totalCount: {
    type: Number,
    default: 0,
  },
  weeklyChange: {
    type: Number,
    default: 0,
  },
  givenCount: {
    type: Number,
    default: 0,
  },
  givenPercentage: {
    type: Number,
    default: 0,
  },
});

const activePercentage = computed(
  () => (props.activeCount / props.totalCount) * 100,
);
const inactiveCount = props.totalCount - props.activeCount;
</script>

<template>
  <div
    class="w-full max-w-[18rem] h-60 bg-white p-6 rounded-[2.5rem] border border-gray-200 flex flex-col"
  >
    <div class="mb-4">
      <img :src="icon" class="h-10 w-10 object-contain" />
    </div>

    <div class="flex items-center gap-2 mb-1">
      <h3 class="text-base font-medium text-gray-900 leading-tight">
        {{ props.title }}
      </h3>

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

    <div class="flex items-baseline gap-2 mb-1">
      <span class="text-4xl font-semibold text-black">
        {{ props.activeCount }}<span v-if="special">/{{ totalCount }}</span>
      </span>
      <span v-if="!special" class="text-xs font-bold text-gray-900">
        ({{ props.givenPercentage || activePercentage }}%)
      </span>
    </div>

    <div v-if="!special" class="text-gray-400 text-xs mb-2">
      {{ $t("table.inactive") }}: {{ inactiveCount }}. {{ $t("table.total") }}:
      {{ props.totalCount }}
    </div>

    <div v-else class="text-gray-400 text-xs mb-2">
      {{ label }}
      <br />
      {{ props.givenCount }}
      <span class="font-bold">({{ props.givenCount }}%)</span> Trainers ≥ 4
    </div>

    <div v-if="!special" class="text-slate-600 text-xs pt-2 mt-auto">
      <span class="mr-1">—</span> {{ props.weeklyChange }}
      {{ $t("dashboardPage.this") }} Week
    </div>

    <div v-else class="text-slate-600 text-xs pt-2 mt-auto">
      <span class="mr-1">—</span> {{ props.weeklyChange }}
      {{ $t("dashboardPage.vsLastPeriod") }}
    </div>
  </div>
</template>
