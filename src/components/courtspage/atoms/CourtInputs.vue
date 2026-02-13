<script setup lang="ts">

    import { ref, computed } from 'vue';
    import arrowDownIcon from '/src/assets/arrowDownIcon.svg';

    interface Props {

        inputLabel: string;
        inputPlaceholder: string;
        inputData: string;
        icon: string;
        hasAsterisk?: boolean;
        mustFill?: boolean;
        isDisabled?: boolean;
        isDropDown?: boolean;
        validationMessage?: string;
        type?: string;
        mode: 'create' | 'view' | 'edit';
        options?: string[];

    };

    const props = withDefaults(defineProps<Props>(), {
            
        hasAsterisk: false,
        mustFill: false,
        isDisabled: false,
        isDropDown: false,
        validationMessage: 'This field is required',
        type: '',
        mode: 'create',
        options: () => [],

    });

    const emit = defineEmits<{

        (e: 'update:inputData', value: string): void;

    }>();

    const isReadOnly = computed(() => {

        return ( (props.mode === 'view') || props.isDisabled );

    });

    const fieldTouched = ref(false);

    const handleInput = (e: Event) => {

        const target = e.target as HTMLInputElement;
        fieldTouched.value = true;
        emit('update:inputData', target.value);
        
    };

    const handleBlur = () => {

        fieldTouched.value = true;

    };

    const hasError = computed(() => {

        if (!fieldTouched.value) return false;
        return props.mustFill && !props.inputData;

    });

    // DROPDOWN STUFF
    const isOpen = ref(false);
    // 5. Type the template ref
    const dropdownRef = ref<HTMLElement | null>(null);

    const toggleDropdown = () => {
    if (isReadOnly.value) return;
    isOpen.value = !isOpen.value;
    };

    const selectOption = (option: string) => {
    emit('update:inputData', option);
    isOpen.value = false;
    fieldTouched.value = true;
    };

    const errorMessage = computed(() => {
    if (!fieldTouched.value) return null;
    if (props.mustFill && !props.inputData) {
        return props.validationMessage;
    }
    return null;
    });
</script>

<template>
  <div :class="[(isReadOnly ? 'cursor-not-allowed' : ''), 'col-span-1 p-2']">
    <label :class="[(isReadOnly ? 'opacity-50' : ''), 'block text-sm font-semibold mb-1']">
      {{ props.inputLabel }}
      <span v-if="props.hasAsterisk" class="text-primary">*</span>
    </label>

    <div v-if="isDropDown" class="relative" ref="dropdownRef">
      <div 
        @click="toggleDropdown" 
        :class="[
          (isOpen ? 'border-primary ring-4 ring-orange-50 bg-white' : 'border-gray-200 bg-gray-50'),
          (isReadOnly ? 'bg-gray-50 cursor-not-allowed' : 'bg-secondary cursor-pointer'),
          'flex items-center w-full p-2.5 border rounded-lg'
        ]"
      >
        <img v-if="props.icon" :src="props.icon" class="inline-block w-5 h-5 ml-1 mr-4 opacity-30" />
        <span :class="[(props.inputData ? 'text-primary' : 'text-black opacity-20'), 'flex-1 font-light']">
          {{ props.inputData || props.inputPlaceholder }}
        </span>
        <img :src="arrowDownIcon" class="relative w-3 h-3 top-2 right-2 opacity-60" />
      </div>
      
      </div>

    <div v-else :class="[
      (hasError ? 'border-error focus-within:border-error' : 'border-gray-200 focus-within:border-primary'),
      (isReadOnly ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'),
      'w-full p-2.5 border rounded-lg focus-within:border flex items-center'
    ]">
      <img v-if="props.icon" :src="icon" class="inline-block w-5 h-5 ml-1 mr-5 opacity-40" />
      <input 
        :value="props.inputData" 
        :required="props.mustFill" 
        :disabled="isReadOnly" 
        type="text" 
        @blur="handleBlur" 
        @input="handleInput" 
        :placeholder="props.inputPlaceholder" 
        :class="[(isReadOnly ? 'cursor-not-allowed text-primary' : 'text-primary'), 'pr-34 placeholder:text-black placeholder:opacity-10 outline-none bg-transparent w-full']"
      >
    </div>

    <div v-if="errorMessage" class="mt-1 text-sm font-normal text-error">
      {{ errorMessage }}
    </div>
  </div>
</template>