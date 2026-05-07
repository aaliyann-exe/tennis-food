<template>
  <div class="w-full">
    <label v-if="label" class="block text-[13px] font-medium text-gray-800 mb-1.5">
      {{ label }} <span v-if="required" class="text-orange-500">*</span>
    </label>

    <div class="relative w-full rounded-md">
      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
      >
        <i :class="`pi pi-${icon} text-gray-400 text-sm`"></i>
      </div>

      <select
        v-model="model"
        :disabled="disabled"
        :class="[
          error ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-400',
          disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-800',
          icon ? 'pl-10' : 'pl-3.5',
          !model ? 'text-gray-300' : 'text-gray-800',
          'block w-full rounded-lg border focus:outline-none focus:ring-1 focus:ring-orange-400 py-2.5 pr-10 text-[14px] appearance-none transition-colors duration-200',
        ]"
      >
        <option value="" disabled selected>{{ placeholder }}</option>
        <option v-for="option in normalizedOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <i class="pi pi-angle-down text-gray-400"></i>
      </div>
    </div>

    <p v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  placeholder: {
    type: String,
    default: 'Select an option',
  },
  icon: String,
  options: {
    type: Array,
    default: () => [],
  },
  required: Boolean,
  disabled: Boolean,
  error: Boolean,
  errorMessage: String,
})

const model = defineModel()

// Handles both simple arrays ['Apple', 'Banana'] and object arrays [{label: 'Apple', value: 'apple'}]
const normalizedOptions = computed(() => {
  return props.options.map((opt) => {
    return typeof opt === 'object' ? opt : { label: opt, value: opt }
  })
})
</script>
