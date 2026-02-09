<script setup>

  import dashboardIcon from '/src/assets/dashboardIcon.svg'
  import clubsIcon from '/src/assets/clubsIcon.svg'
  import trainerIcon from '/src/assets/trainerIcon.svg'
  import playerIcon from '/src/assets/playerIcon.svg'
  import hashIcon from '/src/assets/hashIcon.svg'
  import courtIcon from '/src/assets/courtIcon.svg'
  import trainingsIcon from '/src/assets/trainingsIcon.svg'

  import Icons from '../atoms/Icons.vue'
  import SchoolAdmin from '../atoms/SchoolAdmin.vue'
  import SignOut from '../atoms/SignOut.vue'
  import TennisFoodLogo from '../atoms/TennisFoodLogo.vue'

  const menuItems = [

    {
      icon: dashboardIcon,
      text: 'Dashboard'
    },

    {
      icon: clubsIcon,
      text: 'Clubs'
    },

    {
      icon: trainerIcon,
      text: 'Trainers'
    },

    {
      icon: playerIcon,
      text: 'Players'
    },

    {
      icon: hashIcon,
      text: 'Hashtags'
    },

    {
      icon: courtIcon,
      text: 'Courts'
    },

    {
      icon: trainingsIcon,
      text: 'Trainings'
    },

  ];

</script>

<template>

  <div class="bg-secondary pb-89 inline-block">

    <TennisFoodLogo />

    <Icons v-for="item in menuItems" :key="item.text" :icon="item.icon" :text="item.text" />

    <hr class="w-65 ml-5 mr-5 mt-3 opacity-10">

    <SchoolAdmin />

    <SignOut />

  </div>

</template>