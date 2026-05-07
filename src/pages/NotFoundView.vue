<template>
  <div class="bg-gray-100 w-full min-h-screen flex flex-col items-center justify-between">
    <TennisFoodLogo />

    <div
      class="bg-white rounded-sm flex flex-col py-10 px-16 w-130 items-center justify-center mb-50"
    >
      <h1 class="text-orange-500 text-8xl font-bold mb-3">404</h1>
      <h1 class="font-semibold text-3xl text-black mb-3">{{ $t('notFound.title') }}</h1>
      <p class="text-gray-600 font-normal text-base text-center mb-7">{{ $t('notFound.label') }}</p>
      <div class="flex gap-4 w-75">
        <button
          class="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-medium text-base py-3 px-4 w-full flex items-center justify-center rounded transition-colors duration-300"
          @click="router.push('dashboard')"
        >
          {{ $t('notFound.home') }}
        </button>
        <button
          class="cursor-pointer border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-black font-medium text-base py-3 px-4 w-full flex items-center justify-center rounded transition-colors duration-300"
          @click="router.back()"
        >
          {{ $t('notFound.back') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'

import TennisFoodLogo from '@/base/TennisFoodLogo.vue'
</script>
