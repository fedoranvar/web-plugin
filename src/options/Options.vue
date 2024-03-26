<script setup lang="ts">
import { storeLink, canSign } from '~/logic/storage'
</script>


<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <!-- <img rc="/assets/logo_docs1.svg" class=" w-30 icon-btn mx-2 text-2xl" alt="extension icon"> -->
    <Logo />
    <!-- <SharedSubtitle /> -->


    <div class="uppercase opacity my-3 text-xl opacity-50">Настройки</div>

    <div class=" bg-blue-50 flex flex-col mx-auto  w-100 border border-gray-400 rounded  px-3 py-1 mt-2">

      <label class=" inline-flex items-center cursor-pointer my-3">
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"> 
        Подписание
        </span>
        <input type="checkbox" v-model="canSign" class="sr-only peer">
        <div
          class="ml-5 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
        </div>
      </label>

      <label class="bg-blue-50 inline-flex items-center cursor-pointer my-3">
        <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"> 
        Сохранять ссылку после использования
        </span>
        <input type="checkbox" v-model="storeLink" class="sr-only peer">
        <div
          class="ml-5 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
        </div>
      </label>


    </div>

  </main>
</template>
