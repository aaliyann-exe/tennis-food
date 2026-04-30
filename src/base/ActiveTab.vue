<template>
  <div
    class="bg-white flex items-center justify-center w-full h-screen rounded-3xl border border-gray-200"
  >
    <div v-if="mainStore.clubs.length" class="flex flex-col items-center gap-2">
      <h1 class="font-semibold text-2xl">
        <slot> Active Clubs </slot>
      </h1>
    </div>

    <div v-else class="flex flex-col items-center gap-2">
      <h1 class="font-semibold text-2xl">
        <slot>
          {{ $t('tab.noDataFound') }}
        </slot>
      </h1>
      <button
        class="border border-orange-500 bg-white rounded-full px-7 py-3 font-medium text-sm text-orange-500 hover:text-white hover:bg-orange-500 transition-all duration-300 cursor-pointer"
      >
        <slot>
          {{ $t('tab.addData') }}
        </slot>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMainStore } from '@/stores/dataStore'

const mainStore = useMainStore()

onMounted(() => {
  mainStore.fetchData()
})
</script>
