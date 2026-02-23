<script setup>
import { useRouter } from "vue-router";
import Buttons from "../atoms/Buttons.vue";

const router = useRouter();

const handleHome = () => {
  router.push("/dashboard");
};

const handleBack = () => {
  router.back();
};
</script>

<template>
  <div class="bg-secondary rounded-2xl w-full max-w-lg p-12">
    <h1 class="text-primary font-bold text-8xl mb-2">404</h1>

    <h2 class="text-[#1A202C] font-semibold text-3xl mb-4">
      {{ $t("notFound.title") }}
    </h2>

    <p class="text-gray-500 text-bg mb-10 max-w-sm mx-auto">
      {{ $t("notFound.label") }}
    </p>

    <div class="flex justify-center gap-4">
      <Buttons orange @home="handleHome" />
      <Buttons white @back="handleBack" />
    </div>
  </div>
</template>
