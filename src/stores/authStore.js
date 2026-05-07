import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(localStorage.getItem('isLoggedIn') === 'true')

  const login = () => {
    isAuthenticated.value = true
    localStorage.setItem('isLoggedIn', 'true')
  }

  const logout = () => {
    isAuthenticated.value = false
    localStorage.removeItem('isLoggedIn')
  }

  return { isAuthenticated, login, logout }
})
