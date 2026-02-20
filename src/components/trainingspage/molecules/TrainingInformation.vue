<script setup>
import { reactive, onMounted, watch } from "vue";
import { useTrainingStore } from "/src/components/stores/trainingStore";
import { useHashtagStore } from "/src/components/stores/hashtagStore.js";

import clubsIcon from "/src/assets/clubsIcon.svg";
import personIcon from "/src/assets/personIcon.svg";
import emailIcon from "/src/assets/emailIcon.svg";
import phoneIcon from "/src/assets/phoneIcon.svg";
import buildingIcon from "/src/assets/buildingIcon.svg";
import locationIcon from "/src/assets/locationIcon.svg";
import cityIcon from "/src/assets/cityIcon.svg";
import crossIcon from "/src/assets/crossIcon.svg";
import editIcon from "/src/assets/editIcon.svg";
import calendarIcon from "/src/assets/calendarIcon.svg";

import TrainingInputs from "../atoms/TrainingInputs.vue";
import FormButtons from "../atoms/FormButtons.vue";
import ImageSubmitButton from "../atoms/ImageSubmitButton.vue";

const emit = defineEmits(["close", "save", "edit"]);

const props = defineProps({
  mode: {
    type: String,
    default: "create",
  },

  trainingData: {
    type: Object,
    default: () => ({}),
  },
});

const trainingStore = useTrainingStore();

const hashtagStore = useHashtagStore().hashtags;

onMounted(() => {
  if (props.mode === "edit" || props.mode === "view") {
    Object.assign(form, props.trainingData);
  }
});

const form = reactive({
  name: "",
  school: "",
  club: "",
  trainer: "",
  hashtag: "",
  seshDate: "",
  seshStart: "",
  seshEnd: "",
  player: "",
  desc: "",
  status: true,
});

const fillForm = () => {
  if (props.mode === "create") {
    form.name = "";
    form.school = "";
    form.club = "";
    form.trainer = "";
    form.hashtag = "";
    form.seshDate = "";
    form.seshStart = "";
    form.seshEnd = "";
    form.player = "";
    form.desc = "";
    form.status = true;
  } else if (props.trainingData) {
    form.name = props.trainingData.name || "";
    form.school = props.trainingData.school || "";
    form.club = props.trainingData.club || "";
    form.trainer = props.trainingData.trainer || "";
    form.hashtag = props.trainingData.hashtag || "";
    form.seshDate = props.trainingData.seshDate || "";
    form.seshStart = props.trainingData.seshStart || "";
    form.seshEnd = props.trainingData.seshEnd || "";
    form.player = props.trainingData.player || "";
    form.desc = props.trainingData.desc || "";
    form.status = props.trainingData.status;
  }
};

watch(() => props.trainingData, fillForm, { immediate: true });

const handleSave = () => {
  if (!form.name) return;

  const trainingObject = {
    name: form.name,
    school: form.school,
    club: form.club,
    trainer: form.trainer,
    hashtag: form.hashtag,
    seshDate: form.seshDate,
    seshStart: form.seshStart,
    seshEnd: form.seshEnd,
    player: form.player,
    desc: form.desc,
    status: form.status,
  };

  if (props.mode === "create") {
    trainingStore.addTraining(trainingObject);
  } else if (props.mode === "edit") {
    trainingStore.updateTraining(trainingObject);
  }

  emit("save", trainingObject);
};

const schools = ["Royal Dutch Tennis"];
const clubs = [
  "Netherlands Tennis Club",
  "Ace Tennis Club School",
  "Ace Tennis Club 2",
  "New Club 37",
];
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
  >
    <div class="h-full overflow-y-scroll bg-white shadow-xl rounded-2xl w-220">
      <div class="flex items-center justify-between py-5">
        <h2
          v-if="props.mode === 'create'"
          class="mt-2 ml-10 text-4xl font-semibold"
        >
          Training Information
        </h2>

        <h2
          v-if="props.mode === 'view'"
          class="mt-2 ml-10 text-4xl font-semibold"
        >
          {{ props.trainingData.name + " " + props.trainingData.lName }}
        </h2>

        <h2
          v-if="props.mode === 'edit'"
          class="mt-2 ml-10 text-4xl font-semibold"
        >
          {{ props.trainingData.name + " " + props.trainingData.lName
          }}<span class="text-[20px]"> ( Edit )</span>
        </h2>

        <button
          v-if="props.mode === 'view'"
          class="relative cursor-pointer left-65"
          @click="$emit('edit', props.trainingObject)"
        >
          <img :src="editIcon" class="w-6 h-6 opacity-50" />
        </button>

        <button
          @click="$emit('close')"
          class="text-2xl text-gray-400 cursor-pointer hover:text-gray-600"
        >
          <img :src="crossIcon" class="w-10 h-10 opacity-40" />
        </button>
      </div>

      <hr class="mx-10 opacity-20" />

      <form
        @submit.prevent="handleSave"
        :class="(props.mode === 'view' ? 'cursor-not-allowed ' : '') + 'p-8'"
      >
        <div class="flex">
          <ImageSubmitButton
            :name="form.name"
            :image="form.pfp"
            @image-uploaded="handleImageUpload"
            :mode="props.mode"
          />
        </div>

        <div class="grid grid-cols-2">
          <TrainingInputs
            v-model:inputData="form.name"
            inputLabel="First Name"
            inputPlaceholder="First Name"
            :icon="personIcon"
            mustFill
            hasAsterisk
            validationMessage="First name is required"
            :mode="props.mode"
          />

          <TrainingInputs
            v-model:inputData="form.lName"
            inputLabel="Last Name"
            inputPlaceholder="Last Name"
            :icon="personIcon"
            :mode="props.mode"
          />

          <TrainingInputs
            v-model:inputData="form.email"
            type="email"
            inputLabel="Email"
            inputPlaceholder="info@youmai.com"
            :icon="emailIcon"
            mustFill
            hasAsterisk
            :isDisabled="props.mode === 'view'"
            validationMessage="Email is required"
            :mode="props.mode"
          />

          <TrainingInputs
            v-model:inputData="form.phone"
            type="phone"
            inputLabel="Phone"
            inputPlaceholder="Enter phone number"
            :icon="phoneIcon"
            :mode="props.mode"
          />

          <TrainingInputs
            v-model:inputData="form.dob"
            inputLabel="Date of Birth"
            inputPlaceholder="DOB"
            :icon="calendarIcon"
            isDropDown
            mustFill
            hasAsterisk
            :mode="props.mode"
          />
        </div>

        <div>
          <TrainingInputs
            v-model:inputData="form.address"
            :inputLabel="$t('table.address')"
            :inputPlaceholder="$t('modalField.address')"
            :icon="locationIcon"
            :mode="props.mode"
          />
        </div>

        <div class="grid grid-cols-2">
          <TrainingInputs
            v-model:inputData="form.city"
            :inputLabel="$t('table.city')"
            :inputPlaceholder="$t('modalField.select') + ' ' + $t('table.city')"
            :icon="cityIcon"
            isDropDown
            :options="cities"
            :mode="props.mode"
          />

          <TrainingInputs
            v-model:inputData="form.zipCode"
            type="zipCode"
            :inputLabel="$t('table.zipCode')"
            :inputPlaceholder="$t('modalField.address')"
            :icon="locationIcon"
            :mode="mode"
          />

          <TrainingInputs
            v-model:inputData="form.school"
            inputLabel="School"
            :inputPlaceholder="$t('modalField.select') + ' ' + 'School'"
            :icon="buildingIcon"
            isDisabled
            isDropDown
            :options="schools"
            hasAsterisk
            mustFill
            :mode="props.mode"
          />

          <TrainingInputs
            v-model:input-data="form.club"
            inputLabel="Club"
            :inputPlaceholder="$t('modalField.select') + ' ' + 'Club'"
            :icon="clubsIcon"
            isDropDown
            :options="clubs"
            hasAsterisk
            mustFill
            :mode="props.mode"
          />
        </div>

        <div v-if="props.mode !== 'view'" class="flex mt-10">
          <FormButtons @cancel="$emit('close')" white />

          <FormButtons
            @save="handleSave"
            :text="
              props.mode === 'edit' ? $t('table.update') : $t('table.save')
            "
            orange
          />
        </div>
      </form>
    </div>
  </div>
</template>
