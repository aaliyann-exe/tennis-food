<script setup>
import { ref, computed } from "vue";
import { useClubStore } from "/src/components/stores/clubStore";

import ClubsTable from "/src/components/clubspage/molecules/ClubsTable.vue";
import ClubInformation from "/src/components/clubspage/molecules/ClubInformation.vue";
import ClubFooter from "/src/components/clubspage/atoms/ClubFooter.vue";
import Tabs from "/src/components/clubspage/molecules/Tabs.vue";
import EmptyTab from "/src/components/clubspage/atoms/EmptyTab.vue";
import Header from "/src/components/header/molecules/Header.vue";

const clubStore = useClubStore();
const clubModalVisible = ref(false);
const clubMode = ref("create");
const selectedClub = ref(null);
const isArchivedTab = ref(false);
const activeClubs = computed(() =>
  clubStore.clubs.filter((club) => club.status === true),
);
const archivedClubs = computed(() =>
  clubStore.clubs.filter((club) => club.status === false),
);

const toggleModal = () => {
  clubModalVisible.value = !clubModalVisible.value;

  if (!clubModalVisible.value) {
    selectedClub.value = null;
  }
};

const handleSaveClub = () => {
  clubModalVisible.value = false;
};

const createClub = () => {
  selectedClub.value = {};
  clubMode.value = "create";
  clubModalVisible.value = true;
};

const viewClub = (club) => {
  selectedClub.value = club;
  clubMode.value = "view";
  clubModalVisible.value = true;
};

const editClub = (club) => {
  selectedClub.value = club;
  clubMode.value = "edit";
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
    <Header
      :text="$t('dashboard.clubs')"
      searchBar
      importButton
      addButton
      @create="createClub"
    />

    <Tabs v-model:show-archived="isArchivedTab" />

    <div v-if="!isArchivedTab">
      <div v-if="activeClubs.length > 0">
        <ClubsTable
          :clubs="activeClubs"
          @view="viewClub"
          @edit="editClub"
          @toggle-status="toggleClubStatus"
        />

        <ClubFooter />
      </div>

      <EmptyTab v-else />
    </div>

    <div v-else>
      <div v-if="archivedClubs.length > 0">
        <ClubsTable
          :clubs="archivedClubs"
          @view="viewClub"
          @edit="editClub"
          @toggle-status="toggleClubStatus"
        />

        <ClubFooter />
      </div>

      <EmptyTab v-else />
    </div>

    <ClubInformation
      v-if="clubModalVisible"
      @close="toggleModal"
      @save="handleSaveClub"
      @edit="editClub"
      :mode="clubMode"
      :clubData="selectedClub"
    />
  </div>
</template>
