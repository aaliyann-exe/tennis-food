<script setup>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

import arrowDownIcon from "/src/assets/arrowDownIcon.svg";
import checkIcon from "/src/assets/checkIcon.svg";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  emit("update:modelValue", option);
  isOpen.value = false;
};

onClickOutside(dropdownRef, () => {
  isOpen.value = false;
});
</script>

<template>
  <div class="relative min-w-35" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      class="flex flex-col items-start w-full px-4 py-2 bg-secondary border border-gray-100 cursor-pointer rounded-xl"
    >
      <div class="flex items-center justify-between w-full">
        <span class="text-[10px] text-slate-700 opacity-30">{{ label }}</span>
        <img
          :src="arrowDownIcon"
          class="relative w-3 h-3 top-3 right-2 opacity-60"
        />
      </div>
      <span class="text-base font-medium text-primary">{{ modelValue }}</span>
    </button>

    <div
      v-if="isOpen"
      class="absolute left-0 z-50 w-full mt-2 bg-white border border-gray-100 shadow-lg top-full rounded-xl"
    >
      <ul class="py-2 overflow-y-auto max-h-48">
        <li
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
          class="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-blue-50/50"
        >
          <span class="text-sm font-medium text-gray-800">{{ option }}</span>

          <img v-if="modelValue === option" class="w-4 h-4" :src="checkIcon" />
        </li>
      </ul>
    </div>
  </div>
</template>
