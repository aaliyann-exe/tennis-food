<script setup>

    import { ref, computed } from 'vue';
    import { usePlayerStore } from '/src/components/stores/playerStore';

    import PlayersTable from '../molecules/PlayersTable.vue';
    import PlayerInformation from '../molecules/PlayerInformation.vue';
    import PlayersFooter from '../atoms/PlayersFooter.vue';

    import Tabs from '../molecules/Tabs.vue';
    import EmptyTab from '../atoms/EmptyTab.vue';
    import Header from '/src/components/header/molecules/Header.vue';

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

    const handleSavePlayer = () => {

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

        <Header :text="$t('dashboard.players')" @create="createPlayer" />

        <Tabs v-model:show-archived="isArchivedTab"/>

        <div v-if="!isArchivedTab">

            <div v-if="(archivedPlayers.length > 0)">

                <PlayersTable :players="activePlayers" @view="viewPlayer" @edit="editPlayer" @toggle-status="togglePlayerStatus" />
                
                <PlayersFooter />

            </div>

            <EmptyTab v-else />

        </div>

        <div v-else>

            <div v-if="(archivedPlayers.length > 0)">

                <PlayersTable :players="archivedPlayers" @view="viewPlayer" @edit="editPlayer" @toggle-status="togglePlayerStatus" />
                
                <PlayersFooter />

            </div>

            <EmptyTab v-else />

        </div>

        <PlayerInformation v-if="playerModalVisible" @close="toggleModal" @save="handleSavePlayer" @edit="editPlayer" :mode="playerMode" :playerData="selectedPlayer" />

    </div>

</template>