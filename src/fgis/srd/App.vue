<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import 'uno.css'

const [show, toggle] = useToggle(false)

</script>

<template>
  <div id="docs-fgis"
      class="w-[500px] px-4 py-5 text-center text-gray-700 bg-slate-50 z-900 fixed right-0" 
          :class="show ? 'block' : 'hidden'"
      >
    <FgisDocsUI />
  </div>

  <Dimmer fullscreen=1
   :class="show ? 'block' : 'hidden'"
  />

    <button
      class="flex  rounded-2 shadow cursor-pointer border-none fixed top-2 right-300 p-2  text-white text-lg"
      bg="teal-600 hover:teal-700"
      @click="toggle()"
    >

     Загрузка ДС по ссылке
      <!-- <pixelarticons-power class="block m-auto text-white text-lg" /> -->
    </button>

</template>
