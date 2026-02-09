<script setup>

  import { ref, reactive, onMounted, watch } from 'vue';
  import { useHashtagStore } from '/src/components/stores/hashtagStore';

  import personIcon from '/src/assets/personIcon.svg';
  import crossIcon from '/src/assets/crossIcon.svg';
  import editIcon from '/src/assets/editIcon.svg';

  import HashtagInputs from '../atoms/HashtagInputs.vue';
  import FormButtons from '../atoms/FormButtons.vue';

  const emit = defineEmits(['close', 'save', 'edit']);
  
  const props = defineProps({

    mode: {

      type: String,
      default: 'create',

    },

    hashtagData: {

      type: Object,
      default: () => ({}),

    },

  });

  const hashtagStore = useHashtagStore();

  onMounted(() => {

    if (props.mode === 'edit' || props.mode === 'view') {

    Object.assign(form, props.hashtagData);

    }

  });

  const form = reactive({
    
    title: '',
    creator: 'Super Admin',

  });

  const fillForm = () => {

    if (props.mode === 'create') {

      form.title = '';
      form.creator = 'Super Admin';

    } else if (props.hashtagData) {

      form.title = props.hashtagData.title || '';
      form.creator = props.hashtagData.lName || 'Super Admin'; 

    }

  };

  watch(() => props.hashtagData, fillForm, { immediate: true });

  const handleSave = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+31|0)[1-9]\d{8}$/;

    if (!form.title)
      return;

    const hashtagObject = {

      ...props.hashtagData,
      title: form.title,
      creator: form.creator,
      
    };

    if (props.mode === 'create') {
      hashtagStore.addHashtag(hashtagObject);
    } else if(props.mode === 'edit') {
      hashtagStore.updateHashtag(hashtagObject);
    }

    emit('save', hashtagObject);

  };

</script>

<template>

  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">

    <div class="h-max w-150 bg-white shadow-xl rounded-2xl">

      <div class="flex items-center justify-between py-5">

        <h2 v-if="(props.mode === 'create')" class="mt-2 ml-12 text-4xl font-semibold">Hashtag Information</h2>

        <h2 v-if="(props.mode === 'view')" class="mt-2 relative left-12 text-4xl font-semibold">{{ props.hashtagData.title }}<span v-if="(props.mode === 'edit')" class="text-[20px]"> ( Edit ) </span></h2>

        <button v-if="(props.mode === 'view')" class="absolute cursor-pointer right-134" @click="$emit('edit', props.hashtagObject)">

          <img :src="editIcon" class="w-6 h-6 opacity-50" />

        </button>

        <button @click="$emit('close')" class="relative right-8 text-2xl text-gray-400 cursor-pointer hover:text-gray-600">

          <img :src="crossIcon" class="w-10 h-10 opacity-40">

        </button>

      </div>

      <hr class="mx-10 opacity-20">

      <form @submit.prevent="handleSave" :class="((props.mode === 'view') ? 'cursor-not-allowed ' : '') + 'p-8'">

        <div class="grid grid-cols-1">

          <HashtagInputs v-model:inputData="form.title" inputLabel="Hashtag" inputPlaceholder="Hashtag" :icon="personIcon" mustFill hasAsterisk validationMessage="Hashtag is required" :mode="props.mode"/>
        
        </div>

        <div v-if="props.mode !== 'view'" class="flex mt-10">

          <FormButtons @cancel="$emit('close')" cancel />

          <FormButtons @save="handleSave" save />

        </div>

      </form>

    </div>

  </div>

</template>