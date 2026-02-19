<script setup>
import { ref } from "vue";
import { useHashtagStore } from "/src/components/stores/hashtagStore.js";
import ConfirmationBox from "./ConfirmationBox.vue";

import viewIcon from "/src/assets/viewIcon.png";
import editIcon from "/src/assets/editIcon.svg";
import recycleBinIcon from "/src/assets/recycleBinIcon.svg";

const props = defineProps({
  hashtags: {
    type: Array,
    required: true,
    default: [],
  },
});

const emits = defineEmits(["view", "edit", "delete"]);

const hashtagStore = useHashtagStore();

const isOpen = ref(false);

const handleDelete = (hashtag) => {
  hashtagStore.deleteHashtag(hashtag.id);
  isOpen.value = false;
};
</script>

<template>
  <div class="p-6 bg-other">
    <div
      class="overflow-hidden bg-secondary border border-gray-200 rounded-xl min-h-[75vh]"
    >
      <table class="w-full text-left border-collapse table-fixed">
        <thead>
          <tr
            class="text-lg tracking-wider uppercase border-b border-gray-200 font-extralight bg-other"
          >
            <th class="px-10 py-4 w-[35%]">
              <div class="flex items-center gap-2">
                <span class="flex flex-col text-[10px] leading-tight shrink-0">
                  <button
                    class="hover:bg-[#ffd4c7] rounded-full p-0.5 cursor-pointer"
                  >
                    <span>▲</span>
                  </button>

                  <button
                    class="hover:bg-[#ffd4c7] rounded-full p-0.5 cursor-pointer"
                  >
                    <span class="opacity-20">▼</span>
                  </button>
                </span>

                <span>Hashtag</span>
              </div>
            </th>

            <th class="px-6 py-4 w-[10%]">
              {{ $t("table.createdBy") }}
            </th>

            <th class="px-6 py-4 text-right w-[10%]">
              {{ $t("table.actions") }}
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-300">
          <tr
            v-for="(hashtag, index) in props.hashtags"
            :key="index"
            class="hover:bg-other"
          >
            <Teleport v-if="isOpen" to="body">
              <ConfirmationBox
                @confirm="handleDelete(hashtag)"
                @cancel="isOpen = false"
                :title="hashtag.title"
              />
            </Teleport>

            <td class="px-10 py-6 w-[10%]">
              <div class="flex items-center gap-4">
                <div class="flex flex-col">
                  <span class="text-sm font-medium opacity-50"
                    >#{{ hashtag.title }}</span
                  >
                </div>
              </div>
            </td>

            <td class="px-6 py-6 text-sm font-medium w-[10%]">
              <span
                v-if="hashtag.creator === 'Super Admin'"
                class="inline-block text-center w-24 py-1 text-xs font-medium border rounded-full text-active-dark bg-active border-active-dark"
              >
                {{ hashtag.creator }}
              </span>

              <span
                v-else
                class="inline-block text-center w-24 py-1 text-xs font-medium border rounded-full text-inactive-dark bg-inactive border-inactive-dark"
              >
                {{ hashtag.creator }}
              </span>
            </td>

            <td class="px-6 py-6 text-right">
              <div class="flex items-center justify-end gap-3 opacity-50">
                <button
                  class="cursor-pointer"
                  @click="$emit('view', hashtag)"
                  :title="$t('table.view')"
                >
                  <img :src="viewIcon" class="w-5 h-5" />
                </button>

                <button
                  class="cursor-pointer"
                  @click="$emit('edit', hashtag)"
                  :title="$t('table.edit')"
                >
                  <img :src="editIcon" class="w-5 h-5" />
                </button>

                <button
                  class="cursor-pointer"
                  @click="isOpen = true"
                  :title="$t('table.delete')"
                >
                  <img :src="recycleBinIcon" class="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <hr class="opacity-20" />
    </div>
  </div>
</template>
