x
<script setup>
import TennisLogo from "/src/assets/tennisLogo.svg";
</script>

<template>
  <router-link to="/dashboard" class="block mb-10">
    <div class="flex items-center justify-center">
      <img :src="TennisLogo" alt="Tennis Logo" class="h-12 w-auto" />
      <span class="ml-3 font-bold text-[28px] text-primary">TennisFood</span>
    </div>
  </router-link>
</template>
