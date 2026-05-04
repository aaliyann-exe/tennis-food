<template>
  <div class="flex">
    <Sidebar v-if="$route.meta.sidebar" />
    <LanguageToggle />
    <router-view />
  </div>
</template>

<script setup>
import Sidebar from '@/pages/Sidebar.vue'

import LanguageToggle from '@/base/LanguageToggle.vue'
</script>
