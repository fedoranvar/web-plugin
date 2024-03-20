<script setup lang="ts">
import { storageDemo, canSign } from '~/logic/storage'
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <img src="/assets/logo_docs1.svg" class=" w-30 icon-btn mx-2 text-2xl" alt="extension icon">
    <div>Настройки</div>
    <SharedSubtitle />


    <div class=" mx-auto bg-blue-50 w-200 border border-gray-400 rounded px-2 py-1 mt-2">
      <label class="inline-flex items-center cursor-pointer my-3">
        <input type="checkbox" v-model="canSign" class="sr-only peer">
        <div
          class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
        </div>
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
        Подписание
      </label>


    </div>

  </main>
</template>
