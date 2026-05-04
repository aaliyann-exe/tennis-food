import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useMainStore = defineStore('main', () => {
  const clubs = ref([])
  const trainers = ref([])
  const players = ref([])
  const hashtags = ref([])
  const courts = ref([])
  const trainings = ref([])
  const isLoading = ref(false)

  async function fetchData() {
    isLoading.value = true
    try {
      const [entitiesAPIData, hashtagAPIData] = await Promise.all([
        axios.get('https://69f05a2b112e1b968e259a8e.mockapi.io/api/data'),
        axios.get('https://69f05a2b112e1b968e259a8e.mockapi.io/api/hashtags'),
      ])
      clubs.value = entitiesAPIData.data.clubs
      trainers.value = entitiesAPIData.data.trainers
      players.value = entitiesAPIData.data.players
      courts.value = entitiesAPIData.data.courts
      trainings.value = entitiesAPIData.data.trainings
      hashtags.value = hashtagAPIData.data
    } catch (error) {
      console.error('Error fetching data: ', error)
    } finally {
      isLoading.value = false
    }
  }

  // Getters
  const totalEntities = computed((entityName) => entityName.value.length)
  const activeEntities = computed((entityName) => entityName.value.filter((e) => e.status))
  const inactiveEntities = computed((entityName) => entityName.value.filter((e) => !e.status))

  // Functions
  function toggleEntity(entity) {
    entity.status = !entity.status
  }

  function addEntity(entityName, newEntity) {
    entityName.value.push(newEntity)
  }

  return {
    clubs,
    trainers,
    players,
    hashtags,
    courts,
    trainings,
    totalEntities,
    activeEntities,
    inactiveEntities,
    toggleEntity,
    addEntity,
    fetchData,
    isLoading,
  }
})
