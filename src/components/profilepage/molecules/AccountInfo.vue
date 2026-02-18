<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useProfileStore } from '/src/components/stores/profileStore.js';

import emailIcon from '/src/assets/emailIcon.svg';
import phoneIcon from '/src/assets/phoneIcon.svg';
import globeIcon from '/src/assets/globeIcon.svg';
import personIcon from '/src/assets/personIcon.svg';
import buildingIcon from '/src/assets/buildingIcon.svg';
import locationIcon from '/src/assets/locationIcon.svg';
import editIcon from '/src/assets/editIcon.svg';
import cityIcon from '/src/assets/cityIcon.svg';

import ProfileInputs from '/src/components/profilepage/atoms/ProfileInputs.vue';
import FormButtons from '/src/components/profilepage/atoms/FormButtons.vue';
import ImageSubmitButton from '/src/components/profilepage/atoms/ImageSubmitButton.vue';

const profileStore = useProfileStore();

const mode = ref('view');

const form = reactive({

  pfp: null,
  name: '',
  email: '',
  phone: '',
  website: '',
  zipCode: '',
  city: '',
  address: '',
  repName: '',
  repEmail: '',
  repPhone: '',

});

const getProfileStore = () => {

  Object.assign(form, { ...profileStore.profile });

};

onMounted(() => {

  getProfileStore();

});

const enableEditMode = () => {

  getProfileStore();
  mode.value = 'edit';

};

const cancelEdit = () => {

  getProfileStore();
  mode.value = 'view';

};

const handleImageUpload = (image) => {

  form.pfp = image;

};

const handleSave = () => {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.name) {
    return;
  }

  if (form.email && !emailRegex.test(form.email)) {
    return;
  }

  profileStore.updateProfile({ ...form });

  mode.value = 'view';

};

</script>

<template>

  <div class="h-full pb-5 border border-gray-300 rounded-3xl flexbox bg-secondary">

    <div class="bg-linear-to-r from-[#fd6226] to-[#d9d9d9] p-8 rounded-t-3xl block w-full"></div>

    <form @submit.prevent="handleSave" class="p-8">

      <div class="flex items-center justify-between px-8 py-5">

        <div class="flex">

          <ImageSubmitButton :name="form.name" :image="form.pfp" @image-uploaded="handleImageUpload" :mode="mode" />

          <div class="flex flex-col pt-3 pl-5">

            <h1 class="text-lg font-medium text-gray-500">{{ form.name }}</h1>

            <p class="text-primary">School {{ $t('table.admin') }}</p>

          </div>

        </div>

        <button v-if="mode === 'view'" class="p-2 transition rounded-full cursor-pointer hover:bg-gray-100"
          @click="enableEditMode">

          <img :src="editIcon" class="w-6 h-6 opacity-50" alt="Edit" />

        </button>

      </div>

      <div>

        <div class="grid grid-cols-2">

          <ProfileInputs v-model:inputData="form.name" :inputLabel="$t('table.fullName')"
            :inputPlaceholder="'Voer ' + $t('table.fullName') + ' in'" :icon="buildingIcon" mustFill hasAsterisk
            :validationMessage="$t('table.fullName') + ' ' + $t('modalField.error')" :mode="mode" />

          <ProfileInputs v-model:inputData="form.email" type="email" :inputLabel="$t('table.email')"
            inputPlaceholder="info@youmai.com" :icon="emailIcon" :mode="mode" hasAsterisk />

          <ProfileInputs v-model:inputData="form.phone" type="phone" :inputLabel="$t('table.phone')"
            :inputPlaceholder="$t('modalField.phone')" :icon="phoneIcon" :mode="mode" hasAsterisk />

          <ProfileInputs v-model:inputData="form.website" type="website" inputLabel="Website" inputPlaceholder="Website"
            :icon="globeIcon" :mode="mode" hasAsterisk />

          <ProfileInputs v-model:inputData="form.zipCode" type="zipCode" :inputLabel="$t('table.zipCode')"
            :inputPlaceholder="$t('modalField.zipCode')" :icon="locationIcon" :mode="mode" hasAsterisk />

          <ProfileInputs v-model:inputData="form.city" type="city" :inputLabel="$t('table.city')"
            :inputPlaceholder="$t('modalField.select') + ' ' + $t('table.city')" :icon="cityIcon" :mode="mode"
            hasAsterisk isDropDown />

        </div>

        <div>

          <ProfileInputs v-model:inputData="form.address" :inputLabel="$t('table.address')"
            :inputPlaceholder="$t('modalField.address')" :icon="locationIcon" :mode="mode" />

        </div>

        <div class="grid grid-cols-2">

          <ProfileInputs v-model:inputData="form.repName"
            :inputLabel="'School ' + $t('table.representative').toLowerCase() + ' ' + $t('table.name').toLowerCase()"
            :inputPlaceholder="$t('modalField.rName')" :icon="personIcon" :mode="mode" />

          <ProfileInputs v-model:inputData="form.repEmail" type="email"
            :inputLabel="'School ' + $t('table.representative').toLowerCase() + ' ' + $t('table.email').toLowerCase()"
            :inputPlaceholder="$t('modalField.rEmail')" :icon="emailIcon" :mode="mode" />

          <ProfileInputs v-model:inputData="form.repPhone" type="phone"
            :inputLabel="'School ' + $t('table.representative').toLowerCase() + ' ' + $t('table.phone').toLowerCase()"
            :inputPlaceholder="$t('modalField.rPhone')" :icon="phoneIcon" :mode="mode" />

        </div>

      </div>

      <div v-if="(mode === 'edit')" class="flex justify-start mt-10">

        <FormButtons @cancel="cancelEdit" white />

        <FormButtons @save="handleSave" orange />

      </div>

    </form>

  </div>

</template>