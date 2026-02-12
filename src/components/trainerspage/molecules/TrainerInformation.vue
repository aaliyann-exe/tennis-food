<script setup>

  import { reactive, watch } from 'vue';
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

  const getInitials = (name) => {

    if (!name)
      return 'TF';

    else 
      return name.split('').map(word => word[0]).join('').toUpperCase().slice(0, 2);

  };

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

    <div class="max-h-[95vh] overflow-y-auto bg-white shadow-xl rounded-2xl w-220">

      <div class="flex items-center justify-between px-8 py-5">

        <div class="flex flex-col">

          <h2 v-if="(props.mode === 'create')" class="mt-2 ml-5 text-4xl font-semibold">Trainer {{ $t('table.information') }}</h2>

          <h2 v-if="(props.mode === 'view')" class="mt-2 ml-5 text-4xl font-semibold">{{ props.trainerData.fName + ' ' + props.trainerData.lName}}</h2>

          <h2 v-if="(props.mode === 'edit')" class="mt-2 ml-5 text-4xl font-semibold">{{ props.trainerData.fName + ' ' + props.trainerData.lName}}<span class="text-[20px]"> ( {{ $t('table.edit') }} )</span></h2>

        </div>

        <div class="flex items-center gap-4">

          <button v-if="(props.mode === 'view')" class="absolute cursor-pointer top-20 right-100" @click="$emit('edit', props.trainerData)">

            <img :src="editIcon" class="w-6 h-6 opacity-50" />

          </button>

        </div>

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

          <TrainerInputs v-model:inputData="form.fName" :inputLabel="$t('table.fName')" :inputPlaceholder="$t('table.fName')" :icon="personIcon" mustFill hasAsterisk :validationMessage="$t('table.fName') + ' ' + $t('modalField.error')" :mode="props.mode" />

          <TrainerInputs v-model:inputData="form.lName" :inputLabel="$t('table.lName')" :inputPlaceholder="$t('table.lName')" :icon="personIcon" :mode="props.mode" />

          <TrainerInputs v-model:inputData="form.email" type="email" :inputLabel="$t('table.email')" inputPlaceholder="info@youmai.com" :icon="emailIcon" mustFill  hasAsterisk :isDisabled="(props.mode === 'view')" :validationMessage="$t('table.email') + ' ' + $t('modalField.error')" :mode="props.mode" />
          
          <TrainerInputs v-model:inputData="form.phone" type="phone" :inputLabel="$t('table.phone')" :inputPlaceholder="$t('modalField.phone')" :icon="phoneIcon" :mode="props.mode" />
          
          <TrainerInputs v-model:inputData="form.dob" :inputLabel="$t('table.dob')" :inputPlaceholder="$t('modalField.dob')" :icon="calendarIcon" isDropDown mustFill hasAsterisk :mode="props.mode" />
        
        </div>

        <div>

          <TrainerInputs v-model:inputData="form.address" :inputLabel="$t('table.address')" :inputPlaceholder="$t('modalField.address')" :icon="locationIcon" :mode="props.mode" />

        </div>

        <div class="grid grid-cols-2">

          <TrainerInputs v-model:inputData="form.city" :inputLabel="$t('table.city')" :inputPlaceholder="$t('modalField.select') + ' ' + $t('table.city')" :icon="cityIcon" isDropDown :options="cities" :mode="props.mode" />

          <TrainerInputs v-model:inputData="form.zipCode" type="zipCode" :inputLabel="$t('table.zipCode')" :inputPlaceholder="$t('modalField.zipCode')" :icon="locationIcon" :mode="props.mode" />

          <TrainerInputs v-model:inputData="form.school" inputLabel="School" :inputPlaceholder="$t('modalField.select') + ' ' + 'School'" :icon="buildingIcon" isDisabled isDropDown :options="schools" hasAsterisk mustFill :mode="props.mode" />
          
          <TrainerInputs v-model:inputData="form.club" inputLabel="Club" :inputPlaceholder="$t('modalField.select') + ' ' + 'Club'" :icon="clubsIcon" isDropDown :options="clubs" hasAsterisk mustFill :mode="props.mode" />
        
        </div>

        <div v-if="(props.mode !== 'view')" class="flex mt-10">

          <FormButtons @cancel="$emit('close')" white />

          <FormButtons @save="handleSave" :text="((props.mode === 'edit') ? $t('table.update') : $t('table.save') )" orange />

        </div>

      </form>

    </div>

  </div>

</template>