<template>
  <div class="w-full">
    <label class="block text-xs font-medium mb-3">
      {{ label }}
    </label>

    <div class="relative mt-1 rounded-md w-full">
      <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <i :class="`pi pi-${icon} text-gray-500`"></i>
      </div>

      <input
        v-model="model"
        :type="passwordHidden ? 'password' : 'text'"
        :placeholder="placeholder"
        @blur="$emit('blur')"
        :class="[
          error ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-orange-300',
          'block w-full rounded-md border focus:outline-none text-orange-500 py-3 pl-11 pr-10 placeholder-gray-300 placeholder:text-[14px] sm:text-sm transition-colors duration-200',
        ]"
      />

      <button
        v-if="password"
        type="button"
        @click="passwordHidden = !passwordHidden"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <i
          :class="[
            'pi',
            passwordHidden ? 'pi-eye-slash' : 'pi-eye',
            'text-gray-500 hover:text-gray-400 cursor-pointer ',
          ]"
        ></i>
      </button>
    </div>

    <p v-if="errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
  icon: String,
  password: Boolean,
  error: Boolean,
  errorMessage: String,
})

const emit = defineEmits(['blur'])

const model = defineModel()

const passwordHidden = ref(props.password ? true : false)
</script>
