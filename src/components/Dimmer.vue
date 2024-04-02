<template>
  <div 
    class=" absolute top-0 left-0  bg-slate-300"
    :class="
    fullscreen ? 'min-w-screen min-h-screen' : 'w-full h-full',
    opacity ? 'opacity-'+opacity : 'opacity-50'
    "
  >
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['fullscreen', 'opacity'])
</script>
