<template>
  <div class="bg-white flex w-full h-screen rounded-3xl border border-gray-200">
    <div v-if="mainStore.isLoading" class="w-full">
      <div
        v-for="row in 11"
        :key="row"
        class="grid grid-cols-4 gap-4 px-4 py-8 border-b border-gray-200"
      >
        <div
          v-for="col in 4"
          :key="col"
          class="h-4 w-full bg-gray-200 rounded-md animate-pulse [animation-duration:750ms]"
        ></div>
      </div>
    </div>

    <div v-else-if="mainStore.length" class="flex flex-col w-full rounded-3xl">
      <!-- Header -->
      <div class="grid grid-cols-4 bg-gray-100 px-8 py-4 border-b border-gray-200">
        <div class="text-base font-medium uppercase flex gap-1">
          <div
            @click="ascendingOrder = !ascendingOrder"
            class="flexbox items-center justify-center"
          >
            <h1
              :class="[
                ascendingOrder ? 'opacity-60' : 'opacity-20',
                'text-[10px] cursor-pointer hover:bg-orange-500/30 px-1 rounded-lg transition-all duration-300',
              ]"
            >
              ▲
            </h1>
            <h1
              :class="[
                ascendingOrder ? 'opacity-20' : 'opacity-60',
                'text-[10px] cursor-pointer hover:bg-orange-500/30 px-1 rounded-lg transition-all duration-300',
              ]"
            >
              ▼
            </h1>
          </div>
          Club Name
        </div>
        <div class="text-base font-medium uppercase flex">Phone</div>
        <div class="text-base font-medium uppercase flex">Status</div>
        <div class="text-base font-medium uppercase flex">Actions</div>
      </div>

      <div>
        <div
          v-for="club in mainStore.clubs"
          :key="club.id"
          class="grid grid-cols-4 px-8 py-5 items-center border-b border-gray-200 hover:bg-gray-100"
        >
          <div class="flex items-center gap-4">
            <img v-if="club.image" :src="club.image" class="w-11 h-11 rounded-full" />
            <div
              v-else
              class="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm"
            >
              {{ club.name?.substring(0, 2).toUpperCase() || 'TF' }}
            </div>
            <div class="flex flex-col leading-tight">
              <span class="text-base">{{ club.name }}</span>
              <span class="text-xs text-orange-500 opacity-80">{{ club.email }}</span>
            </div>
          </div>

          <!-- Phone/Location -->
          <div class="text-sm">
            {{ club.phone || 'N/A' }}
          </div>

          <!-- Status Pill -->
          <div>
            <span
              :class="[
                club.status
                  ? 'bg-green-100 text-emerald-500 border border-emerald-500'
                  : 'bg-red-100 text-rose-500 border border-rose-500',
                'px-5 py-2 text-xs font-semibold rounded-full',
              ]"
            >
              {{ club.status ? $t('table.active') : $t('table.inactive') }}
            </span>
          </div>

          <!-- Action Icons -->
          <div class="flex items-center justify-end gap-6 text-gray-400">
            <button class="hover:text-gray-600">
              <i class="pi pi-eye"></i>
            </button>
            <button class="hover:text-gray-600">
              <i class="pi pi-pencil"></i>
            </button>
            <button class="hover:text-gray-600" @click="mainStore.toggleEntity(club)">
              <i :class="[isActive ? 'pi pi-refresh' : 'pi pi-eye']"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center gap-2">
      <h1 class="font-semibold text-2xl">
        <slot>
          {{ $t('tab.noDataFound') }}
        </slot>
      </h1>
      <button
        class="border border-orange-500 bg-white rounded-full px-7 py-3 font-medium text-sm text-orange-500 hover:text-white hover:bg-orange-500 transition-all duration-300 cursor-pointer"
      >
        <slot>
          {{ $t('tab.addData') }}
        </slot>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/dataStore'

const props = defineProps({
  isActive: Boolean,
  data: String,
})

const mainStore = useMainStore()

onMounted(() => {
  mainStore.fetchData()
})

const ascendingOrder = ref(true)

const isActive = props.isActive
</script>
