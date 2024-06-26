<script setup lang="ts">
import 'uno.css'

import {
  batch_get_document_to_save,
  batch_get_document_to_sign,
  batch_get_statement_to_save
} from './batch'

const pt = document.getElementById('PluginType');
const PluginType = {
        'Applicant': 1,
        'Docs': 2,
    }[(pt && pt.value) || 'Docs'];

</script>

<template>
  <div style="border: 1px dashed green;" class="w-100 px-4 py-5 text-center text-gray-700 bg-slate-50 z-900 ">

    <div class="text-2xl font-bold dark:text-white">Репликация во ФГИС
    </div>

    <div
     class="flex" 
    style="flex-direction: column;"
    >

      <button v-if="PluginType == 2" class="text-white my-2" bg="teal-600 hover:teal-700" @click="batch_get_statement_to_save()">Сохранить
        заявления</button>
      <button class="text-white my-2" bg="teal-600 hover:teal-700" @click="batch_get_document_to_save()">Сохранить
        документы</button>
      <button class="text-white my-2" bg="teal-600 hover:teal-700" @click="batch_get_document_to_sign()">Подписать
        документы</button>

    </div>

    <div>Выполняет 0 из 0</div>

  </div>
</template>
