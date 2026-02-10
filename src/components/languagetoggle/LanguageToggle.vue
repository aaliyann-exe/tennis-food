<script setup>

    import { computed } from 'vue';
    import { useI18n } from 'vue-i18n';

    import uk from '/src/assets/uk.svg';
    import nl from '/src/assets/nl.svg';

    const { locale } = useI18n();

    const isDutch = computed(() => locale.value === 'nl');

    const toggleLanguage = () => {
        
        locale.value = ((locale.value === 'en') ? 'nl' : 'en');

    };

</script>

<template>

    <div class="absolute top-8 right-8 flex items-center gap-3 text-xs">

        <span :class="(!isDutch ? '' : 'text-slate-400 ') + 'text-sm font-semibold'">

            ENG

        </span>
        
        <div @click="toggleLanguage" class="w-20 h-10 bg-slate-100 rounded-full p-1 flex items-center cursor-pointer relative shadow-inner">
            
            <div :class="(isDutch ? 'translate-x-10 ' : 'translate-x-0 ') + 'bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center transition-transform duration-300'">
                
                <img :src="(isDutch ? nl : uk)" class="w-5 h-5 object-cover rounded-full">

            </div>

        </div>
        
        <span :class="(isDutch ? '' : 'text-slate-400 ') + 'text-sm font-semibold'">

            NL

        </span>

    </div>
    
</template>