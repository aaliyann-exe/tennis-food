import { defineStore } from "pinia";

export const useHashtagStore = defineStore("hashtagStore", {
  state: () => ({
    hashtags: [
      {
        id: 1,
        title: "atsamhashtag1",
        creator: "Super Admin",
      },

      {
        id: 2,
        title: "danishhashtag",
        creator: "Super Admin",
      },

      {
        id: 3,
        title: "TennisLife",
        creator: "School Admin",
      },

      {
        id: 4,
        title: "MONDAY",
        creator: "Super Admin",
      },

      {
        id: 5,
        title: "atsamhashtag1",
        creator: "Super Admin",
      },

      {
        id: 6,
        title: "danishhashtag",
        creator: "Super Admin",
      },

      {
        id: 7,
        title: "TennisLife",
        creator: "School Admin",
      },

      {
        id: 8,
        title: "MONDAY",
        creator: "Super Admin",
      },

      {
        id: 9,
        title: "atsamhashtag1",
        creator: "Super Admin",
      },

      {
        id: 10,
        title: "danishhashtag",
        creator: "Super Admin",
      },

      {
        id: 11,
        title: "atsamhashtag1",
        creator: "Super Admin",
      },

      {
        id: 12,
        title: "danishhashtag",
        creator: "Super Admin",
      },

      {
        id: 13,
        title: "TennisLife",
        creator: "School Admin",
      },

      {
        id: 14,
        title: "MONDAY",
        creator: "Super Admin",
      },

      {
        id: 15,
        title: "atsamhashtag1",
        creator: "Super Admin",
      },

      {
        id: 16,
        title: "danishhashtag",
        creator: "Super Admin",
      },

      {
        id: 17,
        title: "TennisLife",
        creator: "School Admin",
      },

      {
        id: 18,
        title: "MONDAY",
        creator: "Super Admin",
      },

      {
        id: 19,
        title: "atsamhashtag1",
        creator: "Super Admin",
      },

      {
        id: 20,
        title: "danishhashtag",
        creator: "Super Admin",
      },
    ],
  }),

  actions: {
    addHashtag(hashtag) {
      this.hashtags.unshift({ ...hashtag, id: Date.now() });
    },

    updateHashtag(updatedHashtag) {
      const index = this.hashtags.findIndex((h) => hl.id === updatedHashtag.id);

      if (index !== -1) {
        this.hashtags.splice(index, 1, updatedHashtag);
      } else {
        console.error("Hashtag id not found ", updatedHashtag);
      }
    },

    deleteHashtag(id) {
      this.hashtags = this.hashtags.filter((hashtag) => hashtag.id !== id);
    },
  },
});
