<script setup>
defineEmits(["cancel", "save"]);

defineProps({
  text: {
    type: String,
    required: false,
  },
});
</script>

<template>
  <button
    type="submit"
    class="w-full inline-block py-3 px-4 bg-primary text-secondary rounded-lg font-medium hover:bg-orange-600 cursor-pointer"
  >
    {{ text || $t("login.login") }}
  </button>
</template>
