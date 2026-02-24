<script setup>
import { useHashtagStore } from "/src/components/stores/hashtagStore";

import Tooltip from "../atoms/Tooltip.vue";

import hashtagIcon from "/src/assets/hashtagIcon.svg";
import calendarIcon from "/src/assets/calendarIcon.svg";
import arrowDownIcon from "/src/assets/arrowDownIcon.svg";

const props = defineProps({
  tooltip: {
    type: String,
    default: "",
  },
});

const hashtagStore = useHashtagStore();
</script>

<template>
  <div
    class="bg-white rounded-3xl p-6 border border-gray-200 h-full flex flex-col"
  >
    <div class="flex justify-between items-start mb-6">
      <img
        :src="hashtagIcon"
        alt="Hashtag Icon"
        class="h-12 w-12 object-contain"
      />
      <div class="flex gap-2">
        <select
          class="bg-secondary border border-gray-200 text-center justify-center rounded-full px-auto py-2 text-sm outline-none"
        >
          <option>{{ $t("player.all") }}</option>
          <option>{{ $t("dashboardPage.mostUsedHashtags") }}</option>
          <option>{{ $t("dashboardPage.leastUsedHashtags") }}</option>
        </select>
        <!-- <img :src="arrowDownIcon" class="w-3 relative right-10" /> -->

        <button
          class="border border-gray-200 hover:bg-gray-50 rounded-full p-3"
        >
          <img :src="calendarIcon" class="h-4 w-4" />
        </button>
      </div>
    </div>

    <h3
      class="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-4"
    >
      Hashtag {{ $t("dashboardPage.analysis") }}
      <Tooltip :text="props.tooltip" />
    </h3>

    <div class="mt-4 border-t border-gray-100">
      <div
        v-for="(tag, index) in hashtagStore.hashtags"
        :key="tag.id"
        class="flex items-center justify-between py-4 border-b border-gray-50 last:border-0"
      >
        <div class="flex items-center gap-4">
          <span class="text-gray-400 font-medium w-4">{{ index + 1 }}</span>
          <span class="text-gray-800 font-medium">#{{ tag.title }}</span>
          <span class="text-gray-300">—</span>
        </div>
        <div class="text-gray-600 text-sm">0 Videos</div>
      </div>
    </div>
  </div>
</template>
