<template>
  <div class="flex">
    <div class="bg-white shadow-lg border-gray-200 border rounded-xl w-75 h-80 p-6">
      <div class="justify-between items-center flex mb-4">
        <div class="items-center flex">
          <div :class="[color, 'w-3 h-3 rounded-full']"></div>
          <div>
            <h1 class="ml-2 text-sm font-bold">{{ label }}</h1>
            <h1 class="ml-2 text-xs font-semibold">{{ $t('player.players') }} ({{ count }})</h1>
          </div>
        </div>
        <i @click="$emit('click')" class="pi pi-times text-xs opacity-40 cursor-pointer"></i>
      </div>
      <div class="flex items-center justify-between relative">
        <input
          type="text"
          :placeholder="`${$t('tab.search')}...`"
          class="border border-gray-200 focus:border-gray-400 focus:border focus:outline-none rounded-lg p-2 w-full transition-colors duration-300 z-10"
        />
        <i class="pi pi-search text-sm opacity-50 flex absolute right-4"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['click'])
defineProps({
  color: String,
  label: String,
  count: Number,
})
</script>
