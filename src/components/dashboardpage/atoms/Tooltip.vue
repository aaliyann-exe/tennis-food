<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="relative group flex items-center">
    <slot />

    <div
      class="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-5 left-1/2 -translate-x-1/2 w-48 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 z-50"
    >
      <p class="text-xs font-bold">
        {{ text }}
      </p>

      <div
        class="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-secondary"
      ></div>
    </div>
  </div>
</template>
