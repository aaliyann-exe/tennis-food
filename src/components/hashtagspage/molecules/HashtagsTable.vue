<script setup>

  import { ref } from 'vue';
  import { useHashtagStore } from '/src/components/stores/hashtagStore.js';
  import ConfirmationBox from './ConfirmationBox.vue';


  import viewIcon from '/src/assets/viewIcon.png';
  import editIcon from '/src/assets/editIcon.svg';
  import recycleBinIcon from '/src/assets/recycleBinIcon.svg';

  const props = defineProps({

    hashtags: {

      type: Array,
      required: true,
      default: [],

    },

  });

  const emits = defineEmits(['view', 'edit', 'delete']);

  const hashtagStore = useHashtagStore();

  const isOpen = ref(false);

  const handleDelete = (hashtag) => {
    
    hashtagStore.deleteHashtag(hashtag.id);

  };

</script>

<template>

  <div class="p-6 bg-other">

    <div class="overflow-hidden bg-secondary border border-gray-200 rounded-xl min-h-[75vh]">

      <table class="w-full text-left border-collapse">

        <thead>

          <tr class="text-lg tracking-wider uppercase border-b border-gray-200 font-extralight bg-other">
            
            <th class="flex items-center gap-1 px-6 py-4">

              <span class="flex flex-col text-[10px] leading-1">

                <button class="hover:bg-[#ffd4c7] rounded-2xl p-1 cursor-pointer"><span>▲</span></button>

                <button class="hover:bg-[#ffd4c7] rounded-2xl p-1 cursor-po"><span class="opacity-20">▼</span></button>

              </span>

              HASHTAG

            </th>

            <th class="px-6 py-4 text-center"><span class="relative left-60">CREATED BY</span></th>

            <th class="px-6 py-4 text-right">ACTIONS</th>
            
          </tr>

        </thead>

        <tbody class="divide-y divide-gray-300">

          <tr v-for="(hashtag, index) in props.hashtags" :key="index" class="hover:bg-other">

            <ConfirmationBox v-if="isOpen" @confirm="handleDelete(hashtag)" @cancel="(isOpen = false)" :title="hashtag.title" />

            <td class="px-6 py-4">

              <div class="flex items-center gap-4">

                <div class="flex flex-col">

                  <span class="text-sm font-medium opacity-50">#{{ hashtag.title }}</span>

                </div>

              </div>

            </td>

            <td class="px-6 py-4 text-center">

              <span v-if="hashtag.creator === 'Super Admin'" class="relative px-6 py-1 text-xs font-medium border rounded-full left-60 text-active-dark bg-active border-active-dark">
                {{ hashtag.creator }}
              </span>

              <span v-else class="relative px-6 py-1 text-xs font-medium border rounded-full left-60 text-inactive-dark bg-inactive border-inactive-dark">
                {{ hashtag.creator }}
              </span>

            </td>

            <td class="px-6 py-4 text-right">

              <div class="flex items-center justify-end gap-3 opacity-50">

                <button class="cursor-pointer" @click="$emit('view', hashtag)" title="View">

                  <img :src="viewIcon" class="w-5 h-5" />

                </button>

                <button class="cursor-pointer" @click="$emit('edit', hashtag)" title="Edit">

                  <img :src="editIcon" class="w-5 h-5" />

                </button>

                <button class="cursor-pointer" @click="(isOpen = true)" title="Delete">

                  <img :src="recycleBinIcon" class="w-5 h-5" />

                </button>

              </div>
              
            </td>

          </tr>

        </tbody>

      </table>

      <hr class="opacity-20">

    </div>

  </div>

</template>