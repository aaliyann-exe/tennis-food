<script setup>

    import { ref, computed } from 'vue';
    import { useClubStore } from '/src/components/stores/clubStore';
    import plusIcon from '/src/assets/plusIcon.svg';

    import ClubsTable from '/src/components/clubspage/molecules/ClubsTable.vue';
    import ClubInformation from '/src/components/clubspage/molecules/ClubInformation.vue';
    import ClubFooter from '/src/components/clubspage/atoms/ClubFooter.vue';
    import SearchBar from '/src/components/clubspage/atoms/SearchBar.vue';
    import ImportIcon from '/src/components/clubspage/atoms/ImportIcon.vue';
    import Tabs from '/src/components/clubspage/molecules/Tabs.vue';
    import ArchivedTab from '/src/components/clubspage/atoms/ArchivedTab.vue';

    const clubStore = useClubStore();
    const clubs = computed(() => clubStore.clubs);
    const clubModalVisible = ref(false);
    const clubMode = ref('create');
    const selectedClub = ref(null);

    const toggleModal = () => {

        clubModalVisible.value = !clubModalVisible.value;

        if(!clubModalVisible.value) {

            selectedClub.value = null;

        }

    };

    const handleSaveClub = () => {

        toggleModal();

    };

    const createClub = () => {

        selectedClub.value = {};
        clubMode.value = 'create';
        clubModalVisible.value = true;

    };

    const viewClub = (club) => {

        selectedClub.value = club;
        clubMode.value = 'view';
        clubModalVisible.value = true;

    };

    const editClub = (club) => {

        selectedClub.value = club;
        clubMode.value = 'edit';
        clubModalVisible.value = true;

    };

    const isArchivedTab = ref(false);

</script>

<template>

    <div class="bg-other flexbox w-full">

        <div class="flex mt-20">
            
            <h1 class="text-4xl font-semibold align-left ml-4">Clubs</h1>

            <SearchBar />

            <ImportIcon />

            <button @click="createClub" class="bg-primary w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary-active ml-5 cursor-pointer">

                <img :src="plusIcon" class="w-5 h-5 invert">

            </button>

        </div>

        <Tabs v-model:show-archived="isArchivedTab"/>

        <ArchivedTab v-if="isArchivedTab"/>

        <div v-if="!isArchivedTab">
            
            <ClubsTable :clubs="clubs" @view="viewClub" @edit="editClub" />

            <ClubFooter />

        </div>

        <ClubInformation v-if="clubModalVisible" @close="toggleModal" @save="handleSaveClub" @edit="editClub" :mode="clubMode" :clubData="selectedClub" />

    </div>

</template>