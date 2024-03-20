

  // var browser = require("webextension-polyfill");
  function main() {
    const parentDiv = document.querySelector('.right-side');
    if (parentDiv === null) {
      return setTimeout(main, 1000);
    }

    const advanceRootDiv = document.createElement('div');
    const advanceLinkInput = createAdvanceLinkInput();
    const advanceSettingIndexInput = createAdvanceSettingInput(
      'advanceSettingIndexInput',
      'Индекс',
    );
    const advanceSettingTypeInput = createAdvanceSettingInput('advanceSettingTypeInput', 'Тип');
    const advanceSettingPwdInput = createAdvanceSettingInput('advanceSettingPwdInput', 'ПИН');
    advanceSettingPwdInput.type = 'password';

    const advanceLinkSubmit = createAdvanceLinkSubmit(advanceLinkInput);
    const advanceLinkSign = createAdvanceLinkSign(
      advanceLinkInput,
      advanceSettingIndexInput,
      advanceSettingTypeInput,
      advanceSettingPwdInput,
    );

    const advanceDownload = createAdvanceDownload(advanceLinkInput);
    const advanceShowSettings = btnDefault();
    advanceShowSettings.className = 'btn btn_custom btn_accent btn-icon btn-icon_settings';
    var visibleSettings = false;
    advanceShowSettings.onclick = function (evt) {
      if (visibleSettings) {
        advanceSettingIndexInput.style.display = 'none';
        advanceSettingTypeInput.style.display = 'none';
        advanceSettingPwdInput.style.display = 'none';
      } else {
        advanceSettingIndexInput.style.display = 'inline';
        advanceSettingTypeInput.style.display = 'inline';
        advanceSettingPwdInput.style.display = 'inline';
      }
      visibleSettings = !visibleSettings;
    };

    advanceRootDiv.style = 'margin-top:5px;margin-left:5px;';

    advanceRootDiv.appendChild(advanceLinkInput);
    advanceRootDiv.appendChild(advanceLinkSubmit);
    advanceRootDiv.appendChild(advanceLinkSign);
    advanceRootDiv.appendChild(advanceDownload);
    advanceRootDiv.appendChild(advanceShowSettings);
    advanceRootDiv.appendChild(advanceSettingIndexInput);
    advanceRootDiv.appendChild(advanceSettingTypeInput);
    
    advanceRootDiv.appendChild(advanceSettingPwdInput);

    parentDiv.parentElement.appendChild(advanceRootDiv);
  }


  function parseUrl(urlText) {
    if (!urlText) {
      return alert('Укажите корректную ссылку.');
    }
    const url = new URL(urlText);
    return {
      origin: url.origin,
      documentToken: url.searchParams.get('document_token'),
      documentId: url.searchParams.get('document_id'),
      documentType: url.searchParams.get('document_type'),
    };
  }

  function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();logo_docs  }

  function activeAction(urlText, params, successMessage='Действие успешно выполнено!') {
    const urlParams = parseUrl(urlText);
    console.log("===== URLPARAMS: ", urlParams)
    if (!urlParams.documentToken || !urlParams.documentId || !urlParams.documentType) {
      return alert('Указана не корректная ссылка.');
    }

    try {
      
      // const btn1 = document.getElementById('btnSubmit');
      // // const btn2 = document.getElementById('btnSign');
      // btn1.style.display = 'none';
      // btn2.style.display = 'none';

      params = Object.assign(
        {
          id: String(urlParams.documentId),
          locationOrigin: urlParams.origin,
          advanceType: urlParams.documentType,
          document_token: urlParams.documentToken,
          mode: 'applications',
          module: 'ds',
          isSrd: true,
        },
        params,
      );

      // showSpinner()
      return browser.runtime.sendMessage(params).then((data) => {
        if (!data.done) {
          data.err = data.err.replace(
            'Token is expiredОшибка в адвансе',
            'Срок действия ссылки истек',
          );
          data.err = data.err.replace(
            'Token not foundОшибка в адвансе',
            'Указана не корректная ссылка',
          );
          alert(data.err);
        } else {
          if (data.documentFgisData) {
            console.log('data :>> ', data);
            openInNewTab(data.documentFgisData.url)
          }
          alert(successMessage);
        }
        // hideSpinner()
        btn1.style.display = 'inline';
        // btn2.style.display = 'inline';
      });

    } catch (error) {
      console.log('activeAction error:>> ', urlText, params, successMessage, error);
    }

  }

  function sendDocument(urlText) {
    console.log('sendDocument :>> ', urlText);
     return   activeAction(urlText, {
        action: 'saveDeclarationDs',
      }, 'Документ успешно выгружен и открыт в новой вкладке.');
  }

  function signDocument(
    urlText,
    advanceSettingIndexInput,
    advanceSettingTypeInput,
    advanceSettingPwdInput,
  ) {
    const indexCertif = advanceSettingIndexInput.value;
    const algorithm = advanceSettingTypeInput.value;
    const pwdCertif = advanceSettingPwdInput.value || "";

    if (!indexCertif || (!algorithm && algorithm !== 0)) {
      alert('Поля Индекс и Тип обязательны к заполнению');
      return;
    }

    return activeAction(urlText, {
      action: 'signDeclaration',
      settings: {
        indexCertif: indexCertif,
        algorithm: algorithm,
        pwdCertif: pwdCertif,
      },
    }, 'Документ успешно опубликован.');
  }

  function createAdvanceLinkInput() {
    const el = inputDefault();
    el.placeholder = 'Укажите Advance ссылку на документ...';
    el.id = 'advanceLinkInput';
    return el;
  }

  function createAdvanceSettingInput(id, placeholder) {
    const el = inputDefault(false);
    el.placeholder = placeholder;
    el.id = id;
    el.style = 'max-width:75px;margin-left:5px;';
    el.style.display = 'none';
    el.value = localStorage.getItem(el.id) || '';
    el.onchange = function (evt) {
      localStorage.setItem(el.id, el.value);
    };

    return el;
  }

  function inputDefault(withStyle = true) {
    const el = document.createElement('input');
    if (withStyle) {
      el.style = 'min-width:275px;margin-left:5px;';
    }
    return el;
  }

  function createAdvanceLinkSubmit(input) {
    const el = btnDefault();
    el.id = 'btnSubmit';
    el.innerText = 'Отправить';
    el.onclick = function (evt) {
      return sendDocument(input.value);
    };
    return el;
  }

  function downloadDocument(url) {
      const urlParams = parseUrl(url);
      let downloadString = `${urlParams.origin}/api/v3/fgis/${urlParams.documentType}/document/download/${urlParams.documentId}?document_token=${urlParams.documentToken}`;
      console.log("=== DOWNLOAD: ",downloadString)
      window.open(downloadString)
  }

  function createAdvanceDownload(advanceLinkInput) {
    const el = btnDefault();
    el.id = 'btnDownload';
    el.innerText = 'Скачать';
    el.onclick = function (evt) {
      const urlParams = parseUrl(advanceLinkInput.value);
      let a = document.createElement('a');
      a.href = `${urlParams.origin}/api/v3/fgis/${urlParams.documentType}/document/download/${urlParams.documentId}?document_token=${urlParams.documentToken}`;
      a.download = 'Декларация.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    return el;
  }

  function createAdvanceLinkSign(
    advanceLinkInput,
    advanceSettingIndexInput,
    advanceSettingTypeInput,
    advanceSettingPwdInput,
  ) {
    const el = btnDefault();
    el.id = 'btnSign';
    el.innerText = 'Подписать';
    el.onclick = function (evt) {
      return signDocument(
        advanceLinkInput.value,
        advanceSettingIndexInput,
        advanceSettingTypeInput,
        advanceSettingPwdInput,
      );
    };
    return el;
  }

  function btnDefault(withStyle = true) {
    let e = document.createElement('button');
    e.className = 'btn btn_custom btn-primary btn-icon';
    if (withStyle) {
      e.style = 'margin-left:5px;margin-right:5px;';
    }
    return e;
  }

  
  main();
  console.log('srd end :>> ');

  export {
    sendDocument,
    downloadDocument
  }
