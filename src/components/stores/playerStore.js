import { defineStore } from "pinia";
import i18n from "/src/i18n.js";

import schoolAdminIcon from "/src/assets/schoolAdminIcon.jpg";

export const usePlayerStore = defineStore("playerStore", {
  state: () => ({
    players: [
      {
        id: 1,
        pfp: schoolAdminIcon,
        fName: "Ans",
        lName: "Player",
        email: "mu128190@gmail.com",
        phone: "+31234937493",
        dob: "01-01-2004",
        ageGroup: i18n.global.t("player.a18"),
        address: "Keizersgracht 125, Amsterdam",
        zipCode: "1015 CJ",
        school: "Royal Dutch Tennis",
        club: "Netherlands Tennis Club",
        level: "National (level 3)",
        status: true,
      },

      {
        id: 2,
        initials: "TF",
        fName: "James",
        lName: "Miller",
        email: "james.miller@yopmail.com",
        phone: "+31 6 900001",
        dob: "09-03-2020",
        ageGroup: i18n.global.t("player.u12"),
        address: "Player Street 1",
        city: "Amsterdam",
        zipCode: "1000AA",
        school: "Royal Dutch Tennis",
        club: "Netherlands Tennis Club",
        status: false,
      },
    ],
  }),

  actions: {
    addPlayer(player) {
      this.players.unshift({ ...player, id: Date.now() });
    },

    updatePlayer(updatedPlayer) {
      const index = this.players.findIndex((p) => p.id === updatedPlayer.id);

      if (index !== -1) {
        this.players.splice(index, 1, updatedPlayer);
      } else {
        console.error("Could not save: Player ID not found", updatedPlayer);
      }
    },
  },
});
