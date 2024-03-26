<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import 'uno.css'

const [show, toggle] = useToggle(false)
import {canSign, docLink, docIndex, docType, docPin } from '~/logic/storage'

import { sendDocument, downloadDocument } from  '~/fgis/srd_import'

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}
</script>

<template>
  <main class="w-[500px] px-4 py-5 text-center text-gray-700">
    <button class="absolute icon-btn mt-2   mx-2 text-2xl right-0 top-0" @click="openOptionsPage"> <mi-settings /> </button>
    <Logo />

    <label for="docLink" class="block relative text-left mb-2 text-sm font-medium text-gray-900 dark:text-white">Ссылка
        <button class=" mx-2 mt-2 text-xs right-0  absolute  text-blue-700  hover:bg-yellow-300" @click="docLink = ''"> очистить </button>
    </label>


    <textarea rows="3" placeholder="http://*.advance-docs.ru/..." id="docLink" v-model="docLink"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </textarea>

      
    <div class="block m-4 ">

    <button  type="button" class="inline-flex focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" @click="sendDocument(docLink)"><fa-send />Отправить</button>

    <button  type="button" class="inline-flex text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" @click="downloadDocument(docLink)"><mi-download />Скачать</button>

    </div>

    <div v-if='canSign' class="px-3 pb-3 mt-3 border-dotted border-sky-300 border-1 rounded-md ">

      <label for="docPin" class="block text-left my-2 text-sm font-medium text-gray-900 dark:text-white">Индекс</label>
      <input placeholder="ПИН" id="docPin" v-model="docPin"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <label for="docIndex" class="block text-left my-2 text-sm font-medium text-gray-900 dark:text-white">Тип</label>
      <input placeholder="Индекс" id="docIndex" v-model="docIndex"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <label for="docType" class="block text-left my-2 text-sm font-medium text-gray-900 dark:text-white">ПИН</label>
      <input placeholder="Тип" id="docType" v-model="docType"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

    </div>

    <div class="block m-4 ">
<button v-if='canSign' type="button" class="inline-flex text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" @click="signDocument"><fluent-pen-sparkle-20-regular /> Подписать</button>

    </div>
    <button
      class="flex w-10 h-10 rounded-full shadow cursor-pointer border-none"
      bg="teal-600 hover:teal-700"
      @click="toggle()"
    >
      <pixelarticons-power class="block m-auto text-white text-lg" />
    </button>


  </main>

    

    
</template>
