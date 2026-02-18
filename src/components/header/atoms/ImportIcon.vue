<script setup>

import importIcon from '/src/assets/importIcon.svg';

</script>

<template>

    <div>

        <button
            class="flex border-2 border-gray-200 rounded-4xl p-3 px-5 cursor-pointer ml-5 items-center justify-center">

            <img :src="importIcon" class="w-5 h-5 mr-3 opacity-40 justify-center align-middle">

            <span class="text-gray-400 font-medium justify-center align-middle">Import</span>

        </button>

    </div>

</template>