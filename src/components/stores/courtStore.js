import { defineStore } from 'pinia';
// import { useI18n } from 'vue-i18n';
import courtPfp from '/src/assets/courtPfp.jpg';

// const { t } = useI18n()

export const useCourtStore = defineStore('courtStore', {

  state: () => ({

    courts: [
      
      {
        
        id: 1,
        pfp: courtPfp,
        name: 'Centre Court Amsterdam',
        type: 'Hard',
        environment: 'Indoor',
        // type: t('court.hard'),
        // environment: t('court.indoor'),
        school: 'Royal Dutch Tennis',
        club: 'Netherlands Tennis Club',
        status: true,
        initials: '',

      },

    ],

  }),

  actions: {

    addCourt(court) {

      this.courts.unshift({ ...court, id: Date.now() });

    },

    updateCourt(updatedCourt) {

      const index = this.courts.findIndex(c => c.id === updatedCourt.id);
      
      if (index !== -1) {

        this.courts.splice(index, 1, updatedCourt);

      } else {

        console.error("Court id not found ", updatedCourt);

      }

    }
  }
})