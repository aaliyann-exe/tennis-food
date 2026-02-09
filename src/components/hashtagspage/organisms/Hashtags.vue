<script setup>

    import { ref, computed } from 'vue';
    import { useHashtagStore } from '/src/components/stores/hashtagStore';
    import plusIcon from '/src/assets/plusIcon.svg';

    import HashtagsTable from '../molecules/HashtagsTable.vue';
    import HashtagInformation from '../molecules/HashtagInformation.vue';
    import HashtagsFooter from '../atoms/HashtagsFooter.vue';
    import SearchBar from '../atoms/SearchBar.vue';
    import ImportIcon from '../atoms/ImportIcon.vue';

    const hashtagStore = useHashtagStore();
    const hashtags = computed(() => hashtagStore.hashtags);
    const hashtagModalVisible = ref(false);
    const hashtagMode = ref('create');
    const selectedHashtag = ref(null);
    const isOpen = ref(false);

    const toggleModal = () => {

        hashtagModalVisible.value = !hashtagModalVisible.value;

        if(!hashtagModalVisible.value) {

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

    }

    const handleDelete = (hashtag) => {
    
    hashtagStore.deleteHashtag(hashtag.id);

  };

</script>

<template>

    <div class="w-full bg-other flexbox">

        <div class="flex mt-20">
            
            <h1 class="ml-4 text-4xl font-semibold align-left">Hashtags</h1>

            <SearchBar />

            <ImportIcon />

            <button @click="createHashtag" class="flex items-center justify-center w-12 h-12 ml-5 rounded-full cursor-pointer bg-primary hover:bg-primary-active">

                <img :src="plusIcon" class="w-5 h-5 invert">

            </button>

        </div>

        <div>

            <HashtagsTable :hashtags="hashtags" @view="viewHashtag" @edit="editHashtag" @delete="deleteHashtag" />
            
            <HashtagsFooter />

        </div>

        <HashtagInformation v-if="hashtagModalVisible" @close="toggleModal" @save="handleSaveHashtag" @edit="editHashtag" :mode="hashtagMode" :hashtagData="selectedHashtag" />

    </div>

</template>