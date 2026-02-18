import { defineStore } from "pinia";

export const useTrainingStore = defineStore("trainingStore", {
  state: () => ({
    trainings: [],
  }),

  actions: {
    addTraining(training) {
      this.trainings.unshift({ ...training, id: Date.now() });
    },

    updateTraining(updatedTraining) {
      const index = this.trainings.findIndex(
        (c) => c.id === updatedTraining.id,
      );

      if (index !== -1) {
        this.trainings.splice(index, 1, updatedTraining);
      } else {
        console.error("Training id not found ", updatedTraining);
      }
    },
  },
});
