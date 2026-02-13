<script setup lang="ts">

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
            default: '',
        },

        mode: {
            type: String,
            default: 'create',
        }

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

    const validateEmail = (email) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);

    };

    const validatePhone = (phone) => {

        const phoneRegex = /^(?:\+31|0)[1-9]\d{8}$/;
        return phoneRegex.test(phone);

    };

    const hasError = computed(() => {

        if (!fieldTouched.value)
            return false;

        if (props.mustFill && !props.inputData)
            return true;

        if (props.inputData.length > 0) {

            if (props.type === 'email' && !validateEmail(props.inputData)) return true;
            if (props.type === 'phone' && !validatePhone(props.inputData)) return true;
            if (props.type === 'website' && !props.inputData.includes('.')) return true;

        }

        else
            return false;

    });

    const errorMessages = {
        name: 'Club/Association name is required',
        email: 'Invalid email',
        phone: 'Please enter a valid Dutch phone number (e.g. 0612345678 or +31612345678)',
        website: 'Please enter a valid website URL (e.g., example.com, www.example.com, or https://example.com)',
    };

    const errorMessage = computed(() => {

        if (!fieldTouched.value)
            return null;

        if (props.mustFill && !props.inputData)
            return props.validationMessage;

        if (props.inputData.length > 0) {

            if (props.type === 'email' && !validateEmail(props.inputData)) {

                return errorMessages.email;

            }

            if (props.type === 'phone' && !validatePhone(props.inputData)) {

                return errorMessages.phone;

            }

            if (props.type === 'website' && !props.inputData.includes('.')) {

                return errorMessages.website;

            }

        }

        else
            return null;

    });

</script>

<template>

    <div :class="(isReadOnly ? 'cursor-not-allowed ' : '') + 'col-span-1'">

        <label :class="(isReadOnly ? 'opacity-50 ' : '') + 'block text-sm font-semibold mb-1'">

            {{ props.inputLabel }}

            <span v-if="props.hasAsterisk" class="text-primary">*</span>

        </label>

        <div v-if="props.isDropDown" class="cursor-not-allowed flex bg-gray-50 w-full p-2.5 border border-gray-200 rounded-lg focus-within:border focus-within:border-primary">

            <img :src="props.icon" class="cursor-not-allowed w-5 h-5 ml-1 mr-4 inline-block opacity-30" />
            
            <select disabled class="cursor-not-allowed inline text-primary font-light placeholder:text-black placeholder:opacity-10 outline-none w-full bg-transparent appearance-none">
                
                <option disabled selected class="cursor-not-allowed">
                    
                    {{ props.inputPlaceholder }}
                
                </option>

            </select>

            <img :src="arrowDownIcon" class="w-3 h-3 relative top-2 right-2 opacity-60" />
            
        </div>

        <div v-else :class="(hasError ? 'border-error focus-within:border-error ' : 'border-gray-200 focus-within:border-primary ') + (isReadOnly ? 'bg-gray-50 cursor-not-allowed ' : 'bg-white ') + 'w-full p-2.5 border rounded-lg focus-within:border flex items-center'">

            <img :src="icon" class="w-5 h-5 mr-5 ml-1 inline-block opacity-40" />
            
            <input :value="props.inputData" :required="props.mustFill" :disabled="isReadOnly" type="text" @blur="handleBlur" @input="handleInput" :placeholder="props.inputPlaceholder" :class="(isReadOnly ? 'cursor-not-allowed text-primary ' : 'text-primary ') + 'pr-34 placeholder:text-black placeholder:opacity-10 outline-none bg-transparent w-full'">
        
        </div>

        <div v-if="errorMessage" class="text-error text-sm font-normal mt-1">
        
            {{ errorMessage }}
        
        </div>

    </div>

</template>