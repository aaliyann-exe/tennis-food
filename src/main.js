import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import router from './router'
import i18n from './i18n.js'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'

import {
  HiChartPie,
  HiHashtag,
  GiRosaShield,
  GiTennisRacket,
  GiTennisCourt,
  BiPerson,
  BiStopwatch,
} from 'oh-vue-icons/icons'

addIcons(HiChartPie, HiHashtag, GiRosaShield, GiTennisRacket, GiTennisCourt, BiPerson, BiStopwatch)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: 'none',
    },
  },
})
app.component('v-icon', OhVueIcon)

app.mount('#app')
