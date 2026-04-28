<template>
  <div>
    <a
      class="text-gray-500 hover:text-orange-500 font-normal text-sm cursor-pointer transition-color duration-300"
      @click="handleClick"
    >
      {{ $t('login.forgotPass') }}
    </a>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClick = () => {
  router.push('/forgot-password')
}
</script>
