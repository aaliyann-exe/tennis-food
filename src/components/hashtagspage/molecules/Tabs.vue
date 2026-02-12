<script setup>

    import { ref } from 'vue';

    
    const emit = defineEmits(['update:showArchived']);

    const showArchived = ref(false);

    const toggleTabs = (tab) => {

        showArchived.value = (tab === 'archived') ? true : false;
        emit('update:showArchived', showArchived.value);

    };

</script>

<template>

    <div class="flex text-sm px-5 font-medium">

        <div v-if="!showArchived">

            <button @click="toggleTabs('active')" class="cursor-pointer">
                    
                <h1 class="text-primary px-4 py-2 mr-4 border-b-2 border-primary">
                    
                    {{ $t('tab.active') }}
                
                </h1>
                
            </button>
                
            <button @click="toggleTabs('archived')" class="cursor-pointer">

                <h1 class="text-gray-500 px-4 py-2 hover:text-gray-600 hover:border-b-2 hover:border-gray-300">

                    {{ $t('tab.archived') }}

                </h1>
                
            </button>

        </div>

        <div v-if="showArchived">

            <button @click="toggleTabs('active')" class="cursor-pointer">
                    
                <h1 class="text-gray-500 px-4 py-2 mr-4 hover:text-gray-600 hover:border-b-2 hover:border-gray-300">
                    
                    {{ $t('tab.active') }}

                </h1>
                
            </button>
                
            <button @click="toggleTabs('archived')" class="cursor-pointer">

                <h1 class="text-primary px-4 py-2 border-b-2 border-primary">
                    
                    {{ $t('tab.archived') }}
                
                </h1>
                
            </button>

        </div>

    </div>

</template>