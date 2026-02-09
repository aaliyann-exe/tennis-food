<script setup>

  import arrowDownIcon from '/src/assets/arrowDownIcon.svg';

</script>

<template>

  <div class="flex items-center justify-end gap-6 p-4 bg-other">
    
    <div class="flex items-center gap-3 text-sm">

      <span class="text-gray-500">Items per page:</span>
      
      <div class="relative cursor-pointer group">

        <div class="flex items-center gap-1">

          <span class="font-medium">10</span>

          <img :src="arrowDownIcon" class="w-2 h-2 relative opacity-100" />

        </div>

        <div class="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"></div>

      </div>

    </div>

    <div class="flex items-center gap-2">
      
      <button class="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-gray-300 hover:bg-gray-100 cursor-not-allowed">
        
        <h1><</h1>

      </button>

      <button class="w-9 h-9 flex items-center justify-center rounded-lg bg-orange-500 text-white font-medium cursor-pointer">

        1

      </button>

      <button class="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-100 bg-gray-50 text-gray-300 hover:bg-gray-100 cursor-not-allowed">
        
        <h1>></h1>

      </button>
      
    </div>

  </div>
</template>