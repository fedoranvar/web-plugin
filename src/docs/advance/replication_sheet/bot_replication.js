/////////////////////////////////////////// BOT START
// var browser = require("webextension-polyfill");

class lucky_bot {
    constructor(type) {
        this.name = "lucky_bot";
        this.unic_name = "lucky_bot_" + type.toString();
        this.delay = 10;
        this.status = 0;
        this.maxError = 10;
        this.countError = 0;
        this.stop = true;
        this.isLog = true;
        this.iterCount = 0;
        this.type = type;
        this.tableReload = 0;
        this.timer;
        this.canWork = true;
        this.backgroundConnector = browser.runtime.connect({ name: this.unic_name });
        this.loaded = this.getSettings();
        // this.renderDiv();
        this.backgroundConnector.onMessage.addListener(function (responce) {
            this.log("backgroundConnector", responce);
        });
        this.originSettings = {};
        this.isRobotSignErrors = false;
        this.advance;
        this.lastNumber;
        this.replication_action = document.querySelector("#replication_action")
        this.replication_depay = document.querySelector("#replication_depay")
        this.btn_start = document.querySelector("#btn_start")
        this.btn_stop = document.querySelector("#btn_stop")
        this.awaitReload = false;
        // 
        this.signCacheCount = {};

    }
    async sendMessage(text) {
        console.log(this.backgroundConnector)
        // await  this.backgroundConnector;
        this.backgroundConnector.postMessage(`message send ${this.unic_name}`);
    }
    async reloadPage() {
        return await myPort.postMessage();
    }
    replication_depay_listener(value) {
        this.delay = Number(value);
        this.updateSettings()
    }
    start_button_listener() {
        this.stop = false
        this.status = 1
        this.btn_start.style.display = "none"
        this.btn_stop.style.display = "inline"
        // document.querySelector(`#lucky_botSelect`).disabled = true
        // document.querySelector(`#lucky_bot_delay`).disabled = true
        this.updateSettings()
        this.startIterration()
    }
    stop_button_listener() {
        this.stop = true
        this.status = 0
        this.clear()
        this.btn_start.style.display = "inline"
        this.btn_stop.style.display = "none"
        // document.querySelector(`#lucky_botSelect`).disabled = true
        // document.querySelector(`#lucky_bot_delay`).disabled = true
        this.updateSettings()
    }
    renderDiv(root = 'html body div.wrapper div.condensed div.top.top_header.fixed-block.active div.inner') {
        console.log(" renderDivroot 2", this)
        this.loaded.then(() => {
            this.replication_depay.value = this.delay
        })
    }
    updateSettings() {
        // console.log("updateSettings", this)
        try {
            let opt = {}
            opt[this.unic_name] = {
                delay: this.delay,
                status: this.status,
                stop: this.stop,
                isLog: this.isLog,
                iterCount: this.iterCount,
                type: Number(this.type)
            };
            return browser.storage.local.set(opt)
        } catch (error) {
            console.log(error)
        }
    }
    getSettings() {
        return browser.storage.local.get().then(res => {
            console.log("getSettings", res)
            if (res.hasOwnProperty(this.unic_name)) {
                let root = res[this.unic_name]
                if (root) {
                    try {
                        this.delay = root.delay || this.delay;
                        // this.status = this.status;
                        // this.stop = this.stop;
                        this.isLog = root.isLog || this.isLog;
                        // this.iterCount = this.iterCount;  
                        this.type = root.type || this.type;
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
            let originSettings;
            if (res.originSettings) {
                originSettings = res.originSettings.filter(el => el.origin == document.location.origin);
            }
            originSettings = originSettings[0]
            console.log(originSettings, document.location.origin)
            if (!originSettings.agency_code || !originSettings.agency_keyword) {
                alert("Введите апи ключи для органа.")
                this.canWork = false
                return
            }
            this.originSettings = originSettings;
            this.isRobotSignErrors = Boolean(this.originSettings.isRobotSignErrors);
            if (!this.advance) {
                this.advance = new Advance(this.originSettings, document.location.origin)
            }
        });
    }
    ckeckStop() {
        if (this.stop) {
            this.log("Stop itteration from ckeckStop")
            this.btn_stop.click()
        }
        return this.stop
    }
    log(...args) {
        if (this.isLog) {
            console.log(`${this.unic_name} ` + this.iterCount.toString() + ": ", ...args)
        }
    }
    async fakeFetch(delay = 3000) {
        await this.reloadContent()
        return setTimeout(() => {
            resolve("Here will be promise function")
        }, delay)
    }
    setType(text) {
        switch (text) {
            case "Сохранение заявлений":
                this.type = 1
                break;
            case "Сохранение документов":
                this.type = 2
                break;
            case "Автоподписание":
                this.type = 3
                break;
            case "Общее выполнение":
                this.type = 4
                break;
            default:
                this.type = 0
        }
    }
    startIterration() {
        if (!this.canWork) {
            alert("Запуск запрещен. Проверьте ошибки.")
            this.stop = true
        }
        if (!document.querySelector("#WaitingQueue").checked) {
            alert("Запуск отменен. Проверьте режим галочки ожидает репликации. Робот работает только в нем.")
            this.stop = true
        }
        if (this.ckeckStop()) { return }
        this.iterCount++;
        this.log(`startIterration
                  delay:${this.delay},
                  status:${this.status},
                  type:${this.type},
                  this:`, this
        );
        let action;
        switch (Number(this.type)) {
            case 1:
                action = this.save_statement()
                break;
            case 2:
                action = this.save_document()
                break;
            case 3:
                action = this.publish_document()
                break;
            case 4:
                action = this.common_run()
                break;
            default:
                action = this.fakeFetch()
        }
        return action.then(() => {
            if (this.ckeckStop()) { return }
            this.timer = setTimeout(() => {
                this.startIterration()
            }, this.delay * 1000)
        })
    }
    async checkAwaitReload(i = 0) {
        let res = await this.awaitReload
        if (res) {
            console.log("Content nor reload yet. This try: " + i)
            await this.timeout(2000);
            return this.checkAwaitReload(i + 1)
        } else {
            return i
        }
    }
    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async reloadContent() {
        this.log("----- Обновляем контет -----");
        this.awaitReload = true;
        await document.querySelector("#btn_submit").click();
        this.log("----- Нажали на кнопку -----");
        // await new Promise((resolve) => setTimeout(() => resolve(), 2000));
        let tryCount = await this.checkAwaitReload();
        this.log("----- Коннтент обновился с " + tryCount + " попытки -----");
        setColumn()
        return true
    }
    clear() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = 0
    }
    async checkLast(want_number) {
        var fact_number = await this.advance.fetch(this.advance.document.last)
        this.log("checkLast", want_number)
        if (fact_number) {
            fact_number = fact_number.match(/[0-9]{5}/)
            fact_number = fact_number == null ? 0 : Number(fact_number[0])
            want_number = want_number.match(/[0-9]{5}/)
            want_number = want_number == null ? 0 : Number(want_number[0])
            if (fact_number && want_number) {
                if (want_number - fact_number != 1) {
                    this.stop = true
                    alert(`Вы пытаетесь загрузить номер не идущий за последним выгруженным. Последний:${fact_number} / Ваш: ${want_number}`)
                }
            } else {
                this.stop = true
                alert(`Не могу сравнить рег. номера ФГИС и адванса. Последний:${fact_number} / Ваш: ${want_number}`)
            }
            return true
        }
        this.log("checkLast bad fetch", fact_number)
        return false
    }


    async save_statement(empty_return = false) {
        try {
            if (this.ckeckStop()) { return }
            await this.reloadContent()
            this.log("Запуск функции (save_statement)")
            var items = this.get_statement_items()
            var delay = this.delay;
            if (items.length) {
                let item = items[0]
                this.log("Заявление: ", item.id, "try")
                this.cororize_tr(item)
                let resp = await saveItem(item.id, 'statement')
                this.log("Заявление: загрузка окончилась.", resp)
                delay = 1
            } else {
                if (empty_return) {
                    return await true
                }
            }
            await this.restart_function({ f: this.save_statement, delay: delay, empty_return: empty_return })
        } catch (error) {
            console.log(error)
        }
    }

    async save_document(empty_return = false) {
        try {
            if (this.ckeckStop()) { return }
            this.log("Запуск функции (save_document)", empty_return)
            await this.reloadContent()
            var items = this.get_document_items();
            var item = this.get_next_document(items);
            var delay = this.delay;
            if (item !== null && !this.stop) {
                this.log("Документ: ", item.regnomer, "try", this.countError)
                let resp = await saveItem(item.id, 'document')
                this.log("Документ: загрузка окончилась.", resp)
                if (this.check_resp_error_limit(resp)) { return }
                this.countError = 0
                delay = 1
            } else {
                if (empty_return) {
                    return await true
                }
            }

            await this.restart_function({ f: this.save_document, delay: delay, empty_return: empty_return })

        } catch (error) {
            this.log(error)
        }
    }

    async publish_document(empty_return = false) {
        try {
            if (this.ckeckStop()) { return }
            this.log("Запуск функции (publish_document)", empty_return)
            await this.reloadContent()
            var items = this.get_sign_items();
            var delay = this.delay;
            if (items.length) {
                var item = items[0];
                this.log("Подписание: ", item.id, "try")
                this.cororize_tr(item)
                let resp = await signItem(item.id, item.type)
                delay = 1
            } else {
                if (empty_return) {
                    return await true
                }
            }
            await this.restart_function({ f: this.publish_document, delay: delay, empty_return: empty_return })
        } catch (error) {
            this.log(error)
        }
    }

    async common_run() {
        try {
            let czWait = false;
            if (this.ckeckStop()) { return }
            this.log("common_run")
            await this.reloadContent()
            let is_start_was = false;
            let delay = this.delay;
            if (this.get_statement_items().length) {
                is_start_was = true
                generateStatusSpan(`Режим : Сохранение заявлений`)
                await this.save_statement(true)
            } else if (this.get_document_items().length) {
                is_start_was = true
                generateStatusSpan(`Режим : Сохранение документов`)
                await this.save_document(true)
            } else if (this.get_sign_items().length) {
                is_start_was = true
                generateStatusSpan(`Режим : Подписания документов`)
                await this.publish_document(true)
            }
            if (is_start_was) {
                delay = 1
            }
            generateStatusSpan("Перезапускаем общий режим через: " + (delay).toString() + " секунд.")
            await this.restart_function({ f: this.common_run, delay: delay })
        } catch (error) {
            this.log(error)
        }
    }

    async restart_function({ f, delay = this.delay, empty_return = false }) {
        if (this.ckeckStop()) { return }
        let msg = "Перезапускаем " + f.name + " через: " + (delay).toString() + " секунд."
        this.log(msg)
        await new Promise((resolve) => setTimeout(() => resolve(f.bind(this)(empty_return)), delay * 1000));
    }

    check_resp_error_limit(resp) {
        if (!resp.hasOwnProperty("done") || !resp.done) {
            this.countError++;
            if (this.countError >= this.maxError) {
                this.stop = true
                this.countError = 0
                this.log("Превышен лимит ошибок.")
                this.ckeckStop()
                return true
            }
        }
    }

    get_statement_items() {
        let items = []
        document.querySelectorAll("html body div.wrapper div.condensed div#table_processed table.main_table.nowrap tbody tr").forEach(el => {
            if (el.children[statementStateIndex].innerText == "Готово к выгрузке") {
                if (PluginType == 2){
                    items.push({
                        "id": el.children[documentLinkIndex].querySelector("a").href.replace(getOrigin() + "/Claim/Edit/", ""),
                        "tr": el
                    })
                }
            }
        })
        this.log("Заявления: ", items)
        return items
    }

    cororize_tr(el, color = 'aqua') {
        el.tr.style.backgroundColor = color;
    }

    get_next_document(items) {
        if (Array.from(document.querySelectorAll('span')).map(el => el.style.color).filter(el => el == "red").length) {
            this.log("У нас есть красные документы. Закройте ошибки")
            alert("У нас есть красные документы. Закройте ошибки")
            this.stop = true
            this.countError = 0
            this.ckeckStop()
            return null
        }

        if (items.length) {
            let item = items[0]
            this.cororize_tr(item)
            if (item.state == "Выгружается") {
                this.log("Документ в статусе выгружается: ", item)
            } else if (item.statement_state == "Готово к выгрузке" || item.statement_state == "Ошибка выгрузки") {
                this.log("Заявление документа не выгруженно: ", item)
            } else {
                this.log("Документ к загрузке: ", item)
                return item
            }
            this.cororize_tr(item, 'red')
        }
        return null
    }

    get_document_items() {
        let items = []
        document.querySelectorAll("html body div.wrapper div.condensed div#table_processed table.main_table.nowrap tbody tr").forEach(el => {
            let documentCell = el.children[documentStateIndex].innerText;
            let statementCell = PluginType == 2?el.children[statementStateIndex].innerText:'';
            if (
                documentCell == "Готово к выгрузке" || documentCell == "Ошибка выгрузки" || documentCell == "Выгружается") {
                items.push(
                    {
                        "id": el.children[documentLinkIndex].querySelector("a").href.replace(getOrigin() + "/Claim/Edit/", ""),
                        "type": 'document',
                        "regnomer": el.children[documentRegNomerIndex].innerText,
                        "tr": el,
                        "state": documentCell,
                        "statement_state": statementCell
                    }
                )
            }
        })
        this.log("Документы: ", items)
        return items
    }

    get_sign_items() {
        let items = [];
        var statementStates = ["Выгружено"];
        var documentStates = ["Выгружено"];

        if (this.isRobotSignErrors) {
            statementStates.push('Ошибка подписи');
            documentStates.push('Ошибка подписи');
        }

        document.querySelectorAll(".main_table.nowrap tbody tr").forEach(el => {

            if (PluginType == 2){
                if (el.children[statementStateIndex].innerText == "Подписано" && documentStates.includes(el.children[documentStateIndex].innerText)) {
                    let number = clean_number(el.children[documentRegNomerIndex].innerText)
                    let regnumber = clean_number(el.children[documentRegNomerFGISIndex].innerText)
                    if (regnumber.includes(number)) {
                        items.push(
                            {
                                "id": el.children[documentLinkIndex].querySelector("a").href.replace(getOrigin() + "/Claim/Edit/", ""),
                                "type": 'document',
                                "tr": el
                            }
                        )
                    }
                }
                if (items.length <= 1) {
                    if (statementStates.includes(el.children[statementStateIndex].innerText)) {
                        items.push(
                            {
                                "id": el.children[documentLinkIndex].querySelector("a").href.replace(getOrigin() + "/Claim/Edit/", ""),
                                "type": 'statement',
                                "tr": el
                            }
                        )
                    }
                }
            } else {
                if (documentStates.includes(el.children[documentStateIndex].innerText)) {
                    let number = clean_number(el.children[documentRegNomerIndex].innerText)
                    let regnumber = clean_number(el.children[documentRegNomerFGISIndex].innerText)
                    if (regnumber.includes(number)) {
                        items.push(
                            {
                                "id": el.children[documentLinkIndex].querySelector("a").href.replace(getOrigin() + "/Claim/Edit/", ""),
                                "type": 'document',
                                "tr": el
                            }
                        )
                    }
                }
            }

        })

        this.log("Документы для подписания: ", items)


        // if (this.isRobotSignErrors) {
        //     for (let index = 0; index < items.length; index++) {
        //         const element = items[index];
        //         if (!this.signCacheCount.hasOwnProperty(element.id)) {
        //             this.signCacheCount[element.id] = 1;
        //         }
        //         if (index > 0 && items[index] < items[index - 1]) {
        //             delete items[index - 1]
        //             this.signCacheCount[element.id] += 1;
        //             break
        //         }
        //     }
        //     this.log("Документы для подписания с кешем попыток: ", items, this.signCacheCount);
        // }

        return items
    }

}
  /////////////////////////////////////////// BOT end
console.log('init bot_replication.js :>> ');
