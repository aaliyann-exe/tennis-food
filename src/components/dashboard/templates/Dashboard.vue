<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import dashboardIcon from "/src/assets/dashboardIcon.svg";
import clubsIcon from "/src/assets/clubsIcon.svg";
import trainerIcon from "/src/assets/trainerIcon.svg";
import playerIcon from "/src/assets/playerIcon.svg";
import hashIcon from "/src/assets/hashIcon.svg";
import courtIcon from "/src/assets/courtIcon.svg";
import trainingsIcon from "/src/assets/trainingsIcon.svg";
import dashboardIconActive from "/src/assets/dashboardIconActive.svg";
import clubsIconActive from "/src/assets/clubsIconActive.svg";
import trainerIconActive from "/src/assets/trainerIconActive.svg";
import playerIconActive from "/src/assets/playerIconActive.svg";
import hashIconActive from "/src/assets/hashIconActive.svg";
import courtIconActive from "/src/assets/courtIconActive.svg";
import trainingsIconActive from "/src/assets/trainingsIconActive.svg";

import Icons from "../atoms/Icons.vue";
import SchoolAdmin from "../atoms/SchoolAdmin.vue";
import SignOut from "../atoms/SignOut.vue";
import TennisFoodLogo from "../atoms/TennisFoodLogo.vue";

// NOTE TO SELF: in <script> tags we have to manually import tools and stuff here cuz stuff like $t or $router does NOT work
// We can use stuff like $t etc in <template> cuz thats where vue automatically imports stuff and lets us use $t.
// so:
// <script> CAN ! USE $t etc
// <template> CAN USE $t etc

const { t } = useI18n();

const menuItems = computed(() => [
  {
    icon: dashboardIcon,
    activeIcon: dashboardIconActive,
    text: t("dashboard.dashboard"),
    path: "dashboard",
  },

  {
    icon: clubsIcon,
    activeIcon: clubsIconActive,
    text: t("dashboard.clubs"),
    path: "clubs",
  },

  {
    icon: trainerIcon,
    activeIcon: trainerIconActive,
    text: t("dashboard.trainers"),
    path: "trainers",
  },

  {
    icon: playerIcon,
    activeIcon: playerIconActive,
    text: t("dashboard.players"),
    path: "players",
  },

  {
    icon: hashIcon,
    activeIcon: hashIconActive,
    text: t("dashboard.hashtags"),
    path: "hashtags",
  },

  {
    icon: courtIcon,
    activeIcon: courtIconActive,
    text: t("dashboard.courts"),
    path: "courts",
  },

  {
    icon: trainingsIcon,
    activeIcon: trainingsIconActive,
    text: t("dashboard.trainings"),
    path: "trainings",
  },
]);
</script>

<template>
  <div class="bg-secondary h-full">
    <TennisFoodLogo />

    <Icons
      v-for="item in menuItems"
      :key="item.text"
      :icon="item.icon"
      :activeIcon="item.activeIcon"
      :text="item.text"
      :path="item.path"
    />

    <hr class="w-65 ml-5 mr-5 mt-3 opacity-10" />

    <SchoolAdmin />

    <SignOut />
  </div>
</template>
