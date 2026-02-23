<script setup>
import TennisFoodLogo from "../atoms/TennisFoodLogo.vue";
import NotFound from "../organisms/NotFound.vue";
</script>

<template>
  <div
    class="bg-other relative flex flex-col items-center justify-center min-h-screen text-center p-6 pt-38"
  >
    <div class="absolute top-10">
      <TennisFoodLogo />
    </div>

    <NotFound />
  </div>
</template>
