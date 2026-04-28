<template>
  <div class="bg-white rounded-3xl shadow-sm block w-full p-6">
    <div class="flex justify-between items-center mb-8 relative">
      <div class="bg-orange-500/8 rounded-full w-12 h-12 flex items-center justify-center">
        <i :class="['pi', icon, 'text-orange-500 text-2xl']"></i>
      </div>

      <button
        @click="displayCalendar"
        class="w-11 h-11 z-20 cursor-pointer rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center"
      >
        <i class="pi pi-calendar-minus opacity-70"></i>
      </button>

      <div
        :class="[
          showCalendar ? 'visible opacity-100' : 'invisible opacity-0',
          'absolute z-12 right-0 top-14 transition-all duration-300',
        ]"
      >
        <DatePicker inline />
      </div>
    </div>
    <div class="flex items-center">
      <h1 class="text-2xl font-semibold mr-2">
        <slot name="header"></slot>
      </h1>
      <InfoButton size="text-bg">{{ info }}</InfoButton>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InfoButton from './InfoButton.vue'
import DatePicker from 'primevue/datepicker'

defineProps({
  icon: String,
  info: String,
})

const showCalendar = ref(false)
const displayCalendar = () => {
  showCalendar.value = !showCalendar.value
}
</script>
