<template>
  <div class="bg-gray-100 w-screen min-h-screen flexbox">
    <div class="mt-21 mx-4 mb-8">
      <HeaderSection filterBar searchBar importButton addButton
        >{{ $t('court.courts') }}
      </HeaderSection>
      <!-- <AxiosFetchTest /> -->
    </div>
  </div>
</template>

<script setup>
import HeaderSection from '@/base/HeaderSection.vue'
import AxiosFetchTest from '@/base/AxiosFetchTest.vue'
</script>
