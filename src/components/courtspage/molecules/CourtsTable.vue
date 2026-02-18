<script setup>

import viewIcon from '/src/assets/viewIcon.png';
import editIcon from '/src/assets/editIcon.svg';
import activateIcon from '/src/assets/activateIcon.svg';
import deactivateIcon from '/src/assets/deactivateIcon.svg';

const props = defineProps({

  courts: {

    type: Array,
    required: true,
    default: [],

  },

});

const emits = defineEmits(['view', 'edit', 'toggle-status']);

const handleToggleStatus = (court) => {

  emits('toggle-status', court);

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

              <span>

                {{ $t('court.court') }}

                <!-- {{ $t('table.name') }} -->

              </span>

            </th>

            <th class="px-6 py-4">

              <span class="relative left-50">

                {{ $t('court.environment') }}

              </span>

            </th>

            <th class="px-6 py-4"><span class="relative left-40">STATUS</span></th>

            <th class="px-6 py-4 text-right">

              {{ $t('table.actions') }}

            </th>

          </tr>

        </thead>

        <tbody class="divide-y divide-gray-300">

          <tr v-for="(court, index) in props.courts" :key="index" class="hover:bg-other">

            <td class="px-6 py-4">

              <div class="flex items-center gap-4">

                <div v-if="court.pfp" class="w-10 h-10 overflow-hidden rounded-full">

                  <img :src="court.pfp" alt="Club logo" class="object-cover w-full h-full" />

                </div>

                <div v-else
                  class="flex items-center justify-center w-10 h-10 text-sm font-bold rounded-full text-secondary bg-primary">

                  {{ court.initials }}

                </div>

                <div class="flex flex-col">

                  <span class="text-sm font-medium">

                    {{ court.name }}

                  </span>

                  <span class="text-xs truncate text-primary max-w-50">

                    {{ court.type }}

                  </span>

                </div>

              </div>

            </td>

            <td class="px-6 py-4 text-sm font-medium">

              <span class="relative left-50">

                {{ court.environment }}

              </span>

            </td>

            <td class="px-6 py-4">

              <span v-if="court.status"
                class="relative px-6 py-1 text-xs font-medium border rounded-full left-40 text-active-dark bg-active border-active-dark">

                {{ $t('table.active') }}

              </span>

              <span v-else
                class="relative px-6 py-1 text-xs font-medium border rounded-full left-40 text-inactive-dark bg-inactive border-inactive-dark">

                {{ $t('table.inactive') }}

              </span>

            </td>

            <td class="px-6 py-4 text-right">

              <div class="flex items-center justify-end gap-3 opacity-50">

                <button class="cursor-pointer" @click="$emit('view', court)" :title="$t('table.view')">

                  <img :src="viewIcon" class="w-5 h-5" />

                </button>

                <button class="cursor-pointer" @click="$emit('edit', court)" :title="$t('table.edit')">

                  <img :src="editIcon" class="w-5 h-5" />

                </button>

                <button class="cursor-pointer" @click="handleToggleStatus(court)"
                  :title="(court.status ? $t('table.activate') : $t('table.deactivate'))">

                  <img :src="(court.status ? deactivateIcon : activateIcon)"
                    :class="(court.status ? 'opacity-100 ' : '') + 'w-5 h-5'" />

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