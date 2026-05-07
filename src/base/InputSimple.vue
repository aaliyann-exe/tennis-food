<template>
  <div class="w-full">
    <label v-if="label" class="block text-[13px] font-medium text-gray-800 mb-1.5">
      {{ label }} <span v-if="required" class="text-orange-500">*</span>
    </label>

    <div class="relative w-full rounded-md">
      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
      >
        <i :class="`pi pi-${icon} text-gray-400 text-sm`"></i>
      </div>

      <input
        v-model="model"
        :type="passwordHidden ? 'password' : type"
        :placeholder="placeholder"
        :disabled="disabled"
        @blur="$emit('blur')"
        :class="[
          error ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-400',
          disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-800',
          icon ? 'pl-10' : 'pl-3.5',
          'block w-full rounded-lg border focus:outline-none focus:ring-1 focus:ring-orange-400 py-2.5 pr-10 placeholder-gray-300 text-[14px] transition-colors duration-200',
        ]"
      />

      <button
        v-if="type === 'password'"
        type="button"
        @click="passwordHidden = !passwordHidden"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <i
          :class="[
            'pi text-sm',
            passwordHidden ? 'pi-eye-slash' : 'pi-eye',
            'text-gray-400 hover:text-gray-600 cursor-pointer',
          ]"
        ></i>
      </button>
    </div>

    <p v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: String,
  placeholder: String,
  type: { type: String, default: 'text' },
  icon: String,
  required: Boolean,
  disabled: Boolean,
  error: Boolean,
  errorMessage: String,
})

const emit = defineEmits(['blur'])
const model = defineModel()
const passwordHidden = ref(props.type === 'password')
</script>
