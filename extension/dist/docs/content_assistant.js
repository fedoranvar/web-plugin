"use strict";document.querySelector("#pluginarea").innerHTML=`
        <div class="lb">
            <label for="agency_code">Agency_code:</label>
            <input id="agency_code" name="agency_code" type="text">
        </div>
        <div class="lb">
            <label for="agency_keyword">Agency_keyword</label>
            <input id="agency_keyword" name="agency_keyword" type="text">
        </div>
        <div class="lb">
            <label for="isTest">Тестовый режим заявлений.</label>
            <input id="isTest" name="isTest" type="checkbox">
        </div>
        <div class="lb">
            <label for="assignRegNumber">Присваивать рег. номера.</label>
            <input id="assignRegNumber" name="assignRegNumber" type="checkbox">
        </div>
        <div class="lb">
            <label for="isRobotSignErrors">Робот: подписание ошибочных.</label>
            <input id="isRobotSignErrors" name="isRobotSignErrors" type="checkbox">
        </div>
        <div class="lb">
            <label for="indexCertif">Индекс сертификата</label>
            <input id="indexCertif" name="indexCertif" type="text">
        </div>
        <div class="lb">
            <label for="algorithm">Алгоритм сертификата</label>
            <input id="algorithm" name="algorithm" type="text">
        </div>
        <div class="lb">
            <label for="pwdCertif">Пароль сертификата</label>
            <input id="pwdCertif" name="pwdCertif" type="text">
        </div>
        <div class="lb">
            <label for="orgId">orgId</label>
            <input id="orgId" name="orgId" type="text">
        </div>
        <div class="lb">
            <label for="certificationAuthority">certificationAuthority</label>
            <textarea id="certificationAuthority" name="certificationAuthority"></textarea>
        </div>

        <div class="lb">
            <label for="file_time_out">Лимит времени на загрузку файла</label>
            <input id="file_time_out" name="file_time_out" type="text">
        </div>
        <div class="vevoke_applicant_setting">
    
            <span> По решению заявителя</span>
 
            <div class="lb">
                <label for="revoke_applicant_document">Наименование документа</label>
                <input id="revoke_applicant_document" name="revoke_applicant_document" type="text">
            </div>
            <div class="lb">
                <label for="revoke_applicant_document_number">Номер документа</label>
                <input id="revoke_applicant_document_number" name="revoke_applicant_document_number" type="text">
            </div>
            <span> По технической ошибке</span>
 
            <div class="lb">
                <label for="revoke_teh_document">Наименование документа</label>
                <input id="revoke_teh_document" name="revoke_teh_document" type="text">
            </div>
            <div class="lb">
                <label for="revoke_teh_document_number">Номер документа</label>
                <input id="revoke_teh_document_number" name="revoke_teh_document_number" type="text">
            </div>
    
        </div>
        <div id="parseBlock">
            <div class="lbp_head">
                <div class="name">Название справочника</div>
                <div class="file">Файл загрузки</div>
                <div class="loading">Статус</div>
            </div>
        </div>
        `;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudF9hc3Npc3RhbnQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2NzL2NvbnRlbnRfYXNzaXN0YW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGx1Z2luYXJlYVwiKS5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYlwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImFnZW5jeV9jb2RlXCI+QWdlbmN5X2NvZGU6PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImFnZW5jeV9jb2RlXCIgbmFtZT1cImFnZW5jeV9jb2RlXCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYlwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImFnZW5jeV9rZXl3b3JkXCI+QWdlbmN5X2tleXdvcmQ8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiYWdlbmN5X2tleXdvcmRcIiBuYW1lPVwiYWdlbmN5X2tleXdvcmRcIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxiXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiaXNUZXN0XCI+0KLQtdGB0YLQvtCy0YvQuSDRgNC10LbQuNC8INC30LDRj9Cy0LvQtdC90LjQuS48L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiaXNUZXN0XCIgbmFtZT1cImlzVGVzdFwiIHR5cGU9XCJjaGVja2JveFwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxiXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiYXNzaWduUmVnTnVtYmVyXCI+0J/RgNC40YHQstCw0LjQstCw0YLRjCDRgNC10LMuINC90L7QvNC10YDQsC48L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwiYXNzaWduUmVnTnVtYmVyXCIgbmFtZT1cImFzc2lnblJlZ051bWJlclwiIHR5cGU9XCJjaGVja2JveFwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxiXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiaXNSb2JvdFNpZ25FcnJvcnNcIj7QoNC+0LHQvtGCOiDQv9C+0LTQv9C40YHQsNC90LjQtSDQvtGI0LjQsdC+0YfQvdGL0YUuPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImlzUm9ib3RTaWduRXJyb3JzXCIgbmFtZT1cImlzUm9ib3RTaWduRXJyb3JzXCIgdHlwZT1cImNoZWNrYm94XCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGJcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJpbmRleENlcnRpZlwiPtCY0L3QtNC10LrRgSDRgdC10YDRgtC40YTQuNC60LDRgtCwPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImluZGV4Q2VydGlmXCIgbmFtZT1cImluZGV4Q2VydGlmXCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYlwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImFsZ29yaXRobVwiPtCQ0LvQs9C+0YDQuNGC0Lwg0YHQtdGA0YLQuNGE0LjQutCw0YLQsDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJhbGdvcml0aG1cIiBuYW1lPVwiYWxnb3JpdGhtXCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYlwiPlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInB3ZENlcnRpZlwiPtCf0LDRgNC+0LvRjCDRgdC10YDRgtC40YTQuNC60LDRgtCwPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cInB3ZENlcnRpZlwiIG5hbWU9XCJwd2RDZXJ0aWZcIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxiXCI+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwib3JnSWRcIj5vcmdJZDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJvcmdJZFwiIG5hbWU9XCJvcmdJZFwiIHR5cGU9XCJ0ZXh0XCI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwibGJcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjZXJ0aWZpY2F0aW9uQXV0aG9yaXR5XCI+Y2VydGlmaWNhdGlvbkF1dGhvcml0eTwvbGFiZWw+XG4gICAgICAgICAgICA8dGV4dGFyZWEgaWQ9XCJjZXJ0aWZpY2F0aW9uQXV0aG9yaXR5XCIgbmFtZT1cImNlcnRpZmljYXRpb25BdXRob3JpdHlcIj48L3RleHRhcmVhPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibGJcIj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJmaWxlX3RpbWVfb3V0XCI+0JvQuNC80LjRgiDQstGA0LXQvNC10L3QuCDQvdCwINC30LDQs9GA0YPQt9C60YMg0YTQsNC50LvQsDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJmaWxlX3RpbWVfb3V0XCIgbmFtZT1cImZpbGVfdGltZV9vdXRcIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInZldm9rZV9hcHBsaWNhbnRfc2V0dGluZ1wiPlxuICAgIFxuICAgICAgICAgICAgPHNwYW4+INCf0L4g0YDQtdGI0LXQvdC40Y4g0LfQsNGP0LLQuNGC0LXQu9GPPC9zcGFuPlxuIFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxiXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInJldm9rZV9hcHBsaWNhbnRfZG9jdW1lbnRcIj7QndCw0LjQvNC10L3QvtCy0LDQvdC40LUg0LTQvtC60YPQvNC10L3RgtCwPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJyZXZva2VfYXBwbGljYW50X2RvY3VtZW50XCIgbmFtZT1cInJldm9rZV9hcHBsaWNhbnRfZG9jdW1lbnRcIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGJcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicmV2b2tlX2FwcGxpY2FudF9kb2N1bWVudF9udW1iZXJcIj7QndC+0LzQtdGAINC00L7QutGD0LzQtdC90YLQsDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwicmV2b2tlX2FwcGxpY2FudF9kb2N1bWVudF9udW1iZXJcIiBuYW1lPVwicmV2b2tlX2FwcGxpY2FudF9kb2N1bWVudF9udW1iZXJcIiB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3Bhbj4g0J/QviDRgtC10YXQvdC40YfQtdGB0LrQvtC5INC+0YjQuNCx0LrQtTwvc3Bhbj5cbiBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYlwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJyZXZva2VfdGVoX2RvY3VtZW50XCI+0J3QsNC40LzQtdC90L7QstCw0L3QuNC1INC00L7QutGD0LzQtdC90YLQsDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVwicmV2b2tlX3RlaF9kb2N1bWVudFwiIG5hbWU9XCJyZXZva2VfdGVoX2RvY3VtZW50XCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxiXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInJldm9rZV90ZWhfZG9jdW1lbnRfbnVtYmVyXCI+0J3QvtC80LXRgCDQtNC+0LrRg9C80LXQvdGC0LA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cInJldm9rZV90ZWhfZG9jdW1lbnRfbnVtYmVyXCIgbmFtZT1cInJldm9rZV90ZWhfZG9jdW1lbnRfbnVtYmVyXCIgdHlwZT1cInRleHRcIj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgIFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBpZD1cInBhcnNlQmxvY2tcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYnBfaGVhZFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuYW1lXCI+0J3QsNC30LLQsNC90LjQtSDRgdC/0YDQsNCy0L7Rh9C90LjQutCwPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpbGVcIj7QpNCw0LnQuyDQt9Cw0LPRgNGD0LfQutC4PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxvYWRpbmdcIj7QodGC0LDRgtGD0YE8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJhQUFBLFNBQVMsY0FBYyxhQUFhLEVBQUUsVUFBWTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOyJ9
