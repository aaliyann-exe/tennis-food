<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  icon: { type: String, required: false },
  activeIcon: { type: String, required: false },
  text: { type: String, required: true },
  path: { type: String, required: true, default: "" },
  selected: { type: Boolean, required: false },
});

const route = useRoute();

const pagePath = computed(() => {
  const key = props.path;
  return "/" + key;
});

const isActive = computed(() => {
  return route.path === pagePath.value;
});
</script>

<template>
  <div class="flex items-center">
    <div
      v-if="isActive || selected"
      class="text-primary text-[54px] font-extralight leading-none absolute left-5"
    >
      [
    </div>

    <router-link :to="pagePath" class="no-underline">
      <div
        class="py-3 px-2 ml-8 w-60 rounded-lg text-sm font-normal transition-colors hover:bg-primary-outline hover:text-primary cursor-pointer"
      >
        <span class="mr-3">
          <img
            :src="isActive ? activeIcon : icon"
            :alt="text + ' Icon'"
            :class="(isActive ? '' : 'opacity-50 ') + 'inline w-5 h-5'"
          />
        </span>

        <span :class="isActive ? 'text-primary' : ''">
          {{ text }}
        </span>
      </div>
    </router-link>
  </div>
</template>
