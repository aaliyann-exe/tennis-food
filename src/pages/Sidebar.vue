<template>
  <div class="flex relative h-full w-max pl-6 pr-9 py-1 justify-center bg-white scrollbar-hide">
    <nav class="min-w-60">
      <router-link
        to="/dashboard"
        class="flex items-center text-center justify-start my-8 cursor-pointer"
      >
        <img :src="tennisLogo" class="mr-4" />

        <h1 class="font-extrabold text-2xl text-orange-500">TennisFood</h1>
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

            <div class="text-sm flex items-center font-medium">
              <i
                :class="[
                  item.icon,
                  $route.path === item.path ? 'text-orange-500' : 'text-gray-400',
                  'ml-1 mr-3',
                ]"
              ></i>

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
import tennisLogo from '@/assets/tennisLogo.svg'
import bracketIcon from '@/assets/bracketIcon.svg'

const { t } = useI18n()

const sidebarPages = [
  {
    path: '/dashboard',
    icon: 'pi pi-chart-pie',
    label: 'Dashboard',
  },
  {
    path: '/clubs',
    icon: 'pi pi-shield',
    label: 'Clubs',
  },
  {
    path: '/trainers',
    icon: 'pi pi-users',
    label: 'Trainers',
  },
  {
    path: '/players',
    icon: 'pi pi-user',
    label: t('player.players'),
  },
  {
    path: '/hashtags',
    icon: 'pi pi-hashtag',
    label: 'Hashtags',
  },
  {
    path: '/courts',
    icon: 'pi pi-warehouse',
    label: t('court.courts'),
  },
  {
    path: '/trainings',
    icon: 'pi pi-stopwatch',
    label: t('dashboard.trainings'),
  },
]
</script>
