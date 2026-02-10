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
    const clubModalVisible = ref(false);
    const clubMode = ref('create');
    const selectedClub = ref(null);
    const isArchivedTab = ref(false);
    const activeClubs = computed( () => clubStore.clubs.filter(club => club.status === true) );
    const archivedClubs = computed( () => clubStore.clubs.filter(club => club.status === false) );

    const toggleModal = () => {

        clubModalVisible.value = !clubModalVisible.value;

        if(!clubModalVisible.value) {

            selectedClub.value = null;

        }

    };

    const handleSaveClub = () => {

        clubModalVisible.value = false;

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

    const toggleClubStatus = (club) => {

        const updatedClub = {

            ...club,
            status: !club.status,

        };

        clubStore.updateClub(updatedClub);

    };

</script>

<template>

    <div class="w-full bg-other flexbox">

        <div class="flex mt-20">
            
            <h1 class="ml-4 text-4xl font-semibold align-left">Clubs</h1>

            <SearchBar />

            <ImportIcon />

            <button @click="createClub" class="flex items-center justify-center w-12 h-12 ml-5 rounded-full cursor-pointer bg-primary hover:bg-primary-active">

                <img :src="plusIcon" class="w-5 h-5 invert">

            </button>

        </div>

        <Tabs v-model:show-archived="isArchivedTab"/>

        <div v-if="!isArchivedTab">

            <ClubsTable :clubs="activeClubs" @view="viewClub" @edit="editClub" @toggle-status="toggleClubStatus" />
            
            <ClubFooter />

        </div>

        <div v-else>

            <div v-if="(archivedClubs.length > 0)">

                <ClubsTable :clubs="archivedClubs" @view="viewClub" @edit="editClub" @toggle-status="toggleClubStatus" />
                
                <ClubFooter />

            </div>

            <ArchivedTab v-else />

        </div>

        <ClubInformation v-if="clubModalVisible" @close="toggleModal" @save="handleSaveClub" @edit="editClub" :mode="clubMode" :clubData="selectedClub" />

    </div>

</template>