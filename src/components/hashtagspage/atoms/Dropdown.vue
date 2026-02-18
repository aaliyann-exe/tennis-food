<script setup>

import { ref } from 'vue';

const isOpen = ref(false);
const selectedOption = ref('');
const options = ['All', 'Under 12y', '13-18y', '19-30y', '31-50y', 'Over 50y'];

const selectOption = (option) => {

  selectedOption.value = option;
  isOpen.value = false;

};

</script>

<template>

  <div class="p-8 w-80">

    <label class="block mb-1 text-sm font-semibold">

      Age Group <span class="text-orange-500">*</span>

    </label>

    <div class="relative">

      <button @click="isOpen = !isOpen"
        :class="(isOpen ? 'border-orange-200 ring-4 ring-orange-50 ' : 'border-gray-200 ') + 'w-full flex items-center justify-between px-4 py-3 border rounded-xl transition-all'">

        <div class="flex items-center gap-3">

          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>

          <span class="font-medium text-orange-500">{{ selectedOption }}</span>

        </div>

        <svg :class="(isOpen ? 'rotate-180 ' : '') + 'w-5 h-5 text-gray-400 transition-transform'" fill="none"
          stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="宽9 5l7 7-7 7" />
        </svg>
      </button>

      <div v-if="isOpen"
        class="absolute z-10 w-full mt-2 overflow-hidden bg-white border border-gray-100 shadow-xl rounded-xl">
        <div class="max-height-[300px] overflow-y-auto custom-scrollbar">
          <div v-for="option in options" :key="option" @click="selectOption(option)" :class="[
            'px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition-colors',
            selectedOption === option ? 'bg-blue-50/50' : ''
          ]">
            <span :class="['text-gray-700', selectedOption === option ? 'font-medium' : '']">
              {{ option }}
            </span>

            <svg v-if="selectedOption === option" class="w-5 h-5 text-green-500" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>