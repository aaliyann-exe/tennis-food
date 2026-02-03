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
      default: null,

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

    <button type="button" @click="triggerUpload" :class="((props.mode === 'view') ? '' : 'cursor-pointer ') + 'group relative hover:opacity-90'">

      <div class="relative w-19 h-19 mb-8">

            <div v-if="imagePreview" class="w-full h-full rounded-full overflow-hidden border-2 border-gray-200">

              <img :src="imagePreview" class="w-full h-full object-cover" />

            </div>
            
            <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" class="hidden" />
            
            <div v-if="mode === 'edit'" class="absolute top-15 right-6 bg-white p-1 rounded-full border border-gray-200 shadow-lg">
              
              <img :src="cameraIcon" class="w-4 h-4">

            </div>

      </div>

    </button>

</template>