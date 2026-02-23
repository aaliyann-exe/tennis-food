<script setup>
defineEmits(["home", "back"]);

defineProps({
  white: {
    type: Boolean,
    required: false,
  },

  orange: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <button
    v-if="white"
    @click="$emit('back')"
    type="button"
    class="w-34 inline-block mr-2 py-3 px-1 border border-gray-200 rounded-lg font-medium hover:border-primary-active hover:border cursor-pointer"
  >
    {{ $t("notFound.back") }}
  </button>

  <button
    v-if="orange"
    @click="$emit('home')"
    type="button"
    class="w-34 inline-block ml-2 py-3 px-4 bg-primary text-secondary rounded-lg font-medium hover:bg-orange-600 cursor-pointer"
  >
    {{ text || $t("notFound.home") }}
  </button>
</template>
