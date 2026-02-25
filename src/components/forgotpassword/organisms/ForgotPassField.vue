<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useProfileStore } from "/src/components/stores/profileStore";

import FormInput from "/src/components/login/atoms/FormInput.vue";
import Button from "../atoms/Button.vue";
import ErrorModal from "../molecules/ErrorModal.vue";
import SuccessModal from "../molecules/SuccessModal.vue";

import tennisLogo from "/src/assets/tennisLogo.svg";
import emailIcon from "/src/assets/emailIcon.svg";

const email = ref("");
const emailTouched = ref(false);

const router = useRouter();
const profileStore = useProfileStore();

const errorMessage = computed(() => {
  const emailValid = /^\S+@\S+\.\S+$/.test(email.value);

  if (emailTouched.value) {
    if (!email.value) return "Email is required";
  }

  if (!emailTouched.value) return "";

  if (!emailValid) return "Invalid Email";
  return "";
});

const openSuccessModal = ref(false);
const openErrorModal = ref(false);

const handleEmail = () => {
  emailTouched.value = true;

  if (email.value) {
    if (email.value === profileStore.profile.email) {
      openSuccessModal.value = true;
    } else {
      openErrorModal.value = true;
    }
  }
};

const handleBack = () => {
  router.back();
};
</script>

<template>
  <div
    class="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 md:px-24 bg-white relative container2"
  >
    <div class="w-130">
      <div class="flex justify-center mb-12">
        <img :src="tennisLogo" alt="Logo" class="w-19 h-19" />
      </div>

      <div class="text-center mb-8 mt-30">
        <h1 class="text-3xl font-semibold mb-1">
          {{ $t("login.resetPasswordTitle") }}
        </h1>

        <p class="text-slate-500 text-sm mb-3">
          {{ $t("login.resetPasswordLabel") }}
        </p>
      </div>

      <Teleport to="body" v-if="openErrorModal">
        <ErrorModal @close="openErrorModal = false" />
      </Teleport>

      <Teleport to="body" v-if="openSuccessModal">
        <SuccessModal @close="openSuccessModal = false" />
      </Teleport>

      <form class="space-y-5 mt-14">
        <FormInput
          :label="$t('login.email')"
          v-model="email"
          :placeholder="$t('login.email')"
          :icon="emailIcon"
          @input-blur="emailTouched = true"
        />

        <div :class="['h-4', !errorMessage ? 'hidden' : 'block']">
          <p class="text-red-500 text-sm text-left">
            {{ errorMessage }}
          </p>
        </div>

        <div class="flex gap-5">
          <Button @click="handleBack" white />
          <Button @click="handleEmail" orange />
        </div>
      </form>
    </div>
  </div>
</template>
