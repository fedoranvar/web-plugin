
class Endpoint {
  constructor(advance, method, url, params, returnType, description) {
    this.advance = advance;
    this.method = method;
    this.url = url;
    this.params = params;
    this.returnType = returnType;
    this.description = description;
  }
  fetch(...args) {
    return this.advance.fetch(this, ...args);
  }
}
class Advance {
  constructor(settings, domain, advance_type) {
    try {
      this.agency_code = settings.agency_code;
      this.agency_keyword = settings.agency_keyword;
      this.document_token = settings.document_token || null;
      this.apiVersion = this.document_token ? 3 : 2;
      this.domain = domain;

      this.Endpoint = ({ method, url, params, returnType, description }) => new Endpoint(this, method, url, params, returnType, description);
      this.advance_type = advance_type;

      this.repeatCount = 0;
      this.currentUserId = 0;
      this.maxRepeat = 5;
      this.miss_throw = false;
      this.data = {
        agencyData: { method: 'GET', url: `/api/v${this.apiVersion}/fgis/agency/data` },
        experts: { method: 'GET', url: `/api/v${this.apiVersion}/fgis/agency/experts` },
        getCurrentUserId: { method: 'GET', url: '/Account/GetCurrentUserId', noKeys: true },
      };

      this.statement = {
        queue: {
          method: 'GET',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/statement/queue`,
        },
        show: {
          method: 'GET',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/statement/show/{id}`,
          params: ['id'],
        },
        init: {
          method: 'PUT',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/statement/init/{id}`,
          params: ['id'],
          description: 'user_id',
        },
        get_url: {
          method: 'GET',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/statement/url/{id}`,
          params: ['id'],
        },
        set_url: {
          method: 'PUT',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/statement/set_url`,
        },
        get_state: {
          method: 'GET',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/statement/status/{id}`,
          params: ['id'],
        },
        set_status: {
          method: 'PUT',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/statement/set_status`,
          description: `id - идентификато документа
                                  user_id - идентификатор пользователя
                                  status - статус репликации
                                  Коды статусов репликации:
                                  Не установлен - NotSet
                                  Готово к выгрузке - ReadyToUpload
                                  Выгружается - Uploading
                                  Ошибка выгрузки - UploadError
                                  Выгружено - Uploaded
                                  Подписывается - Signing
                                  Ошибка подписи - SignError
                                  Подписано - Signed`,
        },
      };
      this.document = {
        show: {
          method: 'GET',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/show/{id}`,
          params: ['id'],
        },
        download_archive: {
          method: 'GET',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/download/{id}`,
          params: ['id'],
        },
        get_protocols: {
          method: 'GET',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/protocols`,
          params: ['id'],
        },
        get_file_protocol: {
          method: 'GET',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/protocols/files/{fileId}`,
          params: ['id', 'fileId'],
          returnType: 'blob',
        },
        put_file_protocol: {
          method: 'PUT',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/protocols/files/{fileId}/set_id`,
          params: ['id', 'fileId'],
          description:
            'fgis_file_id - идентификатор загруженного файла протокола во ФГИС сохраняет идентификатор ФГИС файла протокола',
        },
        get_document_files: {
          method: 'GET',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/applicant/files`,
          params: ['id'],
        },
        get_file_document: {
          method: 'GET',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/applicant/file/{fileId}`,
          params: ['id', 'fileId'],
          returnType: 'blob',
        },
        put_file_document: {
          method: 'PUT',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/applicant/file/{fileId}/set_id`,
          params: ['id', 'fileId'],
          description:
            'fgis_file_id - идентификатор загруженного файла протокола во ФГИС сохраняет идентификатор ФГИС файла протокола',
        },
        init: {
          method: 'PUT',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/init/{id}`,
          params: ['id'],
        },
        get_state: {
          method: 'GET',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/status/{id}`,
          params: ['id'],
        },
        set_status: {
          method: 'PUT',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/set_status`,
          description: `id - идентификато документа
                                    user_id - идентификатор пользователя
                                    status - статус репликации
                                    Коды статусов репликации:
                                    Не установлен - NotSet
                                    Готово к выгрузке - ReadyToUpload
                                    Выгружается - Uploading
                                    Ошибка выгрузки - UploadError
                                    Выгружено - Uploaded
                                    Подписывается - Signing
                                    Ошибка подписи - SignError
                                    Подписано - Signed`,
        },
        last: {
          method: 'GET',
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/last`,
        },
        blanks: {
          method: 'GET',
          url: `/api/v${this.apiVersion}/fgis/STREA/document/blanks/{id}`,
          params: ['id'],
        },
      };

      [
        "product_doc",
        "other_doc",
        "conclusion_doc",
        "sampling_doc",
        "qms_doc",
        "act_doc",
        "cert_doc",
        "transport_doc",
        "cert_type_doc",
        "project_doc",
        "un_rules_doc",
        "concl_expert_doc",
        "test_protocol_doc",
        "contract_doc",
        "decision_doc",
        "cert_other_doc",
      ].forEach(endpoint => {
        this.document[endpoint] = this.generate_files_endpoints(endpoint);
      });

      console.log('Advance :>> ', this);
    } catch (error) {
      console.log('Advance err :>> ', error);
    }
  }
  generate_files_endpoints(document_name) {
    return {
      get_list: this.Endpoint({
        method: 'GET',
        url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/${document_name}/files`,
        params: ['id'],
      }),
      get_file: this.Endpoint({
        method: 'GET',
        url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/${document_name}/file/{fileId}`,
        params: ['id', 'fileId'],
        returnType: 'blob',
      }),
      put_file_info: this.Endpoint({
        method: 'PUT',
        url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/${document_name}/file/{fileId}/set_id`,
        params: ['id', 'fileId'],
        description: 'fgis_file_id - идентификатор загруженного файла протокола во ФГИС сохраняет идентификатор ФГИС файла протокола',
      }),
    }
  }
  async getCurrentUserId() {
    console.log('currentUserId', this.currentUserId);
    if (!this.currentUserId) {
      let d = await this.fetch(this.data.getCurrentUserId);
      if (d) {
        this.currentUserId = d;
      }
      return d;
    } else {
      return this.currentUserId;
    }
  }
  ownException(msg) {
    let firstRow = 'Ошибка в адвансе!\r\n';
    msg += firstRow;
    console.log(msg);
    throw msg;
  }
  async fetch_with_timeout(url, params, timeOut = 30000) {
    console.log('Start fetch_with_timeout. TimeOut:', timeOut);
    var controller = new AbortController();
    var signal = controller.signal;
    var p1 = new Promise(function (resolve, reject) {
      setTimeout(() => {
        controller.abort();
        reject('Out timeout end');
      }, timeOut);
    });
    var p2 = new Promise(function (resolve, reject) {
      fetch(url, params)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
    return Promise.race([p1, p2]);
  }
  fetch(o, opt = { body: null, params: {} }, repeat = true, isrepeat = false) {
    if (isrepeat == false) {
      this.repeatCount = 1;
    } else {
      this.repeatCount++;
    }
    try {
      if (!this.document_token && !this.agency_code) {
        throw 'Не указан ключ agency_code';
      }
      if (!this.document_token && !this.agency_keyword) {
        throw 'Не указан ключ agency_keyword';
      }
      let objUrl = o.url;
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
      let url = new URL(objUrl, this.domain);
      let body = new FormData();
      let params = {
        method: o.method,
        credentials: 'include',
      };
      if (opt.body) {
        if (!Array.isArray(opt.body)) {
          return this.ownException('Body должен быть array!');
        }
        opt.body.forEach((element) => {
          body.set(element.name, element.value);
        });
      }
      switch (o.method) {
        case 'GET':
          if (this.document_token) {
            url.searchParams.set('document_token', this.document_token);
          } else {
            url.searchParams.set('agency_code', this.agency_code);
            url.searchParams.set('agency_keyword', this.agency_keyword);
          }
          break;
        case 'PUT':
          if (this.document_token) {
            body.set('document_token', this.document_token);
          } else {
            body.set('agency_code', this.agency_code);
            body.set('agency_keyword', this.agency_keyword);
          }
          params.body = body;
          break;
        case 'POST':
          if (this.document_token) {
            body.set('document_token', this.document_token);
          } else {
            body.set('agency_code', this.agency_code);
            body.set('agency_keyword', this.agency_keyword);
          }
          params.body = body;
          break;
      }
      console.log('Fgis fetch', url.href, o.noObjResp);
      let f = o.hasOwnProperty('timeOut')
        ? this.fetch_with_timeout(url.href, params, o.timeOut)
        : fetch(url.href, params);
      return f
        .then((response) => {
          if (response.status != 200) {
            throw 'Cервер не отвечает' + response;
          }
          if (
            o.returnType &&
            o.returnType == 'blob' &&
            response.headers.get('Content-Type') == 'text/html'
          ) {
            return response.blob();
          }
          return response.json().then((obj) => {
            console.log(obj);
            if (o == this.data.getCurrentUserId) {
              return obj;
            }
            if (obj.status == 'error') {
              this.miss_throw = true;
              throw 'Статус error.\r\n' + obj.message;
            }
            if (obj.status != 'success') {
              throw 'Неизвестный статус!.\r\n' + obj.message;
            }
            return obj.data;
          });
        })
        .catch((error) => {
          let maxRepeat = o.hasOwnProperty('maxRepeat') ? o.maxRepeat : this.maxRepeat;
          if (repeat && this.maxRepeat >= this.repeatCount && !this.miss_throw) {
            console.log('It was repeat', this.repeatCount, '/', maxRepeat);
            let self = this;
            return new Promise(function (resolve, reject) {
              setTimeout(function () {
                self
                  .fetch(o, opt, repeat, true)
                  .then((resp) => resolve(resp))
                  .catch((error) => {
                    reject(error);
                  });
              }, 1000);
            });
          } else {
            return this.ownException(error);
          }
        });
    } catch (error) {
      console.log('Ошибка в конструкции fetch в Advance', error);
      return this.ownException('Ошибка в конструкции fetch в Advance', error);
    }
  }
}

export {
  Advance,
  Endpoint
}
