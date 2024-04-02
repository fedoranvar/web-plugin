
  var pt = document.getElementById('PluginType');
  // console.log(pt)

  var PluginType = {
    'Applicant': 1,
    'Docs': 2,
  }[(pt && pt.value) || 'Docs'];


  var selectList = document.querySelector("#replication_action");
  var documentStateIndex;
  var statementStateIndex;
  var documentLinkIndex;
  var documentRegNomerIndex;
  var documentRegNomerFGISIndex;

  function clean_number(str) {
    str = str.replace(/B/g, 'В')
    str = str.replace(/O/g, 'О')
    str = str.replace(/P/g, 'Р')
    str = str.replace(/C/g, 'С')
    str = str.replace(/A/g, 'А')
    return str
  }

  function selectList_change_listener(value) {
    value = Number(value)
    if (value) {
      window.pageBot = new lucky_bot(value)
    } else {
      if (window.pageBot) {
        window.pageBot.clear()
        window.pageBot = null
      }
    }
  }

  function get_type_doc() {
    try {
      let value = document.querySelector("#select2-chosen-2")
      if (!value) {
        throw "Не смоги получить тип документа."
      }
      switch (value.textContent) {
        case "ДС ТР ЕАЭС":
          return "DTREA"
        case "СС ТР ЕАЭС":
          return "STREA"
        case "ДС ГОСТ Р":
        case "ДС ЕП РФ":
          return "DGSTR"
        case "ДС по 353 ПП":
          return "DPRTR"
        default:
          throw "Не известный тип документа"
      }
    } catch (error) {
      alert(error.message)
    }
  }

  function setColumn() {
    var t = Array.from(document.querySelectorAll("table.main_table:nth-child(1) th"));
    documentStateIndex = t.findIndex(column => column.innerText.toUpperCase() == "СТАТУС ДОКУМЕНТА");
    statementStateIndex = t.findIndex(column => column.innerText.toUpperCase() == "СТАТУС ЗАЯВЛЕНИЯ");
    if (PluginType == 1) {
      documentLinkIndex = t.findIndex(column => column.innerText.toUpperCase() == "МАКЕТ");
    } else {
      documentLinkIndex = t.findIndex(column => column.innerText.toUpperCase() == "НОМЕР ЗАЯВЛЕНИЯ");
    }
    documentRegNomerIndex = t.findIndex(column => column.innerText.toUpperCase() == "РЕГ. НОМЕР");
    documentRegNomerFGISIndex = t.findIndex(column => column.innerText.toUpperCase() == "РЕГ. НОМЕР ФГИС");
  }

  function getOrigin() {
    var i = document.location.origin;
    return i;
  }

  function generateLink(text, callBackName, parentNode = 'html body div.wrapper div.condensed div.top.top_header.fixed-block.active div.inner') {

    // console.log('VOT LINKA: +', callBackName)
    var l = document.querySelector(parentNode);
    if (l) {
      var oa = document.querySelector('.text-link.btn-' + callBackName.name);
      if (oa) {
        oa.parentNode.removeChild(oa);
      }
      var a = document.createElement('a');
      a.innerHTML = text;
      a.style.display = 'table';
      a.className = 'text-link btn-' + callBackName.name;
      a.style.marginLeft = '10px';
      a.style.marginBottom = '15px';
      a.style.cursor = "pointer";

      a.addEventListener('click', function() {
        window.postMessage({
          action: callBackName.name
        }, "*");
      }, false);

      l.parentNode.appendChild(a);
    }
    return a
  }

  function visibleWorkSpan(pervText, count) {
    var elem = document.querySelector('.status-span');
    if (elem) {
      if (elem.innerText == pervText) {
        // if (pervText.search(/\.$/g) != -1) {
        //     pervText = pervText.replace(/\.$/g,"..")
        // } else if (pervText.search(/\.\.$/g) != -1) {
        //   pervText = pervText.replace(/\.\.$/g,"...")
        // } else if (pervText.search(/\.\.\.$/g) != -1) {
        //   pervText = pervText.replace(/\.\.\.$/g,".")
        // } else if (count==0){
        // } else  if 
        switch (count) {
          case -2:
            return
          case 0:
          case 1:
          case 2:
            pervText = pervText + "."
            break;
          case 3:
            pervText = pervText.replace("...", "")
            count = -1
            break;
        }
        elem.innerText = pervText
        setTimeout(() => {
          visibleWorkSpan(pervText, count + 1)
        }, 1000);
      }
    }
  }
  function generateStatusSpan(
    text, count = 0, parentNode = 'html body div.wrapper div.condensed div.top.top_header.fixed-block.active div.inner') {
    var l = document.querySelector(parentNode);
    if (l) {
      var oa = document.querySelector('.status-span');
      if (oa) {
        oa.parentNode.removeChild(oa);
      }
      var a = document.createElement('span');
      a.innerHTML = text;
      a.style.display = 'table';
      a.className = 'status-span';
      a.style.marginLeft = '10px';
      a.style.marginBottom = '15px';
      l.parentNode.appendChild(a);
      visibleWorkSpan(text, count)
    }
  }
  // } catch (error) {
  //   console.log('common.js :>> ', error);
  // }
  console.log('init common.js :>> ');


  // ============================================================== common

  function saveItem(id, type) {
    var action;
    if (type == "statement") {
      action = "saveCommonDs";
    } else if (type == "document") {
      action = "saveDeclarationDs";
    }
    return browser.runtime
      .sendMessage({
        action: action,
        id: id,
        locationOrigin: getOrigin(),
        mode: "applications",
        module: "ds",
        advanceType: get_type_doc(),
        isSrd: PluginType == 1,
      })
      .then((data) => {
        return data;
      });
  }


  function signItem(id, type) {
    let action;
    if (type == "statement") {
      action = "signStatement";
    } else if (type == "document") {
      action = "signDeclaration";
    }
    return browser.runtime.sendMessage({
      action: action,
      id: id,
      locationOrigin: getOrigin(),
      mode: "applications",
      module: "ds",
      advanceType: get_type_doc(),
      isSrd: PluginType == 1,
    });
  }

  console.log('init actions.js :>> ');

  // ============================================================== actions


  var sign_queue = [];
  var save_document_queue = [];
  var save_statement_queue = [];
  var stop_save_document = false;

  function batch_get_statement_to_save() {
    console.log('batch_get_statement_to_save');
    var o = [];
    setColumn();
    document.querySelectorAll('.main_table.nowrap tbody tr').forEach((el) => {
      if (
        el.children[statementStateIndex].innerText == 'Готово к выгрузке' ||
        el.children[statementStateIndex].innerText == 'Ошибка выгрузки'
      ) {
        o.push({
          id: el.children[documentLinkIndex]
            .querySelector('a')
            .href.replace(getOrigin() + '/Claim/Edit/', ''),
          type: 'statement',
        });
      }
    });
    // o.length = 2
    save_statement_queue = o;
    generateStatusSpan(`Сохранение заявлений осталось ${o.length}`);
    console.log(o);
    batchSaveStatement();
  }

  function batch_get_document_to_save() {
    console.log('batch_get_document_to_save');
    var o = [];

    setColumn();
    document.querySelectorAll('.main_table.nowrap tbody tr').forEach((el) => {
      let documentCell = el.children[documentStateIndex].innerText;
      if (documentCell == 'Готово к выгрузке' || documentCell == 'Ошибка выгрузки') {
        o.push({
          id: el.children[documentLinkIndex]
            .querySelector('a')
            .href.replace(getOrigin() + '/Claim/Edit/', ''),
          type: 'document',
          regnomer: el.children[documentRegNomerIndex].innerText,
        });
      }
    });
    //o.length = 1
    save_document_queue = o;
    generateStatusSpan(`Сохранение документов осталось ${o.length}`);
    console.log(o);
    batchSaveDocument();
  }

  function batch_get_items_to_sign() {
    var o = [];
    setColumn();
    console.log('batch_get_items_to_sign');
    try {
      var list = [];
      document.querySelectorAll('#ItemsForAction').forEach((el) => {
        if (el.checked == true) {
          list.push(el.parentNode.parentNode.parentNode);
        }
      });
      if (!list.length) {
        list = document.querySelectorAll('.main_table.nowrap tbody tr');
      }
      if (PluginType == 2) {
        list.forEach((el) => {
          if (
            el.children[statementStateIndex].innerText == 'Выгружено' ||
            el.children[statementStateIndex].innerText == 'Ошибка подписи'
          ) {
            o.push({
              id: el.children[documentLinkIndex]
                .querySelector('a')
                .href.replace(getOrigin() + '/Claim/Edit/', ''),
              type: 'statement',
            });
          }
        });
      }
      list.forEach((el) => {
        if (
          el.children[documentStateIndex].innerText == 'Выгружено' ||
          el.children[documentStateIndex].innerText == 'Ошибка подписи'
        ) {
          let number = clean_number(el.children[documentRegNomerIndex].innerText);
          let regnumber = clean_number(el.children[documentRegNomerFGISIndex].innerText);
          if (regnumber.includes(number)) {
            o.push({
              id: el.children[documentLinkIndex]
                .querySelector('a')
                .href.replace(getOrigin() + '/Claim/Edit/', ''),
              type: 'document',
            });
          }
        }
      });
      sign_queue = o;
      console.log(o);
      generateStatusSpan(`Подписание документов осталось ${o.length}`);
      batchSignItems();
    } catch (error) {
      console.log(error);
    }
  }

  function batchSignItems() {
    if (sign_queue.length == 0) {
      alert('Подписание документов закончено');
      location.reload();
      return;
    }
    var item = sign_queue[0];
    // sign_queue = sign_queue.splice(1)
    let action;
    console.log(item);
    action = signItem(item.id, item.type);
    return action.then(() => {
      sign_queue = sign_queue.splice(1);
      generateStatusSpan(`Подписание документов осталось ${sign_queue.length}`);
      return batchSignItems();
    });
  }

  function batchSaveStatement() {
    if (save_statement_queue.length == 0) {
      let msg = 'Сохранение заявлений остановлено';
      alert(msg);
      location.reload();
      return True;
    }
    var item = save_statement_queue[0];
    console.log('---------- Try ', item.id, item.type);
    let action = saveItem(item.id, item.type);
    return action.then(() => {
      generateStatusSpan(`Сохранение заявлений осталось ${save_statement_queue.length}`);
      save_statement_queue = save_statement_queue.splice(1);
      return batchSaveStatement();
    });
  }

  function batchSaveDocument() {
    if (save_document_queue.length == 0 || stop_save_document) {
      let msg = 'Сохранение документов остановленно';
      if (stop_save_document) {
        msg += ' из за ошибки репликации';
      }
      alert(msg);
      location.reload();
      return True;
    }
    var item = save_document_queue[0];
    // sign_queue = sign_queue.splice(1)
    // return sign_rabbit()
    let action;
    action = saveItem(item.id, 'document');
    return action.then((data) => {
      try {
        var agencyMode = document.getElementById('AgencyMode').value == "True";

        if (!agencyMode) {
          if (data.hasOwnProperty('done') && !data.done) {
            stop_save_document = true;
          }
        }

        save_document_queue = save_document_queue.splice(1);
        generateStatusSpan(`Сохранение документов осталось ${save_document_queue.length}`);
        return batchSaveDocument();
      } catch (error) {
        console.log('error :>> ', error);
      }

    });
  }



  // ============================================================== batch


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
      this.backgroundConnector.onMessage.addListener(function(responce) {
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
          if (PluginType == 2) {
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
        let statementCell = PluginType == 2 ? el.children[statementStateIndex].innerText : '';
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

        if (PluginType == 2) {
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
  // ============================================================== bot



  // if (PluginType == 2) {
  //   generateLink('Сохранить заявления во ФГИС', batch_get_statement_to_save)
  // }
  // generateLink('Сохранить документы во ФГИС', batch_get_document_to_save)
  // generateLink('Запустить авто подписание', batch_get_items_to_sign)
  // // generateLink('Отправить сообщение',send_message_back)
  // generateStatusSpan("Выполняет 0 из 0", -2)

  window.addEventListener("message", function(event) {
    console.log(event)
    if (event.source == window && event.data.action == "select-action") {
      selectList_change_listener(event.data.value)
    }
    if (event.source == window && event.data.action == "btn-start") {
      if (window.pageBot) {
        window.pageBot.start_button_listener()
      }
    }
    if (event.source == window && event.data.action == "btn-stop") {
      if (window.pageBot) {
        window.pageBot.stop_button_listener()
      }
    }
    if (event.source == window && event.data.action == "input-delay") {
      if (window.pageBot) {
        window.pageBot.replication_depay_listener(event.data.value)
      }
    }
    if (event.source == window && event.data.action == "refreshDone") {
      console.log("Reload done successful.")
      if (window.pageBot && window.pageBot.awaitReload) {
        console.log("PageBot can go.")
        window.pageBot.awaitReload = false
      }
    }

    if (event.source == window && event.data.action == "batch_get_statement_to_save") {
      batch_get_statement_to_save();
    }
    if (event.source == window && event.data.action == "batch_get_items_to_sign") {
      batch_get_items_to_sign();
    }
    if (event.source == window && event.data.action == "batch_get_document_to_save") {
      batch_get_document_to_save();
    }

    // if (event.source == window && event.data.action == "send_message_back") {
    //   send_message_back();
    // }
  });

  console.log('init after_inits.js sadad:>> ');
  console.log("Все модули успешно загрузились!")


  

  export {
    batch_get_document_to_save
  }
