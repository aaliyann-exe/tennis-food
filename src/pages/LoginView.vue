<template>
  <div class="flex h-screen w-full font-sans">
    <Teleport to="body" v-if="modalOpen">
      <PopupModal icon="pi-check-circle" @close="modalOpen = false">
        <template #title>Successful</template>
        <template #body>An email has been sent to your email</template>
      </PopupModal>
    </Teleport>
    <div class="hidden lg:block lg:w-1/2">
      <img :src="tennisInstructor" class="h-full w-full object-cover" />
    </div>

    <div class="relative flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
      <div class="flex flex-col items-center space-y-8 w-120">
        <div class="pb-8">
          <img :src="tennisLogo" class="h-18 w-18" />
        </div>

        <div class="text-center space-y-2 pt-5">
          <h1 class="text-3xl font-semibold text-gray-800">
            {{ signup ? $t('login.signup') : $t('login.login') }}
          </h1>
          <p class="text-xs font-medium text-gray-500">{{ $t('login.title') }}</p>
        </div>

        <form @submit.prevent="submitForm" class="w-full space-y-5">
          <InputSimple
            v-model="form.email"
            :label="$t('login.emailLabel')"
            :placeholder="$t('login.email')"
            :error="error"
            type="email"
            icon="envelope"
          />

          <InputSimple
            v-model="form.password"
            :label="$t('login.password')"
            :placeholder="$t('login.password')"
            :error="error"
            type="password"
            icon="lock"
            password
          />

          <p v-if="error" class="text-sm text-red-500">{{ errorMessage }}</p>

          <div class="flex items-center justify-center pt-2">
            <button
              :disabled="isLoading"
              :type="submit"
              :class="[
                isLoading
                  ? 'cursor-not-allowed disabled bg-orange-600/60'
                  : 'cursor-pointer bg-orange-500 hover:bg-orange-600',
                ' text-white font-medium text-sm py-3 px-4 w-full flex items-center justify-center rounded transition-colors duration-300',
              ]"
            >
              <i v-if="isLoading" class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>

              <div v-else>
                {{ signup ? $t('login.signup') : $t('login.signin') }}
              </div>
            </button>
          </div>
        </form>
        <button
          type="button"
          @click="signup = !signup"
          class="text-sm font-medium text-orange-500 hover:text-orange-600 hover:underline cursor-pointer transition-all duration-300"
        >
          {{ signup ? `Already have an account? Log in` : `Don't have an account? Create one` }}
        </button>

        <ForgotButton href="/forgot-password" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import InputSimple from '@/base/InputSimple.vue'
import ForgotButton from '@/base/ForgotButton.vue'
import { useAuthStore } from '@/stores/authStore'

import tennisInstructor from '@/assets/tennisInstructor.png'
import tennisLogo from '@/assets/tennisLogo.svg'
import PopupModal from '@/base/PopupModal.vue'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const error = ref(false)
const errorMessage = ref('')

const isLoading = ref(false)

const signup = ref(false)

const modalOpen = ref(false)

const handleSignup = async () => {
  error.value = false
  console.log('signed up')
  isLoading.value = true
  if (!form.email || !form.password) {
    errorMessage.value = 'Enter an email and password to sign up.'
    error.value = true
    return
  }

  try {
    const response = await axios.post('http://localhost:5000/signup', form)
    modalOpen.value = true
  } catch (err) {
    errorMessage.value = err.response?.data || 'Signup failed.'
    error.value = true
  } finally {
    isLoading.value = false
  }
}

const handleLogin = async () => {
  error.value = false
  errorMessage.value = ''
  console.log('logged in')
  isLoading.value = true

  try {
    await axios.post('http://localhost:5000/login', form)
    auth.login()
    router.push('/dashboard')
  } catch (err) {
    errorMessage.value = err.response?.data || 'Login failed.'
    error.value = true
  } finally {
    isLoading.value = false
  }
}

const submitForm = () => {
  if (signup.value) {
    handleSignup()
  } else {
    handleLogin()
  }
}
</script>
