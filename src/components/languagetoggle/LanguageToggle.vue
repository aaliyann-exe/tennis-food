<script setup>
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useLanguageStore } from "/src/components/stores/languageStore.js";

import uk from "/src/assets/uk.svg";
import nl from "/src/assets/nl.svg";

const { locale } = useI18n();
const languageStore = useLanguageStore();

locale.value = languageStore.currentLocale;

watch(
  () => languageStore.currentLocale,
  (newLocale) => {
    locale.value = newLocale;
  },
);

const isDutch = computed(() => languageStore.currentLocale === "nl");

const toggleLanguage = () => {
  languageStore.toggle();
};
</script>

<template>
  <div class="absolute top-0 right-0 p-3 justify-end flex z-10">
    <div class="justify-end flex items-center gap-3 text-xs">
      <span
        :class="
          (!isDutch ? 'text-slate-900 ' : 'text-slate-400 ') +
          'text-sm font-semibold'
        "
      >
        ENG
      </span>

      <div
        @click="toggleLanguage"
        class="w-20 h-10 bg-slate-100 rounded-full p-1 flex items-center cursor-pointer relative shadow-inner"
      >
        <div
          :class="
            (isDutch ? 'translate-x-10 ' : 'translate-x-0 ') +
            'bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-transform duration-400'
          "
        >
          <img
            :src="isDutch ? nl : uk"
            class="w-5 h-5 object-cover rounded-full"
            alt="flag"
          />
        </div>
      </div>

      <span
        :class="
          (isDutch ? 'text-slate-900 ' : 'text-slate-400 ') +
          'text-sm font-semibold'
        "
      >
        NL
      </span>
    </div>
  </div>
</template>
