<template>
  <div class="flex h-screen">
    <div class="hidden lg:block lg:w-1/2">
      <img :src="tennisInstructor" class="h-full w-full object-cover" />
    </div>

    <div class="relative flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
      <div class="flex flex-col items-center space-y-8 w-120">
        <div class="pb-8">
          <img :src="tennisLogo" class="h-18 w-18" />
        </div>

        <div class="text-center space-y-2 pt-5">
          <h1 class="text-3xl font-semibold">{{ $t('login.resetPasswordTitle') }}</h1>
          <p class="text-xs font-medium">{{ $t('login.resetPasswordLabel') }}</p>
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

          <p class="text-sm text-red-500">{{ errorMessage }}</p>

          <div class="flex gap-5">
            <Button @click="handleBack" bgColor="white" textColor="orange" class="w-full">
              {{ $t('login.back') }}
            </Button>
            <Button @click="handleEmail" bgColor="orange" textColor="white" class="w-full">
              {{ $t('login.send') }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const router = useRouter()
const { t } = useI18n()

import InputSimple from '@/base/InputSimple.vue'
import Button from '@/base/Button.vue'
import ForgotButton from '@/base/ForgotButton.vue'
import InputDropdown from '@/base/InputDropdown.vue'

import tennisInstructor from '@/assets/tennisInstructor.png'
import tennisLogo from '@/assets/tennisLogo.svg'

const form = reactive({
  email: '',
})

const error = ref(false)
const errorMessage = ref('')

const validateEmail = () => {
  !form.email
    ? (errorMessage.value = 'Email is required')
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? (errorMessage.value = 'Invalid email')
      : (errorMessage.value = '')
  error.value = !!errorMessage.value
}

const handleBack = () => {
  router.push('/login')
}

const handleEmail = () => {
  error.value = false
  errorMessage.value = ''

  validateEmail()

  if (!errorMessage.value) {
    console.log('Form submitted:', form.email)
    error.value = false
  }
}
</script>
