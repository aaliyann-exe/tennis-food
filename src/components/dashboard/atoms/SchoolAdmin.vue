<script setup>
import schoolAdminIcon from "/src/assets/schoolAdminIcon.jpg";
import rightArrowIcon from "/src/assets/rightArrowIcon.svg";
import { router } from "../../../router";
</script>

<template>
  <router-link to="/profile">
    <div
      class="flex items-center justify-between mt-5 py-3 px-4 ml-8 w-62 rounded-lg hover:bg-primary-outline cursor-pointer"
    >
      <div class="flex items-center">
        <img
          :src="schoolAdminIcon"
          alt="School Admin Icon"
          class="w-10 h-10 rounded-full mr-3"
        />

        <div class="flex flex-col justify-center">
          <span class="text-sm font-medium text-gray-900 leading-tight"
            >Royal</span
          >
          <span class="text-primary text-xs"
            >School {{ $t("dashboard.admin") }}</span
          >
        </div>
      </div>

      <img :src="rightArrowIcon" alt="Right Arrow" class="w-3 h-3" />
    </div>
  </router-link>
</template>
