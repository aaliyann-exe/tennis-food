<script setup>

    import { ref, computed } from 'vue';
    import { usePlayerStore } from '/src/components/stores/playerStore';
    import plusIcon from '/src/assets/plusIcon.svg';

    import PlayersTable from '../molecules/PlayersTable.vue';
    import PlayerInformation from '../molecules/PlayerInformation.vue';
    import PlayersFooter from '../atoms/PlayersFooter.vue';
    import SearchBar from '../atoms/SearchBar.vue';
    import ImportIcon from '../atoms/ImportIcon.vue';
    import Tabs from '../molecules/Tabs.vue';
    import ArchivedTab from '../atoms/ArchivedTab.vue';

    const playerStore = usePlayerStore();
    const playerModalVisible = ref(false);
    const playerMode = ref('create');
    const selectedPlayer = ref(null);
    const isArchivedTab = ref(false);
    const activePlayers = computed( () => playerStore.players.filter(player => player.status === true) );
    const archivedPlayers = computed( () => playerStore.players.filter(player => player.status === false) );

    const toggleModal = () => {

        playerModalVisible.value = !playerModalVisible.value;

        if(!playerModalVisible.value) {

            selectedPlayer.value = null;

        }

    };

    const handleSavePlayer = (playerData) => {

        playerModalVisible.value = false;

    };

    const createPlayer = () => {

        selectedPlayer.value = {};
        playerMode.value = 'create';
        playerModalVisible.value = true;

    };

    const viewPlayer = (player) => {

        selectedPlayer.value = player;
        playerMode.value = 'view';
        playerModalVisible.value = true;

    };

    const editPlayer = (player) => {

        selectedPlayer.value = player;
        playerMode.value = 'edit';
        playerModalVisible.value = true;

    };

    const togglePlayerStatus = (player) => {

        const updatedPlayer = {

            ...player,
            status: !player.status,

        };

        playerStore.updatePlayer(updatedPlayer);

    };

</script>

<template>

    <div class="w-full bg-other flexbox">

        <div class="flex mt-20">
            
            <h1 class="ml-4 text-4xl font-semibold align-left">Players</h1>

            <SearchBar />

            <ImportIcon />

            <button @click="createPlayer" class="flex items-center justify-center w-12 h-12 ml-5 rounded-full cursor-pointer bg-primary hover:bg-primary-active">

                <img :src="plusIcon" class="w-5 h-5 invert">

            </button>

        </div>

        <Tabs v-model:show-archived="isArchivedTab"/>

        <div v-if="!isArchivedTab">

            <PlayersTable :players="activePlayers" @view="viewPlayer" @edit="editPlayer" @toggle-status="togglePlayerStatus" />
            
            <PlayersFooter />

        </div>

        <div v-else>

            <div v-if="(archivedPlayers.length > 0)">

                <PlayersTable :players="archivedPlayers" @view="viewPlayer" @edit="editPlayer" @toggle-status="togglePlayerStatus" />
                
                <PlayersFooter />

            </div>

            <ArchivedTab v-else />

        </div>

        <PlayerInformation v-if="playerModalVisible" @close="toggleModal" @save="handleSavePlayer" @edit="editPlayer" :mode="playerMode" :playerData="selectedPlayer" />

    </div>

</template>