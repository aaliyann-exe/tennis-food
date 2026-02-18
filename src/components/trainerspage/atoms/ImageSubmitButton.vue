<script setup>

import cameraIcon from '/src/assets/cameraIcon.svg';
import { ref, watch } from 'vue';

const props = defineProps({

  name: {

    type: String,
    default: '',

  },

  image: {

    type: String,
    default: '',

  },

  mode: {

    type: String,
    default: 'view',

  },

});

const emit = defineEmits(['image-uploaded']);
const fileInput = ref(null);
const imagePreview = ref(props.image);

watch(() => props.image, (newImg) => {

  imagePreview.value = newImg;

});

const getInitials = (name) => {

  if (!name) {

    return 'TF';

  }

  else {

    return name.split('').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  }

};

const onFileChange = (e) => {

  const file = e.target.files[0];

  if (file) {

    const tempURL = URL.createObjectURL(file);
    imagePreview.value = tempURL;
    emit('image-uploaded', tempURL);

  }

};

const triggerUpload = () => {

  if (props.mode === 'edit' && fileInput.value) {

    fileInput.value.click();

  }

};

</script>

<template>

  <button type="button" @click="triggerUpload"
    :class="((props.mode === 'view') ? '' : 'cursor-pointer ') + 'group relative hover:opacity-90'">

    <div class="relative mb-8 w-19 h-19">

      <div v-if="imagePreview" class="w-full h-full overflow-hidden border-2 border-gray-200 rounded-full">

        <img :src="imagePreview" class="object-cover w-full h-full" />

      </div>

      <div v-else
        class="flex items-center justify-center w-full h-full text-2xl font-bold text-white rounded-full bg-primary">

        {{ getInitials(props.name) }}

      </div>

      <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" class="hidden" />

      <div v-if="mode === 'edit'"
        class="absolute p-1 bg-white border border-gray-200 rounded-full shadow-lg top-15 right-6">

        <img :src="cameraIcon" class="w-4 h-4">

      </div>

    </div>

  </button>

</template>