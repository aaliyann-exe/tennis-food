<script setup>

  import viewIcon from '/src/assets/viewIcon.png';
  import editIcon from '/src/assets/editIcon.svg';
  import activateIcon from '/src/assets/activateIcon.svg';
  import deactivateIcon from '/src/assets/deactivateIcon.svg';

  const props = defineProps({

    players: {

      type: Array,
      required: true,
      default: () => [],

    },

  });

  const emits = defineEmits(['view', 'edit', 'toggle-status']);

  const handleToggleStatus = (player) => {

    emits('toggle-status', player);

  };

</script>

<template>

  <div class="p-6 bg-other">

    <div class="overflow-hidden bg-secondary border border-gray-200 rounded-xl min-h-[75vh]">

      <table class="w-full text-left border-collapse table-fixed">

        <thead>

          <tr class="text-lg tracking-wider uppercase border-b border-gray-200 font-extralight bg-other">
            
            <th class="px-6 py-4 w-[35%]">

              <div class="flex items-center gap-2">

                <span class="flex flex-col text-[10px] leading-tight shrink-0">

                  <button class="hover:bg-[#ffd4c7] rounded-full p-0.5 cursor-pointer"><span>▲</span></button>

                  <button class="hover:bg-[#ffd4c7] rounded-full p-0.5 cursor-pointer"><span class="opacity-20">▼</span></button>

                </span>

                <span>

                  {{ $t('player.player') }} {{ $t('table.name') }}
            
                </span>

              </div>

            </th>

            <th class="px-6 py-4 w-[40%]">

              {{ $t('table.phone') }}

            </th>

            <th class="px-6 py-4 text-left w-[12%]">

              STATUS

            </th>

            <th class="px-6 py-4 text-right w-[13%]">

              {{ $t('table.actions') }}

            </th>
            
          </tr>

        </thead>

        <tbody class="divide-y divide-gray-300">

          <tr v-for="(player, index) in props.players" :key="index" class="hover:bg-other">

            <td class="px-6 py-4">

              <div class="flex items-center gap-4">

                <div v-if="player.pfp" class="shrink-0 w-10 h-10 overflow-hidden rounded-full">

                   <img :src="player.pfp" alt="Player logo" class="object-cover w-full h-full" />

                </div>

                <div v-else class="flex shrink-0 items-center justify-center w-10 h-10 text-sm font-bold rounded-full text-secondary bg-primary">

                  {{ player.initials }}

                </div> 

                <div class="flex flex-col min-w-0">

                  <span class="text-sm font-medium">
                    
                    {{ player.fName + ' ' + player.lName}}
                  
                  </span>

                  <span class="text-xs text-primary">
                    
                    {{ player.email }}
                  
                  </span>

                </div>

              </div>

            </td>

            <td class="px-6 py-4 text-sm font-medium">

              {{ player.phone }}

            </td>

            <td class="px-6 py-4 text-right">

              <span v-if="player.status" class="inline-block text-center w-24 py-1 text-xs font-medium border rounded-full text-active-dark bg-active border-active-dark">
                
                {{ $t('table.active') }}

              </span>

              <span v-else class="inline-block text-center w-24 py-1 text-xs font-medium border rounded-full text-inactive-dark bg-inactive border-inactive-dark">
                
                {{ $t('table.inactive') }}

              </span>

            </td>

            <td class="px-6 py-4 text-right">

              <div class="flex items-center justify-end gap-3 opacity-50">

                <button class="cursor-pointer" @click="$emit('view', player)" :title="$t('table.view')">

                  <img :src="viewIcon" class="w-5 h-5" />

                </button>

                <button class="cursor-pointer" @click="$emit('edit', player)" :title="$t('table.edit')">

                  <img :src="editIcon" class="w-5 h-5" />

                </button>

                <button class="cursor-pointer" @click="handleToggleStatus(player)" :title="(player.status ? $t('table.deactivate'): $t('table.activate'))">

                  <img :src="(player.status ? deactivateIcon : activateIcon)" :class="(player.status ? 'opacity-100 ' : '') + 'w-5 h-5'" />

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