<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex gap-10 mb-4 w-full px-2">
      <button
        @click="activeTab = 'active'"
        :class="[
          'pb-3 text-sm transition-all relative cursor-pointer w-18',
          activeTab === 'active'
            ? 'text-orange-500 font-medium border-b-2 border-orange-500'
            : 'text-gray-500 hover:text-gray-700 border-b-2 border-gray-100',
        ]"
      >
        {{ $t('tab.active') }}
      </button>
      <button
        @click="activeTab = 'archived'"
        :class="[
          'pb-3 text-sm transition-all relative, cursor-pointer  w-18',
          activeTab === 'archived'
            ? 'text-orange-500 font-medium border-b-2 border-orange-500'
            : 'text-gray-500 hover:text-gray-700 border-b-2 border-gray-100',
        ]"
      >
        {{ $t('tab.archived') }}
      </button>
    </div>

    <div class="bg-white rounded-t-xl border border-gray-300 overflow-hidden flex-1 flex flex-col">
      <div v-if="isLoading" class="w-full">
        <div
          v-for="row in 6"
          :key="row"
          class="grid grid-cols-4 gap-4 px-8 py-6 border-b border-gray-100"
        >
          <div
            v-for="col in 4"
            :key="col"
            class="h-4 w-full bg-gray-200 rounded-md animate-pulse"
          ></div>
        </div>
      </div>

      <div v-else-if="filteredData.length" class="flex flex-col w-full">
        <div
          class="grid grid-cols-[3fr_2.5fr_1fr_0.5fr] bg-gray-100 px-6 py-4 border-b border-gray-200 uppercase font-medium"
        >
          <div v-for="(col, index) in columns" :key="col.field" class="flex items-center gap-2">
            <div
              v-if="index === 0"
              class="flex flex-col cursor-pointer justify-center items-center"
            >
              <div
                :class="[
                  ascendingOrder ? 'text-black' : 'text-gray-300',
                  'text-xs hover:bg-orange-500/10 cursor-pointer rounded-full',
                ]"
                @click="ascendingOrder ? null : toggleOrder()"
              >
                ▲
              </div>
              <div
                :class="[
                  ascendingOrder ? 'text-gray-300' : 'text-black',
                  'text-xs hover:bg-orange-500/10 cursor-pointer rounded-full',
                ]"
                @click="ascendingOrder ? toggleOrder() : null"
              >
                ▼
              </div>
            </div>
            {{ col.header }}
          </div>
          <div class="flex items-center">Status</div>
          <div class="flex items-center">Actions</div>
        </div>

        <div class="overflow-y-auto max-h-[60vh]">
          <div
            v-for="item in filteredData"
            :key="item.id"
            class="grid grid-cols-[3fr_2.5fr_1fr_0.5fr] px-6 py-4 items-center border-b border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <div v-for="(col, index) in columns" :key="col.field" class="text-sm text-gray-800">
              <div v-if="index === 0" class="flex items-center gap-4">
                <img
                  v-if="item.image"
                  :src="item.image"
                  class="w-12 h-12 rounded-full object-cover"
                />
                <div
                  v-else
                  class="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white text-[15px] font-medium"
                >
                  {{ (item[col.field] || 'TF').substring(0, 2).toUpperCase() }}
                </div>
                <div class="flex flex-col leading-tight gap-0.5">
                  <span class="text-[15px] text-gray-800 font-normal">{{ item[col.field] }}</span>
                  <span v-if="col.subfield" class="text-[13px] text-orange-500">{{
                    item[col.subfield]
                  }}</span>
                </div>
              </div>

              <span v-else>{{ item[col.field] || 'N/A' }}</span>
            </div>

            <div class="flex items-center">
              <span
                :class="[
                  item.status
                    ? 'bg-green-100 text-emerald-700 border border-emerald-400'
                    : 'bg-red-100 text-red-500 border border-red-500',
                  'py-1 px-5 text-[12px] rounded-full',
                ]"
              >
                {{ item.status ? 'Active' : 'Inactive' }}
              </span>
            </div>

            <div class="flex gap-5 text-gray-400">
              <button
                @click="$emit('view', item)"
                class="hover:text-gray-600 transition-colors cursor-pointer"
              >
                <i class="pi pi-eye text-lg"></i>
              </button>
              <button
                @click="$emit('edit', item)"
                class="hover:text-gray-600 transition-colors cursor-pointer"
              >
                <i class="pi pi-pencil text-lg"></i>
              </button>
              <button
                @click="$emit('toggle', item)"
                :class="['hover:text-gray-600 transition-colors cursor-pointer']"
              >
                <i class="pi pi-history text-lg"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="flex flex-1 flex-col items-center justify-center gap-4 text-center bg-white"
      >
        <h1 class="font-semibold text-2xl text-gray-800">{{ $t('tab.noDataFound') }}</h1>
        <button
          @click="$emit('add')"
          class="border border-orange-500 bg-white rounded-full px-6 py-2 text-sm text-orange-500 hover:text-white hover:bg-orange-500 transition-all duration-300 font-medium cursor-pointer"
        >
          {{ $t('tab.addData') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  data: { type: Array, required: true },
  columns: { type: Array, required: true },
  isLoading: Boolean,
})

const emit = defineEmits(['view', 'edit', 'toggle', 'add'])
const activeTab = ref('active')

const ascendingOrder = ref(true)

const toggleOrder = () => {
  ascendingOrder.value = !ascendingOrder.value
  props.data.reverse()
}

// Switch between Active and Archived lists
const filteredData = computed(() => {
  return props.data.filter((item) =>
    activeTab.value === 'active' ? item.status === true : item.status === false,
  )
})
</script>
