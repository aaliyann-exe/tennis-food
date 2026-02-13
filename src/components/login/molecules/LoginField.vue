<script setup lang="ts">

  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";

  import tennisLogo from "/src/assets/tennisLogo.svg";
  import emailIcon from "/src/assets/emailIcon.svg";
  import passwordIcon from "/src/assets/passwordIcon.svg";
  import hideIcon from "/src/assets/hideIcon.png";
  import viewIcon from "/src/assets/viewIcon.png";

  import FormInput from "/src/components/login/atoms/FormInput.vue";

  const email = ref("");
  const password = ref("");
  const showPassword = ref(false);
  const emailTouched = ref(false);
  const passwordTouched = ref(false);

  const router = useRouter();

  const errorMessage = computed(() => {

    const emailValid = /^\S+@\S+\.\S+$/.test(email.value);
    const passValid = /[!@#$%^&*(),.?":{}|<>]/.test(password.value);

    if (emailTouched.value || passwordTouched.value) {

      if (!email.value && !password.value)
        return "Email and password are required!";

      if (!email.value)
        return "Email is required!";

      if (!password.value)
        return "Password is required!";

    }

    if (!emailTouched.value || !passwordTouched.value)
      return "";

    if (!emailValid)
      return "Please enter a valid email address!";

    if (password.value.length < 6)
      return "Password must be at least 6 characters!";

    if (!passValid)
      return "Password must have at least 1 special character!";

    return "";

  });

  const invalidMessage = ref("")

  const handleLogin = () => {

    emailTouched.value = true;
    passwordTouched.value = true;

    if (errorMessage.value === "" && email.value && password.value) {
    
      if (email.value === "t@f.com" && password.value === "t@1234") {

        router.push("/clubs");

      } else {

        invalidMessage.value = "Invalid email or password.";

      }
      

    }

  };

</script>

<template>

  <div class="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 md:px-24 bg-white relative container2">
    
    <LanguageToggle />

    <div class="w-130">

      <div class="flex justify-center mb-12">

        <img :src="tennisLogo" alt="Logo" class="w-19 h-19" />

      </div>

      <div class="text-center mb-8 mt-30">

        <h1 class="text-3xl font-semibold mb-1">

          {{ $t('login.login') }}

        </h1>

        <p class="text-slate-500 text-sm mb-3">

          {{ $t('login.title') }}

        </p>

      </div>

      <form @submit.prevent="handleLogin" class="space-y-5 mt-14">
        
        <FormInput :label="$t('login.emailLabel')" v-model="email" :placeholder="$t('login.email')" :icon="emailIcon" :hasError="errorMessage.toLowerCase().includes('email')" @input-blur="emailTouched = true" />

        <FormInput :label="$t('login.password')" v-model="password" :type="showPassword ? 'text' : 'password'" :placeholder="$t('login.password')" :icon="passwordIcon" :showToggle="true" :isPasswordVisible="showPassword" :viewIcon="viewIcon" :hideIcon="hideIcon" :hasError="errorMessage.toLowerCase().includes('password')" @toggle-password="showPassword = !showPassword" @input-blur="passwordTouched = true" />

        <div :class="['h-4', !errorMessage ? 'hidden' : 'block']">

          <p class="text-red-500 text-sm text-left">
            
            {{ errorMessage }}
          
          </p>

        </div>

        <div v-if="invalidMessage" :class="['h-4', !invalidMessage ? 'hidden' : 'block']">

          <p class="text-red-500 text-sm text-left">
            
            {{ invalidMessage }}
          
          </p>

        </div>

        <button type="submit" class="w-full bg-[#ff5a1f] hover:bg-[#de5223] text-white font-medium py-3 rounded-lg active:bg-[#d33500] transition-all">

          {{ $t('login.signin') }}

        </button>

        <div class="text-center mt-2">
          
          <a href="#" class="text-gray-500 text-10 hover:text-[#ff5a1f]">

            {{ $t('login.forgotPass') }}

          </a>
          
        </div>
        
      </form>
      
    </div>
    
  </div>
  
</template>