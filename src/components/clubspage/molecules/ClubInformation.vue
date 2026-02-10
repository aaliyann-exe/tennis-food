<script setup>

  import { ref, reactive, onMounted, watch } from 'vue';
  import { useClubStore } from '/src/components/stores/clubStore';

  import clubsIcon from '/src/assets/clubsIcon.svg';
  import emailIcon from '/src/assets/emailIcon.svg';
  import phoneIcon from '/src/assets/phoneIcon.svg';
  import globeIcon from '/src/assets/globeIcon.svg';
  import personIcon from '/src/assets/personIcon.svg';
  import buildingIcon from '/src/assets/buildingIcon.svg';
  import locationIcon from '/src/assets/locationIcon.svg';
  import crossIcon from '/src/assets/crossIcon.svg';
  import editIcon from '/src/assets/editIcon.svg';

  import ClubInputs from '/src/components/clubspage/atoms/ClubInputs.vue';
  import FormButtons from '/src/components/clubspage/atoms/FormButtons.vue';
  import ImageSubmitButton from '/src/components/clubspage/atoms/ImageSubmitButton.vue';

  const emit = defineEmits(['close', 'save', 'edit']);

  const props = defineProps({

    mode: {

      type: String,
      default: 'create',

    },

    clubData: {

      type: Object,
      default: () => ({}),

    },

  });

  const clubStore = useClubStore();

  onMounted(() => {

    if (props.mode === 'edit' || props.mode === 'view') {

    Object.assign(form, props.clubData);

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

    clubName: '',
    email: '',
    phone: '',
    website: '',
    image: null,
    status: true,

  });

  const fillForm = () => {

    if (props.mode === 'create') {
      
      form.clubName = '';
      form.email = '';
      form.phone = '';
      form.website = '';
      form.image = null;
      form.status = true;

    } else if (props.clubData) {

      form.clubName = props.clubData.name || ''; 
      form.email = props.clubData.email || '';
      form.phone = ((props.clubData.phone === 'N/A') ? '' : (props.clubData.phone || ''));
      form.website = props.clubData.website || '';
      form.status = props.clubData.status || true;
      form.image = props.clubData.image || null;
      form.status = props.clubData.status;

    }

  };

  watch(() => props.clubData, fillForm, { immediate: true }); 
  
  const handleImageUpload = (image) => {

    form.image = image;

  };

  const handleSave = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(?:\+31|0)[1-9]\d{8}$/;

    if (!form.clubName)
      return;

    if (form.email && !emailRegex.test(form.email))
      return;

    if (form.phone && !phoneRegex.test(form.phone))
      return;

    if (form.website && !form.website.includes('.'))
      return;

    const clubObject = {

      ...props.clubData,
      name: form.clubName,
      email: form.email,
      phone: (!form.phone) ? 'N/A' : form.phone,
      website: form.website,
      initials: getInitials(form.clubName),
      image: form.image,
      status: true,

    };

    if (props.mode === 'create') {
      clubStore.addClub(clubObject);
    } else if(props.mode === 'edit') {
      clubStore.updateClub(clubObject);
    }

    emit('save', clubObject);

  };

</script>

<template>

  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">

    <div class="max-h-[95vh] overflow-y-auto bg-white shadow-xl rounded-2xl w-220">

      <div class="flex items-center justify-between px-8 py-5">

        <div class="flex flex-col">

          <h2 v-if="(props.mode === 'create')" class="mt-2 ml-5 text-4xl font-semibold">Club {{ $t('table.information') }}</h2>

          <h2 v-if="(props.mode === 'view')" class="mt-2 ml-5 text-4xl font-semibold"> {{ props.clubData.name }} </h2>

          <h2 v-if="(props.mode === 'edit')" class="mt-2 ml-5 text-4xl font-semibold"> {{ props.clubData.name }} <span class="text-[20px]">( {{ $t('table.edit') }} )</span></h2>

        </div>

        <div class="flex items-center gap-4">

          <button v-if="props.mode === 'view'" class="absolute cursor-pointer top-21 right-100" @click="$emit('edit', props.clubObject)">

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

          <ImageSubmitButton :clubName="form.clubName" @image-uploaded="handleImageUpload" :mode="props.mode" />

        </div>

        <div class="grid grid-cols-2 gap-6">

          <ClubInputs v-if="props.mode === 'create' || props.mode === 'edit'" v-model:inputData="form.clubName" :inputLabel="'Club ' + $t('table.name')" :inputPlaceholder="'Club ' + $t('table.name')" :icon="clubsIcon" mustFill hasAsterisk :validationMessage="'Club/' + $t('modalField.association') + ' ' + $t('modalField.error')" :mode="props.mode" />

          <ClubInputs v-model:inputData="form.email" type="email" :inputLabel="$t('table.email')" inputPlaceholder="info@youmai.com" :icon="emailIcon" :mode="props.mode" />

          <ClubInputs v-model:inputData="form.phone" type="phone" :inputLabel="$t('table.phone')" :inputPlaceholder="$t('modalField.address')" :icon="phoneIcon" :mode="props.mode" />

          <ClubInputs v-model:inputData="form.website" inputLabel="Website" inputPlaceholder="www.club.com" :icon="globeIcon" :mode="props.mode" />

          <ClubInputs inputLabel="School" inputPlaceholder="Royal Dutch Tennis" :icon="buildingIcon" isDropDown isDisabled :mode="props.mode" />

          <ClubInputs :inputLabel="$t('table.address')" :inputPlaceholder="$t('modalField.address')" :icon="locationIcon" :mode="props.mode" />

        </div>

        <div class="mt-8 mb-4">

          <h3 class="inline text-2xl font-semibold">

          {{ $t('table.primaryContact') }}

          </h3>

          <span class="ml-1 text-xs text-orange-500">
            
            {{ $t('table.optional')}}
          
          </span>

        </div>

        <div class="grid grid-cols-2 gap-6">

          <ClubInputs :inputLabel="$t('table.fName')" :inputPlaceholder="$t('table.fName')" :icon="personIcon" :mode="props.mode" />

          <ClubInputs :inputLabel="$t('table.fName')" :inputPlaceholder="$t('table.fName')" :icon="personIcon" :mode="props.mode" />

          <ClubInputs type="phone" :inputLabel="$t('table.phone')" :inputPlaceholder="$t('modalField.phone')" :icon="phoneIcon" :mode="props.mode"  />

          <ClubInputs type="email" :inputLabel="$t('table.email')" inputPlaceholder="info@youmai.com" :icon="emailIcon" :mode="props.mode" />

        </div>

        <div v-if="(props.mode !== 'view')" class="flex mt-10">

          <FormButtons @click="$emit('close')" white />

          <FormButtons :text="((props.mode === 'edit') ? $t('table.update') : $t('table.save') )" orange />

        </div>

      </form>

    </div>

  </div>

</template>