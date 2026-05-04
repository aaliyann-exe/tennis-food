<template>
  <div class="bg-gray-100 w-full min-h-screen flexbox">
    <div class="mt-21 px-4 mb-8">
      <HeaderSection searchBar importButton addButton>Clubs</HeaderSection>

      <TableTab />
    </div>
  </div>
</template>

<script setup>
import HeaderSection from '@/base/HeaderSection.vue'
import TableTab from '@/base/TableTab.vue'
</script>
