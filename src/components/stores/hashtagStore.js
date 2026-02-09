import { defineStore } from 'pinia'

export const useHashtagStore = defineStore('hashtagStore', {

  state: () => ({

    hashtags: [

      {

        id: 1,
        title: 'atsamhashtag1',
        creator: 'Super Admin',

      },

      {

        id: 2,
        title: 'danishhashtag',
        creator: 'Super Admin',

      },

      {

        id: 3,
        title: 'TennisLife',
        creator: 'School Admin',

      },

      {

        id: 4,
        title: 'MONDAY',
        creator: 'Super Admin',

      },

    ],

  }),

  actions: {

    addHashtag(hashtag) {

      this.hashtags.unshift({ ...hashtag, id: Date.now() });

    },

    updateHashtag(updatedHashtag) {

      const index = this.hashtags.findIndex(c => c.id === updatedHashtag.id);
      
      if (index !== -1) {

        this.hashtags.splice(index, 1, updatedHashtag);

      } else {

        console.error("Hashtag id not found ", updatedHashtag);

      }

    },

    deleteHashtag(id) {
      
      this.hashtags = this.hashtags.filter((hashtag) => hashtag.id !== id)

    },

  }
})