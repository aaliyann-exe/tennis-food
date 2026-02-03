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

</script>


<template>

  <div class="bg-secondary pb-89 inline-block">

    <TennisFoodLogo />

      <Icons v-for="icon in [dashboardIcon, clubsIcon, trainerIcon, playerIcon, hashIcon, courtIcon, trainingsIcon]" :icon="icon" :text="icon === dashboardIcon ? 'Dashboard' : icon === clubsIcon ? 'Clubs' : icon === trainerIcon ? 'Trainers' : icon === playerIcon ? 'Players' : icon === hashIcon ? 'Hashtags' : icon === courtIcon ? 'Courts' : 'Trainings'" />

      <hr class="w-65 ml-5 mr-5 mt-3 opacity-10">

      <SchoolAdmin />

      <SignOut />

  </div>

</template>