<script setup>
import { useLoginStore } from "/src/components/stores/loginStore.js";
import { computed } from "vue";
import { useRoute } from "vue-router";

import LanguageToggle from "./components/languagetoggle/LanguageToggle.vue";
import Dashboard from "./components/dashboard/templates/Dashboard.vue";

const loginStore = useLoginStore();
const route = useRoute();

const loggedIn = computed(() => loginStore.isLoggedIn);

const isNotFound = computed(() => route.name === "NotFound");
</script>

<template>
  <div class="min-h-screen w-full flex">
    <Dashboard v-if="loggedIn && !isNotFound" />

    <LanguageToggle v-if="!isNotFound" class="absolute top-4 right-4 z-50" />

    <router-view class="flex-1" />
  </div>
</template>
