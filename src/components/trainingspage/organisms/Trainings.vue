<script setup>

    import { ref, computed } from 'vue';
    import { useTrainingStore } from '/src/components/stores/trainingStore';
    import plusIcon from '/src/assets/plusIcon.svg';

    import TrainingsTable from '../molecules/TrainingsTable.vue';
    import TrainingInformation from '../molecules/TrainingInformation.vue';
    import TrainingsFooter from '../atoms/TrainingsFooter.vue';
    import SearchBar from '../atoms/SearchBar.vue';
    import ImportIcon from '../atoms/ImportIcon.vue';
    import Tabs from '../molecules/Tabs.vue';
    import ArchivedTab from '../atoms/ArchivedTab.vue';
    import EmptyTab from '../atoms/EmptyTab.vue';

    const trainingStore = useTrainingStore();
    const trainingModalVisible = ref(false);
    const trainingMode = ref('create');
    const selectedTraining = ref(null);
    const isArchivedTab = ref(false);
    const activeTrainings = computed( () => trainingStore.trainings.filter(training => training.status === true) );
    const archivedTrainings = computed( () => trainingStore.trainings.filter(training => training.status === false) );
    const hasTrainings = computed(() => trainingStore.trainings.length > 0);

    const toggleModal = () => {

        trainingModalVisible.value = !trainingModalVisible.value;

        if(!trainingModalVisible.value) {

            selectedTraining.value = null;

        }

    };

    const handleSaveTraining = (trainingData) => {

        trainingModalVisible.value = false;

    };

    const createTraining = () => {

        selectedTraining.value = {};
        trainingMode.value = 'create';
        trainingModalVisible.value = true;

    };

    const viewTraining = (training) => {

        selectedTraining.value = training;
        trainingMode.value = 'view';
        trainingModalVisible.value = true;

    };

    const editTraining = (training) => {

        selectedTraining.value = training;
        trainingMode.value = 'edit';
        trainingModalVisible.value = true;

    };

    const toggleTrainingStatus = (training) => {

        const updatedTraining = {

            ...training,
            status: !training.status,

        };

        trainingStore.updateTraining(updatedTraining);

    };

</script>

<template>

    <div class="w-full bg-other flexbox">

         <div class="flex mt-20">

                <h1 class="ml-4 text-4xl font-semibold align-left">Trainings</h1>

                <SearchBar />

                <ImportIcon />

                <button @click="createTraining" class="flex items-center justify-center w-12 h-12 ml-5 rounded-full cursor-pointer bg-primary hover:bg-primary-active">
                    
                    <img :src="plusIcon" class="w-5 h-5 invert">

                </button>

            </div>

            <Tabs v-model:show-archived="isArchivedTab" />
        
        <div v-if="!hasTrainings" class="items-center justify-center min-h-screen">

            <EmptyTab @add-training="createTraining" />

        </div>

        <div v-else>

            <div v-if="!hasTrainings" class="items-center justify-center min-h-screen">

                <EmptyTab @add-training="createTraining" />

            </div>

            <div v-else>

                <div v-if="!isArchivedTab">

                    <TrainingsTable :trainings="activeTrainings" @view="viewTraining" @edit="editTraining" @toggle-status="toggleTrainingStatus" />
                    
                    <TrainingsFooter />

                </div>

                <div v-else>

                    <div v-if="archivedTrainings.length > 0">

                        <TrainingsTable :trainings="archivedTrainings" @view="viewTraining" @edit="editTraining" @toggle-status="toggleTrainingStatus" />
                        
                        <TrainingsFooter />

                    </div>

                    <ArchivedTab v-else />

                </div>

            </div>

        </div>

        <TrainingInformation v-if="trainingModalVisible" @close="toggleModal" @save="handleSaveTraining" @edit="editTraining" :mode="trainingMode" :trainingData="selectedTraining" />
   
   </div>
   
</template>