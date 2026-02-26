<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useLoginStore } from "/src/components/stores/loginStore";
import { useProfileStore } from "/src/components/stores/profileStore";

import tennisLogo from "/src/assets/tennisLogo.svg";
import emailIcon from "/src/assets/emailIcon.svg";
import passwordIcon from "/src/assets/passwordIcon.svg";
import hideIcon from "/src/assets/hideIcon.png";
import viewIcon from "/src/assets/viewIcon.png";

import FormInput from "/src/components/login/atoms/FormInput.vue";

import Button from "../atoms/Button.vue";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const emailTouched = ref(false);
const passwordTouched = ref(false);

const router = useRouter();
const loginStore = useLoginStore();
const profileStore = useProfileStore();

const hasError = ref(false);

const errorMessage = computed(() => {
  const emailValid = /^\S+@\S+\.\S+$/.test(email.value);
  const passValid = /[!@#$%^&*(),.?":{}|<>]/.test(password.value);

  if (emailTouched.value || passwordTouched.value) {
    hasError.value = true;
    if (!email.value && !password.value)
      return "Email and password are required!";

    if (!email.value) return "Email is required!";

    if (!emailValid) return "Please enter a valid email address!";

    if (!password.value) return "Password is required!";

    if (password.value.length < 6)
      return "Password must be at least 6 characters!";

    if (!passValid) return "Password must have at least 1 special character!";

    if (
      email.value !== profileStore.profile.email ||
      password.value !== profileStore.profile.password
    ) {
      return "Invalid email or password.";
    }

    if (!emailTouched.value || !passwordTouched.value) return null;

    if (email.value === profileStore.profile.email) hasError.value = false;
    if (password.value === profileStore.profile.password)
      hasError.value = false;
  }
  return null;
});

const handleLogin = () => {
  emailTouched.value = true;
  passwordTouched.value = true;

  if (
    email.value === profileStore.profile.email &&
    password.value === profileStore.profile.password
  ) {
    loginStore.login();
    router.push("/dashboard");
  }
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
          {{ $t("login.login") }}
        </h1>

        <p class="text-slate-500 text-sm mb-3">
          {{ $t("login.title") }}
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5 mt-14">
        <FormInput
          :label="$t('login.emailLabel')"
          v-model="email"
          :placeholder="$t('login.email')"
          :icon="emailIcon"
          :hasError="hasError"
          @input-blur="emailTouched = true"
        />

        <FormInput
          :label="$t('login.password')"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          :placeholder="$t('login.password')"
          :icon="passwordIcon"
          :showToggle="true"
          :isPasswordVisible="showPassword"
          :viewIcon="viewIcon"
          :hideIcon="hideIcon"
          :hasError="hasError"
          @toggle-password="showPassword = !showPassword"
          @input-blur="passwordTouched = true"
        />

        <div :class="['h-4', !errorMessage ? 'hidden' : 'block']">
          <p class="text-red-500 text-sm text-left">
            {{ errorMessage }}
          </p>
        </div>

        <Button />

        <router-link to="/forgot-password">
          <div
            class="text-center mt-2 text-gray-500 font-small hover:text-primary"
          >
            {{ $t("login.forgotPass") }}
          </div>
        </router-link>
      </form>
    </div>
  </div>
</template>
