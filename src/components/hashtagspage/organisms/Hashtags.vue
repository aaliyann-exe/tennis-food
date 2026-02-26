<script setup>
import { ref, computed } from "vue";
import { useHashtagStore } from "/src/components/stores/hashtagStore";

import HashtagsTable from "../molecules/HashtagsTable.vue";
import HashtagInformation from "../molecules/HashtagInformation.vue";
import HashtagsFooter from "../atoms/HashtagsFooter.vue";

import Header from "/src/components/header/molecules/Header.vue";

const hashtagStore = useHashtagStore();
const hashtagModalVisible = ref(false);
const hashtagMode = ref("create");
const selectedHashtag = ref(null);
const isOpen = ref(false);

const searchValue = ref("");

const searchHashtag = (search) => {
  searchValue.value = search;
};

const isNormalOrder = ref(true);

const searchedHashtags = computed(() => {
  const query = searchValue.value.toLowerCase();

  if (!query) return hashtagStore.hashtags;

  if (isNormalOrder) {
    hashtagStore.hashtags.filter((hashtag) =>
      hashtag.title.toLowerCase().includes(query),
    );
  }

  if (!isNormalOrder) {
    hashtagStore.hashtags.filter((hashtag) =>
      hashtag.title.toLowerCase().includes(query).reverse(),
    );
  }
});

const toggleModal = () => {
  hashtagModalVisible.value = !hashtagModalVisible.value;

  if (!hashtagModalVisible.value) {
    selectedHashtag.value = null;
  }
};

const handleSaveHashtag = () => {
  hashtagModalVisible.value = false;
};

const createHashtag = () => {
  selectedHashtag.value = {};
  hashtagMode.value = "create";
  hashtagModalVisible.value = true;
};

const viewHashtag = (hashtag) => {
  selectedHashtag.value = hashtag;
  hashtagMode.value = "view";
  hashtagModalVisible.value = true;
};

const editHashtag = (hashtag) => {
  selectedHashtag.value = hashtag;
  hashtagMode.value = "edit";
  hashtagModalVisible.value = true;
};

const deleteHashtag = (hashtag) => {
  selectedHashtag.value = hashtag;
  isOpen.value = true;
};
</script>

<template>
  <div class="w-full bg-other flexbox">
    <Header
      :text="$t('dashboard.hashtags')"
      :modelValue="searchValue"
      searchBar
      addButton
      @create="createHashtag"
      @search="searchHashtag"
    />

    <div>
      <HashtagsTable
        :hashtags="searchedHashtags"
        @view="viewHashtag"
        @edit="editHashtag"
        @delete="deleteHashtag"
        @normal-order="isNormalOrder = true"
        @reverse-order="isNormalOrder = false"
      />

      <HashtagsFooter />
    </div>

    <HashtagInformation
      v-if="hashtagModalVisible"
      @close="toggleModal"
      @save="handleSaveHashtag"
      @edit="editHashtag"
      :mode="hashtagMode"
      :hashtagData="selectedHashtag"
    />
  </div>
</template>
