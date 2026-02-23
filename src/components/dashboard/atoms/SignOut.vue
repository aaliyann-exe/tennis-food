<script setup>
import signOutIcon from "/src/assets/signOutIcon.svg";
import { useLoginStore } from "/src/components/stores/loginStore.js";

const loginStore = useLoginStore();

const handleLogout = () => {
  loginStore.logout();

  router.push("/login");
};
</script>

<template>
  <router-link to="/login">
    <button @click="handleLogout">
      <div
        class="flex items-center justify-between mt-5 py-3 px-4 ml-8 w-62 h-14 rounded-lg hover:bg-primary-outline cursor-pointer"
      >
        <div class="flex items-center">
          <img
            :src="signOutIcon"
            alt="Sign Out Icon"
            class="w-6 h-6 rounded-full mr-3 opacity-50"
          />

          <div
            class="flex flex-col justify-center text-gray-500 text-sm font-medium"
          >
            {{ $t("dashboard.signout") }}
          </div>
        </div>
      </div>
    </button>
  </router-link>
</template>
