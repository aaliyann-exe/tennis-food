<script setup>
import tennisIcon from "/src/assets/tennisIcon.svg";
import calendarIcon from "/src/assets/calendarIcon.svg";
</script>

<template>
  <div class="bg-white rounded-3xl p-6 border border-gray-200 h-full">
    <div class="flex justify-between items-start mb-6">
      <img
        :src="tennisIcon"
        alt="Trainer Usage"
        class="h-12 w-12 object-contain"
      />
      <button
        class="border border-gray-200 hover:bg-gray-50 hover:cursor-pointer rounded-full p-3"
      >
        <img :src="calendarIcon" class="h-4 w-4" />
      </button>
    </div>

    <h3 class="text-2xl font-semibold text-gray-800 flex items-center gap-2">
      {{ $t("dashboardPage.trainerActivityHeading") }}
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

    <div class="mt-1 flex items-center gap-2">
      <span class="text-sm font-medium text-gray-500"
        >School Trainer {{ $t("dashboardPage.usageScore") }}:</span
      >
      <span class="text-sm font-semibold text-green-600"
        >{{ $t("dashboardPage.good") }} (0)</span
      >
    </div>
    <p class="text-xs text-gray-400 mt-1">
      {{ $t("dashboardPage.overallCoverage") }} : 0.0%
    </p>
  </div>
</template>
