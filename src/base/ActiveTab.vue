<template>
  <div class="bg-white w-full h-full rounded-3xl border border-gray-200"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMainStore } from '@/stores/dataStore'

const mainStore = useMainStore()

onMounted(() => {
  mainStore.fetchData()
})
</script>
