import { defineStore } from 'pinia'
import schoolAdminIcon from '/src/assets/schoolAdminIcon.jpg';

export const usePlayerStore = defineStore('playerStore', {

  state: () => ({

    players: [
      
      {

        id: 1,
        pfp: schoolAdminIcon,
        fName: 'Ans',
        lName: 'Player',
        email: 'mu128190@gmail.com',
        phone: '+31234937493',
        dob: '01-01-2004',
        ageGroup: '19-30y',
        address: 'Keizersgracht 125, Amsterdam',
        city: '',
        zipCode: '1015 CJ',
        school: 'Royal Dutch Tennis',
        club: 'Netherlands Tennis Club',
        level: 'National (level 3)',
        status: true,

      },

    ],

  }),

  actions: {

    addPlayer(player) {

      this.players.unshift({ ...player, id: Date.now() });

    },

    updatePlayer(updatedPlayer) {

      const index = this.players.findIndex(p => p.id === updatedPlayer.id);
      
      if (index !== -1) {

        this.players.splice(index, 1, updatedPlayer);

      } else {

        console.error("Could not save: Player ID not found", updatedPlayer);

      }

    }
  }
})