// var browser = require("webextension-polyfill");

function err(msg) {
  console.error(msg);
  throw msg;
}
function checkMode(mode) {
  if (mode !== 'declarations' && mode !== 'applications') {
    err('Не известный mode в class Sign.');
  }
}
class Sign {
  constructor(ids, fgis, mode, settings, blanks) {
    checkMode(mode);
    this.ids = ids;
    this.mode = mode;
    this.fgis = fgis;
    this.settings = settings;
    this.blanks = blanks;

    this.signTypeName = this._getSignTypeName();
    this.createSignedFileBody = this._getCreateSignedFileBody();

    this.logData = {};

    this.sign = {
      registrateBlanks: {
        method: 'POST',
        url: `api/v1/rss/common/blanks/ids`,
        repeat: true,
        maxRepeat: 5,
        timeOut: 60000,
      },
      createSignedFile: {
        method: 'POST',
        url: `api/v1/${this.fgis.fgisType}/common/${this.signTypeName}/createSignedFile`,
        body: this.createSignedFileBody,
        repeat: true,
        maxRepeat: 5,
        timeOut: 60000,
      },
      createsignui: {
        method: 'POST',
        url: '/api/v1/storage/common/signop/createsignui',
        repeat: true,
        maxRepeat: 5,
        timeOut: 60000,
      },
    };
  }
  _getCreateSignedFileBody() {
    if (this.fgis.fgisType == 'rss' && this.mode == 'declarations') {
      return this.blanks;
    } else if (
      this.fgis.fgisType == 'rds' ||
      this.fgis.fgisType == 'rss' ||
      this.fgis.fgisType == 'srd'
    ) {
      return {
        ids: this.ids,
        verifySignature: true,
      };
    } else {
      err('Не известный _getCreateSignedFileBody');
    }
  }
  _getSignTypeName() {
    if (this.mode == 'applications') {
      return 'applications';
    } else if (this.fgis.fgisType == 'rds' || this.fgis.fgisType == 'srd') {
      return 'declarations';
    } else if (this.fgis.fgisType == 'rss') {
      return 'certificates';
    } else {
      err('Не известный _getSignTypeName');
    }
  }
  start() {
    return this.createSignedFile()
      .then(() => this.createsignui())
      .then(() => this.signDocument());
  }
  createSignedFile() {
    var self = this;
    function _parseRes(respData) {
      if (self.fgis.fgisType == 'rds' || self.fgis.fgisType == 'srd') {
        return respData;
      } else if (self.fgis.fgisType == 'rss') {
        if (self.mode == 'declarations') {
          return { items: [respData] };
        } else {
          return { items: respData };
        }
      } else {
        // {"items":[{"idDeclaration":14743371,"idFile":"c1d5aef0-c360-430b-afce-9a7bccc193e0"}]}
        // Ошибка подписи Не может спарсить результат в _parseRes
        err('Не может спарсить результат в _parseRes, ' + self.fgis.fgisType);
      }
    }

    function _find_annexBlankId(blanksWithIds, numberStr) {
      let blank = blanksWithIds.annexBlanks.find((annexBlank) => {
        return annexBlank.number == Number(numberStr);
      });
      if (blank) return blank.id;
      return 1;
    }

    var action;
    if (this.fgis.fgisType == 'rss' && this.mode == 'declarations') {
      console.log('this.sign.createSignedFile.body :>> ', this.sign.createSignedFile.body);
      var annexBlankNumbers = [];
      this.sign.createSignedFile.body.annexes.forEach((annexes) => {
        annexes.annexBlanks.forEach((annexBlank) => {
          annexBlankNumbers.push(Number(annexBlank.blankNumber));
        });
      });
      action = this.fgis
        .fetch(this.sign.registrateBlanks, {
          body: {
            certificateBlankNumber: this.sign.createSignedFile.body.blankNumber,
            annexBlankNumbers: annexBlankNumbers,
          },
        })
        .then((blanksWithIds) => {
          this.sign.createSignedFile.body.idBlank = blanksWithIds.certificateBlank.id;
          console.log('blanksWithIds :>> ', blanksWithIds);
          this.sign.createSignedFile.body.annexes.forEach((annexes) => {
            annexes.annexBlanks.forEach((annexBlank) => {
              annexBlank.idBlank = _find_annexBlankId(blanksWithIds, annexBlank.blankNumber);
            });
          });
          return this.fgis.fetch(this.sign.createSignedFile, {
            body: this.sign.createSignedFile.body,
          });
        });
    } else {
      action = this.fgis.fetch(this.sign.createSignedFile, {
        body: this.sign.createSignedFile.body,
      });
    }

    return action.then((respData) => {
      this.logData.createSignedFile = {
        body: this.sign.createSignedFile.body,
        response: _parseRes(respData),
      };
    });
  }
  createsignui() {
    var fileIds = this.logData.createSignedFile.response.items.map((el) => el.idFile);
    var body = {
      clientSigningMode: 'Batch',
      fileIds: fileIds,
      returnUrl: '',
    };
    return this.fgis.fetch(this.sign.createsignui, { body: body }).then((respData) => {
      this.logData.createsignui = {
        body: body,
        response: respData,
      };
    });
  }
  signDocument() {
    awaitMessage.push({
      url: this.logData.createsignui.response.url,
      command: 'loaded',
      responce: {
        command: 'start',
        operationId: this.logData.createsignui.response.operationId,
        currentCertificate: {
          Index: parseInt(this.settings.indexCertif),
          Algorithm: parseInt(this.settings.algorithm),
        },
        pinCode: this.settings.pwdCertif,
      },
    });
    var masterTab;
    var is_remove = false;
    var self = this;
    function _updatestate() {
      return self.fgis.fetch(self.fgis.sign.updatestate, {
        params: { id: self.logData.createsignui.response.operationId },
      });
    }
    function _collectsignatures() {
      return self.fgis.fetch(self.fgis.sign.collectsignatures, {
        params: { id: self.logData.createsignui.response.operationId },
      });
    }
    function _signaturesinfo() {
      return self.fgis.fetch(self.fgis.sign.signaturesinfo, {
        params: {
          fileId: self.logData.createSignedFile.response.items[0].idFile,
        },
      });
    }

    return browser.tabs
      .create({
        url: this.logData.createsignui.response.url,
        active: false,
      })
      .then((tab) => (masterTab = tab))
      .then(() => this.checkMessage(this.logData.createsignui.response.url))
      .then(() => _updatestate())
      .then(() => _collectsignatures())
      .then(() => _signaturesinfo())
      .then(() => {
        var action;
        switch (this.mode) {
          case 'declarations':
            action = this.fgis.fetch(this.fgis.sign.dsSend, {
              body: this.createSignedFileBody,
            });
            break;
          case 'applications':
            action = this.fgis.fetch(this.fgis.sign.send, {
              body: this.createSignedFileBody,
            });
            break;
        }
        return action;
      })
      .finally(() => {
        if (!is_remove) {
          browser.tabs.remove([masterTab.id]);
        }
      });
  }
  checkMessage(url) {
    var count = 0;
    return new Promise((resolve, reject) => {
      var f = function () {
        var m = stateMessage.find((el) => el.command == 'signDone' && el.url == url);
        if (m) {
          stateMessage = stateMessage.filter((el) => el.command !== 'signDone' && el.url !== url);
          return resolve();
        } else {
          var errMsg = stateMessage.find((el) => el.command == 'signError' && el.url == url);
          if (errMsg) {
            reject('ФГИС сломался : ' + errMsg.msg);
          }
          if (count >= 90) {
            reject('Превышен лимит ожидания подписи');
          } else {
            count += 1;
            setTimeout(f, 1000);
          }
        }
      };
      f();
    });
  }
}
class Fgis {
  constructor({ token, advance, mode, settings, fgisType }) {
    checkMode(mode);
    this.token = token;
    this.advance = advance;
    this.mode = mode;
    this.settings = settings;
    this.fgisType = fgisType;

    this.maxRepeat = 5;
    this.repeatCount = 1;

    this.pub_document_type = this._get_pub_document_type(this.fgisType);
    this.sub_type_name = this._get_sub_type_name(this.fgisType);
    this.domain = this._get_domain(this.fgisType);
    this.full_url_pattern = this._get_full_url_pattern(this.fgisType);
    this.document_url = this._get_document_url(this.domain, this.fgisType, this.full_url_pattern);
    this.agencyData = fgisType == 'srd' ? false : this.getOrganData();
    this.headers = new Headers();
    this.statement_url = `${this.domain}/${this.fgisType}/application/view/`;
    this.pub_document_url = `https://pub.fsa.gov.ru/${this.pub_document_type}/${this.full_url_pattern}/view/`;
    this.sign = {
      updatestate: {
        method: 'POST',
        url: '/api/v1/storage/common/signop/{id}/updatestate',
        params: ['id'],
        repeat: true,
        maxRepeat: 10,
      },
      collectsignatures: {
        method: 'POST',
        url: '/api/v1/storage/common/signop/{id}/collectsignatures',
        params: ['id'],
        repeat: true,
        maxRepeat: 10,
        noObjResp: true,
      },
      signaturesinfo: {
        method: 'GET',
        url: '/api/v1/storage/common/files/{fileId}/signaturesinfo',
        params: ['fileId'],
        repeat: true,
        maxRepeat: 10,
      },
      send: {
        method: 'POST',
        url: `/api/v1/${this.fgisType}/common/applications/send`,
        repeat: true,
        maxRepeat: 10,
        timeOut: 30000,
      },
      dsSend: {
        method: 'POST',
        url: `/api/v1/${this.fgisType}/common/${this.sub_type_name}/publish`,
        repeat: true,
        maxRepeat: 10,
        timeOut: 30000,
      },
    };
    this.statement = {
      init: {
        errName: 'this.statement.init',
        method: 'POST',
        url: `/api/v1/${this.fgisType}/common/applications/draft`,
        repeat: true,
        maxRepeat: 10,
        errfun: this.statement_init_errfun,
      },
      get: {
        method: 'GET',
        url: `/api/v1/${this.fgisType}/common/applications/{id}`,
        params: ['id'],
        repeat: true,
        maxRepeat: 10,
        timeOut: 30000,
      },
      post: {
        method: 'POST',
        url: `/api/v1/${this.fgisType}/common/applications/{id}`,
        params: ['id'],
        repeat: true,
        maxRepeat: 5,
        noObjResp: true,
      },
    };
    this.document = {
      init: {
        method: 'POST',
        url: `/api/v1/${this.fgisType}/common/${this.sub_type_name}/draft`,
        repeat: true,
        maxRepeat: 10,
      },
      loadFile: {
        method: 'POST',
        url: '/api/v1/storage/common/files',
        bodyType: 'FormData',
        repeat: true,
        maxRepeat: 10,
        timeOut: 30000,
      },
      get: {
        method: 'GET',
        url: `/api/v1/${this.fgisType}/common/${this.sub_type_name}/{id}`,
        params: ['id'],
        repeat: true,
        maxRepeat: 10,
        timeOut: 10000,
      },
      post: {
        method: 'POST',
        url: `/api/v1/${this.fgisType}/common/${this.sub_type_name}/{id}`,
        params: ['id'],
        repeat: true,
        maxRepeat: 5,
        noObjResp: true,
      },
    };
    this.errorBook = {};
    console.log('Fgis :>> ', this);
  }
  _get_document_url(domain, fgisType, full_url_pattern) {
    switch (fgisType) {
      case 'rds':
      case 'rss':
        return `${domain}/${fgisType}/${full_url_pattern}/view/`;
      case 'srd':
        return `${domain}/${fgisType}/view/`;
      default:
        err('Не известный document_url.');
    }
  }
  _get_domain(fgisType) {
    switch (fgisType) {
      case 'rds':
      case 'rss':
        return 'http://10.250.74.17';
      case 'srd':
        return 'https://srd.fsa.gov.ru';
      default:
        err('Не известный domain.');
    }
  }
  _get_full_url_pattern(fgisType) {
    switch (fgisType) {
      case 'rss':
        return 'certificate';
      case 'srd':
      case 'rds':
        return 'declaration';
      // return "srd";
      default:
        err('Не известный full_url_pattern.');
    }
  }
  _get_pub_document_type(fgisType) {
    switch (fgisType) {
      case 'rds':
      case 'srd':
        return 'rds';
      case 'rss':
        return 'rss';
      default:
        err('Не известный pub_document_type.');
    }
  }
  _get_sub_type_name(fgisType) {
    switch (fgisType) {
      case 'rds':
      case 'srd':
        return 'declarations';
      case 'rss':
        return 'certificates';
      default:
        err('Не известный sub_type_name.');
    }
  }
  random_uuid() {
    return (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
  }
  fetchErrParser(instruction, responce, callback) {
    var errType = {
      'invalid request': 1,
      'server error': 2,
    };
    switch (instruction.errName) {
      case 'this.statement.init':
        break;
      default:
        return responce;
        break;
    }
  }
  getOrganData() {
    return this.advance.fetch(this.advance.data.agencyData).then((data) => data);
  }
  signFile(ids = [], mode = '', blanks = {}) {
    if (!Array.isArray(ids) || ids.length == 0) {
      err(`Пустой список документов для подписания: ${ids}`);
    }
    var sign = new Sign(ids, this, mode || this.mode, this.settings, blanks);
    return sign.start();
  }
  setHeaders(fgisType) {
    switch (fgisType) {
      case 'rds':
      case 'rss':
        return this.agencyData.then((data) => {
          this.headers.set('Accept', 'application/json, text/plain, */*');
          this.headers.set('Authorization', 'Bearer ' + this.token.getToken());
          this.headers.set('Pragma', 'no-cache');
          this.headers.set('Content-Type', 'application/json');
          this.headers.set('lkId', 5);
          this.headers.set('orgId', data.orgId);
        });
      case 'srd':
        return Promise.resolve().then(() => {
          this.headers.set('Accept', 'application/json, text/plain, */*');
          this.headers.set('Authorization', 'Bearer ' + this.token.getToken());
          this.headers.set('Pragma', 'no-cache');
          this.headers.set('Content-Type', 'application/json');
          this.headers.set('lkId', null);
          this.headers.set('orgId', null);
        });
    }
  }
  ownException(msg) {
    err('Ошибка во Фгис!. Текст:\r\n' + msg);
  }
  async fetch_with_timeout(url, params, timeOut = 30000) {
    timeOut = Number(timeOut);
    var controller = new AbortController();
    var signal = controller.signal;
    var p1 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        controller.abort();
        reject({
          result: 'Превышен лимит ожидания',
          msg: 'Превышен лимит ожидания',
        });
      }, timeOut);
    });
    var p2 = new Promise(function (resolve, reject) {
      fetch(url, params)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
    return Promise.race([p1, p2]);
  }

  fetch(o, opt = { body: {}, params: {} }, repeat = false, isrepeat = false, uuid = false) {
    try {
      if (isrepeat == false) {
        this.repeatCount = 1;
      } else {
        this.repeatCount++;
      }

      if (uuid) {
        uuid = uuid + '_fgis_fetch_' + this.repeatCount;
      } else {
        uuid = this.random_uuid() + '_fgis_fetch_' + this.repeatCount;
      }

      var maxRepeat = o.hasOwnProperty('maxRepeat') ? o.maxRepeat : this.maxRepeat;

      return this.setHeaders(this.fgisType).then(() => {
        var objUrl = o.url;
        if (o.params) {
          if (!opt.hasOwnProperty('params'))
            return this.ownException('Для этого запроса обязательны параметры.');
          o.params.forEach((element) => {
            if (!opt.params.hasOwnProperty(element)) {
              return this.ownException(
                `Кажется вы забыли указать обязательный параметр.
                        ${objUrl}
                        Нужны: ${o.params.toString()}
                        Пришли: ${opt.params.toString()}
                        `,
              );
            }
            objUrl = objUrl.replace(`{${element}}`, opt.params[element]);
          });
        }
        var url = new URL(objUrl, this.domain);
        var params = {
          method: o.method,
          credentials: 'include',
          headers: this.headers,
        };
        switch (o.method) {
          case 'POST':
            if (o.bodyType && o.bodyType == 'FormData') {
              params.body = opt.body;
              params.headers.delete('Content-Type');
            } else {
              params.body = JSON.stringify(Object.assign({}, opt.body));
            }
            break;
        }
        var timeOut = o.hasOwnProperty('timeOut');
        console.info(
          '--- %s --- Fgis fetch %s / %s : ',
          uuid,
          this.repeatCount,
          maxRepeat,
          url.href,
          o,
          opt,
          'timeOut : ',
          timeOut,
        );
        var f = o.hasOwnProperty('timeOut')
          ? this.fetch_with_timeout(url.href, params, o.timeOut)
          : fetch(url.href, params);
        return f
          .then((response) => {
            return response.json().catch((err) => {
              switch (response.status) {
                case 500:
                case 502:
                  throw { result: response, msg: '(JSON) Сервис не работает.' };
                case 401:
                case 403:
                  throw {
                    result: response,
                    msg: '(JSON) Отказано в доступе. Проверьте авторизацию.',
                  };
                case 200:
                  return {};
                default:
                  throw {
                    result: response,
                    msg: `(JSON) Не известный код ошибки ( status :${
                      response.status
                    }): ${JSON.stringify(response)}`,
                  };
              }
            });
          })
          .then((obj) => {
            if (obj.status) {
              switch (obj.status) {
                default:
                  if (obj.status > 205) {
                    throw {
                      result: obj,
                      msg: `Не известная ошибка запроса ( status :${obj.status}): ${obj.message}`,
                    };
                  }
              }
            }
            if (obj.code) {
              switch (obj.code) {
                case 401:
                case 400:
                  throw { result: obj, msg: obj.description };
                default:
                  throw {
                    result: obj,
                    msg: `Не известная ошибка запроса ( code: ${obj.code}): ${
                      obj.message ? obj.message : JSON.stringify(obj)
                    }`,
                  };
              }
            }
            console.info('--- %s --- Fgis fetch result ', uuid, obj);
            return obj;
          })
          .then((obj) => {
            if (!o.noObjResp && !Object.keys(obj).length && !obj.code && !obj.status) {
              throw {
                result: obj,
                msg: `Не известная ошибка запроса. Предпологается пустой объект ( obj: ${JSON.stringify(
                  obj,
                )})`,
              };
            }
            return obj;
          })
          .catch((error) => {
            console.warn('--- %s --- Fgis fetch error ', uuid, error.result);
            var msg = error.msg;
            if (
              (repeat || (o.hasOwnProperty('repeat') && o.repeat)) &&
              maxRepeat >= this.repeatCount
            ) {
              var self = this;
              return new Promise(function (resolve, reject) {
                setTimeout(function () {
                  return self
                    .fetch(o, opt, repeat, true, uuid)
                    .then((resp) => resolve(resp))
                    .catch((error) => {
                      reject(error);
                    });
                }, 1000);
              });
            } else {
              return this.ownException(msg);
            }
          });
      });
    } catch (error) {
      console.error('Ошибка в конструкции fetch в Fgis', error);
      return this.ownException('Ошибка в конструкции fetch в Fgis', error);
    }
  }
}
