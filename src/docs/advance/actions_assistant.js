// var browser = require("webextension-polyfill");

function addParserDiv(name, rusString) {
    var div = document.createElement('div');
    let parseName = name
    div.innerHTML = `
                    <label>${rusString}:</label>
                    <input name="input_file" type="file" style="display:inline-block;"/>
                    `;

    div.className = 'lbp'

    var button = document.createElement('button');

    button.onclick = function (e) {
        browser.runtime.sendMessage({
            pageName: 'parser',
            action: name
        })
            .then(data => {
                // sendResponse({ data: JSON.stringify(data) });
                try {
                    console.log(data)
                    download(JSON.stringify(data.response, null, '   '), name + '.json', 'text/plain')
                } catch (error) {
                    console.log(error)
                }
                function download(data, filename, type) {
                    var file = new Blob([data], { type: type });
                    if (window.navigator.msSaveOrOpenBlob) // IE10+
                        window.navigator.msSaveOrOpenBlob(file, filename);
                    else { // Others
                        var a = document.createElement("a"),
                            url = URL.createObjectURL(file);
                        a.href = url;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                        setTimeout(function () {
                            document.body.removeChild(a);
                            window.URL.revokeObjectURL(url);
                        }, 0);
                    }
                }
            });
    }

    button.style.display = 'inline-block'
    button.innerHTML = "Start"

    div.appendChild(button)
    document.querySelector("#parseBlock").appendChild(div)
}

addParserDiv('organ_expert', "Эксперты органа")
addParserDiv('shema', "Схемы")
// addParserDiv('tehreg_shema_validate',"Схемы-регламены")
addParserDiv('tehreglaments', "Техрегламенты")
addParserDiv('legalForm', "Правовые формы")
addParserDiv('techregProductListEEU', "Группы продукции*")
addParserDiv('type_of_research', "Тип испытаний и лаборатории")
addParserDiv('singleListRU', "Единый перечень продукции РФ*")
addParserDiv('oksm', "Страны")


const input_agency_code = document.querySelector("#agency_code");
const input_agency_keyword = document.querySelector("#agency_keyword");
const input_isTest = document.querySelector("#isTest");
const select_organ = document.querySelector("#select_organ");
const indexCertif = document.querySelector("#indexCertif");
const algorithm = document.querySelector("#algorithm");
const pwdCertif = document.querySelector("#pwdCertif");
const assignRegNumber = document.querySelector("#assignRegNumber");
const isRobotSignErrors = document.querySelector("#isRobotSignErrors");
const orgId = document.querySelector("#orgId");
const certificationAuthority = document.querySelector("#certificationAuthority");
const file_time_out = document.querySelector("#file_time_out");

const revoke_applicant_document = document.querySelector("#revoke_applicant_document");
const revoke_applicant_document_number = document.querySelector("#revoke_applicant_document_number");
const revoke_teh_document = document.querySelector("#revoke_teh_document");
const revoke_teh_document_number = document.querySelector("#revoke_teh_document_number");

var change_el_array = [
    input_agency_code,
    input_agency_keyword,
    input_isTest,
    indexCertif,
    algorithm,
    pwdCertif,
    assignRegNumber,
    isRobotSignErrors,
    file_time_out,
    revoke_applicant_document,
    revoke_applicant_document_number,
    revoke_teh_document,
    revoke_teh_document_number
]


function storeSettings() {
    try {
        let origin = document.location.origin;
        let vals = {
            origin: origin,
            agency_code: input_agency_code.value,
            agency_keyword: input_agency_keyword.value,
            isTest: input_isTest.checked,
            assignRegNumber: assignRegNumber.checked,
            isRobotSignErrors: isRobotSignErrors.checked,
            indexCertif: indexCertif.value,
            algorithm: algorithm.value,
            pwdCertif: pwdCertif.value,
            file_time_out: file_time_out.value,
            revoke_applicant_document: revoke_applicant_document.value,
            revoke_applicant_document_number: revoke_applicant_document_number.value,
            revoke_teh_document: revoke_teh_document.value,
            revoke_teh_document_number: revoke_teh_document_number.value,

        }

        console.log('element values', change_el_array.map(el=> el.value));
        // console.log(origin, input_agency_code.value, input_agency_keyword.value, input_isTest.checked, assignRegNumber.checked, isRobotSignErrors.checked,  indexCertif.value, algorithm.value, pwdCertif.value)
        return browser.storage.local.get()
            .then(s => {
                console.log(s)
                if (s.hasOwnProperty("originSettings")) {
                    s = s.originSettings.filter(el => el.origin != origin);
                    s.push({
                        origin: origin,
                        agency_code: input_agency_code.value,
                        agency_keyword: input_agency_keyword.value,
                        isTest: input_isTest.checked,
                        assignRegNumber: assignRegNumber.checked,
                        isRobotSignErrors: isRobotSignErrors.checked,
                        indexCertif: indexCertif.value,
                        algorithm: algorithm.value,
                        pwdCertif: pwdCertif.value,
                        file_time_out: file_time_out.value,
                        revoke_applicant_document: revoke_applicant_document.value,
                        revoke_applicant_document_number: revoke_applicant_document_number.value,
                        revoke_teh_document: revoke_teh_document.value,
                        revoke_teh_document_number: revoke_teh_document_number.value,

                        
                        
                    })
                } else {
                    s = [vals]
                }
                console.log('browser.storage.local', s)
                return browser.storage.local.set(
                    { originSettings: s }
                );
            })
    } catch (error) {
        console.log(error)
    }
}

function defaultSetting(s, name, defaultValue) {
    var res = (s.length && s[0].hasOwnProperty(name) && Boolean(s[0][name])) ? s[0][name] : defaultValue;
    return res
}

const defSettings = [
]


function updateUI(restoredSettings) {
    console.log("updateUI", restoredSettings)

    if (!Object.keys(restoredSettings).length) {
        browser.storage.local.set(
            { originSettings: defSettings }
        );
    }

    orgId.value = restoredSettings.orgId
    certificationAuthority.value = restoredSettings.certificationAuthority

    let origin = document.location.origin;
    let s = []
    if (restoredSettings.originSettings) {
        s = restoredSettings.originSettings.filter(el => el.origin == origin)
    }

    switch (origin) {
        default:
            input_agency_code.value = defaultSetting(s, "agency_code", 'agency_code Органа');
            input_agency_keyword.value = defaultSetting(s, "agency_keyword", 'agency_keyword Органа');
            input_isTest.checked = defaultSetting(s, "isTest", 0);
            assignRegNumber.checked = defaultSetting(s, "assignRegNumber", 0);
            isRobotSignErrors.checked = defaultSetting(s, "isRobotSignErrors", 0);
            indexCertif.value = defaultSetting(s, "indexCertif", 0);
            algorithm.value = defaultSetting(s, "algorithm", 0);
            pwdCertif.value = defaultSetting(s, "pwdCertif", "");
            file_time_out.value = defaultSetting(s, "file_time_out", 15);
            revoke_applicant_document.value = defaultSetting(s, "revoke_applicant_document", "Решение");
            revoke_applicant_document_number.value = defaultSetting(s, "revoke_applicant_document_number", "Б/Н");
            revoke_teh_document.value = defaultSetting(s, "revoke_teh_document", "Решение");
            revoke_teh_document_number.value = defaultSetting(s, "revoke_teh_document_number", "Б/Н");


            break;
    }
}

function onError(e) {
    console.error(e);
}

browser.storage.local.get().then(updateUI, onError);



change_el_array.forEach(el => {
    el.addEventListener("change", storeSettings);
})
