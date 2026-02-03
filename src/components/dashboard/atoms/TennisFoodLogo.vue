<script setup>

    import TennisLogo from '/src/assets/tennisLogo.svg'

</script>

<template>

    <button class="cursor-pointer">

            <div class="inline-block pl-6 pt-9 mb-7">

                <img :src="TennisLogo" alt="Tennis Logo" class="inline pr-4">

                    <router-link to="/" class="text-primary text-[26px] font-bold inline relative top-1 right-1">
                        
                        TennisFood

                    </router-link>
            
            </div>

      </button>

</template>