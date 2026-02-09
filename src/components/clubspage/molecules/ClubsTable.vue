<script setup>

  import viewIcon from '/src/assets/viewIcon.png';
  import editIcon from '/src/assets/editIcon.svg';
  import activateIcon from '/src/assets/activateIcon.svg';

  const props = defineProps({

    clubs: {

      type: Array,
      required: true,
      default: [],

    },

  });

  const emits = defineEmits(['view', 'edit', 'deactivate']);

</script>

<template>

  <div class="p-6 bg-other">

    <div class="overflow-hidden bg-secondary border border-gray-200 rounded-xl min-h-[75vh]">

      <table class="w-full text-left border-collapse">

        <thead>

          <tr class="text-lg font-extralight tracking-wider uppercase bg-other border-b border-gray-200">
            
            <th class="px-6 py-4 flex items-center gap-1">

              <span class="flex flex-col text-[10px] leading-[4px]">

                <button class="hover:bg-[#ffd4c7] rounded-2xl p-1 cursor-pointer"><span>▲</span></button>

                <button class="hover:bg-[#ffd4c7] rounded-2xl p-1 cursor-po"><span class="opacity-20">▼</span></button>

              </span>

              CLUB NAME

            </th>

            <th class="px-6 py-4">PHONE</th>

            <th class="px-6 py-4"><span class="relative left-60">STATUS</span></th>

            <th class="px-6 py-4 text-right">ACTIONS</th>
            
          </tr>

        </thead>

        <tbody class="divide-y divide-gray-300">

          <tr v-for="(club, index) in props.clubs" :key="index" class="hover:bg-other">

            <td class="px-6 py-4">

              <div class="flex items-center gap-4">

                <div v-if="club.image" class="w-10 h-10 rounded-full overflow-hidden">

                   <img :src="club.image" alt="Club logo" class="w-full h-full object-cover" />

                </div>

                <div v-else :class="club.color + ' w-10 h-10 rounded-full flex items-center justify-center text-secondary font-bold text-sm'">

                  {{ club.initials }}

                </div> 

                <div class="flex flex-col">

                  <span class="text-sm font-medium">{{ club.name }}</span>

                  <span class="text-xs text-primary truncate max-w-[200px]">{{ club.email }}</span>

                </div>

              </div>

            </td>

            <td class="px-6 py-4 text-sm font-medium">
              {{ club.phone }}
            </td>

            <td class="px-6 py-4">

              <span class="px-6 py-1 text-xs relative left-60 text-active-dark bg-active border border-active-dark font-medium rounded-full">
                {{ club.status }}
              </span>

            </td>

            <td class="px-6 py-4 text-right">

              <div class="flex justify-end items-center gap-3 opacity-50">

                <button class="cursor-pointer" @click="$emit('view', club)">

                  <img :src="viewIcon" class="w-5 h-5" />

                </button>

                <button class="cursor-pointer" @click="$emit('edit', club)">

                  <img :src="editIcon" class="w-5 h-5" />

                </button>

                <button class="cursor-pointer" @click="$emit('deactivate', club)">

                  <img :src="activateIcon" class="w-5 h-5" />

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