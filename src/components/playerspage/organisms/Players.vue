<script setup>
import { ref, computed } from "vue";
import { usePlayerStore } from "/src/components/stores/playerStore";
import { useI18n } from "vue-i18n";

import PlayersTable from "../molecules/PlayersTable.vue";
import PlayerInformation from "../molecules/PlayerInformation.vue";
import PlayersFooter from "../atoms/PlayersFooter.vue";
import Tabs from "../molecules/Tabs.vue";
import EmptyTab from "../atoms/EmptyTab.vue";
import Header from "/src/components/header/molecules/Header.vue";
import FilterDropdown from "/src/components/header/atoms/FilterDropdown.vue";

const { t } = useI18n();

const playerStore = usePlayerStore();
const playerModalVisible = ref(false);
const playerMode = ref("create");
const selectedPlayer = ref(null);
const isArchivedTab = ref(false);

const searchValue = ref("");

const searchPlayer = (search) => {
  searchValue.value = search;
};

const filteredPlayers = computed(() => {
  if (selectedAgeGroup.value === t("player.all")) {
    return playerStore.players;
  }

  return playerStore.players.filter(
    (player) => player.ageGroup === selectedAgeGroup.value,
  );
});

const searchedPlayers = computed(() => {
  const query = searchValue.value.toLowerCase();

  if (!query) return filteredPlayers.value;

  return filteredPlayers.value.filter((player) =>
    player.fName.toLowerCase().includes(query),
  );
});

const activePlayers = computed(() =>
  isNormalOrder.value
    ? searchedPlayers.value.filter((player) => player.status === true)
    : searchedPlayers.value
        .filter((player) => player.status === true)
        .reverse(),
);

const archivedPlayers = computed(() =>
  isNormalOrder.value
    ? searchedPlayers.value.filter((player) => player.status === false)
    : searchedPlayers.value
        .filter((player) => player.status === false)
        .reverse(),
);

const selectedAgeGroup = ref(t("player.all"));

const ageGroupOptions = [
  t("player.all"),
  t("player.u12"),
  t("player.a12"),
  t("player.a18"),
  t("player.a30"),
  t("player.a50"),
];

const toggleModal = () => {
  playerModalVisible.value = !playerModalVisible.value;

  if (!playerModalVisible.value) {
    selectedPlayer.value = null;
  }
};

const handleSavePlayer = () => {
  playerModalVisible.value = false;
};

const createPlayer = () => {
  selectedPlayer.value = {};
  playerMode.value = "create";
  playerModalVisible.value = true;
};

const viewPlayer = (player) => {
  selectedPlayer.value = player;
  playerMode.value = "view";
  playerModalVisible.value = true;
};

const editPlayer = (player) => {
  selectedPlayer.value = player;
  playerMode.value = "edit";
  playerModalVisible.value = true;
};

const togglePlayerStatus = (player) => {
  const updatedPlayer = {
    ...player,
    status: !player.status,
  };

  playerStore.updatePlayer(updatedPlayer);
};

const isNormalOrder = ref(true);
</script>

<template>
  <div class="w-full bg-other flexbox">
    <Header
      :text="$t('dashboard.players')"
      :modelValue="searchValue"
      searchBar
      importButton
      addButton
      @create="createPlayer"
      @search="searchPlayer"
    >
      <template #filters>
        <FilterDropdown
          :label="$t('table.ageGroup')"
          :options="ageGroupOptions"
          v-model="selectedAgeGroup"
        />
      </template>
    </Header>

    <Tabs v-model:show-archived="isArchivedTab" />

    <div v-if="!isArchivedTab">
      <div v-if="activePlayers.length > 0">
        <PlayersTable
          :players="activePlayers"
          @view="viewPlayer"
          @edit="editPlayer"
          @toggle-status="togglePlayerStatus"
          @normal-order="isNormalOrder = true"
          @reverse-order="isNormalOrder = false"
        />

        <PlayersFooter />
      </div>

      <EmptyTab v-else />
    </div>

    <div v-else>
      <div v-if="archivedPlayers.length > 0">
        <PlayersTable
          :players="archivedPlayers"
          @view="viewPlayer"
          @edit="editPlayer"
          @toggle-status="togglePlayerStatus"
          @normal-order="isNormalOrder = true"
          @reverse-order="isNormalOrder = false"
        />

        <PlayersFooter />
      </div>

      <EmptyTab v-else />
    </div>

    <PlayerInformation
      v-if="playerModalVisible"
      @close="toggleModal"
      @save="handleSavePlayer"
      @edit="editPlayer"
      :mode="playerMode"
      :playerData="selectedPlayer"
    />
  </div>
</template>
