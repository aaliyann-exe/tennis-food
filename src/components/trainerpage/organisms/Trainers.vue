<script setup>

    import { ref } from 'vue';
    import Tabs from '../molecules/Tabs.vue';
    import ArchivedTab from '../atoms/ArchivedTab.vue';
    import ActiveTab from '../atoms/ActiveTab.vue'
    import SearchBar from '../atoms/SearchBar.vue';
    import ImportIcon from '../atoms/ImportIcon.vue';
    import plusIcon from '/src/assets/plusIcon.svg';

    const isArchivedTab = ref(false);

</script>

<template>

    <div class="bg-other flexbox w-full">

        <div class="flex mt-20">
            
            <h1 class="text-4xl font-semibold align-left ml-4">Trainers</h1>

            <SearchBar />

            <ImportIcon />

            <button @click="createClub" class="bg-primary w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary-active ml-5 cursor-pointer">

                <img :src="plusIcon" class="w-5 h-5 invert">

            </button>

        </div>

        <Tabs v-model:show-archived="isArchivedTab"/>

        <ArchivedTab v-if="isArchivedTab"/>

        <ActiveTab v-else />

    </div>

</template>