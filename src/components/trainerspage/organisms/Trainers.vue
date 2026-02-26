<script setup>
import { ref, computed } from "vue";
import { useTrainerStore } from "/src/components/stores/trainerStore";

import TrainersTable from "../molecules/TrainersTable.vue";
import TrainerInformation from "../molecules/TrainerInformation.vue";
import TrainersFooter from "../atoms/TrainersFooter.vue";
import Tabs from "../molecules/Tabs.vue";
import NoDataTab from "../atoms/NoDataTab.vue";
import EmptyTab from "../atoms/EmptyTab.vue";
import Header from "/src/components/header/molecules/Header.vue";

const trainerStore = useTrainerStore();
const trainerModalVisible = ref(false);
const trainerMode = ref("create");
const selectedTrainer = ref(null);
const isArchivedTab = ref(false);

const hasTrainers = computed(() => {
  if (trainerStore.trainers.length > 0) return true;
  else return false;
});

const searchValue = ref("");

const searchTrainer = (search) => {
  searchValue.value = search;
};

const searchedTrainers = computed(() => {
  const query = searchValue.value.toLowerCase();

  if (!query) return trainerStore.trainers;

  return trainerStore.trainers.filter((trainer) =>
    trainer.fName.toLowerCase().includes(query),
  );
});

const activeTrainers = computed(() =>
  isNormalOrder.value
    ? searchedTrainers.value.filter((trainer) => trainer.status === true)
    : searchedTrainers.value
        .filter((trainer) => trainer.status === true)
        .reverse(),
);

const archivedTrainers = computed(() =>
  isNormalOrder.value
    ? searchedTrainers.value.filter((trainer) => trainer.status === false)
    : searchedTrainers.value
        .filter((trainer) => trainer.status === false)
        .reverse(),
);

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
  trainerMode.value = "create";
  trainerModalVisible.value = true;
};

const viewTrainer = (trainer) => {
  selectedTrainer.value = trainer;
  trainerMode.value = "view";
  trainerModalVisible.value = true;
};

const editTrainer = (trainer) => {
  selectedTrainer.value = trainer;
  trainerMode.value = "edit";
  trainerModalVisible.value = true;
};

const toggleTrainerStatus = (trainer) => {
  const updatedTrainer = {
    ...trainer,
    status: !trainer.status,
  };

  trainerStore.updateTrainer(updatedTrainer);
};

const isNormalOrder = ref(true);
</script>

<template>
  <div class="w-full bg-other flexbox">
    <Header
      :text="$t('dashboard.trainers')"
      :modelValue="searchValue"
      searchBar
      importButton
      addButton
      @create="createTrainer"
      @search="searchTrainer"
    />

    <Tabs v-model:show-archived="isArchivedTab" />

    <div v-if="hasTrainers">
      <div v-if="!isArchivedTab">
        <div v-if="activeTrainers.length > 0">
          <TrainersTable
            :trainers="activeTrainers"
            @view="viewTrainer"
            @edit="editTrainer"
            @toggle-status="toggleTrainerStatus"
          />

          <TrainersFooter />
        </div>

        <NoDataTab v-else />
      </div>

      <div v-else>
        <div v-if="archivedTrainers.length > 0">
          <TrainersTable
            :trainers="archivedTrainers"
            @view="viewTrainer"
            @edit="editTrainer"
            @toggle-status="toggleTrainerStatus"
          />

          <TrainersFooter />
        </div>

        <NoDataTab v-else />
      </div>
    </div>

    <div v-else class="items-center justify-center h-max">
      <EmptyTab @add-trainer="createTrainer" />
    </div>

    <TrainerInformation
      v-if="trainerModalVisible"
      @close="toggleModal"
      @save="handleSaveTrainer"
      @edit="editTrainer"
      :mode="trainerMode"
      :trainerData="selectedTrainer"
    />
  </div>
</template>
