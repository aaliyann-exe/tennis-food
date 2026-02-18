<script setup>

import { ref, computed } from 'vue';
import { useTrainerStore } from '/src/components/stores/trainerStore';

import TrainersTable from '../molecules/TrainersTable.vue';
import TrainerInformation from '../molecules/TrainerInformation.vue';
import TrainersFooter from '../atoms/TrainersFooter.vue';

import Tabs from '../molecules/Tabs.vue';
import NoDataTab from '../atoms/NoDataTab.vue';
import EmptyTab from '../atoms/EmptyTab.vue';
import Header from '/src/components/header/molecules/Header.vue';

const trainerStore = useTrainerStore();
const trainerModalVisible = ref(false);
const trainerMode = ref('create');
const selectedTrainer = ref(null);
const isArchivedTab = ref(false);
const activeTrainers = computed(() => trainerStore.trainers.filter(trainer => trainer.status === true));
const archivedTrainers = computed(() => trainerStore.trainers.filter(trainer => trainer.status === false));
const hasTrainers = computed(() => trainerStore.trainers.length > 0);

const toggleModal = () => {

    trainerModalVisible.value = !trainerModalVisible.value;

    if (!trainerModalVisible.value) {

        selectedTrainer.value = null;

    }

};

const handleSaveTrainer = () => {

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

        <Header :text="$t('dashboard.trainers')" @create="createTrainer" />

        <Tabs v-model:show-archived="isArchivedTab" />

        <div v-if="!hasTrainers" class="items-center justify-center min-h-screen">

            <EmptyTab @add-trainer="createTrainer" />

        </div>

        <div v-else>

            <div v-if="!isArchivedTab">

                <div v-if="(activeTrainers.length > 0)">

                    <TrainersTable :trainers="activeTrainers" @view="viewTrainer" @edit="editTrainer"
                        @toggle-status="toggleTrainerStatus" />

                    <TrainersFooter />

                </div>

                <NoDataTab v-else />

            </div>

            <div v-else>

                <div v-if="(archivedTrainers.length > 0)">

                    <TrainersTable :trainers="archivedTrainers" @view="viewTrainer" @edit="editTrainer"
                        @toggle-status="toggleTrainerStatus" />

                    <TrainersFooter />

                </div>

                <NoDataTab v-else />

            </div>

        </div>

        <TrainerInformation v-if="trainerModalVisible" @close="toggleModal" @save="handleSaveTrainer"
            @edit="editTrainer" :mode="trainerMode" :trainerData="selectedTrainer" />

    </div>

</template>