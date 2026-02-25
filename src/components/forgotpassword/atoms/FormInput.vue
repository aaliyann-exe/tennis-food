<script setup>
const props = defineProps({
  label: String,
  modelValue: String,
  placeholder: String,
  icon: String,
  hasError: Boolean,
});

const emit = defineEmits(["update:modelValue", "input-blur"]);

const onInput = (e) => {
  emit("update:modelValue", e.target.value);
};
</script>

<template>
  <div class="w-full">
    <label class="block text-sm font-medium mb-2">{{ label }}</label>

    <div class="relative">
      <img
        :src="icon"
        class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50"
      />

      <input
        v-model="modelValue"
        @input="onInput"
        @blur="$emit('input-blur')"
        type="email"
        :placeholder="placeholder"
        :class="[
          'text-main placeholder:text-gray-200 w-full pl-12 py-3 border rounded-lg outline-none transition-all',
          hasError
            ? 'border-red-500'
            : 'border-slate-200 focus:border-orange-500',
          showToggle ? 'pr-12' : 'pr-4',
        ]"
      />
    </div>
  </div>
</template>
