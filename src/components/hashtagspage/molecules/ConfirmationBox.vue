<script setup>
import FormButtons from "../atoms/FormButtons.vue";
import { useLanguageStore } from "/src/components/stores/languageStore.js";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["confirm", "cancel"]);

const languageStore = useLanguageStore();

const currentLocale = languageStore.currentLocale;
</script>

<template>
  <div
    class="fixed inset-0 z-50 h-full flex items-center justify-center p-4 bg-black/5"
  >
    <div class="bg-white shadow-sm rounded-[40px] p-10">
      <div class="mb-4">
        <div
          class="flex items-center justify-center w-8 h-8 border border-primary rounded-full"
        >
          <span class="text-primary text-2xl">?</span>
        </div>
      </div>

      <div class="flex items-center mb-4">
        <h2
          v-if="currentLocale === 'en'"
          class="text-2xl font-semibold text-black"
        >
          Delete {{ title }}?
        </h2>

        <h2 v-else class="text-2xl font-semibold text-black">
          {{ title }} {{ $t("table.delete").toLowerCase() }}?
        </h2>
      </div>

      <div class="mb-10">
        <p class="text-bg font-normal text-primary">
          {{ $t("modalField.deleteConfirmation") }}
        </p>
      </div>

      <div class="flex items-center">
        <FormButtons
          :text="$t('modalField.yes')"
          @click="$emit('delete')"
          orange
        />
        <FormButtons
          :text="$t('modalField.no')"
          @click="$emit('close')"
          white
        />
      </div>
    </div>
  </div>
</template>

<!-- <script setup>
import FormButtons from "../atoms/FormButtons.vue";
import { useLanguageStore } from "/src/components/stores/languageStore.js";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["confirm", "cancel"]);

const languageStore = useLanguageStore();

const currentLocale = languageStore.currentLocale;
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
  >
    <div class="h-max w-150 bg-white shadow-sm rounded-[40px] p-10">
      <div class="mb-4">
        <div
          class="flex items-center justify-center w-8 h-8 border-2 border-primary rounded-full"
        >
          <span class="text-primary text-2xl font-medium">?</span>
        </div>
      </div>

      <div class="flex items-center mb-4">
        <h2
          v-if="currentLocale === 'en'"
          class="text-2xl font-semibold text-black"
        >
          Delete {{ title }}?
        </h2>

        <h2 v-else class="text-2xl font-semibold text-black">
          {{ title }} {{ $t("table.delete").toLowerCase() }}?
        </h2>
      </div>

      <div class="mb-10">
        <p class="text-bg font-normal text-primary leading-relaxed">
          {{ $t("modalField.deleteConfirmation") }}
        </p>
      </div>

      <div class="flex gap-4 items-center">
        <FormButtons
          @save="$emit('confirm')"
          orange
          :text="$t('modalField.yes')"
          class="flex-1"
        />

        <FormButtons
          @cancel="$emit('cancel')"
          white
          :text="$t('modalField.no')"
          class="flex-1"
        />
      </div>
    </div>
  </div>
</template> -->
