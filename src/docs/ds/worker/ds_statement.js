

class Statement {
    constructor(id, advance, fgis, settings) {
        this.id = id;
        this.advance = advance;
        this.fgis = fgis;
        this.isTest = settings.isTest;
        this.advanceObj = {};
        this.idApplication = "";
        this.appSubmissionDate = "";
        this.idStatus = "";
        this.log = [];
        this.uuid = this.random_uuid()
        console.log('constructot Statement init with uuid :' + this.uuid)
    }
    checkSign(id) {
        return Promise.resolve()
            .then(() => {
                return this.fgis.fetch(this.fgis.statement.get, { params: { id: id } })
                    .then(d => {
                        if (d.idStatus && d.idStatus == 13) {
                            return this.initAdvance(d.idApplication, d.applicationSubmissionDate, d.idStatus)
                                .catch((error) => { console.log(error) })
                                .finally(() => { return this.markAdvance("Signed") });
                        }
                    })
            })
    }
    sign() {
        return this.markAdvance("Signing")
            .then(() => this.advance.fetch(this.advance.statement.show, { params: { id: this.id } }))
            .then(d => {
                let action;
                if (!d.idApplication) { throw "Заявление не привязано к Адвансу." };
                if (d.idStatus && d.idStatus == 13) {
                    throw "Заявление уже подписано! (по статусу Адванс)"
                };
                action = this.checkSign(d.idApplication).then(() => {
                    // console.log("After checkSign try return idApplication",d.idApplication)
                    return d.idApplication
                })
                return action;
            })
            .then((id) => this.fgis.signFile([id], "applications"))
            .then(() => this.markAdvance("Signed"))
            .then(() => {
                // if (from_package) { return }
                return { done: true }
            })
            .catch(err => {
                console.log("something wrong in statement sign", err)
                if (err == "Заявление уже подписано! (по статусу Адванс)") {
                    return this.markAdvance("Signed")
                } else {
                    return this.markAdvance("SignError", err).then(() => { throw err })
                }
            })
    }
    logState(o, t) {
        // this.log.append("Statement:" ,o,JSON.parse(JSON.stringify(t)))
        console.log("Statement:", o, JSON.parse(JSON.stringify(t)))
    }
    getList() {
        var url = this.locationOrigin + a_statement_api.queue.url + '?' + this.api_key;
        return fetch(url, {
            method: a_statement_api.queue.method,
            credentials: 'include'
        })
            .then(response => response.json())
            .then(obj => console.log(obj))
    }
    workFlow(root = false, is_return_Signing = false) {
        return this.advance.fetch(this.advance.statement.get_state, { params: { id: this.id } })
            .then(state => {
                // Не установлен - NotSet
                // Готово к выгрузке - ReadyToUpload
                // Выгружается - Uploading
                // Ошибка выгрузки - UploadError
                // Выгружено - Uploaded
                // Подписывается - Signing
                // Ошибка подписи - SignError
                // Подписано - Signed
                let action;
                switch (state) {
                    case 'NotSet':
                        console.log("Statement not ready to upload")
                        break;
                    case 'ReadyToUpload':
                        console.log("Statement ready to upload")
                        action = this.save().then(() => this.workFlow(root = true))
                        break;
                    case 'Uploading':
                        console.log("Statement in Uploading")
                        break;
                    case 'UploadError':
                        console.log("Statement upload UploadError")
                        if (!root) {
                            action = this.save().then(() => this.workFlow(root = true))
                        }
                        break;
                    case 'Uploaded':
                        console.log("Statement Uploaded done")
                        if (is_return_Signing) {
                            return { is_need_Signing: this.id }
                        } else {
                            action = this.sign().then(() => this.workFlow(root = false))
                        }
                        break;
                    case 'Signing':
                        console.log("Statement in Signing")
                        break;
                    case 'SignError':
                        console.log("Statement Signing SignError")
                        if (!root) {
                            action = this.save().then(() => this.workFlow(root = true))
                        }
                        break;
                    case 'Signed':
                        console.log("Statement Signed done")
                        break;
                    default:
                        return { done: true }
                }
                return action
            })
    }
    save() {
        console.log('save :>> ');
        return this.markAdvance("Uploading")
            .then(() => this.showAdvance())
            .then(() => this.saveStatementToFgis())
            .then(() => this.initAdvance())
            .then(() => this.markAdvance("Uploaded"))
            .then(() => this.done())
            .catch(err => {
                console.log("something wrong in statement save", err)
                this.markAdvance("UploadError", err)
                throw err
            });
    }
    getStatement(id) {
        this.logState("save", this)
        return this.fgis.fetch(this.fgis.statement.get, { params: { id: id } })
    }
    updateStatement(id = "") {
        console.log("Statement updateStatement");
        return this.advance.fetch(this.advance.statement.show, { params: { id: this.id } })
            .then((data) => {
                if (data.idApplication) {
                    if (!id) { id = data.idApplication }
                    return this.getStatement(id)
                } else {
                    throw "Заявление еще не было загруженно."
                }
            })
            .then((d) => {
                console.log(d)
                return this.initAdvance(
                    d.idApplication,
                    d.appSubmissionDate,
                    d.idStatus)
            })
    }
    done(data = { done: true }) {
        console.log("Statement done", data);
        return data;
    }
    showAdvance() {
        console.log("Statement showAdvance", this);
        return this.advance.fetch(this.advance.statement.show, { params: { id: this.id } })
            .then(data => {
                this.advanceObj = data;
                if (this.isTest) { this.advanceObj.number = (Math.floor(Math.random() * (100000 - 1)) + 1).toString() + "/Т" }
                // this.advanceObj.products[0].batchId= null
                // this.advanceObj.idApplication = null
                this.advanceObj.idStatus = 20
            })
    }
    markAdvance(status, message = "") {
        // Не установлен - NotSet
        // Готово к выгрузке - ReadyToUpload
        // Выгружается - Uploading
        // Ошибка выгрузки - UploadError
        // Выгружено - Uploaded
        // Подписывается - Signing
        // Ошибка подписи - SignError
        // Подписано - Signed
        return this.advance.getCurrentUserId()
            .then((user_id) => {
                let body = [
                    { name: "id", value: this.id },
                    { name: "user_id", value: user_id },
                    { name: "status", value: status },
                    { name: "message", value: message },
                ]
                return this.advance.fetch(this.advance.statement.set_status, { body: body })
            })
    }
    initAdvance(idApplication, applicationSubmissionDate, idStatus) {
        return this.advance.getCurrentUserId()
            .then((user_id) => {
                this.user_id = user_id
                if (!idApplication) { idApplication = this.idApplication }
                if (!applicationSubmissionDate) { applicationSubmissionDate = "" }
                if (!idStatus) { idStatus = "" }
                let body = [
                    { name: "idApplication", value: idApplication },
                    { name: "statement_url", value: this.fgis.statement_url + idApplication + "/application" },
                    { name: "applicationSubmissionDate", value: applicationSubmissionDate },
                    { name: "idStatus", value: idStatus },
                    { name: "user_id", value: this.user_id },
                ]
                return this.advance.fetch(this.advance.statement.init, { body: body, params: { id: this.id } })
                    .then(data => {
                        console.log(data)
                    })
            })
    }
    test() {
        return [
            {
                "idProduct": null,
                "idProductOrigin": "840",
                "fullName": "Комплексы вычислительные электронные цифровые: программно-аппаратный комплекс11111 ",
                "marking": null,
                "usageScope": null,
                "storageCondition": "Условия хранения продукции в соответствии с ГОСТ 15150-69 \"Машины, приборы и другие технические изделия. Исполнения для различных климатических районов. Категории, условия эксплуатации, хранения и транспортирования в части воздействия климатических факторов внешней среды\". Срок хранения (службы, годности) указан в прилагаемой к продукции товаросопроводительной и/или эксплуатационной документации2222",
                "usageCondition": null,
                "batchSize": null,
                "batchId": null,
                "identification": null,
                "identifications": [
                    {
                        "idIdentification": 6768264,
                        "annex": false,
                        "name": "Teradata Intelliflex 1.1. Ð°ÑÑÐ¸ÐºÑÐ» 9185-1100-8090, Teradata 2800 (BAR) Data Warehouse Appliance, Ð°ÑÑÐ¸ÐºÑÐ» 9190-Ð¢004-8090 (9190-T010-8090, 9190-T011-8090), Teradata Multipurpose Server (TMS) 8-21X Ð´Ð»Ñ ÐÐ SAS VA, Ð°ÑÑÐ¸ÐºÑÐ» 9128-T518-8090, 9175-2100-8090 ",
                        "type": null,
                        "tradeMark": null,
                        "model": null,
                        "article": null,
                        "sort": null,
                        "idOkpds": [
                        ],
                        "idTnveds": [
                            73522
                        ],
                        "gtin": [
                            ""
                        ],
                        "lifeTime": null,
                        "storageTime": null,
                        "description": null,
                        "amount": null,
                        "idOkei": null,
                        "factoryNumber": null,
                        "productionDate": null,
                        "expiryDate": null,
                        "documents": [
                        ],
                        "standards": [
                            {
                                "idStandard": 3073291,
                                "annex": false,
                                "idDictStandard": null,
                                "designation": "ГОСТ IEC 60950-1- 2014 \"Оборудование информационных технологий. Требования безопасности. Часть 1. Об",
                                "name": null,
                                "section": null,
                                "addlInfo": null,
                                "idStatus": null
                            }
                        ]
                    }
                ]
            }
        ]
    }
    middleUpdaterFgis(data) {
        // Метод приведения объекта полученного из адванса, к нужному виду
        let localData = Object.assign({}, data)

        localData.manufacturer.addresses.forEach(element => {
            element.foreignDistrict = null
        });
        
        localData.manufacturerFilials.forEach(element => {
            element.addresses.forEach(addr => {
                addr.foreignDistrict = null
            });
        });

        return localData
    }

    saveStatementToFgis() {
        console.log("Statement saveStatementToFgis");
        let action;
        let rootData = this.middleUpdaterFgis(this.advanceObj)

        if (rootData.idApplication) {
            console.log("Update record in fgis", rootData)
            action = this.fgis.fetch(this.fgis.statement.post, { body: rootData, params: { id: rootData.idApplication } }).then(data => {
                this.idApplication = rootData.idApplication
            })
        } else {
            console.log("Create record in fgis", rootData)
            action = this.fgis.fetch(this.fgis.statement.init, { body: rootData })
                .then((data) => {
                    return this.fgis.fetch(this.fgis.statement.get, { params: { id: data.id } })
                        .then((d) => {
                            console.log("saveStatementtoFgis", d)
                            this.idApplication = d.idApplication
                            this.appSubmissionDate = d.appSubmissionDate
                            this.idStatus = d.idStatus
                            this.number = d.number
                        })
                })
        }
        return action
    }

    random_uuid() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

}
console.log("Statement ds class init!")