<script setup lang="ts">
import 'uno.css'

// import './batch'
import { batch_get_document_to_save } from './batch'

// function batch_get_statement_to_save() {
//  
//   } 
//     function batch_get_document_to_save() {
//      
//       } 
//         function batch_get_document_to_sign() {
//          
//          }
</script>

<template>
  <div style="border: 1px solid green;">
    <span>Репликация во ФГИС</span>
    <button class="absolute icon-btn mt-2   mx-2 text-2xl right-0 top-0" @click="batch_get_statement_to_save()">Сохранить
      заявления</button>
    <button class="absolute icon-btn mt-2   mx-2 text-2xl right-0 top-0" @click="batch_get_document_to_save()">Сохранить
      документы</button>
    <button class="absolute icon-btn mt-2   mx-2 text-2xl right-0 top-0" @click="batch_get_document_to_sign()">Подписать
      документы</button>
    <span>Выполняет 0 из 0</span>
  </div>

  <!-- <div class="lb"> -->
  <!-- <label for="agency_code">Agency_code:</label> -->
  <!-- <input id="agency_code" name="agency_code" type="text"> -->
  <!-- </div> -->
  <!-- <div class="lb"> -->
  <!-- <label for="agency_keyword">Agency_keyword</label> -->
  <!-- <input id="agency_keyword" name="agency_keyword" type="text"> -->
  <!-- </div> -->
  <!-- <div class="lb"> -->
  <!-- <label for="isTest">Тестовый режим заявлений.</label> -->
  <!-- <input id="isTest" name="isTest" type="checkbox"> -->
  <!-- </div> -->
  <!-- <div class="lb"> -->
  <!-- <label for="assignRegNumber">Присваивать рег. номера.</label> -->
  <!-- <input id="assignRegNumber" name="assignRegNumber" type="checkbox"> -->
  <!-- </div> -->
  <!-- <div class="lb"> -->
  <!-- <label for="isRobotSignErrors">Робот: подписание ошибочных.</label> -->
  <!-- <input id="isRobotSignErrors" name="isRobotSignErrors" type="checkbox"> -->
  <!-- </div> -->
  <!-- <div class="lb"> -->
  <!-- <label for="indexCertif">Индекс сертификата</label> -->
  <!-- <input id="indexCertif" name="indexCertif" type="text"> -->
  <!-- </div> -->
  <!-- <div class="lb"> -->
  <!-- <label for="algorithm">Алгоритм сертификата</label> -->
  <!-- <input id="algorithm" name="algorithm" type="text"> -->
  <!-- </div> -->
  <!-- <div class="lb"> -->
  <!-- <label for="pwdCertif">Пароль сертификата</label> -->
  <!-- <input id="pwdCertif" name="pwdCertif" type="text"> -->
  <!-- </div> -->
  <!-- <div class="lb"> -->
  <!-- <label for="orgId">orgId</label> -->
  <!-- <input id="orgId" name="orgId" type="text"> -->
  <!-- </div> -->
  <!-- <div class="lb"> -->
  <!-- <label for="certificationAuthority">certificationAuthority</label> -->
  <!-- <textarea id="certificationAuthority" name="certificationAuthority"></textarea> -->
  <!-- </div> -->

  <!-- <div class="lb"> -->
  <!-- <label for="file_time_out">Лимит времени на загрузку файла</label> -->
  <!-- <input id="file_time_out" name="file_time_out" type="text"> -->
  <!-- </div> -->
  <!-- <div class="vevoke_applicant_setting"> -->

  <!-- <span> По решению заявителя</span> -->

  <!-- <div class="lb"> -->
  <!-- <label for="revoke_applicant_document">Наименование документа</label> -->
  <!-- <input id="revoke_applicant_document" name="revoke_applicant_document" type="text"> -->
  <!-- </div> -->
  <!-- <div class="lb"> -->
  <!-- <label for="revoke_applicant_document_number">Номер документа</label> -->
  <!-- <input id="revoke_applicant_document_number" name="revoke_applicant_document_number" type="text"> -->
  <!-- </div> -->
  <!-- <span> По технической ошибке</span> -->

  <!-- <div class="lb"> -->
  <!-- <label for="revoke_teh_document">Наименование документа</label> -->
  <!-- <input id="revoke_teh_document" name="revoke_teh_document" type="text"> -->
  <!-- </div> -->
  <!-- <div class="lb"> -->
  <!-- <label for="revoke_teh_document_number">Номер документа</label> -->
  <!-- <input id="revoke_teh_document_number" name="revoke_teh_document_number" type="text"> -->
  <!-- </div> -->

  <!-- </div> -->
  <!-- <div id="parseBlock"> -->
  <!-- <div class="lbp_head"> -->
  <!-- <div class="name">Название справочника</div> -->
  <!-- <div class="file">Файл загрузки</div> -->
  <!-- <div class="loading">Статус</div> -->
<!-- </div> -->
<!-- </div> --></template>
