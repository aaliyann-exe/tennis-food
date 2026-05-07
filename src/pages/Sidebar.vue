<template>
  <div class="flex relative h-full w-max pl-6 pr-9 py-1 justify-center bg-white scrollbar-hide">
    <nav class="min-w-60">
      <router-link to="/dashboard" class="cursor-pointer">
        <TennisFoodLogo />
      </router-link>

      <ul>
        <li v-for="item in sidebarPages" :key="item.path">
          <router-link
            :to="item.path"
            :class="[
              $route.path === item.path ? 'text-orange-500' : 'text-gray-600',
              'hover:bg-orange-500/5 rounded-lg transition-colors duration-300 flex p-3 hover:text-orange-500 items-center cursor-pointer relative',
            ]"
          >
            <img
              :src="bracketIcon"
              :class="[
                $route.path === item.path ? 'h-13' : 'h-0',
                'absolute -left-1 transition-all duration-300',
              ]"
            />

            <div class="text-sm flex items-center gap-4 font-medium">
              <v-icon :name="item.icon" :fill="$route.path === item.path ? 'orange' : 'gray'" />

              {{ item.label }}
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import TennisFoodLogo from '@/base/TennisFoodLogo.vue'
import bracketIcon from '@/assets/bracketIcon.svg'

const { t } = useI18n()

const sidebarPages = [
  {
    path: '/dashboard',
    icon: 'hi-chart-pie',
    label: 'Dashboard',
  },
  {
    path: '/clubs',
    icon: 'gi-rosa-shield',
    label: 'Clubs',
  },
  {
    path: '/trainers',
    icon: 'gi-tennis-racket',
    label: 'Trainers',
  },
  {
    path: '/players',
    icon: 'bi-person',
    label: t('player.players'),
  },
  {
    path: '/hashtags',
    icon: 'hi-hashtag',
    label: 'Hashtags',
  },
  {
    path: '/courts',
    icon: 'gi-tennis-court',
    label: t('court.courts'),
  },
  {
    path: '/trainings',
    icon: 'bi-stopwatch',
    label: t('dashboard.trainings'),
  },
]
</script>
