<template>
  <div class="flex absolute top-0 right-0 py-3 items-center z-50">
    <h1
      :class="[
        isDutch ? 'text-gray-400' : 'text-black',
        'font-semibold text-sm pr-4  transition-colors duration-300',
      ]"
    >
      ENG
    </h1>

    <button type="button" @click="toggleLanguage" class="cursor-pointer">
      <div class="rounded-full h-10 w-20 bg-gray-200 items-center flex">
        <div
          :class="[
            isDutch ? 'left-11' : 'left-1',
            'rounded-full w-8 h-8 bg-white relative items-center flex justify-center shadow-lg transition-all duration-300',
          ]"
        >
          <img :src="isDutch ? nlIcon : engIcon" class="w-6 h-6" />
        </div>
      </div>
    </button>

    <h1
      :class="[
        isDutch ? 'text-black' : 'text-gray-400',
        'font-semibold text-sm px-4 transition-colors duration-300',
      ]"
    >
      NL
    </h1>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useLangStore } from '@/stores/langStore'

import engIcon from '@/assets/engIcon.svg'
import nlIcon from '@/assets/nlIcon.svg'

const { locale } = useI18n()
const langStore = useLangStore()

const isDutch = ref(false)

const toggleLanguage = () => {
  isDutch.value = !isDutch.value
  langStore.changeLang(isDutch.value ? 'nl' : 'en')
  locale.value = langStore.currentLang
}
</script>
