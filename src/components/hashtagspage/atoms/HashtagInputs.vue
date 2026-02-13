<script setup lang="ts">

    import { ref, computed } from 'vue';

    const props = defineProps({

        inputLabel: {
            type: String,
            required: true,
        },

        inputPlaceholder: {
            type: String,
            required: true,
        },

        inputData: {
            type: String,
            required: true,
        },

        icon: {
            type: String,
            required: true,
        },

        hasAsterisk: {
            type: Boolean,
            default: false,
        },

        mustFill: {
            type: Boolean,
            default: false,
        },

        validationMessage: {
            type: String,
            default: 'This field is required',
        },

        mode: {
            type: String,
            default: 'create',
        },

    });

    const emit = defineEmits(['update:inputData']);

    const isReadOnly = computed(() => {

        return props.mode === 'view' || props.isDisabled;

    });

    const fieldTouched = ref(false);

    const handleInput = (e) => {

        fieldTouched.value = true;
        emit('update:inputData', e.target.value);

    };

    const handleBlur = () => {

        fieldTouched.value = true;

    };

    const hasError = computed(() => {

        if (!fieldTouched.value)
            return false;

        if (props.mustFill && !props.inputData)
            return true;

        else
            return false;

    });
    
    const errorMessage = computed(() => {

        if (!fieldTouched.value)
            return null;

        if (props.mustFill && !props.inputData)
            return props.validationMessage;

        else
            return null;

    });

</script>

<template>

    <div :disabled="isReadOnly" :class="(isReadOnly ? 'cursor-not-allowed ' : '') + 'col-span-1 p-2'">

        <label :class="(isReadOnly ? 'opacity-50 ' : '') + 'block text-sm font-semibold mb-1'">

            {{ props.inputLabel }}

            <span v-if="props.hasAsterisk" class="text-primary">*</span>

        </label>

        <div :class="(hasError ? 'border-error focus-within:border-error ' : 'border-gray-200 focus-within:border-primary ') + (isReadOnly ? 'bg-gray-50 cursor-not-allowed ' : 'bg-white ') + 'w-full p-2.5 border rounded-lg focus-within:border flex items-center'">

            <img :src="icon" class="inline-block w-5 h-5 ml-1 mr-5 opacity-40" />
            
            <input :value="props.inputData" :required="props.mustFill" :disabled="isReadOnly" type="text" @blur="handleBlur" @input="handleInput" :placeholder="props.inputPlaceholder" :class="(isReadOnly ? 'cursor-not-allowed text-primary ' : 'text-primary ') + 'pr-34 placeholder:text-black placeholder:opacity-10 outline-none bg-transparent w-full'">
        
        </div>

        <div v-if="errorMessage" class="mt-1 text-sm font-normal text-error">

            {{ errorMessage }}
            
        </div>

    </div>

</template>