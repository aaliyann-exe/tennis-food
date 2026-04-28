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

  // Axios Fetching
  async function fetchData() {
    isLoading.value = true
    try {
      const [clubsAPIData, playersAPIData] = await Promise.all([
        axios.get('https://69f05a2b112e1b968e259a8e.mockapi.io/api/clubs'),
        axios.get('https://69f05a2b112e1b968e259a8e.mockapi.io/api/players'),
      ])

      clubs.value = clubsAPIData.data
      players.value = playersAPIData.data
    } catch (error) {
      console.error('Error fetching data: ', error)
    } finally {
      isLoading.value = false
    }
  }

  // Getters
  const activeClubs = computed(() => clubs.value.filter((c) => c.status))
  const inactiveClubs = computed(() => clubs.value.filter((c) => !c.status))

  const totalPlayers = computed(() => players.value.length)
  const activePlayers = computed(() => players.value.filter((p) => p.status))
  const inactivePlayers = computed(() => players.value.filter((p) => !p.status))

  const totalTrainers = computed(() => trainers.value.length)
  const activeTrainers = computed(() => trainers.value.filter((t) => t.status))
  const inactiveTrainers = computed(() => trainers.value.filter((t) => !t.status))

  const totalTrainings = computed(() => trainings.value.length)
  const activeTrainings = computed(() => trainings.value.filter((t) => t.status))
  const inactiveTrainings = computed(() => trainings.value.filter((t) => !t.status))

  // Trainer Functions
  function addTrainer(newTrainer) {
    trainers.value.push(newTrainer)
  }

  // Player Functions
  function addPlayer(newPlayer) {
    players.value.push(newPlayer)
  }

  return {
    clubs,
    trainers,
    players,
    totalTrainers,
    activeTrainers,
    totalPlayers,
    activePlayers,
    activeClubs,
    addTrainer,
    addPlayer,
    fetchData,
    isLoading,
  }
})
