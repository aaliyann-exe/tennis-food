<script setup>
import Button from "../atoms/Button.vue";

const emits = defineEmits(["close"]);
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
  >
    <div class="h-max bg-white shadow-sm rounded-[40px] p-10">
      <div class="mb-4">
        <div
          class="flex items-center justify-center w-8 h-8 border-3 border-primary rounded-full"
        >
          <span class="text-primary text-2xl font-extrabold">!</span>
        </div>
      </div>

      <div class="flex items-center mb-4">
        <h2 class="text-2xl font-semibold text-black">
          {{ $t("login.error") }}
        </h2>
      </div>

      <div class="mb-10">
        <p class="text-bg font-normal text-primary leading-relaxed">
          {{ $t("login.errorLabel") }}
        </p>
      </div>

      <div class="flex items-center">
        <Button :text="$t('login.close')" @click="$emit('close')" orange />
      </div>
    </div>
  </div>
</template>
