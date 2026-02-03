<script setup>

    import { ref } from 'vue';

    const props = defineProps({

        icon: {
            type: String,
            required: true,
        },

        text: {

            type: String,
            required: true,
        },

        selected: {

            type: Boolean,
            required: false,
        }

    });

    let marker = ref('');

    let pointerMarker = ref('invisible');

    if (props.text === 'Clubs') {

        marker.value = 'text-primary';

        pointerMarker.value = 'block';

    }

    else {

        marker.value = '';

        pointerMarker.value = 'invisible';

    };

</script>

<template>

    <div class="flex">

        <div v-if="selected" class="text-primary text-[50px] font-extralight">[</div>

        <router-link :to="'/' + props.text.toLowerCase()" class="no-underline">

            <div class="py-3 px-2 ml-8 w-60 rounded-lg text-sm font-normal hover:bg-primary-outline hover:text-primary cursor-pointer">

                <span class="mr-3">

                    <img :src="icon" alt="Dashboard Icon" class="inline w-5 h-5 opacity-50">
                    
                </span>

                <span :class="marker"> {{ text }} </span>
                
            </div>

        </router-link>

    </div>

        <!-- <div class="py-3 px-2 ml-8 w-60 rounded-lg text-sm font-normal hover:bg-primary-outline hover:text-primary cursor-pointer">

            <span class="mr-3">

                <img :src="icon" alt="Dashboard Icon" class="inline w-5 h-5 opacity-50">
                
            </span>

            <span :class="marker"> {{ text }} </span>
            
        </div>
    
    </div> -->
    
</template>