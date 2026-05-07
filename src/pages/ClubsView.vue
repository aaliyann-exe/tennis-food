<template>
  <div class="bg-gray-100 w-full min-h-screen flex flex-col">
    <EntityFormModal
      :isOpen="isModalOpen"
      :mode="modalMode"
      :title="modalTitle"
      :fields="clubFormFields"
      :initialData="selectedClub"
      @close="closeModal"
      @save="saveClub"
    />

    <div class="mt-20 px-8 mb-8 max-w-350 w-full mx-auto flex-1 flex flex-col gap-6">
      <HeaderSection searchBar importButton addButton @addClick="openModal('add')">
        {{ $t('dashboard.clubs') }}
      </HeaderSection>

      <div class="flex-1 h-full min-h-125">
        <DataTable
          :data="dataStore.clubs"
          :columns="tableColumns"
          :isLoading="dataStore.isLoading"
          @view="(club) => openModal('view', club)"
          @edit="(club) => openModal('edit', club)"
          @toggle="(club) => dataStore.toggleEntity(club)"
          @add="openModal('add')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useMainStore } from '@/stores/dataStore'
import { useI18n } from 'vue-i18n'

import HeaderSection from '@/base/HeaderSection.vue'
import DataTable from '@/base/DataTable.vue'
import EntityFormModal from '@/base/EntityFormModal.vue'

const dataStore = useMainStore()
const { t } = useI18n()

onMounted(() => {
  dataStore.fetchData()
})

// --- MODAL STATE ---
const isModalOpen = ref(false)
const modalMode = ref('add')
const selectedClub = ref({})

const modalTitle = computed(() => {
  if (modalMode.value === 'add') return `Add Club`
  if (modalMode.value === 'view') return `Club Information`
  return `Edit Club`
})

const openModal = (mode, data = {}) => {
  modalMode.value = mode
  selectedClub.value = { ...data }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedClub.value = {}
}

const saveClub = (formData) => {
  dataStore.saveEntity('clubs', formData)
  closeModal()
}

// --- CONFIGURATIONS ---

// The columns for the DataTable
const tableColumns = [
  {
    header: 'Club Name',
    field: 'name',
    subfield: 'email',
  },
  {
    header: 'Phone',
    field: 'phone',
  },
]

// The schema for the Form Modal
const clubFormFields = [
  {
    key: 'name',
    label: 'Club Name',
    type: 'text',
    icon: 'building',
    required: true,
    placeholder: 'Club Name',
  },
  { key: 'email', label: 'Email', type: 'email', icon: 'envelope', placeholder: 'info@youmai.com' },
  { key: 'phone', label: 'Phone', type: 'text', icon: 'phone', placeholder: 'Enter phone number' },
  { key: 'website', label: 'Website', type: 'text', icon: 'globe', placeholder: 'www.club.com' },
  {
    key: 'school',
    label: 'School',
    type: 'select',
    icon: 'building',
    placeholder: 'Select School',
    options: ['Royal Dutch Tennis', 'Ace Tennis School'],
  },
  {
    key: 'address',
    label: 'Address line',
    type: 'text',
    icon: 'map-marker',
    placeholder: 'Enter address',
    colSpan: 2,
  },

  // Notice this sub-header right here!
  { type: 'divider', label: 'Primary Contact Person', subtext: 'Optional' },

  { key: 'fName', label: 'First Name', type: 'text', icon: 'user', placeholder: 'First name' },
  { key: 'lName', label: 'Last Name', type: 'text', icon: 'user', placeholder: 'Last name' },
  {
    key: 'otherPhone',
    label: 'Phone',
    type: 'text',
    icon: 'phone',
    placeholder: 'Enter phone number',
  },
  {
    key: 'otherEmail',
    label: 'Email',
    type: 'email',
    icon: 'envelope',
    placeholder: 'info@youmail.com',
  },
]
</script>
