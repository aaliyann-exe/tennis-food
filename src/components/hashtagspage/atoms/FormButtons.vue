<script setup>

    defineProps({

        cancel: {
            type: Boolean,
            required: false,
        },

        save: {
            type: Boolean,
            required: false,
        },

        yes: {
            type: Boolean,
            required: false,
        },

        no: {
            type: Boolean,
            required: false,
        },

    });

    defineEmits(['cancel', 'save']);

</script>

<template>

    <button v-if="cancel" @click="$emit('cancel')" type="button" class="w-62 inline-block mr-2 py-3 px-1 border border-primary text-primary rounded-lg font-medium hover:bg-gray-50 cursor-pointer">
            
        Cancel

    </button>

    <button v-if="save" type="submit" class="w-62 inline-block ml-2 py-3 px-4 bg-primary text-secondary rounded-lg font-medium hover:bg-orange-600 cursor-pointer">
            
        Save

    </button>

    <button v-if="no" @click="$emit('cancel')" type="button" class="w-62 inline-block mr-2 py-3 px-1 border border-primary text-primary rounded-lg font-medium hover:bg-gray-50 cursor-pointer">
            
        No

    </button>

    <button v-if="yes" @click="$emit('save')" type="button" class="w-62 inline-block ml-2 py-3 px-4 bg-primary text-secondary rounded-lg font-medium hover:bg-orange-600 cursor-pointer">
            
        Yes

    </button>

</template>