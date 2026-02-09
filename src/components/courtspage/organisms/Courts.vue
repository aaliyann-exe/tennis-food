<script setup>

    import { ref, computed } from 'vue';
    import { useCourtStore } from '/src/components/stores/courtStore';
    import plusIcon from '/src/assets/plusIcon.svg';

    import CourtsTable from '../molecules/CourtsTable.vue';
    import CourtInformation from '../molecules/CourtInformation.vue';
    import CourtsFooter from '../atoms/CourtsFooter.vue';
    import SearchBar from '../atoms/SearchBar.vue';
    import ImportIcon from '../atoms/ImportIcon.vue';
    import Tabs from '../molecules/Tabs.vue';
    import ArchivedTab from '../atoms/ArchivedTab.vue';

    const courtStore = useCourtStore();
    const courtModalVisible = ref(false);
    const courtMode = ref('create');
    const selectedCourt = ref(null);
    const isArchivedTab = ref(false);
    const activeCourts = computed( () => courtStore.courts.filter(court => court.status === true) );
    const archivedCourts = computed( () => courtStore.courts.filter(court => court.status === false) );

    const toggleModal = () => {

        courtModalVisible.value = !courtModalVisible.value;

        if(!courtModalVisible.value) {

            selectedCourt.value = null;

        }

    };

    const handleSaveCourt = () => {

        courtModalVisible.value = false;

    };

    const createCourt = () => {

        selectedCourt.value = {};
        courtMode.value = 'create';
        courtModalVisible.value = true;

    };

    const viewCourt = (court) => {

        selectedCourt.value = court;
        courtMode.value = 'view';
        courtModalVisible.value = true;

    };

    const editCourt = (court) => {

        selectedCourt.value = court;
        courtMode.value = 'edit';
        courtModalVisible.value = true;

    };

    const toggleCourtStatus = (court) => {

        const updatedCourt = {

            ...court,
            status: !court.status,

        };

        courtStore.updateCourt(updatedCourt);

    };

</script>

<template>

    <div class="w-full bg-other flexbox">

        <div class="flex mt-20">
            
            <h1 class="ml-4 text-4xl font-semibold align-left">Courts</h1>

            <SearchBar />

            <ImportIcon />

            <button @click="createCourt" class="flex items-center justify-center w-12 h-12 ml-5 rounded-full cursor-pointer bg-primary hover:bg-primary-active">

                <img :src="plusIcon" class="w-5 h-5 invert">

            </button>

        </div>

        <Tabs v-model:show-archived="isArchivedTab"/>

        <div v-if="!isArchivedTab">

            <CourtsTable :courts="activeCourts" @view="viewCourt" @edit="editCourt" @toggle-status="toggleCourtStatus" />
            
            <CourtsFooter />

        </div>

        <div v-else>

            <div v-if="(archivedCourts.length > 0)">

                <CourtsTable :courts="archivedCourts" @view="viewCourt" @edit="editCourt" @toggle-status="toggleCourtStatus" />
                
                <CourtsFooter />

            </div>

            <ArchivedTab v-else />

        </div>

        <CourtInformation v-if="courtModalVisible" @close="toggleModal" @save="handleSaveCourt" @edit="editCourt" :mode="courtMode" :courtData="selectedCourt" />

    </div>

</template>