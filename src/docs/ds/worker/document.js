
function err(msg) {
  console.error(msg);
  throw msg;
}
class GeneratorFilesAdvance {
  constructor(document, document_name) {
    this.document = document;
    this.advance = document.advance;
    this.documentId = document.id;
    this.document_name = document_name;
    this.controller = this.advance.document[document_name];
  }
  getList() {
    console.log('getList :>> ');
    return this.controller.get_list.fetch({
      params: { id: this.documentId },
    })
  }
  getFile(fileAdvanceId) {
    console.log('getFile :>> ', fileAdvanceId);
    return this.controller.get_file.fetch({
      params: { id: this.documentId, fileId: fileAdvanceId },
    })
  }
  putFile(fileAdvanceObject, fileFgisResponce) {
    console.log('putFile :>> ', fileAdvanceObject, fileFgisResponce);
    const formData = [
      {
        name: 'fgis_file_id',
        value: fileFgisResponce.id,
      },
    ];
    return this.controller.put_file_info.fetch({
      body: formData,
      params: { id: this.documentId, fileId: fileAdvanceObject.file_id },
    }
    )
  }
  putFile2Fgis(fileAdvanceObject, fileAdvanceBlob) {
    console.log('putFile2Fgis :>> ', fileAdvanceObject, fileAdvanceBlob);
    var formData = new FormData();
    formData.append('file', new File([fileAdvanceBlob], fileAdvanceObject.file_name));
    const options = this.document.fgis.document.loadFile;
    if (this.document.settings.file_time_out) {
      options.timeOut = this.document.settings.file_time_out * 1000;
    }
    return this.document.fgis.fetch(options, { body: formData });
  }

  processFile(fileAdvanceObject) {
    console.log('processFile :>> ', fileAdvanceObject);
    return this.getFile(fileAdvanceObject.file_id)
      .then((fileAdvanceBlob) => this.putFile2Fgis(fileAdvanceObject, fileAdvanceBlob))
      .then((fileFgisResponce) => this.putFile(fileAdvanceObject, fileFgisResponce))
  }

  processFiles(fileAdvanceObjectList) {
    console.log('processFiles :>> ', fileAdvanceObjectList);
    if (fileAdvanceObjectList.length == 0) {
      console.log('Load files is end');
      return Promise.resolve();
    }
    return this.processFile(fileAdvanceObjectList[0]).then(() => {
      fileAdvanceObjectList = fileAdvanceObjectList.splice(1);
      return this.processFiles(fileAdvanceObjectList);
    });
  }

  process() {
    console.log('process :>> ', this);
    return this.getList()
      .then(fileAdvanceObjectList => {
        const loaded = fileAdvanceObjectList.filter((el) => {
          if (el.fgis_file_id != null && el.fgis_file_id != '') {
            return el;
          }
        });
        if (loaded.length == fileAdvanceObjectList.length) {
          console.log(`Все ${this.document_name} уже загружены во ФГИС.`);
          return Promise.resolve();
        }
        const validFileList = fileAdvanceObjectList.filter((el) => el.file_name && !el.fgis_file_id);
        return this.processFiles(validFileList);
      })
  }

}

class Document {
  constructor(id, advance, fgis, settings, advanceType, isSrd, fgisType) {
    this.id = id;
    this.advance = advance;
    this.fgis = fgis;
    this.settings = settings;
    this.assignRegNumber = settings.assignRegNumber;
    this.isRobotSignErrors = settings.isRobotSignErrors;
    this.isTest = settings.isTest;
    this.advanceType = advanceType;
    this.isSrd = isSrd;
    this.fgisType = fgisType;

    this.idDocumentKey = this._getIdDocumentKey(this.fgisType);

    //
    this.advanceObj = {};
    this.idApplication = '';
    this.agencyMode = false;
    //
    this.fgisId = '';
    this.afterInitObj = {};
    this.idDeclaration = '';

    this.idDocument = 0;

    this.annexeIds = '';
    this.submissionDate = '';
    this.number = '';
    this.idStatus = '';
    this.fileList = [];
    console.log('Document :>> ', this);
  }
  done(data = { done: true }) {
    console.log('Ds.prototype.done', data);
    if (this.documentFgisData) {
      data.documentFgisData = this.documentFgisData;
    }
    return data;
  }
  _getIdDocumentKey(fgisType) {
    switch (fgisType) {
      case 'rds':
      case 'srd':
        return 'idDeclaration';
      case 'rss':
        return 'idCertificate';
      default:
        err('Не определен _getIdDocumentKey: ' + fgisType);
    }
  }
  markAdvance(status, message = '') {
    // Не установлен - NotSet
    // Готово к выгрузке - ReadyToUpload
    // Выгружается - Uploading
    // Ошибка выгрузки - UploadError
    // Выгружено - Uploaded
    // Подписывается - Signing
    // Ошибка подписи - SignError
    // Подписано - Signed
    return this.advance.getCurrentUserId().then((user_id) => {
      let body = [
        { name: 'id', value: this.id },
        { name: 'user_id', value: user_id },
        { name: 'status', value: status },
        { name: 'message', value: message },
      ];
      return this.advance.fetch(this.advance.document.set_status, {
        body: body,
      });
    });
  }
  checkLast(want_number) {
    return this.advance.fetch(this.advance.document.last).then((fact_number) => {
      fact_number = fact_number.match(/[0-9]{5}/);
      fact_number = fact_number == null ? 0 : Number(fact_number[0]);
      want_number = want_number.match(/[0-9]{5}/);
      want_number = want_number == null ? 0 : Number(want_number[0]);
      if (fact_number && want_number) {
        if (want_number - fact_number != 1) {
          throw `Вы пытаетесь загрузить номер не идущий за последним выгруженным. Последний:${fact_number} / Ваш: ${want_number}`;
        }
      } else {
        throw `Не могу сравнить рег. номера ФГИС и адванса. Последний:${fact_number} / Ваш: ${want_number}`;
      }
      return;
    });
  }
  workFlow(root = false) {
    return this.advance
      .fetch(this.advance.document.get_state, { params: { id: this.id } })
      .then((state) => {
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
            console.log('Statement not ready to upload');
            break;
          case 'ReadyToUpload':
            console.log('Statement ready to upload');
            action = this.save().then(() => this.workFlow((root = true)));
            break;
          case 'Uploading':
            console.log('Statement in Uploading');
            break;
          case 'UploadError':
            console.log('Statement upload UploadError');
            if (!root) {
              action = this.save().then(() => this.workFlow((root = true)));
            }
            break;
          case 'Uploaded':
            console.log('Statement Uploaded done');
            action = this.sign().then(() => this.workFlow((root = false)));
            break;
          case 'Signing':
            console.log('Statement in Signing');
            break;
          case 'SignError':
            console.log('Statement Signing SignError');
            if (!root) {
              action = this.save().then(() => this.workFlow((root = true)));
            }
            break;
          case 'Signed':
            console.log('Statement Signed done');
            break;
          default:
            return this.done();
        }
        return action;
      });
  }
  checkSign(id) {
    return Promise.resolve().then(() => {
      return this.fgis.fetch(this.fgis.document.get, { params: { id: id } }).then((d) => {
        if (d.idStatus && d.idStatus == 13) {
          return this.initAdvance(d.idApplication, d.submissionDate, d.idStatus, d.number)
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              throw 'Документ уже подписан! (по статусу ФГИС)';
            });
        }
      });
    });
  }
  sign() {
    return this.markAdvance('Signing')
      .then(() =>
        this.advance.fetch(this.advance.document.show, {
          params: { id: this.id },
        }),
      )
      .then((d) => {
        if (!d[this.idDocumentKey]) {
          throw 'Документ не привязан к Адвансу.';
        }
        if (d.idStatus && d.idStatus == 13) {
          throw 'Документ уже подписан! (по статусу Адванс)';
        }
        return this.checkSign(d[this.idDocumentKey]).then(() => d[this.idDocumentKey]);
      })
      .then((id) => {
        this.documentFgisData = {
          idDeclaration: id,
          url: `${this.fgis.document_url}${id}`,
          open_url: `${this.fgis.pub_document_url}${id}`,
        };
        if (this.fgisType == 'rss') {
          return this.advance
            .fetch(this.advance.document.blanks, { params: { id: this.id } })
            .then((blanks) => {
              // blanks.accredPersonRegNumber = "RA.RU.11НВ27";
              return this.fgis.signFile([id], 'declarations', blanks);
            });
        } else {
          return this.fgis.signFile([id], 'declarations');
        }
      })
      .then(() => this.markAdvance('Signed'))
      .then(() => {
        return { done: true };
      })
      .catch((err) => {
        console.log('something wrong in statement sign', err);
        return this.markAdvance('SignError', err).then(() => {
          throw err;
        });
      });
  }
  initAdvance(
    idDeclaration = this.idDeclaration,
    submissionDate = this.submissionDate,
    idStatus = this.idStatus,
    number = this.number || '',
  ) {
    return this.advance.getCurrentUserId().then((user_id) => {
      this.user_id = user_id;

      let documentFgisData = {
        idDeclaration: idDeclaration,
        url: `${this.fgis.document_url}${idDeclaration}`,
        submissionDate: submissionDate,
        number: number,
        idStatus: idStatus,
        user_id: this.user_id,
      };
      if (this.fgisType == 'rss') {
        documentFgisData.annexes = this.annexeIds;
      }
      if (number) {
        documentFgisData.open_url = `${this.fgis.pub_document_url}${idDeclaration}`;
      }
      this.documentFgisData = documentFgisData;
      let body = Object.keys(documentFgisData).map((key) => {
        return { name: key, value: documentFgisData[key] };
      });
      return this.advance
        .fetch(this.advance.document.init, {
          body: body,
          params: { id: this.id },
        })
        .then((data) => {
          console.log(data);
        });
    });
  }
  checkSignStatement() {
    console.log('Document checkSignStatement');
    return this.showAdvance()
      .then((d) => {
        if (!d.idApplication) {
          throw 'Завление не загружено вовсе! Дальше продолжать нельзя.';
        }
        console.log('Document checkSignStatement middle', d, this.fgis);
        return this.fgis.fetch(this.fgis.statement.get, {
          params: { id: d.idApplication },
        });
      })
      .then((data) => {
        console.log(data);
        if (data.idStatus != 13) {
          throw 'Завление не подписано.';
        }
        return;
      });
  }
  getDocumentFilesAdvance() {
    console.log('Document getDocumentFilesAdvance');
    return this.advance.fetch(this.advance.document.get_document_files, {
      params: { id: this.id },
    });
  }


  getProtocolsAdvance() {
    console.log('Document getProtocolsAdvance');
    return this.advance.fetch(this.advance.document.get_protocols, {
      params: { id: this.id },
    });
  }
  getFileProtocolAdvance(fileId) {
    return this.advance.fetch(this.advance.document.get_file_protocol, {
      params: { id: this.id, fileId: fileId },
    });
  }
  loadFileItemFgis(file, is_document = false) {
    console.log('loadFileItemFgis', file);
    let file_blob;
    if (is_document) {
      file_blob = this.advance.fetch(this.advance.document.get_file_document, {
        params: {
          id: this.id,
          fileId: file.file_id,
        },
      });
    } else {
      file_blob = this.advance.fetch(this.advance.document.get_file_protocol, {
        params: {
          id: this.id,
          fileId: file.file_id,
        },
      });
    }
    return file_blob
      .then((body) => {
        console.log('body', body);
        // console.log(body)
        var formData = new FormData();
        var p = new File([body], file.file_name);
        formData.append('file', p);
        // var p = new File([body], file.file_name)
        // var formData = new FormData()
        let o = this.fgis.document.loadFile;
        if (this.settings.file_time_out) {
          o.timeOut = this.settings.file_time_out * 1000;
        }
        return this.fgis.fetch(o, { body: formData });
      })
      .then((d) => {
        if (is_document) {
          return this.putFileDocumentAdvance(d.id, file.file_id);
        } else {
          return this.putFileProtocolAdvance(d.id, file.file_id);
        }
      });
  }
  putFileDocumentAdvance(fgis_file_id, fileId) {
    let formData = [
      {
        name: 'fgis_file_id',
        value: fgis_file_id,
      },
    ];
    return this.advance.fetch(this.advance.document.put_file_document, {
      body: formData,
      params: { id: this.id, fileId: fileId },
    });
  }
  putFileProtocolAdvance(fgis_file_id, fileId) {
    let formData = [
      {
        name: 'fgis_file_id',
        value: fgis_file_id,
      },
    ];
    return this.advance.fetch(this.advance.document.put_file_protocol, {
      body: formData,
      params: { id: this.id, fileId: fileId },
    });
  }
  promiseLoadFiles(is_document = false) {
    if (this.fileList.length == 0) {
      console.log('Load files is end');
      return;
    }
    return this.loadFileItemFgis(this.fileList[0], is_document).then(() => {
      this.fileList = this.fileList.splice(1);
      return this.promiseLoadFiles(is_document);
    });
  }
  promiseLoadDocumentFiles() {
    if (this.fileList.length == 0) {
      console.log('Load files is end');
      return;
    }
    return this.loadFileItemFgis(this.fileList[0]).then(() => {
      this.fileList = this.fileList.splice(1);
      return this.promiseLoadFiles();
    });
  }
  loadDocumentFileFgis(fileList) {
    console.log(fileList);
    let no_name = fileList.filter((el) => {
      return el.file_name == null;
    });
    if (no_name.length > 0) {
      let names = no_name.map((el) => {
        return el.title;
      });
      throw `К записи ${names} не прикреплен файл`;
    }
    let loaded = fileList.filter((el) => {
      return el.fgis_file_id != null && el.fgis_file_id != '';
    });
    if (loaded.length == fileList.length) {
      console.log('Все файлы уже загружены во ФГИС.');
      return Promise.resolve();
    }
    this.fileList = fileList;
    return this.promiseLoadFiles(true);
  }
  loadFileFgis(fileList) {
    // console.log(fileList)
    // if (fileList.length == 0) { throw `У документа нет ни одного протокола. Не можем выгрузить` };
    // let no_name = fileList.filter(el => {
    //     return el.file_name == null
    // })

    // if (no_name.length > 0) {
    //     let names = no_name.map(el => {
    //         return el.title
    //     })
    //     throw `К протокам ${names} не прикреплен файл: `
    // }

    let loaded = fileList.filter((el) => {
      if (el.fgis_file_id != null && el.fgis_file_id != '') {
        return el;
      }
    });
    if (loaded.length == fileList.length) {
      console.log('Все протоколы уже загружены во ФГИС.');
      return Promise.resolve();
    }
    this.fileList = fileList.filter((el) => el.file_name);
    return this.promiseLoadFiles();
  }

  add_revocation_data(data, type) {
    var vals = {};
    // 1 = Тех
    // 2 = Заявитель
    if (type == 1) {
      vals = {
        idStatus: 14,
        beginDate: new Date(),
        comment: 'В связи с технической ошибкой',
        idBasis: 1,
        publicated: false,
        docDate: new Date(),
        docName: this.settings.revoke_teh_document,
        docNumber: this.settings.revoke_teh_document_number,
      };
    } else if (type == 2) {
      vals = {
        idStatus: 14,
        beginDate: new Date(),
        comment: 'По решению заявителя',
        idBasis: 8,
        publicated: false,
        docDate: new Date(),
        docName: this.settings.revoke_applicant_document,
        docNumber: this.settings.revoke_applicant_document_number,
      };
    }
    var search_result = data.statusChanges.filter(
      (item) => item.idStatus == 14 && item.publicated == false,
    );
    if (!search_result.length) {
      data.statusChanges.push(vals);
      return true;
    }
    return false;
  }
  revoke(type) {
    return this.markAdvance('Uploading')
      .then(() => this.showAdvance())
      .then((document_data) =>
        this.fgis.fetch(this.fgis.document.get, {
          params: { id: document_data[this.idDocumentKey] },
        }),
      )
      .then((fgis_data) => {
        this.add_revocation_data(fgis_data, type);
        return this.updateDocumentInFgis(fgis_data);
      })
      .then(() => this.markAdvance('Uploaded'))
      .then(() => this.done())
      .catch((err) => {
        console.log('something wrong in document save', err);
        this.markAdvance('UploadError', err);
        throw err;
      });
  }
  save() {
    console.log('Ds.Document.save', this.id);
    var regNumber = null;
    return (
      this.markAdvance('Uploading')
        // .then(() => !this.isSrd?this.checkSignStatement():true)
        // FOR TEST
        .then(() => this.getProtocolsAdvance())
        .then((data) => this.loadFileFgis(data))
        .then(() => this.getDocumentFilesAdvance())
        .then((data) => this.loadDocumentFileFgis(data))
        .then(() => {
          if (this.fgisType == 'rss') {
            return Promise.resolve()
              .then(() => new GeneratorFilesAdvance(this, 'product_doc').process())
              .then(() => new GeneratorFilesAdvance(this, 'other_doc').process())
              .then(() => new GeneratorFilesAdvance(this, 'conclusion_doc').process())
              .then(() => new GeneratorFilesAdvance(this, 'sampling_doc').process())
              .then(() => new GeneratorFilesAdvance(this, 'qms_doc').process())
              .then(() => new GeneratorFilesAdvance(this, 'act_doc').process())
              .then(() => new GeneratorFilesAdvance(this, 'cert_doc').process())
              .then(() => new GeneratorFilesAdvance(this, 'transport_doc').process())
              .then(() => new GeneratorFilesAdvance(this, 'cert_type_doc').process())
              .then(() => new GeneratorFilesAdvance(this, 'project_doc').process())
              .then(() => new GeneratorFilesAdvance(this, 'un_rules_doc').process())
              .then(() => new GeneratorFilesAdvance(this, 'concl_expert_doc').process())
              .then(() => new GeneratorFilesAdvance(this, 'test_protocol_doc').process())
              .then(() => new GeneratorFilesAdvance(this, 'contract_doc').process())
              .then(() => new GeneratorFilesAdvance(this, 'decision_doc').process())
              .then(() => new GeneratorFilesAdvance(this, 'cert_other_doc').process())
          } else {
            return Promise.resolve()
          }
        })
        .then(() => this.showAdvance())
        .then((data) => this.saveDocumentToFgis(data))
        .then(() => this.initAdvance())
        .then(() => this.markAdvance('Uploaded'))
        .then(() => this.done())
        .catch((err) => {
          console.log('something wrong in document save', err);
          this.markAdvance('UploadError', err);
          throw err;
        })
    );
  }
  showAdvance() {
    console.log('showAdvance Document Start', this.id);
    return this.advance.fetch(this.advance.document.show, {
      params: { id: this.id },
    });
  }
  getExperts(id) {
    return this.advance.fetch(this.advance.data.experts).then((d) => {
      let res = d.find((el) => el.id == id);
      if (!res) {
        throw 'Эксперт не найден в справочник';
      }
      return res;
    });
  }
  saveDocumentAsRegToFgis(rootData) {
    console.log(rootData);
    console.log('saveDocumentAsRegToFgis');
    rootData.assignRegNumber = true;
    return Promise.resolve().then(() => {
      let action;
      if (rootData[this.idDocumentKey]) {
        console.log('Update record in fgis');
        action = this.fgis
          .fetch(this.fgis.document.post, {
            body: rootData,
            params: { id: rootData[this.idDocumentKey] },
          })
          .then(() => {
            return this.fgis
              .fetch(this.fgis.document.get, {
                params: { id: rootData[this.idDocumentKey] },
              })
              .then((d) => {
                this.idDeclaration = d[this.idDocumentKey];
                this.submissionDate = d.submissionDate;
                this.idStatus = d.idStatus;
                this.number = d.number;
                this.findRssAnnexeIds(d);
              });
          });
      }
      return action;
    });
  }
  findRssAnnexeIds(d) {
    console.log('findRssAnnexeIds');
  }
  updateDocumentInFgis(data) {
    return Promise.resolve().then(() => {
      let action = this.fgis.fetch(this.fgis.document.post, {
        body: data,
        params: {
          id: data[this.idDocumentKey],
        },
      });
      return action;
    });
  }
  middleUpdaterFgis(data) {
    // Метод приведения объекта полученного из адванса, к нужному виду
    console.log('start middleUpdaterFgis :>> ', data);
    let localData = Object.assign({}, data);

    localData.testingLabs.forEach((element) => {
      var res = [];
      element.customInfo.forEach((el) => {
        el.customDeclNumber = el.customDeclNumber.replace('.', ',');
        el.customDeclNumber = el.customDeclNumber.replace(';', ',');
        var o = el.customDeclNumber.replace(' ', '').split(',');
        o.forEach((op) => {
          res.push({
            amount: el.amount,
            contractNumber: el.contractNumber,
            contractDate: el.contractDate,
            customDeclNumber: op,
          });
        });
        element.customInfo = res;
      });
    });

    if (this.fgis.pub_document_type == 'rds') {
      localData.testingLabs.forEach((lab) => {
        lab.protocols.forEach((prot) => {
          var exist = localData.scanCopy.find((el) => {
            return el.name == prot.number;
          });
          if (!exist) {
            localData.scanCopy.push({
              name: prot.number,
              idFile: prot.idFile,
              idType: 4,
            });
          }
        });
      });
    }

    localData.manufacturer.addresses.forEach((element) => {
      element.foreignDistrict = null;
    });

    localData.manufacturerFilials.forEach((element) => {
      element.addresses.forEach((addr) => {
        addr.foreignDistrict = null;
      });
    });
    
    // function updateFirst2Second(base, second) {
    //   return Object.assign(
    //     base,
    //     { "applicant": second.applicant},
    //     { "documents": second.documents},
    //     { "certificationAuthority": second.certificationAuthority},
    //     { "employee": second.employee},
    //     { "experts": second.experts},
    //     { "idTechnicalReglaments": second.idTechnicalReglaments},
    //     { "manufacturer": second.manufacturer},
    //     { "manufacturerFilials": second.manufacturerFilials},
    //     { "product": second.product},
    //     { "productGroups": second.productGroups},
    //     { "scanCopy": second.scanCopy},
    //     { "testingLabs": second.testingLabs},
    //   )
    // }
    // return this.testEtalon();
    // return updateFirst2Second(this.testEtalon(), localData);
    // var res = updateFirst2Second(localData, this.testEtalon())
    // res.certRegDate = "2022-04-10T14:48:08.239Z";
    // res.firstName = null;
    // res.functions = null;
    // res.idEmployee = null;
    // res.patronymic = null;
    // res.snils = null;
    // res.surname = null;
    // res.manufIsApplicant = false;
    // res.idCertScheme = 3;
    // return res
    return localData;
  }
  //
  updateSelfDocumentValues(fgisResult) {
    this.idDeclaration = fgisResult[this.idDocumentKey] || this.idDeclaration;
    this.submissionDate = fgisResult.submissionDate || this.submissionDate;
    this.idStatus = fgisResult.idStatus || this.idStatus;
    this.number = fgisResult.number || this.number;

    if (this.fgisType == 'rss') {
      let res = '';
      fgisResult.annexes.forEach((annex) => {
        res += `${annex.idType}-${annex.idAnnex};`;
      });
      this.annexeIds = res;
      console.log('findRssAnnexeIds,', res);
    }

    return fgisResult;
  }
  saveDocumentToFgis(rootData) {
    var rootData = this.middleUpdaterFgis(rootData);
    console.log('Document saveDocumentToFgis', rootData);

    this.agencyMode = rootData.agencyMode;
    delete rootData.agencyMode;
    if (this.agencyMode && this.assignRegNumber) {
      rootData.assignRegNumber = true;
    }

    var action = Promise.resolve()
      .then(() => {
        if (rootData[this.idDocumentKey]) {
          console.log('Update record in fgis');
          return this.fgis
            .fetch(this.fgis.document.post, {
              body: rootData,
              params: { id: rootData[this.idDocumentKey] },
            })
            .then(() => rootData[this.idDocumentKey]);
        } else {
          return this.fgis
            .fetch(this.fgis.document.init, { body: rootData })
            .then((resp) => resp.id);
        }
      })
      .then((idDocument) => {
        this.idDeclaration = idDocument;
        if (!this.agencyMode && !rootData[this.idDocumentKey]) {
          return this.initAdvance();
        }
        return idDocument;
      })
      .then(() => {
        if (!this.agencyMode) {
          return this.fgis
            .fetch(this.fgis.document.get, { params: { id: this.idDeclaration } })
            .then((fgisResult) => {
              rootData.idDeclaration = fgisResult[this.idDocumentKey];
              rootData.idCertificate = fgisResult[this.idDocumentKey];
              rootData.submissionDate = fgisResult.submissionDate;
              rootData.idStatus = fgisResult.idStatus;
              rootData.number = fgisResult.number;
              this.updateSelfDocumentValues(fgisResult);
              if (this.assignRegNumber) {
                return this.saveDocumentAsRegToFgis(rootData);
              }
            });
        }
      });

    // .then(() => {
    //   console.log('this.assignRegNumber', this.assignRegNumber);
    //   if (this.assignRegNumber) {
    //     if (!isNotFirstSave) {
    //       console.log('INIT isNotFirstSave');
    //       return this.initAdvance();
    //     }
    //   }
    // })
    // .then(() => {
    //   console.log('this.assignRegNumber 2', this.assignRegNumber);
    //   if (this.assignRegNumber) {
    //     console.log('Try geristrate document. befor lets init this', rootData);
    //     rootData.assignRegNumber = true;
    //     return this.saveDocumentAsRegToFgis(rootData);
    //   }
    // });

    return action;
  }
  testEtalon() {
    var body = {
      "annexes": [],
      "applicant": {
        "addlRegInfo": "",
        "addresses": [
          {
            "flat": null,
            "foreignCity": null,
            "foreignDistrict": null,
            "foreignHouse": null,
            "foreignLocality": null,
            "foreignStreet": null,
            "fullAddress": "127055, РОССИЯ, ГОРОД МОСКВА, УЛИЦА НОВОСЛОБОДСКАЯ, ДОМ 36/1, СТР 1, ПОМ I КОМН 21",
            "gln": null,
            "glonass": null,
            "idAddress": null,
            "idAddrType": 1,
            "idCity": null,
            "idCodeOksm": "643",
            "idDistrict": null,
            "idHouse": null,
            "idLocality": null,
            "idStreet": null,
            "idSubject": null,
            "oksmShort": true,
            "otherGln": null,
            "postCode": null,
            "uniqueAddress": null
          }
        ],
        "contacts": [],
        "firstName": "АНАСТАСИЯ",
        "fullName": "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"АРТЭКС\"",
        "headPosition": "ГЕНЕРАЛЬНЫЙ ДИРЕКТОР",
        "idApplicantType": 1,
        "idEgrul": null,
        "idLegalForm": 9,
        "idLegalSubject": null,
        "idLegalSubjectType": 1,
        "idPerson": null,
        "inn": "7707388278",
        "isEecRegister": true,
        "kpp": "770701001",
        "manufIsApplicant": false,
        "ogrn": "1177746689757",
        "ogrnAssignDate": "2017-07-12T00:00:00.000Z",
        "passportIssueDate": null,
        "passportIssuedBy": null,
        "passportNum": null,
        "patronymic": "АНДРЕЕВНА",
        "regDate": "2017-07-12T00:00:00.000Z",
        "regOrganName": "Межрайонная инспекция Федеральной налоговой службы № 46 по г. Москве",
        "shortName": "ООО \"АРТЭКС\"",
        "snils": "",
        "surname": "ВАСИЛЬКОВА",
        "transnational": null
      },
      "applicantFilials": [],
      "applicationDate": "2022-04-08T00:00:00.000Z",
      "applicationNumber": "261018/1/C..",
      "applicationSendDate": "2022-04-03T00:00:00.000Z",
      "applicationStatus": null,
      "assignRegNumber": false,
      "awaitForApprove": true,
      "awaitOperatorCheck": null,
      "batchInspection": null,
      "blankNumber": null,
      "certEndDate": null,
      "certificationAuthority": {
        "accredOrgName": "Межрайонная инспекция Федеральной налоговой службы № 12 по Тверской области",
        "addresses": [
          {
            "flat": null,
            "fullAddress": "170100, РОССИЯ, ОБЛ. ТВЕРСКАЯ, Г. Тверь, УЛ. ВОЛЬНОГО НОВГОРОДА, Д. 21, ПОМЕЩ. 8-9",
            "gln": null,
            "idAddress": null,
            "idAddrType": 1,
            "idCity": null,
            "idCodeOksm": null,
            "idDistrict": null,
            "idHouse": null,
            "idLocality": null,
            "idStreet": null,
            "idSubject": null,
            "oksmShort": true,
            "postCode": null
          },
          {
            "flat": null,
            "fullAddress": "170100, РОССИЯ, Тверская обл, г Тверь, ул Вольного Новгорода, дом 21, Помещение 8-9",
            "gln": null,
            "idAddress": null,
            "idAddrType": 3,
            "idCity": "c52ea942-555e-45c6-9751-58897717b02f",
            "idCodeOksm": "643",
            "idDistrict": null,
            "idHouse": "d2d7b72f-aaac-4529-a78b-f650723add48",
            "idLocality": null,
            "idStreet": "bae8f562-e58d-4e2d-aa76-236d6f7f12a0",
            "idSubject": "61723327-1c20-42fe-8dfa-402638d9b396",
            "oksmShort": true,
            "postCode": "170100"
          }
        ],
        "attestatEndDate": null,
        "attestatRegDate": "2016-10-26T00:00:00.000Z",
        "attestatRegNumber": "RA.RU.11АЖ06",
        "contacts": [
          {
            "idContact": null,
            "idContactType": 1,
            "value": "+74822415522"
          },
          {
            "idContact": null,
            "idContactType": 4,
            "value": "all@greenline-os.ru"
          },
          {
            "idContact": null,
            "idContactType": 5,
            "value": "http://greenline-os.ru/"
          }
        ],
        "firstName": "Андрей",
        "fullName": "Орган по сертификации Общества с ограниченной ответственностью \"ГринЛайн\"",
        "headContacts": [],
        "headPosition": "Руководитель ОС",
        "idCertificationAuthority": null,
        "idPesron": 612842,
        "idRal": 401,
        "ogrn": "1156952024745",
        "patronymic": "Алексеевич",
        "prevAttestatRegNumber": null,
        "prevIdRal": null,
        "surname": "Сорокин"
      },
      "certIssueDecisionDate": null,
      "certRegDate": "2022-04-10T14:48:08.239Z",
      "changes": null,
      "deadlineViolation": false,
      "documents": {
        "applicantOtherDocuments": [],
        "applicationCertificationDecision": {
          "date": null,
          "id": null,
          "number": null
        },
        "commonDocuments": {
          "8": []
        },
        "conformityAssessmentDocuments": [],
        "expertConclusion": {
          "accreditedPersonName": null,
          "annex": null,
          "attestateBeginDate": null,
          "attestateEndDate": null,
          "attestateRegNumber": null,
          "date": null,
          "idFile": null,
          "name": null,
          "number": null
        },
        "foreignManufacturerContract": {
          "applicantResponsibility": null,
          "date": null,
          "endDate": null,
          "id": null,
          "manufacturerResponsibility": null,
          "number": null,
          "subject": null
        },
        "manufacturingConditionAnalysisAct": {
          "addresses": [],
          "analysisBeginDate": null,
          "analysisEndDate": null,
          "analysisTakenDate": null,
          "annex": null,
          "certExperts": [],
          "date": null,
          "id": null,
          "idFile": null,
          "number": null
        },
        "productCertificationContract": {
          "date": null,
          "id": null,
          "idFile": null,
          "number": null
        },
        "productDesignResearchConclusion": {
          "annex": null,
          "attestatEndDate": null,
          "id": null,
          "issueDate": null,
          "number": null
        },
        "productTypeCertificates": [
          {
            "annex": null,
            "attestatEndDate": null,
            "id": null,
            "idPtCertificate": null,
            "idTechnicalReglament": 8,
            "issueDate": null,
            "number": null,
            "sampleProduct": {
              "article": null,
              "fullName": null,
              "mark": null,
              "model": null,
              "sort": null,
              "type": null
            }
          }
        ],
        "productTypeResearchConclusion": {
          "annex": null,
          "attestatEndDate": null,
          "id": null,
          "issueDate": null,
          "number": null,
          "sampleProduct": {
            "article": null,
            "fullName": null,
            "mark": null,
            "model": null,
            "sort": null,
            "type": null
          }
        },
        "protocolTestingTechnicalService": {
          "annex": null,
          "date": null,
          "idFile": null,
          "name": null,
          "number": null,
          "techServiceName": null
        },
        "qmsCertificates": [
          {
            "accredEec": true,
            "accreditedPersonName": null,
            "annex": null,
            "attestatEndDate": null,
            "attestatRegDate": null,
            "attestatRegNumber": null,
            "endDate": null,
            "id": null,
            "idAccredPlace": "643",
            "idTechnicalReglament": 8,
            "idType": null,
            "idTypeActivity": null,
            "issueDate": null,
            "number": null,
            "qmsCertificationDocuments": [],
            "regNumberSelect": null
          }
        ],
        "rawMaterialCertificates": [],
        "reportsOnTypeApprovalUnderUNRegulation": [
          {
            "annex": null,
            "country": "643",
            "date": null,
            "idFile": null,
            "idTechnicalReglament": 8,
            "name": null,
            "number": null,
            "orgName": null
          }
        ],
        "samplingAct": {
          "date": null,
          "id": null,
          "idFile": null,
          "number": null
        },
        "vehicleChassisTypeApprovals": []
      },
      "draftCreationDate": null,
      "editApp": false,
      "employee": null,
      "experts": [],
      "expiredInspectionControl": false,
      "firstName": null,
      "functions": null,
      "idApplication": 3073128,
      "idApplicationStatus": null,
      "idBlank": null,
      "idCertificate": null,
      "idCertScheme": 3,
      "idCertType": 1,
      "idEmployee": null,
      "idObjectCertType": 2,
      "idProductSingleLists": [],
      "idSigner": null,
      "idStatus": 20,
      "idTechnicalReglaments": [
        8
      ],
      "inspectionControlPlanDate": null,
      "inspectionControls": [],
      "manufacturer": {
        "addlRegInfo": "",
        "addresses": [
          {
            "flat": null,
            "foreignCity": null,
            "foreignDistrict": "Kupferschmidstrasse 84 D 79761 Waldshut-Tiengen",
            "foreignHouse": null,
            "foreignLocality": null,
            "foreignStreet": null,
            "fullAddress": "ГЕРМАНИЯ, Kupferschmidstrasse 84 D 79761 Waldshut-Tiengen",
            "gln": null,
            "glonass": null,
            "idAddress": null,
            "idAddrType": 1,
            "idCity": null,
            "idCodeOksm": "276",
            "idDistrict": null,
            "idHouse": null,
            "idLocality": null,
            "idStreet": null,
            "idSubject": null,
            "oksmShort": true,
            "otherGln": null,
            "postCode": null,
            "uniqueAddress": null
          }
        ],
        "contacts": [],
        "firstName": "",
        "fullName": "«Ragman Textilhandel GmbH»",
        "headPosition": "",
        "idApplicantType": null,
        "idEgrul": null,
        "idLegalForm": null,
        "idLegalSubject": null,
        "idLegalSubjectType": 3,
        "idPerson": null,
        "inn": "",
        "isEecRegister": true,
        "kpp": "",
        "ogrn": "",
        "ogrnAssignDate": null,
        "passportIssueDate": null,
        "passportIssuedBy": null,
        "passportNum": null,
        "patronymic": "",
        "regDate": null,
        "regOrganName": "",
        "shortName": "",
        "snils": "",
        "surname": "",
        "transnational": []
      },
      "manufacturerFilials": [
        {
          "addresses": [
            {
              "flat": null,
              "foreignCity": null,
              "foreignDistrict": "Kupferschmidstrasse 84 D 79761 Waldshut-Tiengen",
              "foreignHouse": null,
              "foreignLocality": null,
              "foreignStreet": null,
              "fullAddress": "ГЕРМАНИЯ, Kupferschmidstrasse 84 D 79761 Waldshut-Tiengen",
              "gln": null,
              "glonass": null,
              "idAddress": null,
              "idAddrType": 3,
              "idCity": null,
              "idCodeOksm": "276",
              "idDistrict": null,
              "idHouse": null,
              "idLocality": null,
              "idStreet": null,
              "idSubject": null,
              "oksmShort": true,
              "otherGln": null,
              "postCode": null,
              "uniqueAddress": null
            }
          ],
          "annex": false,
          "contacts": [],
          "fullName": null,
          "idFilial": null,
          "idLegalForm": null,
          "kpp": null,
          "shortName": null
        }
      ],
      "manufIsApplicant": false,
      "noSanction": true,
      "number": null,
      "patronymic": null,
      "product": null,
      "productGroups": [
        {
          "idGroup": 1826,
          "idProductGroup": null,
          "idTechReg": 8
        }
      ],
      "publishDate": null,
      "scanCopy": [
        {
          "idFile": "42651d67-ac73-4555-8338-002cb979b6ec",
          "idType": 1,
          "name": "Завление"
        }
      ],
      "snils": null,
      "statusChanges": [],
      "surname": null,
      "tempNumber": null,
      "testingLabs": []
    }
    return body;

  }
}

console.log('Document ds class init!');
