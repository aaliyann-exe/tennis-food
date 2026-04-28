<template>
  <div class="flex justify-center">
    <i
      :class="['pi pi-info-circle cursor-pointer opacity-60 z-10', size]"
      @mouseenter="infoHover = !infoHover"
      @mouseleave="infoHover = !infoHover"
    ></i>
    <div
      :class="[
        infoHover ? 'visible opacity-100' : 'invisible opacity-0',
        'bg-white z-10 mt-4 shadow-lg rounded-lg absolute text-xs font-semibold p-3 max-w-47 transition-all duration-300',
      ]"
    >
      <slot> </slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  size: String,
})

const infoHover = ref(false)
</script>
