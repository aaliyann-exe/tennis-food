<script setup lang="ts">

    import ImportIcon from '../atoms/ImportIcon.vue';
    import SearchBar from '../atoms/SearchBar.vue';

    import plusIcon from '/src/assets/plusIcon.svg';

    defineProps({

        text: {

            type: String,
            required: true,

        },

    });

    defineEmits(['create']);

</script>

<template>

    <div class="flex items-center justify-between mt-20 px-4">
    
        <h1 class="text-4xl font-semibold truncate">
        
            {{ text }}
        
        </h1>

        <div class="flex items-center">
        
            <SearchBar />
        
            <ImportIcon />
        
            <button @click="$emit('create')" class="flex items-center justify-center w-12 h-12 ml-5 rounded-full cursor-pointer bg-primary hover:bg-primary-active shrink-0">
                
                <img :src="plusIcon" class="w-5 h-5 invert">

            </button>
        
        </div>

    </div>

</template>