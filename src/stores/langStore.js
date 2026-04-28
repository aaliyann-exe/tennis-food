import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLangStore = defineStore('lang', () => {
  const lang = ref('en')

  const currentLang = computed(() => lang.value)

  const changeLang = (newLang) => {
    lang.value = newLang
  }

  return {
    lang,
    currentLang,
    changeLang,
  }
})
