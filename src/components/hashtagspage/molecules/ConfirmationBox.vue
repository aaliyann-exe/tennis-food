<script setup lang="ts">

  import FormButtons from '../atoms/FormButtons.vue';

  const props = defineProps({

    title: {
        type: String,
        default: '',
    },

  });

  const emits = defineEmits(['confirm', 'cancel']);

</script>

<template>

    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/18">
        
        <div class="h-max w-150 bg-white shadow-sm rounded-[40px] p-10">
            
            <div class="mb-4">

                <div class="flex items-center justify-center w-8 h-8 border-2 border-primary rounded-full">

                    <span class="text-primary text-2xl font-medium">?</span>

                </div>

            </div>

            <div class="flex items-center mb-4">

                <h2 class="text-2xl font-semibold text-black">Delete {{ title }}?</h2>

            </div>

            <div class="mb-10">

                <p class="text-bg font-normal text-primary leading-relaxed">

                    Are you sure you want to delete this hashtag? This action cannot be undone.

                </p>

            </div>

            <div class="flex gap-4 items-center">

                <FormButtons @save="$emit('confirm')" yes class="flex-1" />

                <FormButtons @cancel="$emit('cancel')" no class="flex-1" />

            </div>

        </div>

    </div>

</template>