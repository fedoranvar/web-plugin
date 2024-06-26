

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
  win.focus(); logo_docs
}

function activeAction(urlText, params, successMessage = 'Действие успешно выполнено!') {
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
        isSrd: true
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
      // btn1.style.display = 'inline';
      // btn2.style.display = 'inline';
    });

  } catch (error) {
    console.log('activeAction error:>> ', urlText, params, successMessage, error);
  }

}

function sendDocument(urlText) {
  console.log('sendDocument :>> ', urlText);
  return activeAction(urlText, {
    action: 'saveDeclarationDs',
  }, 'Документ успешно выгружен и открыт в новой вкладке.');
}

function signDocument(
  urlText,
  index,
  type,
  password,

) {
  // const indexCertif = advanceSettingIndexInput.value;
  // const algorithm = advanceSettingTypeInput.value;
  // const pwdCertif = advanceSettingPwdInput.value || "";
  const indexCertif = index;
  const algorithm = type;
  const pwdCertif = password || "";

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


function downloadDocument(url) {
  const urlParams = parseUrl(url);
  let downloadString = `${urlParams.origin}/api/v3/fgis/${urlParams.documentType}/document/download/${urlParams.documentId}?document_token=${urlParams.documentToken}`;
  console.log("=== DOWNLOAD: ", downloadString)
  window.open(downloadString)
}




// main();
console.log('srd end :>> ');

export {
  sendDocument,
  downloadDocument,
  signDocument
}
