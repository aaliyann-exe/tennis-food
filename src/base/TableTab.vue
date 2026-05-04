<template>
  <div class="flex flex-col gap-4 mt-2">
    <div class="flex gap-4">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="((currentTab = tab), currentTab === 'Active' ? isActive : !isActive)"
        :class="
          currentTab === tab
            ? 'text-orange-500 opacity-100 px-4 py-2 text-sm font-medium border-b-2 border-orange-500 cursor-pointer transition-all duration-300'
            : 'text-gray-800 hover:text-gray-900 opacity-60 hover:opacity-100 px-4 py-2 text-sm font-medium border-b-2 border-white hover:border-gray-300 cursor-pointer transition-all duration-300'
        "
      >
        {{ tab }}
      </button>
    </div>

    <DataTable :data="null" isActive />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMainStore } from '@/stores/dataStore.js'
import DataTable from './DataTable.vue'

const dataStore = useMainStore()

const tabs = ['Active', 'Archived']

const currentTab = ref('Active')

const isActive = ref(true)
</script>
