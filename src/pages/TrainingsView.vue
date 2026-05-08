<template>
  <div class="bg-gray-100 w-full min-h-screen flex flex-col">
    <EntityFormModal
      :isOpen="isModalOpen"
      :mode="modalMode"
      :title="$t('dashboard.trainings')"
      :fields="trainingFormFields"
      :initialData="selectedTraining"
      @close="closeModal"
      @save="saveTraining"
    />

    <div class="mt-20 px-8 mb-8 max-w-350 w-full mx-auto flex-1 flex flex-col gap-6">
      <HeaderSection searchBar importButton addButton @addClick="openModal('add')">
        {{ $t('dashboard.trainings') }}
      </HeaderSection>

      <div class="flex-1 h-full min-h-125">
        <DataTable
          :data="dataStore.trainings"
          :columns="tableColumns"
          :isLoading="dataStore.isLoading"
          @view="(training) => openModal('view', training)"
          @edit="(training) => openModal('edit', training)"
          @toggle="(training) => dataStore.toggleEntity(training)"
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
const selectedTraining = ref({})

const openModal = (mode, data = {}) => {
  modalMode.value = mode
  selectedTraining.value = { ...data }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedTraining.value = {}
}

const saveTraining = (formData) => {
  dataStore.saveEntity('trainings', formData)
  closeModal()
}

const tableColumns = [
  {
    header: 'Training Name',
    field: 'name',
    subfield: 'email',
  },
  {
    header: $t('table.phone'),
    field: 'phone',
  },
]

const trainingFormFields = [
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
