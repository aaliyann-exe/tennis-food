<template>
  <div class="w-full">
    <button
      type="button"
      :class="[
        selectedColor[bgColor],
        selectedTextColor[textColor],
        'font-medium text-sm py-3 px-4 w-full rounded transition-colors duration-300 cursor-pointer',
      ]"
      @click="$emit('click')"
    >
      <slot>Button</slot>
    </button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

defineProps({
  bgColor: {
    type: String,
    default: `orange`,
  },
  textColor: {
    type: String,
    default: `white`,
  },
})

defineEmits(['click'])

const selectedColor = reactive({
  orange: 'bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600',
  white: 'bg-white hover:bg-gray-50 outline outline-orange-500 hover:outline-gray-300',
})

const selectedTextColor = reactive({
  orange: 'text-orange-500',
  white: 'text-white',
})

// const colors = {
//   orange: 'bg-orange-500 hover:bg-orange-600',
//   white: 'bg-gray-100 hover:bg-gray-200',
// }

// const textColors = {
//   orange: 'text-orange-500',
//   white: 'text-white',
// }
</script>
