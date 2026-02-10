<script setup>

    import { ref, computed } from 'vue';
    import { useTrainerStore } from '/src/components/stores/trainerStore';
    import plusIcon from '/src/assets/plusIcon.svg';

    import TrainersTable from '../molecules/TrainersTable.vue';
    import TrainerInformation from '../molecules/TrainerInformation.vue';
    import TrainersFooter from '../atoms/TrainersFooter.vue';
    import SearchBar from '../atoms/SearchBar.vue';
    import ImportIcon from '../atoms/ImportIcon.vue';
    import Tabs from '../molecules/Tabs.vue';
    import ArchivedTab from '../atoms/ArchivedTab.vue';
    import EmptyTab from '../atoms/EmptyTab.vue';

    const trainerStore = useTrainerStore();
    const trainerModalVisible = ref(false);
    const trainerMode = ref('create');
    const selectedTrainer = ref(null);
    const isArchivedTab = ref(false);
    const activeTrainers = computed( () => trainerStore.trainers.filter(trainer => trainer.status === true) );
    const archivedTrainers = computed( () => trainerStore.trainers.filter(trainer => trainer.status === false) );
    const hasTrainers = computed(() => trainerStore.trainers.length > 0);

    const toggleModal = () => {

        trainerModalVisible.value = !trainerModalVisible.value;

        if(!trainerModalVisible.value) {

            selectedTrainer.value = null;

        }

    };

    const handleSaveTrainer = (trainerData) => {

        trainerModalVisible.value = false;

    };

    const createTrainer = () => {

        selectedTrainer.value = {};
        trainerMode.value = 'create';
        trainerModalVisible.value = true;

    };

    const viewTrainer = (trainer) => {

        selectedTrainer.value = trainer;
        trainerMode.value = 'view';
        trainerModalVisible.value = true;

    };

    const editTrainer = (trainer) => {

        selectedTrainer.value = trainer;
        trainerMode.value = 'edit';
        trainerModalVisible.value = true;

    };

    const toggleTrainerStatus = (trainer) => {

        const updatedTrainer = {

            ...trainer,
            status: !trainer.status,

        };

        trainerStore.updateTrainer(updatedTrainer);

    };

</script>

<template>

    <div class="w-full bg-other flexbox">

         <div class="flex mt-20">

                <h1 class="ml-4 text-4xl font-semibold align-left">Trainers</h1>

                <SearchBar />

                <ImportIcon />

                <button @click="createTrainer" class="flex items-center justify-center w-12 h-12 ml-5 rounded-full cursor-pointer bg-primary hover:bg-primary-active">
                    
                    <img :src="plusIcon" class="w-5 h-5 invert">

                </button>

            </div>

            <Tabs v-model:show-archived="isArchivedTab" />
        
        <div v-if="!hasTrainers" class="items-center justify-center min-h-screen">

            <EmptyTab @add-trainer="createTrainer" />

        </div>

        <div v-else>

            <div v-if="!hasTrainers" class="items-center justify-center min-h-screen">

                <EmptyTab @add-trainer="createTrainer" />

            </div>

            <div v-else>

                <div v-if="!isArchivedTab">

                    <TrainersTable :trainers="activeTrainers" @view="viewTrainer" @edit="editTrainer" @toggle-status="toggleTrainerStatus" />
                    
                    <TrainersFooter />

                </div>

                <div v-else>

                    <div v-if="archivedTrainers.length > 0">

                        <TrainersTable :trainers="archivedTrainers" @view="viewTrainer" @edit="editTrainer" @toggle-status="toggleTrainerStatus" />
                        
                        <TrainersFooter />

                    </div>

                    <ArchivedTab v-else />

                </div>

            </div>

        </div>

        <TrainerInformation v-if="trainerModalVisible" @close="toggleModal" @save="handleSaveTrainer" @edit="editTrainer" :mode="trainerMode" :trainerData="selectedTrainer" />
   
   </div>
   
</template>