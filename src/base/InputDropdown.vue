<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">{{ label }}</label>
    <div class="relative">
      <i class="pi pi-envelope"></i>
      <input
        :placeholder="placeholder"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-red-200 focus:outline-none focus:ring-primary focus:border-primary"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'Input Label',
  },
  placeholder: {
    type: String,
    default: 'Input Placeholder',
  },
  icon: String,
})
</script>
