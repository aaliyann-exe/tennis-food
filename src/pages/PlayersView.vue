<template>
  <div class="bg-gray-100 w-full min-h-screen flex flex-col">
    <EntityFormModal
      :isOpen="isModalOpen"
      :mode="modalMode"
      :title="$t('player.player')"
      :fields="playerFormFields"
      :initialData="selectedPlayer"
      @close="closeModal"
      @save="savePlayer"
    />

    <div class="mt-20 px-8 mb-8 max-w-350 w-full mx-auto flex-1 flex flex-col gap-6">
      <HeaderSection searchBar importButton addButton @addClick="openModal('add')">
        {{ $t('dashboard.players') }}
      </HeaderSection>

      <div class="flex-1 h-full min-h-125">
        <DataTable
          :data="dataStore.players"
          :columns="tableColumns"
          :isLoading="dataStore.isLoading"
          @view="(player) => openModal('view', player)"
          @edit="(player) => openModal('edit', player)"
          @toggle="(player) => dataStore.toggleEntity(player)"
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
const { t } = useI18n()

onMounted(() => {
  dataStore.fetchData()
})

const isModalOpen = ref(false)
const modalMode = ref('add')
const selectedPlayer = ref({})

const openModal = (mode, data = {}) => {
  modalMode.value = mode
  selectedPlayer.value = { ...data }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedPlayer.value = {}
}

const savePlayer = (formData) => {
  dataStore.saveEntity('players', formData)
  closeModal()
}

const tableColumns = [
  {
    header: 'Player Name',
    field: 'name',
    subfield: 'email',
  },
  {
    header: 'Phone',
    field: 'phone',
  },
]

const playerFormFields = [
  {
    key: 'fName',
    label: 'First Name',
    type: 'text',
    icon: 'user',
    placeholder: 'First Name',
    required: true,
  },
  {
    key: 'lName',
    label: 'Last Name',
    type: 'text',
    icon: 'user',
    placeholder: 'Last Name',
  },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    icon: 'envelope',
    placeholder: 'info@youmail.com',
    required: true,
  },
  {
    key: 'phone',
    label: 'Phone',
    type: 'text',
    icon: 'phone',
    placeholder: 'Enter phone number',
  },
  {
    key: 'dob',
    label: 'Date of Birth',
    type: 'text',
    icon: 'calendar',
    placeholder: 'dd/mm/yyyy',
    required: true,
  },
  {
    key: 'ageGroup',
    label: 'Age Group',
    type: 'select',
    icon: 'building',
    placeholder: 'Select age group',
    options: optionStore.ageGroup,
    required: true,
  },
  {
    key: 'address',
    label: 'Address line',
    type: 'text',
    icon: 'map-marker',
    placeholder: 'Enter address',
    colSpan: 2,
  },

  {
    key: 'city',
    label: 'City',
    type: 'select',
    icon: 'building',
    placeholder: 'Enter city',
    options: optionStore.city,
  },
  {
    key: 'zipCode',
    label: 'Zip Code',
    type: 'text',
    icon: 'map-marker',
    placeholder: 'Enter zip code',
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
  {
    key: 'playerLevel',
    label: 'Player Level',
    type: 'select',
    icon: 'building',
    placeholder: 'Select Player Level',
    options: optionStore.playerLevel,
  },
]
</script>
