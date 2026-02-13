import { defineStore } from 'pinia';
import { watch, ref } from 'vue';

export const useLanguageStore = defineStore('languageStore', () => {
    
    const currentLocale = ref(localStorage.getItem('locale-language') || 'en');

    watch(currentLocale, (newLocale) => {
        
        localStorage.setItem('locale-language', newLocale);

    });

    const toggle = () => {

        currentLocale.value = ( (currentLocale.value === 'en') ? 'nl' : 'en' );
        
    };

    return ( { currentLocale, toggle } );
    
})