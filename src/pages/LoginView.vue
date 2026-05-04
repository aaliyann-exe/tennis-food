<template>
  <div class="flex h-screen w-full">
    <div class="hidden lg:block lg:w-1/2">
      <img :src="tennisInstructor" class="h-full w-full object-cover" />
    </div>

    <div class="relative flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
      <div class="flex flex-col items-center space-y-8 w-120">
        <div class="pb-8">
          <img :src="tennisLogo" class="h-18 w-18" />
        </div>

        <div class="text-center space-y-2 pt-5">
          <h1 class="text-3xl font-semibold">{{ $t('login.login') }}</h1>
          <p class="text-xs font-medium text-gray-500">{{ $t('login.title') }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="w-full space-y-5">
          <div class="flex flex-col">
            <InputSimple
              v-model="form.email"
              :label="$t('login.emailLabel')"
              :placeholder="$t('login.email')"
              :error="error"
              @input="validateEmail"
              @blur="validateEmail"
              type="email"
              icon="envelope"
            />
          </div>

          <div class="flex flex-col">
            <InputSimple
              v-model="form.password"
              :label="$t('login.password')"
              :placeholder="$t('login.password')"
              :error="error"
              @input="validatePassword"
              @blur="validatePassword"
              type="password"
              icon="lock"
              password
            />
          </div>

          <p v-if="error" class="text-sm text-red-500">{{ errorMessage }}</p>

          <Button @click="handleLogin" bgColor="orange" textColor="white" class="w-full">
            {{ $t('login.signin') }}
          </Button>
        </form>

        <div>
          <ForgotButton href="/forgot-password" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import InputSimple from '@/base/InputSimple.vue'
import Button from '@/base/Button.vue'
import ForgotButton from '@/base/ForgotButton.vue'
import { useAuthStore } from '@/stores/authStore'

import tennisInstructor from '@/assets/tennisInstructor.png'
import tennisLogo from '@/assets/tennisLogo.svg'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  email: '',
  password: '',
})

const error = ref(false)
const errorMessage = ref('')

const emailDetails = {
  service_id: 'service_6663',
  template_id: 'template_1sfi9tm',
  user_id: 'pA5LYBmru7_WuBy5U',
  template_params: {
    to_email: form.email,
    message: 'You have logged in successfully!',
  },
}

const validateEmail = () => {
  if (!form.email && !form.password) {
    errorMessage.value = 'Email and password are required'
    error.value = true
    return
  } else {
    !form.email
      ? (errorMessage.value = 'Email is required')
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ? (errorMessage.value = 'Please enter a valid email address')
        : (errorMessage.value = '')
    error.value = !!errorMessage.value
  }
}

const validatePassword = () => {
  if (!form.email && !form.password) {
    errorMessage.value = 'Email and password are required'
    error.value = true
    return
  } else {
    errorMessage.value = !form.password ? 'Password is required' : ''
    error.value = !!errorMessage.value
  }
}

const handleLogin = () => {
  error.value = false
  errorMessage.value = ''

  if (!form.email && !form.password) {
    errorMessage.value = 'Email and password are required'
    error.value = true
    return
  }

  validateEmail()
  validatePassword()

  const success = auth.login(form.email, form.password)

  if (success) {
    const sendEmailAlert = async () => {
      try {
        // await axios.post('http://localhost:3000/send-email')
        await axios.post('http://localhost:5000/send-email')

        console.log('The server handled it!')
      } catch (error) {
        console.error('The server missed the call', error)
      }
    }

    sendEmailAlert()

    router.push('/dashboard')
    return
  }

  errorMessage.value = 'Invalid email or password'
  error.value = true
}
</script>
