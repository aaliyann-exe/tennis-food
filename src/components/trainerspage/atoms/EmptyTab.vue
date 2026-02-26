<script setup>
const emits = defineEmits(["add-trainer"]);
</script>

<template>
  <div class="p-4 bg-other flexbox">
    <div
      class="flex flex-col bg-secondary border border-gray-200 rounded-3xl min-h-[76vh] justify-center items-center"
    >
      <h1 class="text-2xl font-semibold">
        {{ $t("tab.noTrainers") }}
      </h1>

      <div class="p-4">
        <button
          @click="$emit('add-trainer')"
          class="text-primary bg-secondary border border-primary px-6 py-3 rounded-full text-sm cursor-pointer hover:bg-primary hover:text-white"
        >
          {{ $t("tab.addTrainer") }}
        </button>
      </div>
    </div>
  </div>
</template>
