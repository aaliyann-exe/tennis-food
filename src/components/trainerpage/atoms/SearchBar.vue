<script setup>

    import magnifyingGlassIcon from '/src/assets/magnifyingGlassIcon.svg';

</script>

<template>
    
    <div class="bg-secondary flex p-4 rounded-2xl w-60 ml-156 border border-secondary focus-within:border focus-within:border-primary">

        <input placeholder="Search..." class="placeholder:text-gray-200 w-60 text-primary border-secondary outline-none">

        <img :src="magnifyingGlassIcon" class="w-5 h-5 mt-1 opacity-60 relative">

    </div>

</template>