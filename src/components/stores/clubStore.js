import { defineStore } from 'pinia'
import netherlandsTennisClubPfp from '/src/assets/netherlandsTennisClubPfp.png';

export const useClubStore = defineStore('clubStore', {

  state: () => ({

    clubs: [
      
      {

        id: 1,
        name: 'Ace Tennis Club 2',
        email: 'aceRoyal.tennis@example.co...',
        phone: 'N/A',
        status: 'Active',
        initials: 'TF',
        status: true,


      },

      {

        id: 2,
        name: 'Ace Tennis Club School',
        email: 'ace.tennisschool@example.c...',
        phone: 'N/A',
        status: 'Active',
        initials: 'TF',
        status: true,


      },

      {

        id: 3,
        name: 'New Club 37',
        email: 'club22@youpmail.co',
        phone: 'N/A',
        status: 'Active',
        initials: 'TF',
        status: true,

      },
      
      {

        id: 4,
        name: 'Netherlands Tennis Club',
        email: '',
        phone: 'Amsterdam',
        status: 'Active',
        image: netherlandsTennisClubPfp,
        status: true,

      },

    ],

  }),

  actions: {

    addClub(club) {

      this.clubs.unshift({ ...club, id: Date.now() });

    },

    updateClub(updatedClub) {

      const index = this.clubs.findIndex(c => c.id === updatedClub.id);
      
      if (index !== -1) {

        this.clubs.splice(index, 1, updatedClub);

      } else {

        console.error("Could not save: Club ID not found", updatedClub);

      }

    }
  }
})