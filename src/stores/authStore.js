import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(localStorage.getItem('isLoggedIn') === 'true')

  const staticAccountEmail = 'abc'
  const staticAccountPassword = 'abc'

  const login = (email, password) => {
    if (email === staticAccountEmail && password === staticAccountPassword) {
      isAuthenticated.value = true
      localStorage.setItem('isLoggedIn', 'true')
      return true
    } else {
      isAuthenticated.value = false
      return false
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    localStorage.removeItem('isLoggedIn')
  }

  return { isAuthenticated, login, logout }
})
