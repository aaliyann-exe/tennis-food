import { defineStore } from 'pinia';
import schoolAdminIcon from '/src/assets/schoolAdminIcon.jpg'; 

export const useProfileStore = defineStore('profileStore', {

  state: () => ({

    profile: {

      pfp: schoolAdminIcon,
      name: 'Royal',
      email: 'tennis@food.com',
      phone: '+31612345678',
      website: '',
      zipCode: '',
      city: '',
      address: '',
      repName: '',
      repEmail: '',
      repPhone: '',

    },

  }),

  actions: {

    updateProfile(updatedData) {

      Object.assign(this.profile, updatedData);

    }

  }
  
});