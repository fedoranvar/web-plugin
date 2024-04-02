  
  var sign_queue = [];
  var save_document_queue = [];
  var save_statement_queue = [];
  var stop_save_document = false;

  function batch_get_statement_to_save() {
    var o = [];
    setColumn();
    console.log('batch_get_statement_to_save');
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
    var o = [];
    console.log('batch_get_document_to_save');
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
      msg = 'Сохранение заявлений остановлено';
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
      msg = 'Сохранение документов остановленно';
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

  export {
    batch_get_document_to_save,
    batch_get_items_to_sign,
    batch_get_statement_to_save
  }

