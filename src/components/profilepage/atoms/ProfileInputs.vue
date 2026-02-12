<script setup>
    import { ref, computed } from 'vue';
    import arrowDownIcon from '/src/assets/arrowDownIcon.svg';

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
            default: '',
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

        isDisabled: { 
            type: Boolean, 
            default: false,
        },

        isDropDown: { 
            type: Boolean, 
            default: false,
        },

        validationMessage: { 
            type: String, 
            default: 'This field is required',
        },

        type: { 
            type: String, 
            default: 'text',
        },

        mode: { 
            type: String, 
            default: 'view',
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

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^(?:\+31|0)[1-9]\d{8}$/.test(phone);

    const errorMessage = computed(() => {

        if (!fieldTouched.value && props.mode !== 'edit')
            return null;

        if (props.mode === 'view')
            return null;

        if (props.mustFill && !props.inputData)
            return props.validationMessage;

        if (props.inputData && props.inputData.length > 0) {

            if (props.type === 'email' && !validateEmail(props.inputData))
                return 'Invalid email';

            if (props.type === 'phone' && !validatePhone(props.inputData))
                return 'Invalid Dutch phone number';
            if (props.type === 'website' && !props.inputData.includes('.'))
                return 'Invalid website URL';

        }

        return null;
    });

</script>

<template>

    <div :class="(isReadOnly ? 'cursor-not-allowed ' : '') + 'col-span-1 p-2'">

        <label :class="(isReadOnly ? 'opacity-70 ' : '') + 'block text-sm font-semibold mb-1'">

            {{ props.inputLabel }}

            <span v-if="props.hasAsterisk" class="text-red-500">*</span>

        </label>

        <div v-if="props.isDropDown" :class="(isReadOnly ? 'bg-gray-50 border-gray-200 border p-2.5 cursor-not-allowed ' : 'bg-white border-gray-200 border rounded-lg p-2.5 ') + 'w-full flex items-center rounded-lg py-3'">

            <img :src="props.icon" class="w-5 h-5 ml-1 mr-4 opacity-30" />

            <span class="text-gray-500 grow">{{ props.inputPlaceholder }}</span>

            <img :src="arrowDownIcon" class="w-3 h-3 relative top-1 right-3 opacity-100" />

        </div>

        <div v-else :class="(hasError ? 'border-red-500 ' : 'border-gray-200 focus-within:border-primary border') + (isReadOnly ? 'bg-gray-50 border-gray-200 border p-2.5 cursor-not-allowed ' : 'bg-white border rounded-lg p-2.5 ') + 'w-full flex items-center rounded-lg py-3'">

            <img :src="icon" class="w-5 h-5 mr-4 ml-3 opacity-40" />
            
            <input :value="props.inputData" :disabled="isReadOnly" :type="props.type === 'phone' ? 'tel' : 'text'" @blur="fieldTouched = true" @input="handleInput" :placeholder="props.inputPlaceholder" class="w-full outline-none bg-transparent text-primary placeholder:text-black placeholder:opacity-10">
        
        </div>

        <div v-if="errorMessage && mode === 'edit'" class="text-red-500 text-xs font-normal mt-1 ml-1">

            {{ errorMessage }}

        </div>

    </div>

</template>