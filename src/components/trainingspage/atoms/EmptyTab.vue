<script setup lang="ts">

    const emits = defineEmits(['add-training'])

</script>

<template>

    <div class="flex min-h-screen items-center justify-center bg-gray p-6">
        
        <div class="flex flex-col h-200 w-full max-w-6xl items-center justify-center rounded-xl border border-gray-100 bg-secondary shadow-sm">
    
            <h1 class="text-2xl font-semibold">
                
                No trainings found

            </h1>

            <div class="p-4">

                <button @click="$emit('add-training')" class="text-primary bg-secondary border border-primary px-6 py-3 rounded-full text-sm cursor-pointer hover:bg-primary hover:text-white">

                    Add Training

                </button>

            </div>
    
        </div>
        
    </div>

</template>