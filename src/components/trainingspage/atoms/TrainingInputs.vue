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
        },

        options: {
            type: Array,
            default: () => [],
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

    // DROPDOWN STUFF

    const isOpen = ref(false);
    const dropdownRef = ref(null);

    const toggleDropdown = () => {

        if (isReadOnly.value) return;
        isOpen.value = !isOpen.value;

    };

    const selectOption = (option) => {

        emit('update:inputData', option);
        isOpen.value = false;
        fieldTouched.value = true;
        
    };

    const handleClickOutside = (event) => {

        if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
            isOpen.value = false;
        }
        
    };



    //DROPDOWN STUFF CLOSE

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

    

    <div :disabled="isReadOnly" :class="(isReadOnly ? 'cursor-not-allowed ' : '') + 'col-span-1 p-2'">

        <label :class="(isReadOnly ? 'opacity-50 ' : '') + 'block text-sm font-semibold mb-1'">

            {{ props.inputLabel }}

            <span v-if="props.hasAsterisk" class="text-primary">*</span>

        </label>

        <div v-if="isDropDown" class="relative" ref="dropdownRef">

            <div @click="toggleDropdown" :class="(isOpen ? 'border-primary ring-4 ring-orange-50 bg-white ' : 'border-gray-200 bg-gray-50 ') + (isReadOnly ? 'bg-gray-50 cursor-not-allowed ' : 'bg-secondary cursor-pointer ') + 'flex items-center w-full p-2.5 border rounded-lg'">
                
                <img :src="props.icon" class="inline-block w-5 h-5 ml-1 mr-4 cursor-not-allowed opacity-30" />

                <span :class="(props.inputData ? 'text-primary ' : 'text-black opacity-20 ') + 'flex-1 font-light'">
                    
                    {{ props.inputData || props.inputPlaceholder }}

                </span>
                
                <img :src="arrowDownIcon" class="relative w-3 h-3 top-2 right-2 opacity-60" />

            </div>

            <transition name="fade">
                
                <div v-if="isOpen" class="absolute z-50 w-full mt-1 overflow-hidden bg-white border border-gray-100 shadow-xl rounded-xl">
                    
                    <div class="overflow-y-auto max-h-60 custom-scrollbar">
                        
                        <div v-for="option in props.options" :key="option" @click="selectOption(option)" class="flex items-center justify-between px-4 py-3 transition-colors cursor-pointer hover:bg-blue-50">
                        
                            <span :class="['text-sm', props.inputData === option ? 'text-primary font-semibold' : 'text-gray-700']">
                                
                                {{ option }}

                            </span>

                        </div>

                    </div>

                </div>

            </transition>

        </div>

        <div v-else 
             :class="[
                hasError ? 'border-error focus-within:border-error ' : 'border-gray-200 focus-within:border-primary ',
                isReadOnly ? 'bg-gray-50 cursor-not-allowed' : 'bg-white',
                'w-full p-2.5 border rounded-lg focus-within:border flex items-center'
             ]">

            <img :src="icon" class="inline-block w-5 h-5 ml-1 mr-5 opacity-40" />
            
            <input 
                :value="props.inputData" 
                :required="props.mustFill" 
                :disabled="isReadOnly"
                type="text" 
                @blur="handleBlur" 
                @input="handleInput" 
                :placeholder="props.inputPlaceholder" 
                :class="[
                    isReadOnly ? 'cursor-not-allowed text-primary' : 'text-primary',
                    'pr-34 placeholder:text-black placeholder:opacity-10 outline-none bg-transparent w-full'
                ]"
            >
        </div>

        <div v-if="errorMessage" class="mt-1 text-sm font-normal text-error">
            {{ errorMessage }}
        </div>

    </div>

</template>