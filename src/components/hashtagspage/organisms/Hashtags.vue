<script setup>

import { ref, computed } from 'vue';
import { useHashtagStore } from '/src/components/stores/hashtagStore';
import plusIcon from '/src/assets/plusIcon.svg';

import HashtagsTable from '../molecules/HashtagsTable.vue';
import HashtagInformation from '../molecules/HashtagInformation.vue';
import HashtagsFooter from '../atoms/HashtagsFooter.vue';

import Header from '/src/components/header/molecules/Header.vue';

const hashtagStore = useHashtagStore();
const hashtags = computed(() => hashtagStore.hashtags);
const hashtagModalVisible = ref(false);
const hashtagMode = ref('create');
const selectedHashtag = ref(null);
const isOpen = ref(false);

const toggleModal = () => {

    hashtagModalVisible.value = !hashtagModalVisible.value;

    if (!hashtagModalVisible.value) {

        selectedHashtag.value = null;

    }

};

const handleSaveHashtag = (hashtagData) => {

    hashtagModalVisible.value = false;

};

const createHashtag = () => {

    selectedHashtag.value = {};
    hashtagMode.value = 'create';
    hashtagModalVisible.value = true;

};

const viewHashtag = (hashtag) => {

    selectedHashtag.value = hashtag;
    hashtagMode.value = 'view';
    hashtagModalVisible.value = true;

};

const editHashtag = (hashtag) => {

    selectedHashtag.value = hashtag;
    hashtagMode.value = 'edit';
    hashtagModalVisible.value = true;

};

const deleteHashtag = (hashtag) => {

    selectedHashtag.value = hashtag;
    isOpen.value = true;

};

</script>

<template>

    <div class="w-full bg-other flexbox">

        <Header :text="$t('dashboard.hashtags')" @create="createHashtag" />

        <div>

            <HashtagsTable :hashtags="hashtags" @view="viewHashtag" @edit="editHashtag" @delete="deleteHashtag" />

            <HashtagsFooter />

        </div>

        <HashtagInformation v-if="hashtagModalVisible" @close="toggleModal" @save="handleSaveHashtag"
            @edit="editHashtag" :mode="hashtagMode" :hashtagData="selectedHashtag" />

    </div>

</template>