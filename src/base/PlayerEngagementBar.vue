<template>
  <div class="justify-between flex mb-4">
    <div class="flex items-center">
      <div :class="[color, 'w-3 h-3 rounded-full flex mr-2']"></div>
      <div class="flex text-sm font-medium mr-2">
        {{ $t('dashboardPage.' + label) }}
      </div>

      <InfoButton size="text-xs flex">Ermmm</InfoButton>
    </div>
    <div class="text-sm">
      {{ count }} {{ $t('player.players').toLowerCase() }}
      <span class="opacity-60">({{ ((count / totalPlayers) * 100).toFixed(0) }}%)</span>
    </div>
  </div>
  <div class="relative">
    <div
      :class="[
        listVisible ? 'visible opacity-100' : 'invisible opacity-0',
        'absolute z-22 -top-82 left-30 transform-all duration-300',
      ]"
    >
      <div>
        <h1></h1>
      </div>

      <ListBox
        @click="listToggle"
        :color="color"
        :label="`${$t('dashboardPage.' + label)}`"
        :count="count"
      />
    </div>
    <button
      @click="listToggle"
      class="bg-gray-200 cursor-pointer rounded-lg w-full h-8 transition-all duration-700 mb-4"
    >
      <div
        :class="[count > 0 ? color : 'bg-gray-200', 'h-8 cursor-pointer rounded-lg']"
        :style="{ width: (count / totalPlayers) * 100 + '%' }"
      ></div>
    </button>
  </div>
</template>

<script setup>
import InfoButton from './InfoButton.vue'
import ListBox from './ListBox.vue'
import { useMainStore } from '@/stores/dataStore'
import { ref } from 'vue'

defineProps({
  color: String,
  label: String,
  count: Number,
})

const totalPlayers = useMainStore().totalEntities('players')

const listVisible = ref(false)
const listToggle = () => {
  listVisible.value = !listVisible.value
}
</script>
