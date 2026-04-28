<template>
  <div>This is the Active Tab</div>
  <h1 v-if="mainStore.isLoading" class="text-gray-200">Loading...</h1>
  <h1 v-else>Active Clubs: {{ mainStore.activeClubs.length }}</h1>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMainStore } from '@/stores/dataStore'

const mainStore = useMainStore()

onMounted(() => {
  mainStore.fetchData()
})
</script>
