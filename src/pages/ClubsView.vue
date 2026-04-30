<template>
  <div class="bg-gray-100 w-full min-h-screen flexbox">
    <div class="mt-21 px-4 mb-8">
      <HeaderSection filterBar searchBar importButton addButton>Clubs</HeaderSection>

      <TableTab />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderSection from '@/base/HeaderSection.vue'
import ActiveTab from '@/base/ActiveTab.vue'
import ArchivedTab from '@/base/ArchivedTab.vue'
import TableTab from '@/base/TableTab.vue'

const currentTab = ref('Active')

const tabs = {
  ActiveTab,
  ArchivedTab,
}

const tabNames = ['Active', 'Archived']
</script>
