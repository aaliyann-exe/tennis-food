<script setup>

  import { ref, reactive, onMounted, watch } from 'vue';
  import { useTrainerStore } from '/src/components/stores/trainerStore';

  import clubsIcon from '/src/assets/clubsIcon.svg';
  import emailIcon from '/src/assets/emailIcon.svg';
  import phoneIcon from '/src/assets/phoneIcon.svg';
  import personIcon from '/src/assets/personIcon.svg';
  import buildingIcon from '/src/assets/buildingIcon.svg';
  import locationIcon from '/src/assets/locationIcon.svg';
  import crossIcon from '/src/assets/crossIcon.svg';
  import editIcon from '/src/assets/editIcon.svg';
  import calendarIcon from '/src/assets/calendarIcon.svg';
  import waitingIcon from '/src/assets/waitingIcon.svg';
  import flagPersonIcon from '/src/assets/flagPersonIcon.svg';
  import cityIcon from '/src/assets/cityIcon.svg';

  import TrainerInputs from '../atoms/TrainerInputs.vue';
  import FormButtons from '../atoms/FormButtons.vue';
  import ImageSubmitButton from '../atoms/ImageSubmitButton.vue';

  const emit = defineEmits(['close', 'save', 'edit']);
  
  const props = defineProps({

    mode: {

      type: String,
      default: 'create',

    },

    trainerData: {

      type: Object,
      default: () => ({}),

    },

  });

  const trainerStore = useTrainerStore();

  onMounted(() => {

    if (props.mode === 'edit' || props.mode === 'view') {

    Object.assign(form, props.trainerData);

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
    fName: '',
    lName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    city: '',
    zipCode: '',
    school: '',
    club: '',
    status: true,

  });

  const fillForm = () => {

    if (props.mode === 'create') {
      
      form.pfp = null;
      form.fName = '';
      form.lName = '';
      form.email = '';
      form.phone = '';
      form.dob = '';
      form.address = '';
      form.city = '';
      form.zipCode = '';
      form.school = '';
      form.club = '';
      form.status = true;

    } else if (props.trainerData) {

      form.pfp = props.trainerData.pfp || null;
      form.fName = props.trainerData.fName || '';
      form.lName = props.trainerData.lName || ''; 
      form.email = props.trainerData.email || '';
      form.phone = props.trainerData.phone === 'N/A' ? '' : (props.trainerData.phone || '');
      form.dob = props.trainerData.dob || '';
      form.address = props.trainerData.address || '';
      form.city = props.trainerData.city || '';
      form.zipCode = props.trainerData.zipCode || '';
      form.school = props.trainerData.school || '';
      form.club = props.trainerData.club || '';
      form.status = props.trainerData.status;

    }

  };

  watch(() => props.trainerData, fillForm, { immediate: true }); 
  
  const handleImageUpload = (image) => {

    form.pfp = image;

  };

  const handleSave = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+31|0)[1-9]\d{8}$/;

    if (!form.fName)
      return;

    if (form.email && !emailRegex.test(form.email))
      return;

    if (form.phone && !phoneRegex.test(form.phone))
      return;

    const trainerObject = {

      ...props.trainerData,
      pfp: form.pfp,
      fName: form.fName,
      lName: form.lName,
      email: form.email,
      phone: (!form.phone) ? 'N/A' : form.phone,
      dob: form.dob,
      address: form.address,
      city: form.city,
      zipCode: form.zipCode,
      school: form.school,
      club: form.club,
      status: form.status,
      initials: getInitials(form.fName),
      
    };

    if (props.mode === 'create') {
      trainerStore.addTrainer(trainerObject);
    } else if(props.mode === 'edit') {
      trainerStore.updateTrainer(trainerObject);
    }

    emit('save', trainerObject);

  };

  const cities = ['Amsterdam', 'Amstenrade', 'Kats', 'Echtenerbrug'];
  const schools = ['Royal Dutch Tennis'];
  const clubs = ['Netherlands Tennis Club', 'Ace Tennis Club School', 'Ace Tennis Club 2', 'New Club 37'];

</script>

<template>

  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">

    <div class="h-full overflow-y-scroll bg-white shadow-xl rounded-2xl w-220">

      <div class="flex items-center justify-between py-5">

        <h2 v-if="(props.mode === 'create')" class="mt-2 ml-10 text-4xl font-semibold">Trainer Information</h2>

        <h2 v-if="(props.mode === 'view')" class="mt-2 ml-10 text-4xl font-semibold">{{ props.trainerData.fName + ' ' + props.trainerData.lName}}</h2>

        <h2 v-if="(props.mode === 'edit')" class="mt-2 ml-10 text-4xl font-semibold">{{ props.trainerData.fName + ' ' + props.trainerData.lName}}<span class="text-[20px]"> ( Edit )</span></h2>

        <button v-if="props.mode === 'view'" class="relative cursor-pointer left-65" @click="$emit('edit', props.trainerObject)">

          <img :src="editIcon" class="w-6 h-6 opacity-50" />

        </button>

        <button @click="$emit('close')" class="text-2xl text-gray-400 cursor-pointer hover:text-gray-600">

          <img :src="crossIcon" class="w-10 h-10 opacity-40">

        </button>

      </div>

      <hr class="mx-10 opacity-20">

      <form @submit.prevent="handleSave" :class="((props.mode === 'view') ? 'cursor-not-allowed ' : '') + 'p-8'">

        <div class="flex">

          <ImageSubmitButton :name="form.fName" :image="form.pfp" @image-uploaded="handleImageUpload" :mode="props.mode" />

        </div>

        <div class="grid grid-cols-2">

          <TrainerInputs v-model:inputData="form.fName" inputLabel="First Name" inputPlaceholder="First Name" :icon="personIcon" mustFill hasAsterisk validationMessage="First name is required" :mode="props.mode" />

          <TrainerInputs v-model:inputData="form.lName" inputLabel="Last Name" inputPlaceholder="Last Name" :icon="personIcon" :mode="props.mode" />

          <TrainerInputs v-model:inputData="form.email" type="email" inputLabel="Email" inputPlaceholder="info@youmai.com" :icon="emailIcon" mustFill  hasAsterisk :isDisabled="props.mode === 'view'" validationMessage="Email is required" :mode="props.mode" />
          
          <TrainerInputs v-model:inputData="form.phone" type="phone" inputLabel="Phone" inputPlaceholder="Enter phone number" :icon="phoneIcon" :mode="props.mode" />
          
          <TrainerInputs v-model:inputData="form.dob" inputLabel="Date of Birth" inputPlaceholder="DOB" :icon="calendarIcon" isDropDown mustFill hasAsterisk :mode="props.mode" />
        
        </div>

        <div>

          <TrainerInputs v-model:inputData="form.address" inputLabel="Address line" inputPlaceholder="Enter address" :icon="locationIcon" :mode="props.mode" />

        </div>

        <div class="grid grid-cols-2">

          <TrainerInputs v-model:inputData="form.city" inputLabel="City" inputPlaceholder="Select City" :icon="cityIcon" isDropDown :options="cities" :mode="props.mode" />

          <TrainerInputs v-model:inputData="form.zipCode" type="zipCode" inputLabel="Zip Code" inputPlaceholder="Enter zip code" :icon="locationIcon" :mode="mode" />

          <TrainerInputs v-model:inputData="form.school" inputLabel="School" inputPlaceholder="Select School" :icon="buildingIcon" isDisabled isDropDown :options="schools" hasAsterisk mustFill :mode="props.mode" />
          
          <TrainerInputs v-model:input-data="form.club" inputLabel="Club" inputPlaceholder="Select Club" :icon="clubsIcon" isDropDown :options="clubs" hasAsterisk mustFill :mode="props.mode" />
        
        </div>

        <div v-if="props.mode !== 'view'" class="flex mt-10">

          <FormButtons @cancel="$emit('close')" cancel />

          <FormButtons @save="handleSave" save />

        </div>

      </form>

    </div>

  </div>

</template>