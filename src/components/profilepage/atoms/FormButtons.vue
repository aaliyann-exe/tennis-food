<script setup>

    defineEmits(['cancel', 'save']);

    defineProps({

        cancel: {
            type: Boolean,
        },

        save: {
            type: Boolean,
        }

    });

</script>

<template>

    <button v-if="cancel" @click="$emit('cancel')" type="button" class="w-42 inline-block mr-2 py-3 px-1 border border-primary text-primary rounded-lg font-medium hover:bg-gray-50 cursor-pointer">
        
        Cancel

    </button>

    <button v-if="save" type="submit" class="w-42 inline-block ml-2 py-3 px-4 bg-primary text-secondary rounded-lg font-medium hover:bg-orange-600 cursor-pointer">
        
        Update

    </button>

</template>