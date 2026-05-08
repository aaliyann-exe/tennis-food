import { useI18n } from 'vue-i18n'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMainStore } from './dataStore'

export const useOptionStore = defineStore('option', () => {
  const mainStore = useMainStore()
  mainStore.fetchData()

  const { t: $t } = useI18n()

  const city = ref([
    'Amsterdam',
    'Kats',
    'Rotterdam',
    'Utrecht',
    'The Hague',
    'Eindhoven',
    'Groningen',
    'Maastricht',
    'Nijmegen',
    'Leiden',
  ])

  const club = ref([
    'Netherlands Tennis Club',
    'Ace Tennis Club School',
    'Ace Tennis Club 2',
    'New Club 37',
  ])

  const school = ref(['Royal Dutch Tennis', 'Pindi Swag Uni'])

  const ageGroup = ref([
    $t('player.all'),
    $t('player.u12'),
    $t('player.u18'),
    $t('player.u30'),
    $t('player.u50'),
    $t('player.a50'),
  ])

  const playerLevel = ref([
    $t('player.national'),
    $t('player.competitive'),
    $t('player.recreational'),
    $t('player.beginner'),
  ])

  const type = ref([
    $t('court.hard'),
    $t('court.clay'),
    $t('court.grass'),
    $t('court.synthetic'),
    $t('court.other'),
  ])

  const environment = ref([$t('court.indoor'), $t('court.outdoor')])

  const hashtag = ref([...mainStore.hashtags.map((h) => h.name)])

  return {
    city,
    club,
    school,
    ageGroup,
    playerLevel,
    type,
    environment,
    hashtag,
  }
})
