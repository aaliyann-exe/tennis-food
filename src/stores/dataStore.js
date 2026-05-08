import { defineStore } from 'pinia'
import { ref } from 'vue'
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
      const rawData = entitiesAPIData.data[0]

      clubs.value = rawData.clubs
      trainers.value = rawData.trainers
      players.value = rawData.players
      courts.value = rawData.courts
      trainings.value = rawData.trainings
      hashtags.value = hashtagAPIData.data
    } catch (error) {
      console.error('Error fetching data: ', error)
    } finally {
      isLoading.value = false
    }
  }

  const collections = {
    clubs,
    trainers,
    players,
    courts,
    trainings,
  }

  function totalEntities(entityName) {
    return collections[entityName].value.length
  }

  function activeEntities(entityName) {
    return collections[entityName].value.filter((e) => e.status).length
  }

  function inactiveEntities(entityName) {
    return collections[entityName].value.filter((e) => !e.status).length
  }

  function toggleEntity(entity) {
    entity.status = !entity.status
  }

  function saveEntity(entityName, entityData) {
    const list = collections[entityName]?.value

    if (!list) return

    if (entityData.id) {
      const index = list.findIndex((e) => e.id === entityData.id)
      if (index !== -1) {
        list[index] = { ...list[index], ...entityData }
      }
    } else {
      const newEntity = {
        ...entityData,
        id: Date.now(),
        status: true,
      }
      list.push(newEntity)
    }
  }

  return {
    clubs,
    trainers,
    players,
    hashtags,
    courts,
    trainings,
    isLoading,
    fetchData,
    totalEntities,
    activeEntities,
    inactiveEntities,
    toggleEntity,
    saveEntity,
  }
})
