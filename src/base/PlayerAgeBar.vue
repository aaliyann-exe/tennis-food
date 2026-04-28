<template>
  <div>
    <div class="justify-between items-center flex mb-4">
      <div class="text-sm font-medium justify-start flex w-20">
        {{ $t('player.' + label) }}
      </div>
      <div class="relative">
        <div
          :class="[
            listVisible ? 'visible opacity-100' : 'invisible opacity-0',
            'absolute z-22 -top-84 -right-2 transform-all duration-300',
          ]"
        >
          <ListBox
            @click="listToggle"
            :color="color"
            :label="`${$t('player.' + label)}`"
            :count="count"
          />
        </div>
        <button
          @click="listToggle"
          class="bg-gray-100 rounded-lg w-70 justify-center h-8 cursor-pointer transition-all duration-700 mb-4"
        >
          <div
            :class="[count > 0 ? color : 'bg-gray-100', 'h-8 cursor-pointer rounded-lg']"
            :style="{ width: (count / totalPlayers) * 100 + '%' }"
          ></div>
        </button>
      </div>
      <div class="text-sm">
        {{ count }} {{ $t('player.players').toLowerCase() }}
        <span class="opacity-60">({{ ((count / totalPlayers) * 100).toFixed(0) }}%)</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import ListBox from './ListBox.vue'
import { useMainStore } from '@/stores/dataStore'
import { ref } from 'vue'

defineProps({
  color: String,
  label: String,
  count: Number,
})

const totalPlayers = useMainStore().totalPlayers

const listVisible = ref(false)
const listToggle = () => {
  listVisible.value = !listVisible.value
}
</script>
