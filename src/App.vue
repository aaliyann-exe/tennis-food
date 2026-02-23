<script setup>
import LanguageToggle from "./components/languagetoggle/LanguageToggle.vue";
import Dashboard from "./components/dashboard/templates/Dashboard.vue";
</script>

<template>
  <div class="flex">
    <Dashboard />
    <LanguageToggle />

    <router-view />
  </div>
</template>
