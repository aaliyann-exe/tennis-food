<script setup>

  const props = defineProps({

    label: String,
    modelValue: String,
    placeholder: String,
    icon: String,
    showToggle: Boolean,
    isPasswordVisible: Boolean,
    hideIcon: String,
    viewIcon: String,
    hasError: Boolean

  });

  const emit = defineEmits(['update:modelValue', 'toggle-password', 'input-blur']);

  const onInput = (e) => {

    emit('update:modelValue', e.target.value);

  };

</script>

<template>

  <div class="w-full">

    <label class="block text-sm font-medium mb-2">{{ label }}</label>
    
    <div class="relative">

      <img v-if="icon" :src="icon" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />

      <input :value="modelValue" @input="onInput" @blur="$emit('input-blur')" :type="type" :placeholder="placeholder" :class="['text-main placeholder:text-gray-200 w-full pl-12 py-3 border rounded-lg outline-none transition-all', hasError ? 'border-red-500' : 'border-slate-200 focus:border-orange-500', showToggle ? 'pr-12' : 'pr-4']" />

      <button v-if="showToggle" type="button" @click="$emit('toggle-password')" class="absolute right-4 top-1/2 -translate-y-1/2 opacity-90 hover:opacity-50">

        <img :src="isPasswordVisible ? hideIcon : viewIcon" class="w-5 h-5" />

      </button>

    </div>  

  </div>

</template>