<script setup>
defineEmits(["cancel", "save"]);

defineProps({
  white: {
    type: Boolean,
    required: false,
  },

  orange: {
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
    v-if="white"
    @click="$emit('click')"
    type="button"
    class="w-42 inline-block mr-2 py-3 px-1 border border-primary text-primary rounded-lg font-medium hover:bg-gray-50 cursor-pointer"
  >
    {{ text || $t("table.cancel") }}
  </button>

  <button
    v-if="orange"
    type="submit"
    class="w-42 inline-block ml-2 py-3 px-4 bg-primary text-secondary rounded-lg font-medium hover:bg-orange-600 cursor-pointer"
  >
    {{ text || $t("table.save") }}
  </button>
</template>
