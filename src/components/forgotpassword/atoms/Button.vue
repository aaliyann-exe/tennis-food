<script setup>
defineEmits(["click"]);

defineProps({
  orange: {
    type: Boolean,
    required: false,
  },

  white: {
    type: Boolean,
    required: false,
  },

  text: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <button
    v-if="orange"
    @click="$emit('click')"
    type="button"
    class="w-full inline-block py-3 px-4 bg-primary text-secondary rounded-lg font-medium hover:bg-orange-600 cursor-pointer transition-colors"
  >
    {{ text || $t("login.send") }}
  </button>

  <button
    v-if="white"
    @click="$emit('click')"
    type="button"
    class="w-full inline-block py-3 px-1 border border-primary text-primary rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 cursor-pointer transition-colors"
  >
    {{ text || $t("login.back") }}
  </button>
</template>
