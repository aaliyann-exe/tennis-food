import './style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'
import i18n from './i18n.js'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
  theme: {
    preset: Aura, // Light theme by default
    options: {
      darkModeSelector: 'none', // Disables automatic dark mode
    },
  },
})

app.mount('#app')
