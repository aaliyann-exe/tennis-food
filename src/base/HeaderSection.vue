<template>
  <div class="justify-between flex">
    <div>
      <h1 class="font-semibold text-5xl">
        <slot></slot>
      </h1>
    </div>

    <div class="flex items-center gap-4">
      <div v-if="props.filterBar" class="flex items-center justify-between relative">
        <Select
          :options="options"
          :placeholder="$t('player.all')"
          class="w-full p-select-border-orange-500 p-select-border"
        />
      </div>

      <div v-if="props.searchBar" class="flex items-center justify-between relative">
        <input
          type="text"
          :placeholder="`${$t('tab.search')}...`"
          class="bg-white border border-white focus:border-orange-500 focus:border focus:outline-none placeholder:opacity-40 placeholder:text-black text-gray-900 rounded-lg px-4 py-3 w-full transition-colors duration-300 z-10"
        />
        <i class="pi pi-search text-sm opacity-60 flex absolute right-5 z-10"></i>
      </div>

      <div
        v-if="props.importButton"
        class="cursor-pointer rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 transition-all duration-300 justify-center px-5 py-3 font-medium text-gray-500 flex gap-2 items-center"
      >
        <i class="pi pi-file-import text-xl"></i>
        Import
      </div>

      <div
        v-if="props.addButton"
        @click="$emit('addClick')"
        class="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full justify-center items-center flex cursor-pointer transition-colors"
      >
        <i class="pi pi-plus-circle text-white text-2xl"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import Select from 'primevue/select'

const props = defineProps({
  filterBar: Boolean,
  searchBar: Boolean,
  importButton: Boolean,
  addButton: Boolean,
  options: Array,
})

defineEmits(['addClick'])
const options = props.options || ['Option 1', 'Option 2', 'Option 3']
</script>
