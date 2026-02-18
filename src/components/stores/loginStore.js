import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
  state: () => ({
    isLoggedIn: !!checkSession(),
  }),

  actions: {
    login() {
      const now = new Date().getTime();
      this.isLoggedIn = true;
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("loginTimestamp", now.toString());
    },

    logout() {
      this.isLoggedIn = false;
      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("loginTimestamp");
    },
  },
});

function checkSession() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const loginTimestamp = sessionStorage.getItem("loginTimestamp");

  if (!isLoggedIn || !loginTimestamp) return false;

  const now = new Date().getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  if (now - parseInt(loginTimestamp) > twentyFourHours) {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loginTimestamp");
    return false;
  }

  return true;
}
