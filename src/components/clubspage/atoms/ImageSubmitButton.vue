<script setup>
import cameraIcon from "/src/assets/cameraIcon.svg";
import { ref } from "vue";

const imagePreview = ref(null);

const props = defineProps({
  clubName: {
    type: String,
    default: "",
  },

  image: {
    type: String,
    default: "",
  },

  mode: {
    type: String,
    default: "create",
  },
});

const emit = defineEmits(["image-uploaded"]);

const getInitials = (clubName) => {
  if (!clubName) {
    return "TF";
  } else {
    return clubName
      .split("")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
};

let tempURL = ref(null);

const onFileChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    tempURL = URL.createObjectURL(file);
    imagePreview.value = tempURL;
    emit("image-uploaded", tempURL);
  }
};
</script>

<template>
  <button type="button" @click="$refs.fileInput.click()">
    <div class="relative w-20 h-20 mb-8 group cursor-pointer">
      <div
        v-if="imagePreview"
        class="w-full h-full rounded-full overflow-hidden border-2 border-gray-100"
      >
        <img :src="imagePreview" class="w-full h-full object-cover" />
      </div>

      <div
        v-else
        class="w-full h-full rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold"
      >
        {{ getInitials(props.clubName) }}
      </div>

      <input
        type="file"
        ref="fileInput"
        @change="onFileChange"
        accept="image/*"
        class="hidden"
      />

      <div
        v-if="mode !== 'view'"
        class="absolute top-15 right-6 bg-white p-1.5 rounded-full border border-gray-200 shadow-sm hover:bg-gray-50"
      >
        <img :src="cameraIcon" class="w-4 h-4" />
      </div>
    </div>
  </button>
</template>
