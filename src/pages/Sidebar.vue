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
              $route.path === item.path
                ? 'text-orange-500 translate-x-2'
                : 'text-gray-600 translate-x-0',
              'hover:bg-orange-500/5 rounded-lg transition-all duration-300 flex px-3 py-2.5 hover:text-orange-500 items-center cursor-pointer relative',
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
              <v-icon
                :name="item.icon"
                :fill="$route.path === item.path ? 'orange' : 'gray'"
                scale="1.2"
              />

              {{ item.label }}
            </div>
          </router-link>
        </li>

        <hr class="my-6 opacity-10" />

        <li>
          <router-link
            to="/profile"
            :class="[
              $route.path === '/profile' ? 'translate-x-2' : 'translate-x-0',
              'flex gap-5 items-center justify-center hover:bg-orange-500/5 py-4 transition-all duration-300 rounded-xl',
            ]"
          >
            <img
              :src="schoolAdminIcon"
              class="rounded-full flex items-center justify-center w-10 h-10"
            />
            <div>
              <h1 class="font-medium text-sm">Royal</h1>
              <h1 class="font-medium text-xs text-orange-500">School {{ $t('table.admin') }}</h1>
            </div>
            <i class="pi pi-arrow-right ml-12" style="font-size: x-small"></i>
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
import schoolAdminIcon from '@/assets/schoolAdminIcon.jpg'

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
