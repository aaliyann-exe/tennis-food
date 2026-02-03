<script setup>

    import { ref } from 'vue';
    import uk from '/src/assets/uk.svg';
    import nl from '/src/assets/nl.svg';

    const isDutch = ref(false);

    const toggleLanguage = () => {

        isDutch.value = !isDutch.value;

    }

</script>

<template>

  <div class="absolute top-8 right-8 flex items-center gap-3 text-xs transition-colors">

    <span :class="['text-sm font-semibold', !isDutch ? 'text-slate-800' : 'text-slate-400']">ENG</span>

    <div @click="toggleLanguage" class="w-20 h-10 bg-slate-100 rounded-full p-1 flex items-center cursor-pointer relative shadow-inner">
      
        <div :class="['bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-transform duration-300 ease-in-out transform', isDutch ? 'translate-x-10' : 'translate-x-0']">
        
            <img :src="isDutch ? nl : uk" class="w-5 h-5 object-cover rounded-full">
      
        </div>
    
    </div>

    <span :class="['text-sm font-semibold', isDutch ? 'text-slate-800' : 'text-slate-400']">NL</span>

  </div>

</template>