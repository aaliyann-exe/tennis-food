<script setup>
import { useHashtagStore } from "/src/components/stores/hashtagStore";
import hashtagIcon from "/src/assets/hashtagIcon.svg";
import calendarIcon from "/src/assets/calendarIcon.svg";

const hashtagStore = useHashtagStore();
</script>

<template>
  <div
    class="bg-white rounded-3xl p-6 border border-gray-200 h-full flex flex-col"
  >
    <div class="flex justify-between items-start mb-6">
      <div
        class="bg-orange-50 p-3 rounded-2xl text-orange-600 font-bold text-xl"
      >
        #
      </div>
      <div class="flex gap-2">
        <select
          class="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm outline-none"
        >
          <option>{{ $t("player.all") }}</option>
          <option>{{ $t("dashboardPage.mostUsedHashtags") }}</option>
          <option>{{ $t("dashboardPage.leastUsedHashtags") }}</option>
        </select>
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
