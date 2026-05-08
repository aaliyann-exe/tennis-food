<template>
  <div class="bg-gray-100 w-full min-h-screen flex flex-col">
    <EntityFormModal
      :isOpen="isModalOpen"
      :mode="modalMode"
      :title="$t('court.court')"
      :fields="courtFormFields"
      :initialData="selectedCourt"
      @close="closeModal"
      @save="saveCourt"
    />

    <div class="mt-20 px-8 mb-8 max-w-350 w-full mx-auto flex-1 flex flex-col gap-6">
      <HeaderSection searchBar importButton addButton @addClick="openModal('add')">
        {{ $t('dashboard.courts') }}
      </HeaderSection>

      <div class="flex-1 h-full min-h-125">
        <DataTable
          :data="dataStore.courts"
          :columns="tableColumns"
          :isLoading="dataStore.isLoading"
          @view="(court) => openModal('view', court)"
          @edit="(court) => openModal('edit', court)"
          @toggle="(court) => dataStore.toggleEntity(court)"
          @add="openModal('add')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useMainStore } from '@/stores/dataStore'
import { useOptionStore } from '@/stores/optionStore'
import { useI18n } from 'vue-i18n'

import HeaderSection from '@/base/HeaderSection.vue'
import DataTable from '@/base/DataTable.vue'
import EntityFormModal from '@/base/EntityFormModal.vue'

const dataStore = useMainStore()
const optionStore = useOptionStore()
const { t: $t } = useI18n()

onMounted(() => {
  dataStore.fetchData()
})

const isModalOpen = ref(false)
const modalMode = ref('add')
const selectedCourt = ref({})

const openModal = (mode, data = {}) => {
  modalMode.value = mode
  selectedCourt.value = { ...data }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedCourt.value = {}
}

const saveCourt = (formData) => {
  dataStore.saveEntity('courts', formData)
  closeModal()
}

const tableColumns = [
  {
    header: 'Court Name',
    field: 'name',
    subfield: 'email',
  },
  {
    header: $t('court.environment'),
    field: 'phone',
  },
]

const courtFormFields = [
  {
    key: 'name',
    label: 'Name',
    type: 'text',
    icon: 'user',
    placeholder: 'First Name',
    required: true,
  },
  {
    key: 'type',
    label: 'Type',
    type: 'select',
    icon: 'user',
    placeholder: 'Court Type',
    options: optionStore.type,
    required: true,
  },
  {
    key: 'environment',
    label: 'Environment',
    type: 'select',
    icon: 'building',
    placeholder: 'Court Environment',
    options: optionStore.environment,
    required: true,
  },
  {
    key: 'school',
    label: 'School',
    type: 'select',
    icon: 'building',
    placeholder: 'Select School',
    options: optionStore.school,
    required: true,
  },
  {
    key: 'club',
    label: 'Club',
    type: 'select',
    icon: 'building',
    placeholder: 'Select Club',
    options: optionStore.club,
    required: true,
  },
]
</script>
