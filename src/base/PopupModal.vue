<template>
  <div class="fixed inset-0 bg-black/50 flex justify-center items-center w-full z-50">
    <div class="bg-white p-8 rounded-lg shadow-xl border border-gray-100 flexbox w-max text-left">
      <div class="absolute top-94 right-160">
        <i class="pi pi-times cursor-pointer" style="font-size: 14px" @click="$emit('close')"></i>
      </div>
      <div class="flex justify-center items-center gap-2 mb-4">
        <h1 class="text-orange-500 font-semibold text-3xl">
          <slot name="title">Title</slot>
        </h1>
        <i v-if="icon" :class="['pi', icon, 'text-4xl text-orange-500']"></i>
      </div>

      <p class="text-gray-600 font-medium text-sm">
        <slot name="body">Text</slot>
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
})

defineEmits(['close'])
</script>
