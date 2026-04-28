import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('@/pages/LoginView.vue')
const ForgotPassword = () => import('@/pages/ForgotPasswordView.vue')
const Dashboard = () => import('@/pages/DashboardView.vue')
const Clubs = () => import('@/pages/ClubsView.vue')
const Trainers = () => import('@/pages/TrainersView.vue')
const Players = () => import('@/pages/PlayersView.vue')
const Hashtags = () => import('@/pages/HashtagsView.vue')
const Courts = () => import('@/pages/CourtsView.vue')
const Trainings = () => import('@/pages/TrainingsView.vue')

const routes = [
  {
    path: '/',
    component: Login,
  },

  {
    path: '/login',
    component: Login,
  },

  {
    path: '/forgot-password',
    component: ForgotPassword,
  },

  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true, sidebar: true },
  },

  {
    path: '/clubs',
    component: Clubs,
    meta: { requiresAuth: true, sidebar: true },
  },

  {
    path: '/trainers',
    component: Trainers,
    meta: { requiresAuth: true, sidebar: true },
  },

  {
    path: '/players',
    component: Players,
    meta: { requiresAuth: true, sidebar: true },
  },

  {
    path: '/hashtags',
    component: Hashtags,
    meta: { requiresAuth: true, sidebar: true },
  },

  {
    path: '/courts',
    component: Courts,
    meta: { requiresAuth: true, sidebar: true },
  },

  {
    path: '/trainings',
    component: Trainings,
    meta: { requiresAuth: true, sidebar: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
