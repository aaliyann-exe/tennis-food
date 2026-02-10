import { createI18n } from 'vue-i18n';

const messages = {

  en: {

    dashboard: {

      dashboard: 'Dashboard',
      clubs: 'Clubs',
      trainers: 'Trainers',
      players: 'Players',
      hashtags: 'Hashtags',
      courts: 'Courts',
      trainings: 'Trainings',
      admin: 'Admin',
      signout: 'Sign out',

    },

    tab: {

      search: 'Search',
      active: 'Active',
      archived: 'Archived',
      page: 'page',
      noDataFound: 'No Data Found',
    
    },

    table: {
      
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      status: 'Status',
      actions: 'Actions',
      active: 'Active',
      inactive: 'Inactive',
      view: 'View',
      edit: 'Edit',
      activate: 'Activate',
      deactivate: 'Deactivate',
      information: 'Information',
      address: 'Address line',
      primaryContact: 'Primary Contact Person',
      optional: 'Optional',
      fName: 'First Name',
      lName: 'Last Name',
      cancel: 'Cancel',
      save: 'Save',
      update: 'Update',

    },

    modalField: {

      association: 'Association',
      phone: 'Enter phone number',
      address: 'Enter address',
      error: 'is required',
      select: 'Select',

    },

    court: {

      court: 'Court',
      courts: 'Courts',
      hard: 'Hard',
      clay: 'Clay',
      grass: 'Grass',
      synthetic: 'Synthetic',
      other: 'Other',
      indoor: 'Indoor',
      outdoor: 'Outdoor',
      environment: 'Environment',

    },

  },

  nl: {

    dashboard: {

      dashboard: 'Dashboard',
      clubs: 'Clubs',
      trainers: 'Trainers',
      players: 'Spelers',
      hashtags: 'Hashtags',
      courts: 'Banen',
      trainings: 'Trainingen',
      admin: 'Beheerder',
      signout: 'Meld u af',

    },

    tab: {

      search: 'Zoeken',
      active: 'Actief',
      archived: 'Gearchiveerd',
      page: 'pagina',
      noDataFound: 'Geen Gegevens Gevonden',

    },

    table: {

      name: 'Naam',
      email: 'E-mail',
      phone: 'Telefoon',
      status: 'Status',
      actions: 'Acties',
      active: 'Actief',
      inactive: 'Inactief',
      view: 'Bekijken',
      edit: 'Bewerken',
      activate: 'Activeren',
      deactivate: 'Deactiveren',
      information: 'Informatie',
      address: 'Adresregel',
      primaryContact: 'Primaire Contactpersoon',
      optional: 'Optioneel',
      fName: 'Voornaam',
      lName: 'Achternaam',
      cancel: 'Annuleren',
      save: 'Opslaan',
      update: 'Bijwerken',

    },

    modalField: {

      association: 'Vereniging',
      phone: 'Voer telefoonnummer in',
      address: 'Voer adres in',
      error: 'is verplicht',
      select: 'Selecteer',

    },

    court: {

      court: 'Baan',
      courts: 'Banen',
      hard: 'Hardcourt',
      clay: 'Gravel',
      grass: 'Gras',
      synthetic: 'Synthetisch',
      other: 'Anders',
      indoor: 'Binnen',
      outdoor: 'Buiten',
      environment: 'Omgeving',

    },

  },

};

const i18n = createI18n({

  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,

});

export default i18n;