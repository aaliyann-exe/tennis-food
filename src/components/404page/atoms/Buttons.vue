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
    class="w-max inline-block mx-0.5 py-3 px-5 border border-gray-200 rounded-lg font-medium hover:border-primary-active hover:border cursor-pointer"
  >
    {{ $t("notFound.back") }}
  </button>

  <button
    v-if="orange"
    @click="$emit('home')"
    type="button"
    class="w-max inline-block mx-0.5 py-3 px-5 bg-primary text-secondary rounded-lg font-medium hover:bg-orange-600 cursor-pointer"
  >
    {{ text || $t("notFound.home") }}
  </button>
</template>
