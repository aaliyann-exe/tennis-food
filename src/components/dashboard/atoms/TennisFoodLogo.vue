<script setup>

import TennisLogo from '/src/assets/tennisLogo.svg'

</script>

<template>

    <router-link to="/dashboard" class="text-primary text-[26px] font-bold inline relative top-1 right-1">

        <div class="inline-block pl-6 pt-9 mb-7">

            <img :src="TennisLogo" alt="Tennis Logo" class="inline pr-4">

            <span class="font-bold">

                TennisFood

            </span>

        </div>

    </router-link>


</template>