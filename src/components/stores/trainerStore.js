import { defineStore } from 'pinia'

export const useTrainerStore = defineStore('trainerStore', {

  state: () => ({

    trainers: [],

  }),

  actions: {

    addTrainer(trainer) {

      this.trainers.unshift({ ...trainer, id: Date.now() });

    },

    updateTrainer(updatedTrainer) {

      const index = this.trainers.findIndex(c => c.id === updatedTrainer.id);
      
      if (index !== -1) {

        this.trainers.splice(index, 1, updatedTrainer);

      } else {

        console.error("Trainer id not found ", updatedTrainer);

      }

    }
  }
})