<script setup>
import { ref, computed } from "vue";
import { useCourtStore } from "/src/components/stores/courtStore";

import CourtsTable from "../molecules/CourtsTable.vue";
import CourtInformation from "../molecules/CourtInformation.vue";
import CourtsFooter from "../atoms/CourtsFooter.vue";
import Tabs from "../molecules/Tabs.vue";
import ArchivedTab from "../atoms/ArchivedTab.vue";
import Header from "/src/components/header/molecules/Header.vue";

const courtStore = useCourtStore();
const courtModalVisible = ref(false);
const courtMode = ref("create");
const selectedCourt = ref(null);
const isArchivedTab = ref(false);
const activeCourts = computed(() =>
  courtStore.courts.filter((court) => court.status === true),
);
const archivedCourts = computed(() =>
  courtStore.courts.filter((court) => court.status === false),
);

const toggleModal = () => {
  courtModalVisible.value = !courtModalVisible.value;

  if (!courtModalVisible.value) {
    selectedCourt.value = null;
  }
};

const handleSaveCourt = () => {
  courtModalVisible.value = false;
};

const createCourt = () => {
  selectedCourt.value = {};
  courtMode.value = "create";
  courtModalVisible.value = true;
};

const viewCourt = (court) => {
  selectedCourt.value = court;
  courtMode.value = "view";
  courtModalVisible.value = true;
};

const editCourt = (court) => {
  selectedCourt.value = court;
  courtMode.value = "edit";
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
    <Header :text="$t('dashboard.courts')" @create="createCourt" />

    <Tabs v-model:show-archived="isArchivedTab" />

    <div v-if="!isArchivedTab">
      <CourtsTable
        :courts="activeCourts"
        @view="viewCourt"
        @edit="editCourt"
        @toggle-status="toggleCourtStatus"
      />

      <CourtsFooter />
    </div>

    <div v-else>
      <div v-if="archivedCourts.length > 0">
        <CourtsTable
          :courts="archivedCourts"
          @view="viewCourt"
          @edit="editCourt"
          @toggle-status="toggleCourtStatus"
        />

        <CourtsFooter />
      </div>

      <ArchivedTab v-else />
    </div>

    <CourtInformation
      v-if="courtModalVisible"
      @close="toggleModal"
      @save="handleSaveCourt"
      @edit="editCourt"
      :mode="courtMode"
      :courtData="selectedCourt"
    />
  </div>
</template>
