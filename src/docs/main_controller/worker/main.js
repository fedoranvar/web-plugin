class controller {
    constructor({
        // id,
        token,
        locationOrigin,
        mode,
        settings
    }) {
        this.name = 'Менеджер Сертификатов'
        this.advance = new Advance(settings, locationOrigin)
        this.fgis = new Fgis({ token: token, advance: this.advance, mode:mode, settings:settings,type:'rss' })
        // this.statement = new Statement(id, this.advance, this.fgis, settings);
    }
    test(i=1){
        switch (i) {
            case 1:
                console.log(this)
                console.log(this.fgis)
                break;
            case 2:
            // console.log(this.ss_init_compute_test()) 
            this.fgis.statement.init.repeat = false
            let b = this.ss_init_compute_test()
            // console.log(b)
            this.fgis.fetch(this.fgis.statement.init,{body:b })
            default:
                break;
        }
    }
    ss_applicant_test(){
        return {
            "idApplicantType": null,
            "idLegalSubjectType": null,
            "fullName": "",
            "shortName": "",
            "idEgrul": null,
            "idPerson": null,
            "surname": "",
            "firstName": "",
            "patronymic": "",
            "snils": "",
            "headPosition": "",
            "ogrn": "",
            "ogrnAssignDate": null,
            "inn": "",
            "kpp": "",
            "idLegalForm": null,
            "regDate": null,
            "regOrganName": "",
            "addlRegInfo": "",
            "isEecRegister": true,
            "contacts": [
            ],
            "addresses": [
            ],
            "transnational": [
            ],
            "manufIsApplicant": false,
            "idLegalSubject": null
        }
    }
    ss_manufacturer_test() {
        return {
            "idApplicantType": null,
            "idLegalSubjectType": null,
            "fullName": "",
            "shortName": "",
            "idEgrul": null,
            "idPerson": null,
            "surname": "",
            "firstName": "",
            "patronymic": "",
            "snils": "",
            "headPosition": "",
            "ogrn": "",
            "ogrnAssignDate": null,
            "inn": "",
            "kpp": "",
            "idLegalForm": null,
            "regDate": null,
            "regOrganName": "",
            "addlRegInfo": "",
            "isEecRegister": true,
            "contacts": [
            ],
            "addresses": [
            ],
            "transnational": [
            ],
            "idLegalSubject": null
        }
    }
    ss_certificationAuthority_test(){
        return {
            "idCertificationAuthority": null,
            "idRal": 1597,
            "fullName": "Общество с ограниченной ответственностью \"АМС\"",
            "accredOrgName": "Федеральная служба по аккредитации",
            "attestatRegNumber": "RA.RU.11АЖ22",
            "attestatRegDate": "2017-03-02T00:00:00.000Z",
            "attestatEndDate": null,
            "ogrn": "1167746739412",
            "idPesron": 613390,
            "firstName": "Андрей",
            "surname": "Веденеев",
            "patronymic": "Валерьевич",
            "headPosition": null,
            "headContacts": [
            ],
            "addresses": [
                {
                    "idAddress": null,
                    "idAddrType": 1,
                    "idCodeOksm": "643",
                    "idSubject": "0c5b2444-70a0-4932-980c-b4dc0d3f02b5",
                    "idDistrict": null,
                    "idCity": null,
                    "idLocality": null,
                    "idStreet": "63942cff-67d8-4894-b14d-3378590cee48",
                    "idHouse": null,
                    "flat": "помещение VII, комната 10",
                    "postCode": "119530",
                    "fullAddress": "119530, РОССИЯ, город Москва, ш.. Очаковское, д. 34, помещение VII, комната 10",
                    "oksmShort": true,
                    "gln": null
                },
                {
                    "idAddress": null,
                    "idAddrType": 3,
                    "idCodeOksm": "643",
                    "idSubject": "0c5b2444-70a0-4932-980c-b4dc0d3f02b5",
                    "idDistrict": null,
                    "idCity": null,
                    "idLocality": null,
                    "idStreet": "63942cff-67d8-4894-b14d-3378590cee48",
                    "idHouse": null,
                    "flat": "помещение VII, комната 10",
                    "postCode": "119530",
                    "fullAddress": "119530, РОССИЯ, город Москва, ш.. Очаковское, д. 34, помещение VII, комната 10",
                    "oksmShort": true,
                    "gln": null
                }
            ],
            "contacts": [
                {
                    "idContact": null,
                    "idContactType": 4,
                    "value": "all@alfa-cert.ru"
                }
            ]
        }
    }
    ss_idCertType_test(value){
        switch (value) {
            case "Сертификат соответствия требованиям технического регламента Евразийского экономического союза (технического регламента Таможенного союза)":
                return 1
            case "Сертификат соответствия, оформленный по единой форме Евразийского экономического союза":
                return 3               
            case "Сертификат соответствия требованиям технических регламентов Российской Федерации":
                return 11 
            case "Сертификат соответствия продукции, включенной в Единый перечень продукции Российской Федерации":
                return  12     
            default:
             throw 'Не найден тип сертификата'
        }
    }
    ss_productGroups_test(){
        // Объекты выбранные из списка Группа продукции ЕАЭС.json оборачиваются в array
        let res = []
        res.push({"idProductGroup":	null, // присваивается автоматом
            "idTechReg":	12, // techRegId из списка
            "idGroup" :	582 // id из списка
            })
        return res
    }
    ss_get_advance_test(){
        return {
            "idTechnicalReglaments": [
                27,
                97161,
                23,
                2
            ],
            "idDeclScheme": 158,
            "idObjectDeclType": 3,
            "idObjectDeclTypeId": 3,
            "idProductSingleLists": [],
            "number": "071118/80/Д",
            "appDate": "2018-11-07T00:00:00Z",
            "appSubmissionDate": "2018-11-07T00:00:00Z",
            "appSendDate": null,
            "idGroups": [
                1239
            ],
            "awaitForApprove": true,
            "declarationTempNumber": "",
            "declarationNumber": "",
            "idApplicantType": {
                "id": 4,
                "masterId": 4,
                "name": "Изготовитель",
                "nsiName": "Изготовитель"
            },
            "applicant": {
                "idApplicantType": 4,
                "idLegalSubjectType": 2,
                "fullName": "НЕМЫТКИН ВИТАЛИЙ АРТУРОВИЧ",
                "shortName": "",
                "idPerson": null,
                "surname": "НЕМЫТКИН",
                "firstName": "ВИТАЛИЙ",
                "patronymic": "АРТУРОВИЧ",
                "snils": "",
                "headPosition": "",
                "applicantHead": true,
                "idResponsiblePerson": null,
                "responsibleDocDate": null,
                "responsibleDocName": "",
                "responsibleDocNumber": "",
                "responsibleFirstName": "ВИТАЛИЙ",
                "responsiblePatronymic": "АРТУРОВИЧ",
                "responsiblePosition": "",
                "responsibleSurname": "НЕМЫТКИН",
                "responsibleContacts": [],
                "ogrn": "304491010300188",
                "ogrnAssignDate": "2004-04-12",
                "inn": "490900104360",
                "kpp": null,
                "idLegalForm": null,
                "regDate": "2004-04-12",
                "regOrganName": "Межрайонная инспекция Федеральной налоговой службы № 1 по Магаданской области",
                "addlRegInfo": "",
                "isEecRegister": true,
                "contacts": [
                    {
                        "idContactType": 1,
                        "value": "+89530044199"
                    },
                    {
                        "idContactType": 4,
                        "value": "elena.sertum@gmail.com"
                    }
                ],
                "addresses": [
                    {
                        "idAddress": null,
                        "idAddrType": 1,
                        "idCodeOksm": "643",
                        "idSubject": null,
                        "idDistrict": null,
                        "idCity": null,
                        "idLocality": null,
                        "idStreet": null,
                        "idHouse": null,
                        "flat": null,
                        "postCode": null,
                        "fullAddress": "685031, город Магадан, улица Набережная реки Магаданки, дом 57, квартира 12",
                        "gln": null,
                        "foreignDistrict": null,
                        "foreignCity": null,
                        "foreignLocality": null,
                        "foreignStreet": null,
                        "foreignHouse": null,
                        "uniqueAddress": null
                    },
                    {
                        "idAddress": null,
                        "idAddrType": 3,
                        "idCodeOksm": "643",
                        "idSubject": null,
                        "idDistrict": null,
                        "idCity": null,
                        "idLocality": null,
                        "idStreet": null,
                        "idHouse": null,
                        "flat": null,
                        "postCode": null,
                        "fullAddress": "685030, РОССИЯ, МАГАДАНСКАЯ ОБЛАСТЬ, ГОРОД МАГАДАН, УЛИЦА КОЛЬЦЕВАЯ, ДОМ 13",
                        "gln": null,
                        "foreignDistrict": null,
                        "foreignCity": null,
                        "foreignLocality": null,
                        "foreignStreet": null,
                        "foreignHouse": null,
                        "uniqueAddress": null
                    }
                ],
                "transnational": [],
                "manufIsApplicant": true,
                "idLegalSubject": null
            },
            "applicantFilials": [],
            "idManufacturerType": null,
            "manufIsApplicant": true,
            "manufacturer": {
                "idApplicantType": null,
                "idLegalSubjectType": 2,
                "fullName": "НЕМЫТКИН ВИТАЛИЙ АРТУРОВИЧ",
                "shortName": "",
                "idPerson": null,
                "surname": "НЕМЫТКИН",
                "firstName": "ВИТАЛИЙ",
                "patronymic": "АРТУРОВИЧ",
                "snils": "",
                "headPosition": "",
                "applicantHead": true,
                "idResponsiblePerson": null,
                "responsibleDocDate": null,
                "responsibleDocName": "",
                "responsibleDocNumber": "",
                "responsibleFirstName": "",
                "responsiblePatronymic": "",
                "responsiblePosition": "",
                "responsibleSurname": "",
                "responsibleContacts": null,
                "ogrn": "304491010300188",
                "ogrnAssignDate": "1996-10-25",
                "inn": "490900104360",
                "kpp": "",
                "idLegalForm": null,
                "regDate": "1996-10-25",
                "regOrganName": "Межрайонная инспекция Федеральной налоговой службы № 1 по Магаданской области",
                "addlRegInfo": "",
                "isEecRegister": true,
                "contacts": [
                    {
                        "idContactType": 1,
                        "value": "+89530044199"
                    },
                    {
                        "idContactType": 4,
                        "value": "elena.sertum@gmail.com"
                    }
                ],
                "addresses": [
                    {
                        "idAddress": null,
                        "idAddrType": 1,
                        "idCodeOksm": "643",
                        "idSubject": null,
                        "idDistrict": null,
                        "idCity": null,
                        "idLocality": null,
                        "idStreet": null,
                        "idHouse": null,
                        "flat": null,
                        "postCode": null,
                        "fullAddress": "685031, город Магадан, улица Набережная реки Магаданки, дом 57, квартира 12",
                        "gln": null,
                        "foreignDistrict": null,
                        "foreignCity": null,
                        "foreignLocality": null,
                        "foreignStreet": null,
                        "foreignHouse": null,
                        "uniqueAddress": null
                    },
                    {
                        "idAddress": null,
                        "idAddrType": 3,
                        "idCodeOksm": "643",
                        "idSubject": null,
                        "idDistrict": null,
                        "idCity": null,
                        "idLocality": null,
                        "idStreet": null,
                        "idHouse": null,
                        "flat": null,
                        "postCode": null,
                        "fullAddress": "685030, РОССИЯ, МАГАДАНСКАЯ ОБЛАСТЬ, ГОРОД МАГАДАН, УЛИЦА КОЛЬЦЕВАЯ, ДОМ 13",
                        "gln": null,
                        "foreignDistrict": null,
                        "foreignCity": null,
                        "foreignLocality": null,
                        "foreignStreet": null,
                        "foreignHouse": null,
                        "uniqueAddress": null
                    }
                ],
                "transnational": [],
                "idLegalSubject": null
            },
            "manufacturerFilials": [],
            "certificationAuthority": {
                "idCertificationAuthority": null,
                "idRal": 1597,
                "fullName": "Орган по сертификации Общества с ограниченной ответственностью \"АМС\"",
                "accredOrgName": "Федеральная служба по аккредитации",
                "attestatRegNumber": "RA.RU.11АЖ22",
                "attestatRegDate": "2017-03-02T00:00:00Z",
                "attestatEndDate": null,
                "ogrn": "1167746739412",
                "idPesron": 283409,
                "firstName": "Оскар",
                "surname": "Фролов",
                "patronymic": "Борисович",
                "headPosition": null,
                "headContacts": [],
                "addresses": [
                    {
                        "id": null,
                        "idAddrType": 3,
                        "idCodeOksm": "643",
                        "idSubject": "0c5b2444-70a0-4932-980c-b4dc0d3f02b5",
                        "idDistrict": null,
                        "idCity": null,
                        "idLocality": null,
                        "idStreet": null,
                        "idHouse": null,
                        "flat": "помещение VII, комната 10",
                        "postcode": null,
                        "uniqueAddress": "ш.. Очаковское, д. 34",
                        "fullAddress": "119530, РОССИЯ, город Москва, ш.. Очаковское, д. 34, помещение VII, комната 10",
                        "alienDistrict": null,
                        "alienCity": null,
                        "alienLocality": null,
                        "alienStreet": null,
                        "alienHouse": null,
                        "glns": [
                            null
                        ],
                        "isOksmShort": true
                    },
                    {
                        "id": null,
                        "idAddrType": 1,
                        "idCodeOksm": "643",
                        "idSubject": "0c5b2444-70a0-4932-980c-b4dc0d3f02b5",
                        "idDistrict": null,
                        "idCity": null,
                        "idLocality": null,
                        "idStreet": null,
                        "idHouse": null,
                        "flat": "помещение VII, комната 10",
                        "postcode": null,
                        "uniqueAddress": "ш.. Очаковское, д. 34",
                        "fullAddress": "119530, РОССИЯ, город Москва, ш.. Очаковское, д. 34, помещение VII, комната 10",
                        "alienDistrict": null,
                        "alienCity": null,
                        "alienLocality": null,
                        "alienStreet": null,
                        "alienHouse": null,
                        "glns": [
                            null
                        ],
                        "isOksmShort": true
                    }
                ],
                "contacts": []
            },
            "products": [
                {
                    "idProduct": null,
                    "idProductOrigin": "643",
                    "fullName": "Салаты корейской кухни с мясом и мясными продуктами: ",
                    "marking": null,
                    "usageScope": null,
                    "storageCondition": "Условия хранения продукции в соответствии с требованиями ТР ТС 021/2011 «О безопасности пищевой продукции». Срок хранения (годности) указан в прилагаемой к продукции товаросопроводительной документации и/или на упаковке каждой единице продукции",
                    "usageCondition": null,
                    "batchSize": null,
                    "batchId": null,
                    "identifications": [
                        {
                            "idIdentification": null,
                            "annex": false,
                            "name": "салат из «Ашлям-Фу» с мясом по-корейски, салат из баклажанов с мясом по-корейски, салат из гребешков с мясом по-корейски, салат из огурцов с мясом по-корейски, салат из моркови с мясом по-корейски, салат из черных грибов Муэр с мясом по-корейски. Упаковка: картонные, бумажные, деревянные, крафт коробочки, бумажные, полипропиленовые пакеты в том числе с клеевым клапаном, коробочки из твердого пластика, коробочки из фанеры, обертка из фольги, полимерная и бумажная обертка, жестяные и стеклянные банки, подарочные коробочки, контейнеры из полимерных материалов с крышками, деревянные и пластиковые подложки и лотки, массой нетто от 0,01 до 10 килограмм с маркировкой \"ИП Немыткин Виталий Артурович\"",
                            "type": null,
                            "tradeMark": null,
                            "model": null,
                            "article": null,
                            "sort": null,
                            "description": null,
                            "idOkpds": [],
                            "idTnveds": [
                                62472
                            ],
                            "storageTime": null,
                            "amount": null,
                            "idOkei": null,
                            "factoryNumber": null,
                            "productionDate": null,
                            "expiryDate": null,
                            "gtin": [
                                ""
                            ],
                            "lifeTime": null,
                            "documents": [
                                {
                                    "idProductionDocument": null,
                                    "name": "требованиями ТУ 10.85.19-053-55482687-2017 (взамен ТУ 9161-007-55482687-2006) «Салаты. Технические условия»",
                                    "number": null,
                                    "date": null
                                }
                            ],
                            "standards": []
                        }
                    ]
                }
            ],
            "firstName": null,
            "functions": null,
            "unpublishedChanges": true,
            "idLegalSubject": null,
            "draftCreationDate": null,
            "idApplication": 11647271,
            "idDeclType": 2,
            "idStatus": null,
            "lastUpdate": null
        }
    }
    ss_unic_ds_fields(){
        return [
            "idDeclScheme",
            "idDeclType",
            "idGroups",
            "declarationTempNumber",
            "declarationNumber",
            "functions"
        ]
    }
    ss_init_compute_test(){
        let res = this.ss_get_advance_test()
        this.ss_unic_ds_fields().forEach(element => {
            delete res[element]
        });
        let n = this.ss_init_test();
        Object.keys(n).forEach(element => {
            // console.log(element,n[element] )
            if (res.hasOwnProperty(element)){
                n[element] = res[element]
            }
        });
        n.idApplication = null
        // productGroups
        // idCertScheme
        // idObjectCertType
        // deadlineViolation
        // idCertType
        return n
    }
    ss_init_test(){
        return {
            "idApplication": null, // приваевается автоматом при сохранении. Сохранять при init
            "idTechnicalReglaments": [], // ID регламента из списка Технические регламенты.json
            "productGroups": this.ss_productGroups_test(), // Объекты выбранные из единого справочника Группа продукции ЕАЭС
            "idCertScheme": null, // ID схемы сертификации из справочника схем подключенных к дс. Правила выборки такие-же по отношению к регламентам + validationFormId == 1
            "idObjectCertType": null,
            "idProductSingleLists": [],
            "idStatus": 20,
            "number": "",
            "deadlineViolation": false,
            "appSubmissionDate": null,
            "appDate": null,
            "draftCreationDate": "2018-11-07T10:14:41.024Z",
            "appSendDate": null,
            "idCertType": this.ss_idCertType_test("Сертификат соответствия требованиям технического регламента Евразийского экономического союза (технического регламента Таможенного союза)"),
            "awaitForApprove": true,
            "certificateTempNumber": "",
            "certificateNumber": "",
            "applicant": this.ss_applicant_test() ,
            "manufIsApplicant": null,
            "manufacturer":this.ss_manufacturer_test(),
            "applicantFilials": [],
            "manufacturerFilials": [],
            "certificationAuthority": this.ss_certificationAuthority_test(),
            "products": [],
            "statusChanges": [],
            "unpublishedChanges": null,
            "idApplicantType": null,
            "idManufacturerType": null
        }
}
}