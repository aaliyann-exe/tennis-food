import { defineStore } from "pinia";

export const useTrainerStore = defineStore("trainerStore", {
  state: () => ({
    trainers: [],
  }),

  getters: {
    activeTrainers: (state) =>
      state.trainers.filter((t) => t.status === true).length,
    inactiveTrainers: (state) =>
      state.trainers.filter((t) => t.status === false).length,
    totalTrainers: (state) => state.trainers.length,
  },

  actions: {
    addTrainer(trainer) {
      this.trainers.unshift({ ...trainer, id: Date.now() });
    },

    updateTrainer(updatedTrainer) {
      const index = this.trainers.findIndex((t) => t.id === updatedTrainer.id);

      if (index !== -1) {
        this.trainers.splice(index, 1, updatedTrainer);
      } else {
        console.error("Trainer id not found ", updatedTrainer);
      }
    },
  },
});
