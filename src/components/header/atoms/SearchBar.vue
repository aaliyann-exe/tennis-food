<script setup>
import magnifyingGlassIcon from "/src/assets/magnifyingGlassIcon.svg";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["search"]);

const handleSearch = (e) => {
  emit("search", e.target.value);
};
</script>

<template>
  <div
    class="bg-secondary flex p-4 rounded-2xl w-60 border border-secondary focus-within:border focus-within:border-primary"
  >
    <input
      :placeholder="$t('tab.search') + '...'"
      :value="modelValue"
      @input="handleSearch"
      class="placeholder:text-gray-200 w-full text-primary border-secondary outline-none bg-transparent"
    />

    <img :src="magnifyingGlassIcon" class="w-5 h-5 mt-1 opacity-60" />
  </div>
</template>
