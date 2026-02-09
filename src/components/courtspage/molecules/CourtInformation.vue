<script setup>

  import { ref, reactive, onMounted, watch } from 'vue';
  import { useCourtStore } from '/src/components/stores/courtStore';

  import clubsIcon from '/src/assets/clubsIcon.svg';
  import crossIcon from '/src/assets/crossIcon.svg';
  import editIcon from '/src/assets/editIcon.svg';
  import cityIcon from '/src/assets/cityIcon.svg';

  import CourtInputs from '../atoms/CourtInputs.vue';
  import FormButtons from '../atoms/FormButtons.vue';
  import ImageSubmitButton from '../atoms/ImageSubmitButton.vue';

  const emit = defineEmits(['close', 'save', 'edit']);
  
  const props = defineProps({

    mode: {

      type: String,
      default: 'create',

    },

    courtData: {

      type: Object,
      default: () => ({}),

    },

  });

  const courtStore = useCourtStore();

  onMounted(() => {

    if (props.mode === 'edit' || props.mode === 'view') {

    Object.assign(form, props.courtData);

    }

  });

  const getInitials = (name) => {

    if (!name)
      return 'TF';

    else 
      return name.split('').map(word => word[0]).join('').toUpperCase().slice(0, 2);

  };

  const imagePreview = ref(null);

  const form = reactive({
    
    pfp: null,
    name: '',
    type: '',
    environment: '',
    school: '',
    club: '',
    status: true,
    initials: '',

  });

  const fillForm = () => {

    if (props.mode === 'create') {
      
      form.pfp = null;
      form.name = '';
      form.type = '';
      form.environment = '';
      form.school = '';
      form.club = '';
      form.status = true;
      form.initials = '';

    } else if (props.courtData) {

      form.pfp = props.courtData.pfp || null;
      form.name = props.courtData.name || '';
      form.type = props.courtData.type || ''; 
      form.environment = props.courtData.environment || '';
      form.school = props.courtData.school === 'N/A' ? '' : (props.courtData.school || '');
      form.club = props.courtData.clubs || '';
      form.status = props.courtData.status;
      form.initials = props.courtData.initials;

    }

  };

  watch(() => props.courtData, fillForm, { immediate: true }); 
  
  const handleImageUpload = (image) => {

    form.pfp = image;

  };

  const handleSave = () => {

    if (!form.name)
      return;

    const courtObject = {

      ...props.courtData,
      pfp: form.pfp,
      name: form.name,
      type: form.type,
      environment: form.environment,
      school: form.school,
      club: form.club,
      status: form.status,
      initials: getInitials(form.name),
      
    };

    if (props.mode === 'create') {
      courtStore.addCourt(courtObject);
    } else if(props.mode === 'edit') {
      courtStore.updateCourt(courtObject);
    }

    emit('save', courtObject);

  };

  const types = ['Hard', 'Clay', 'Grass', 'Synthetic', 'Other'];
  const environments = ['Indoor', 'Outdoor'];
  const schools = ['Royal Dutch Tennis'];
  const clubs = ['Netherlands Tennis Club', 'Ace Tennis Club School', 'Ace Tennis Club 2', 'New Club 37'];

</script>

<template>

  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">

    <div class="h-max bg-white shadow-xl rounded-2xl w-220">

      <div class="flex items-center justify-between py-5">

        <h2 v-if="(props.mode === 'create')" class="mt-2 ml-10 text-4xl font-semibold">Court Information</h2>

        <h2 v-if="(props.mode === 'view')" class="mt-2 ml-10 text-4xl font-semibold">{{ props.courtData.name}}</h2>

        <h2 v-if="(props.mode === 'edit')" class="mt-2 ml-10 text-4xl font-semibold">{{ props.courtData.name}} <span class="text-[20px]"> ( Edit )</span></h2>

        <button v-if="props.mode === 'view'" class="relative cursor-pointer left-40" @click="$emit('edit', props.courtObject)">

          <img :src="editIcon" class="w-6 h-6 opacity-50" />

        </button>

        <button @click="$emit('close')" class="text-2xl text-gray-400 relative right-6 cursor-pointer hover:text-gray-600">

          <img :src="crossIcon" class="w-10 h-10 opacity-40">

        </button>

      </div>

      <hr class="mx-10 opacity-20">

      <form @submit.prevent="handleSave" :class="((props.mode === 'view') ? 'cursor-not-allowed ' : '') + 'p-8'">

        <div class="flex">

          <ImageSubmitButton :name="form.name" :image="form.pfp" @image-uploaded="handleImageUpload" :mode="props.mode" />

        </div>

        <div class="grid grid-cols-2">

          <CourtInputs v-model:inputData="form.name" inputLabel="Name" inputPlaceholder="Name" mustFill hasAsterisk validationMessage="Court name is required" :mode="props.mode" />

          <CourtInputs v-model:inputData="form.type" inputLabel="Type" inputPlaceholder="Type" mustFill hasAsterisk validationMessage="Court type is required" isDropDown :options="types" :mode="props.mode" />

          <CourtInputs v-model:inputData="form.environment" type="environment" inputLabel="Environment" inputPlaceholder="Select court environment" mustFill  hasAsterisk :isDisabled="(props.mode === 'view')" validationMessage="Court environment is required" isDropDown :options="environments" :mode="props.mode" />
          
          <CourtInputs v-model:inputData="form.school" type="school" inputLabel="School" inputPlaceholder="Enter school number" :icon="cityIcon" isDisabled isDropDown :options="schools" :mode="props.mode" />
          
          <CourtInputs v-model:inputData="form.club" inputLabel="Club" inputPlaceholder="Select Club" :icon="clubsIcon" mustFill hasAsterisk isDropDown :options="clubs" :mode="props.mode" />

        </div>

        <div v-if="props.mode !== 'view'" class="flex mt-10">

          <FormButtons @cancel="$emit('close')" cancel />

          <FormButtons @save="handleSave" save />

        </div>

      </form>

    </div>

  </div>

</template>