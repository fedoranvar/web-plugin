try {
  console.log("content esep init")

  var myPort = browser.runtime.connect({ name: "port-from-cs" });
  // myPort.postMessage({greeting: "hello from content script"});
  
  myPort.onMessage.addListener(function(responce) {
    console.log("In content script, received message from background script: ", responce);
    if (responce.command == "start") {
      return checkReady2(responce.operationId, responce.currentCertificate, responce.pinCode)
    }
    //   console.log(m.greeting);
  });
  function checkReady2(operationId, currentCertificate, pinCode) {
    console.log("checkReady2")
    if (document.querySelectorAll("#document-list li").length > 0) {
      console.log("Try sign")
      window.operationId = operationId
      return start(getfileAccessCodes(), currentCertificate, pinCode)
    } else {
      setTimeout(() => {
        return checkReady2()
      }, 1000);
    }
  }
  function getfileAccessCodes() {
    var list = document.querySelectorAll("#document-list li");
    var fileAccessCodes = []
    for (var cnt = 0, m = list.length; cnt < m; cnt++) {
      if (list[cnt].id) {
        fileAccessCodes.push(list[cnt].id)
      }
    }
    console.log("fileAccessCodes", fileAccessCodes)
    return fileAccessCodes
  }
  function isNull(objectToCheck) {
    return typeof (objectToCheck) == 'undefined' || objectToCheck == null;
  }
  var hashTypesAvailable = [1, 2, 3]

  function start(fileAccessCodes, currentCertificate, pinCode) {
    console.log("start", fileAccessCodes, currentCertificate, pinCode)
    console.log(EsepCrypto)
    // let fileAccessCodes = []
    let headers = new Headers()
    headers.set("Content-Type", 'application/json; charset=utf-8')

    console.log('DEBUG: I want to sign')
    return fetch('http://esep.fsa.gov.ru/Esep-WebApp/sign/GetFileHashBatch', {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ fileAccessCodes: fileAccessCodes, hashType: currentCertificate.Algorithm }),
      headers: headers
    }).then(response => {
      console.log(response)
      return response.json()
    }).then(response => {
      if (response.wasSuccessful) {
        var signatures = [];
        // batchPin = null;
        // wasSuccessful	true
        // errorMessage	
        // hashes	[…]
        // 0	{…}
        // Key	eaa5c9c4-46b2-402f-b164-d543a262961a
        // Value	LDbgw21z3xLj3BCMMbj0sE5n4gKwWTY5B4byk2CtQBw=
        var success = true;
        var index = 0;
        var accessCode;
        var iterateResult = function() {
          var item = response.hashes[index];
          if (!isNull(item)) {
            accessCode = item.Key;
            var iterateCallback = function(result) {
              if (result.IsError) {
                success = false;
              } else {
                signatures.push({ fileAccessCode: accessCode, signature: result.ResponseObject });
                index++;
                iterateResult();
              }
            }
            setTimeout(function() {
              console.log('DEBUG: start signing')
              signData(item.Value, currentCertificate, pinCode, iterateCallback);
            }, 50);
          }
          else {
            if (success) {
              // batchPin = null;
              console.log("processSignatures(signatures);", signatures)
              var r = processSignatures(signatures, fileAccessCodes)
              console.log("processSignatures(signatures) done")
              return r
            } else {
              hideProgress(true);
            }
          }
        }
        return iterateResult();
      } else {
        hideProgress(true);
        console.log("Что то не там в подписании!")
      }
    }).then(() => {
      console.log("We return from start")
      return true
    }).catch(err => {
      console.log(err)
    })
  }

  function processSignatures(signatures, fileAccessCodes) {
    // var operationId = window.wrappedJSObject.operationId
    console.log("processSignatures", window.operationId)
    // return
    var success = true;
    var index = 0;
    var iterateSignatures = function() {
      var item = signatures[index];
      if (!isNull(item)) {
        let headers = new Headers()
        headers.set("Content-Type", 'application/json; charset=utf-8')
        return fetch('http://esep.fsa.gov.ru/Esep-WebApp/sign/ProcessClientSignatureBatch', {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            operationId: window.operationId,
            fileAccessCode: item.fileAccessCode,
            signature: item.signature
          }),
          headers: headers
        }).then(() => {
          index++
          iterateSignatures()
          console.log("finishBatchOperation index:", index)
        })
      } else {
        console.log("finishBatchOperation fileAccessCodes:", fileAccessCodes)
        return finishBatchOperation(fileAccessCodes)
      }
    }
    iterateSignatures();
  }
  function signData(base64Content, certificate, pinCode, callback) {
    SignHashCMS(base64Content, certificate, pinCode, callback);
  }
  function SignHashCMS(base64Content, certificate, pinCode, callback, callbackParams) {
    SignHashInternal(base64Content, certificate, 2, pinCode, callback, callbackParams);
  }

  function executeCallback(result, callback, callbackParams) {
    console.log(result)
    if (result.hasOwnProperty("IsError") && result.IsError == true) {
      myPort.postMessage({ type: "stateMessage", url: window.location.href, command: 'signError', msg: result.ErrorMsg });
    }
    if (callback && typeof (callback) == 'function') {
      callback(result, callbackParams);
    }
  }
  function finishBatchOperation(fileAccessCodes) {
    console.log("finishBatchOperation", fileAccessCodes)
    let headers = new Headers()
    headers.set("Content-Type", 'application/json; charset=utf-8')
    return fetch('http://esep.fsa.gov.ru/Esep-WebApp/sign/FinishBatchOperation', {
      method: "POST",
      credentials: "include",
      headers: headers,
      body: JSON.stringify({
        operationId: window.operationId,
        fileAccessCodes: fileAccessCodes
      })
    }).then(() => {
      myPort.postMessage({ type: "stateMessage", url: window.location.href, command: 'signDone' });
    })
  }
  var MyEsepCrypto = function() {
    var n = {
      Extension: {
        Chrome: {
          requestType: {
            crypto: 'CryptoHost',
            updater: 'UpdaterHost',
            tab: 'Tab'
          },
          tabId: null,
          sendRequest: function(t, i, r) {
            var u,
              f;
            t.requestType = i;
            n.Extension.Chrome.tabId != null && (t.tabId = n.Extension.Chrome.tabId);
            u = document.createTextNode(JSON.stringify(t));
            u.addEventListener('EsepCryptoExtensionResponse', function() {
              if (r && typeof r == 'function') {
                var n = JSON.parse(u.nodeValue);
                r(n)
              }
              u.parentNode.removeChild(u)
            }, !1);
            document.head.appendChild(u);
            f = document.createEvent('HTMLEvents');
            f.initEvent('EsepCryptoExtensionQuery', !0, !1);
            u.dispatchEvent(f)
          },
          checkExtension: function() {
            // if (n.Browser.isNewChrome() || n.Browser.isNewFirefox()) {
            //     var t = $('#ExtensionCheck_EsepCryptoExtension');
            //     if (t != null && t.text() === 'loaded') return !0
            // }
            return 1
          },
          checkCryptoHostInstalled: function(t) {
            n.Extension.Chrome.sendRequest({
              text: 'FakeTestMethod',
              'function': 'FakeTestMethod'
            }, n.Extension.Chrome.requestType.crypto, t)
          },
          checkCryptoUpdaterHostInstalled: function(t) {
            n.Extension.Chrome.sendRequest({
              text: 'FakeTestMethod',
              'function': 'FakeTestMethod'
            }, n.Extension.Chrome.requestType.updater, t)
          },
          canUpdate: function(t, i) {
            n.Extension.Chrome.sendRequest({
              text: 'canUpdate',
              'function': 'canUpdate',
              params: {
                UpdateChanel: t
              }
            }, n.Extension.Chrome.requestType.updater, i)
          },
          checkGostCrypto: function(t) {
            n.Extension.Chrome.sendRequest({
              text: 'haveGostCrypto',
              'function': 'haveGostCrypto'
            }, n.Extension.Chrome.requestType.crypto, t)
          },
          checkEnvironment: function(t) {
            n.Extension.Chrome.sendRequest({
              text: 'checkEnvironment',
              'function': 'checkEnvironment'
            }, n.Extension.Chrome.requestType.crypto, t)
          }
        }
      },
      Params: {
        cryptoChromeExtensionUrl: '',
        cryptoFirefoxExtensionUrl: '',
        cryptoInstallerUrl: '',
        cryptoXmlUrl: '',
        cryptoPluginHolderId: '',
        updatePluginHolderId: '',
        cryptoPluginId: '',
        cryptoPluginType: '',
        updatePluginId: '',
        updatePluginType: '',
        loadUpdatePlugin: !0,
        checkEnvironment: !0
      },
      cryptoPluginLoaded: !1,
      updatePluginLoaded: !1,
      Browser: {
        current: null,
        type: {
          chrome: 'chrome',
          activex: 'ie',
          firefoxNew: 'nff',
          firefox: 'ff',
          npapi: 'npapi'
        },
        getType: function() {
          return n.Browser.current == null && (n.Browser.current = n.Browser.isNewChrome() ? n.Browser.type.chrome : n.Browser.isActiveXSupported() ? n.Browser.type.activex : n.Browser.isNewFirefox() ? n.Browser.type.firefoxNew : n.Browser.isFirefox() ? n.Browser.type.firefox : n.Browser.type.npapi),
            n.Browser.current
        },
        extensionUrl: null,
        getExtensionUrl: function() {
          if (n.Browser.extensionUrl == null) switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
              n.Browser.extensionUrl = n.Params.cryptoChromeExtensionUrl;
              break;
            case n.Browser.type.firefoxNew:
              n.Browser.extensionUrl = n.Params.cryptoFirefoxExtensionUrl
          }
          return n.Browser.extensionUrl
        },
        isActiveX: null,
        isActiveXSupported: function() {
          if (n.Browser.isActiveX == null) if (n.Browser.isActiveX = !1, window.ActiveXObject) n.Browser.isActiveX = !0;
          else if ('ActiveXObject' in window) n.Browser.isActiveX = !0;
          else try {
            var i = new ActiveXObject('Microsoft.XMLDOM');
            n.Browser.isActiveX = !0
          } catch (t) {
            (t.name === 'TypeError' || t.name === 'Error') && (n.Browser.isActiveX = !0)
          }
          return n.Browser.isActiveX
        },
        newChrome: null,
        isNewChrome: function() {
          var t,
            i;
          if (n.Browser.newChrome == null) {
            if ((t = navigator.userAgent.toLowerCase(), !(/chrome/.test(t) && /Google Inc/.test(navigator.vendor) && typeof chrome == 'object')) || (i = t.match(/chrom(e|eframe|ium)\/([0-9]+)\./), !i)) return n.Browser.newChrome = !1,
              !1;
            n.Browser.newChrome = parseInt(i[2], 10) >= 42
          }
          return n.Browser.newChrome
        },
        newFirefox: null,
        isNewFirefox: function() {
          if (n.Browser.newFirefox == null) {
            var i = navigator.userAgent.toLowerCase(),
              t = i.match(/firefox\/([0-9]+)\./);
            if (!t) return n.Browser.newFirefox = !1,
              !1;
            n.Browser.newFirefox = parseInt(t[1], 10) >= 48
          }
          return n.Browser.newFirefox
        },
        isFF: null,
        isFirefox: function() {
          return n.Browser.isFF == null && (n.Browser.isFF = navigator.userAgent.match(/firefox/i) != null),
            n.Browser.isFF
        }
      },
      Common: {
        executeCallback: function(n, t) {
          t && typeof t == 'function' && t(n)
        },
        sendChromeRequest: function(t, i, r) {
          n.Extension.Chrome.tabId == null ? n.Extension.Chrome.sendRequest({
          }, n.Extension.Chrome.requestType.tab, function(u) {
            n.Extension.Chrome.tabId = u.tabId;
            n.Extension.Chrome.sendRequest(t, i, r)
          }) : n.Extension.Chrome.sendRequest(t, i, r)
        },
        Faults: {
          cryptoPluginNotFound: {
            success: !1,
            message: 'Криптоплагин не найден.',
            alert: 'error'
          },
          waitForDownloadAndInstall: {
            success: !1,
            message: 'Дождитесь окончания загрузки и установите криптоплагин. Если установка будет заблокирована, добавьте сайт в зону надежных узлов.',
            alert: 'warning'
          },
          gostCryptoNotFound: {
            success: !1,
            message: 'Не найден ГОСТ криптопровайдер.',
            alert: 'error'
          }
        }
      },
      Plugin: {
        objCryptoPlugin: null,
        getCryptoPlugin: function() {
          var i,
            t;
          if (n.Plugin.objCryptoPlugin == null) {
            if (i = document.getElementById(n.Params.cryptoPluginHolderId), i == null) return null;
            if (i.innerHTML = n.Browser.isActiveXSupported() ? '<object id="idCryptoPlugin" classid="clsid:' + n.Params.cryptoPluginId + '" border="0" width="0" height="0"></object>' : '<object id="idCryptoPlugin" type="' + n.Params.cryptoPluginType + '" class="hiddenObject" border="0" width="1" height="1"></object>', n.Plugin.objCryptoPlugin = document.getElementById('idCryptoPlugin'), (typeof n.Plugin.objCryptoPlugin == 'undefined' || n.Plugin.objCryptoPlugin == null) && n.Browser.isFirefox()) for (t = 0; t < document.embeds.length; t++) if (document.embeds[t].id === 'idCryptoPlugin') {
              n.Plugin.objCryptoPlugin = document.embeds[t];
              break
            }
            typeof n.Plugin.objCryptoPlugin.getVersion == 'undefined' && (i.innerHTML = '', n.Plugin.objCryptoPlugin = null)
          }
          return n.Plugin.objCryptoPlugin
        },
        objUpdatePlugin: null,
        getUpdatePlugin: function() {
          var i,
            t;
          if (n.Plugin.objUpdatePlugin == null) {
            if (i = document.getElementById(n.Params.updatePluginHolderId), i == null) return null;
            if (i.innerHTML = n.Browser.isActiveXSupported() ? '<object id="idUpdatePlugin" classid="clsid:' + n.Params.updatePluginId + '" border="0" width="0" height="0"></object>' : '<object id="idUpdatePlugin" type="' + n.Params.updatePluginType + '" class="hiddenObject" border="0" width="1" height="1"></object>', n.Plugin.objUpdatePlugin = document.getElementById('idUpdatePlugin'), (typeof n.Plugin.objUpdatePlugin == 'undefined' || n.Plugin.objUpdatePlugin == null) && n.Browser.isFirefox()) for (t = 0; t < document.embeds.length; t++) if (document.embeds[t].id === 'idUpdatePlugin') {
              n.Plugin.objUpdatePlugin = document.embeds[t];
              break
            }
            typeof n.Plugin.objUpdatePlugin.canUpdate == 'undefined' && (i.innerHTML = '', n.Plugin.objUpdatePlugin = null)
          }
          return n.Plugin.objUpdatePlugin
        },
        checkCryptoPluginInstalled: function(t) {
          var i,
            r;
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Extension.Chrome.checkCryptoHostInstalled(function(i) {
                if (i.success === '0') {
                  if (i.message === 'HostError') {
                    n.Common.executeCallback(n.Common.Faults.waitForDownloadAndInstall, t);
                    return
                  }
                  if (i.message === 'ExtensionTimeoutError') {
                    n.Common.executeCallback({
                      success: !1,
                      message: i.message,
                      alert: 'error'
                    }, t);
                    return
                  }
                }
                n.Extension.Chrome.checkEnvironment(function(i) {
                  i.success !== '1' ? (typeof i.messages == 'undefined' || i.messages == null) && i.message != null ? n.Extension.Chrome.checkGostCrypto(function(i) {
                    i.success !== '1' || i.hasprovider !== '1' ? n.Common.executeCallback(n.Common.Faults.gostCryptoNotFound, t) : (n.cryptoPluginLoaded = !0, n.Common.executeCallback({
                      success: !0
                    }, t));
                    return
                  }) : n.Common.executeCallback({
                    success: !1,
                    message: i.messages.join('<br />'),
                    alert: 'error'
                  }, t) : (n.cryptoPluginLoaded = !0, n.Common.executeCallback({
                    success: !0
                  }, t));
                  return
                })
              });
              break;
            default:
              if (i = n.Plugin.getCryptoPlugin(), i == null) {
                n.Common.executeCallback(n.Common.Faults.waitForDownloadAndInstall, t);
                return
              }
              if (typeof i.checkEnvironment == 'undefined' && !i.haveGostCrypto()) {
                n.Common.executeCallback(n.Common.Faults.gostCryptoNotFound, t);
                return
              }
              if (r = i.checkEnvironment(), !r.success) {
                n.Common.executeCallback({
                  success: !1,
                  message: r.messages.replace(/;/g, '\r\n'),
                  alert: 'error'
                }, t);
                return
              }
              n.cryptoPluginLoaded = !0;
              n.Common.executeCallback({
                success: !0
              }, t);
              return
          }
        },
        checkUpdatePluginInstalled: function(t) {
          var i = {
            success: !1,
            message: 'Дождитесь окончания загрузки и установите криптоплагин. Если установка будет заблокирована, добавьте сайт в зону надежных узлов.',
            alert: 'warning',
            url: n.Params.cryptoInstallerUrl
          };
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Extension.Chrome.checkCryptoUpdaterHostInstalled(function(r) {
                if (r.success === '0') {
                  if (r.message === 'HostError') {
                    n.Common.executeCallback(i, t);
                    return
                  }
                  if (r.message === 'ExtensionTimeoutError') {
                    n.Common.executeCallback({
                      success: !1,
                      message: r.message,
                      alert: 'error'
                    }, t);
                    return
                  }
                }
                n.updatePluginLoaded = !0;
                n.Common.executeCallback({
                  success: !0
                }, t);
                return
              });
              break;
            default:
              if (n.Plugin.getUpdatePlugin() == null) {
                n.Common.executeCallback(i, t);
                return
              }
              n.updatePluginLoaded = !0;
              n.Common.executeCallback({
                success: !0
              }, t);
              return
          }
        },
        doUpdate: function(t) {
          var i = {
            success: !1,
            message: 'Неудачная попытка обновления, необходимо скачать и установить криптоплагин вручную.',
            alert: 'error',
            url: n.Params.cryptoInstallerUrl
          },
            r;
          if (!n.updatePluginLoaded) {
            n.Common.executeCallback(i, t);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'doIt',
                'function': 'doIt',
                params: {
                  UpdateChanel: n.Params.cryptoXmlUrl
                }
              }, n.Extension.Chrome.requestType.updater, function(r) {
                if (r.success !== '1') {
                  if (r.needUpdate === '1') {
                    n.Common.executeCallback(i, t);
                    return
                  }
                  n.Common.executeCallback(n.Common.Faults.waitForDownloadAndInstall, t);
                  return
                }
                n.Common.executeCallback(n.Common.Faults.waitForDownloadAndInstall, t);
                return
              });
              break;
            default:
              if (r = n.Plugin.getUpdatePlugin().doIt(n.Params.cryptoXmlUrl), r.success) {
                n.Common.executeCallback(n.Common.Faults.waitForDownloadAndInstall, t);
                return
              }
              if (r.needUpdate) {
                n.Common.executeCallback(i, t);
                return
              }
              n.Common.executeCallback(n.Common.Faults.waitForDownloadAndInstall, t);
              return
          }
        },
        setParameter: function(t, i) {
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'SetParameter',
                'function': 'SetParameter',
                params: {
                  ParamName: t.name,
                  ParamValue: t.value
                }
              }, n.Extension.Chrome.requestType.crypto, function(t) {
                t.success = t.success === '1';
                n.Common.executeCallback(t, i)
              });
              break;
            default:
              var r = n.Plugin.getCryptoPlugin().setParameter(t.name, t.value);
              n.Common.executeCallback(r, i)
          }
        }
      },
      initialize: function(t, i) {
        var f,
          e,
          r,
          o,
          u,
          s;
        for (f in t) t.hasOwnProperty(f) && (n.Params[f] = t[f]);
        n.cryptoPluginLoaded = !1;
        n.updatePluginLoaded = !1;
        switch (n.Browser.getType()) {
          case n.Browser.type.chrome:
          case n.Browser.type.firefoxNew:
            if (!n.Extension.Chrome.checkExtension()) {
              n.Common.executeCallback({
                success: !1,
                message: 'Расширение браузера не найдено. Пожалуйста, установите расширение, затем обновите страницу.',
                alert: 'error',
                url: n.Browser.getExtensionUrl()
              }, i);
              return
            }
            n.Extension.Chrome.checkCryptoHostInstalled(function(t) {
              if (t.success === '0') {
                if (t.message === 'HostError') {
                  n.Common.executeCallback({
                    success: !1,
                    needUpdate: !1,
                    needInstall: !0
                  }, i);
                  return
                }
                if (t.message === 'ExtensionTimeoutError') {
                  n.Common.executeCallback({
                    success: !1,
                    message: t.message,
                    alert: 'error'
                  }, i);
                  return
                }
              }
              if (n.cryptoPluginLoaded = !0, n.Params.loadUpdatePlugin === !0) n.Extension.Chrome.checkCryptoUpdaterHostInstalled(function(t) {
                if (t.success === '0' && t.message === 'HostError') {
                  n.Common.executeCallback({
                    success: !1,
                    needUpdate: !1,
                    needInstall: !0
                  }, i);
                  return
                }
                if (t.message === 'ExtensionTimeoutError') {
                  n.Common.executeCallback({
                    success: !1,
                    message: t.message,
                    alert: 'error'
                  }, i);
                  return
                }
                n.updatePluginLoaded = !0;
                n.Extension.Chrome.canUpdate(n.Params.cryptoXmlUrl, function(t) {
                  if (t.success === '1') {
                    n.Common.executeCallback({
                      success: !1,
                      needUpdate: !0,
                      needInstall: !1,
                      versionCurrent: t.version,
                      versionServer: t.serverVersion
                    }, i);
                    return
                  }
                  if (n.Params.checkEnvironment === !0) n.Extension.Chrome.checkEnvironment(function(t) {
                    t.success !== '1' ? (typeof t.messages == 'undefined' || t.messages == null) && t.message != null ? n.Extension.Chrome.checkGostCrypto(function(t) {
                      t.success !== '1' || t.hasprovider !== '1' ? n.Common.executeCallback(n.Common.Faults.gostCryptoNotFound, i) : n.Common.executeCallback({
                        success: !0
                      }, i);
                      return
                    }) : n.Common.executeCallback({
                      success: !1,
                      message: t.messages.join('<br />'),
                      alert: 'error'
                    }, i) : n.Common.executeCallback({
                      success: !0
                    }, i);
                    return
                  });
                  else {
                    n.Common.executeCallback({
                      success: !0
                    }, i);
                    return
                  }
                })
              });
              else if (n.Params.checkEnvironment === !0) n.Extension.Chrome.checkEnvironment(function(t) {
                t.success !== '1' ? (typeof t.messages == 'undefined' || t.messages == null) && t.message != null ? n.Extension.Chrome.checkGostCrypto(function(t) {
                  t.success !== '1' || t.hasprovider !== '1' ? n.Common.executeCallback(n.Common.Faults.gostCryptoNotFound, i) : n.Common.executeCallback({
                    success: !0
                  }, i);
                  return
                }) : n.Common.executeCallback({
                  success: !1,
                  message: t.messages.join('<br />'),
                  alert: 'error'
                }, i) : n.Common.executeCallback({
                  success: !0
                }, i);
                return
              });
              else {
                n.Common.executeCallback({
                  success: !0
                }, i);
                return
              }
            });
            break;
          default:
            if (n.Params.loadUpdatePlugin === !0 && (e = n.Plugin.getUpdatePlugin(), e != null && (n.updatePluginLoaded = !0, r = e.canUpdate(n.Params.cryptoXmlUrl), o = !r.success && r.version === '', r.success || o))) {
              n.Common.executeCallback({
                success: !1,
                needUpdate: r.success || o,
                needInstall: !1,
                versionCurrent: r.version === '' ? '(unknown)' : r.version,
                versionServer: r.serverVersion === '' ? '(unknown)' : r.serverVersion
              }, i);
              return
            }
            if (u = n.Plugin.getCryptoPlugin(), u == null) {
              n.Common.executeCallback({
                success: !1,
                needUpdate: !1,
                needInstall: !0
              }, i);
              return
            }
            if (n.cryptoPluginLoaded = !0, n.Params.checkEnvironment === !0) {
              if (typeof u.checkEnvironment == 'undefined' && !u.haveGostCrypto()) {
                n.Common.executeCallback(n.Common.Faults.gostCryptoNotFound, i);
                return
              }
              if (s = u.checkEnvironment(), !s.success) {
                n.Common.executeCallback({
                  success: !1,
                  message: s.messages.replace(/;/g, '\r\n'),
                  alert: 'error'
                }, i);
                return
              }
            }
            n.Common.executeCallback({
              success: !0
            }, i);
            return
        }
      },
      Certificate: {
        updateCertificates: function(t) {
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, t);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'UpdateCertificateList',
                'function': 'UpdateCertificateList'
              }, n.Extension.Chrome.requestType.crypto, function() {
                n.Common.executeCallback({
                  success: !0
                }, t)
              });
              break;
            default:
              n.Plugin.getCryptoPlugin().updateCertificateList();
              n.Common.executeCallback({
                success: !0
              }, t);
              return
          }
        },
        selectCertificateUI: function(t) {
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, t);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'SelectCertificateUI',
                'function': 'SelectCertificateUI'
              }, n.Extension.Chrome.requestType.crypto, function(i) {
                i.Index = Number(i.Index);
                i.success = i.success === '1';
                n.Common.executeCallback(i, t)
              });
              break;
            default:
              var i = n.Plugin.getCryptoPlugin().selectCertificate();
              n.Common.executeCallback(i, t);
              return
          }
        },
        getCertificatesList: function(t) {
          var r,
            i;
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, t);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'GetCertificateList',
                'function': 'GetCertificateList'
              }, n.Extension.Chrome.requestType.crypto, function(i) {
                i.success = i.success === '1';
                i.count = Number(i.count);
                n.Common.executeCallback(i, t)
              });
              break;
            default:
              var u = n.Plugin.getCryptoPlugin(),
                f = u.getCertificatesCount(),
                e = {
                  success: !0,
                  count: f
                };
              for (r = 0; r < f; r++) i = u.getCertificateInfo(r),
                e[r.toString()] = {
                  SerialNumber: i.SerialNumber,
                  Subject: i.Subject,
                  Issuer: i.Issuer,
                  StartDate: i.StartDate,
                  EndDate: i.EndDate
                };
              n.Common.executeCallback(e, t);
              return
          }
        },
        getCertificateInfo: function(t, i) {
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'GetCertificate',
                'function': 'GetCertificate',
                params: {
                  Index: t.toString()
                }
              }, n.Extension.Chrome.requestType.crypto, function(t) {
                t.success = t.success === '1';
                t.Index = Number(t.Index);
                t.count = Number(t.count);
                n.Common.executeCallback(t, i)
              });
              break;
            default:
              var r = n.Plugin.getCryptoPlugin().getCertificateInfo(t);
              n.Common.executeCallback(r, i)
          }
        },
        getCertificatesCount: function(t) {
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, t);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'GetCertificateCount',
                'function': 'GetCertificateCount'
              }, n.Extension.Chrome.requestType.crypto, function(i) {
                n.Common.executeCallback(Number(i.count), t)
              });
              break;
            default:
              var i = n.Plugin.getCryptoPlugin().getCertificatesCount();
              n.Common.executeCallback(i, t)
          }
        },
        importCertificate: function(t, i) {
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'ImportCertificate',
                'function': 'ImportCertificate',
                params: {
                  Certificate: t
                }
              }, n.Extension.Chrome.requestType.crypto, function(t) {
                t.success = t.success === '1';
                n.Common.executeCallback(t, i)
              });
              break;
            default:
              var r = n.Plugin.getCryptoPlugin().importCert(t);
              n.Common.executeCallback(r, i)
          }
        },
        certificateRequest: function(t, i) {
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'CertificateRequest',
                'function': 'CertificateRequest',
                params: {
                  Subject: t.subject,
                  Extensions: t.extensions
                }
              }, n.Extension.Chrome.requestType.crypto, function(t) {
                t.success = t.success === '1';
                n.Common.executeCallback(t, i)
              });
              break;
            default:
              var r = n.Plugin.getCryptoPlugin().certificateRequest(t.subject, t.extensions);
              n.Common.executeCallback(r, i)
          }
        }
      },
      File: {
        hashData: function(t, i) {
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'HashData',
                'function': 'HashData',
                params: {
                  B64Data: t
                }
              }, n.Extension.Chrome.requestType.crypto, function(t) {
                t.success = t.success === '1';
                n.Common.executeCallback(t, i)
              });
              break;
            default:
              var r = n.Plugin.getCryptoPlugin().hashData(t);
              n.Common.executeCallback(r, i);
              return
          }
        },
        selectFile: function(t, i) {
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'SelectFile',
                'function': 'SelectFile',
                params: {
                  DefaultName: t.path,
                  Extensions: t.filter
                }
              }, n.Extension.Chrome.requestType.crypto, function(t) {
                t.success = t.success === '1';
                n.Common.executeCallback(t, i)
              });
              break;
            default:
              var r = n.Plugin.getCryptoPlugin().SelectFile(t.path, t.filter);
              n.Common.executeCallback(r, i);
              return
          }
        },
        fileToBase64: function(t, i) {
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'LoadFile',
                'function': 'LoadFile',
                params: {
                  File: t
                }
              }, n.Extension.Chrome.requestType.crypto, function(t) {
                t.success = t.success === '1';
                n.Common.executeCallback(t, i)
              });
              break;
            default:
              var r = n.Plugin.getCryptoPlugin().LoadFile(t);
              n.Common.executeCallback(r, i);
              return
          }
        }
      },
      Sign: {
        setPin: function(t, i) {
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'SetPINCode',
                'function': 'SetPINCode',
                params: {
                  PIN: t
                }
              }, n.Extension.Chrome.requestType.crypto, function(t) {
                t.success = t.success === '1';
                n.Common.executeCallback(t, i)
              });
              break;
            default:
              var r = n.Plugin.getCryptoPlugin().setPINCode(t);
              n.Common.executeCallback(r, i);
              return
          }
        },
        signHash: function(t, i) {
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'SignHash',
                'function': 'SignHash',
                params: {
                  CertIndex: t.certIndex.toString(),
                  B64Hash: t.base64Content,
                  SignFormat: t.format.toString(),
                  TSPUrl: t.tspUrl,
                  DocID: t.documentId,
                  AlgId: (t.algorithm == null ? n.Common.hashAlgorithmTypes.GOST3411 : t.algorithm).toString()
                }
              }, n.Extension.Chrome.requestType.crypto, function(t) {
                t.success = t.success === '1';
                n.Common.executeCallback(t, i)
              });
              break;
            default:
              var r = n.Plugin.getCryptoPlugin().signHash(t.certIndex, t.base64Content, t.format, t.tspUrl, t.documentId);
              n.Common.executeCallback(r, i);
              return
          }
        },
        signPdf: function(t, i) {
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'SignPDF',
                'function': 'SignPDF',
                params: {
                  CertIndex: t.certIndex.toString(),
                  B64Data: t.base64Content
                }
              }, n.Extension.Chrome.requestType.crypto, function(t) {
                t.success = t.success === '1';
                n.Common.executeCallback(t, i)
              });
              break;
            default:
              var r = n.Plugin.getCryptoPlugin().signPDF(t.certIndex, t.base64Content);
              n.Common.executeCallback(r, i);
              return
          }
        },
        signData: function(t, i) {
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'SignData',
                'function': 'SignData',
                params: {
                  B64Data: t.base64Content,
                  CertIndex: t.certIndex.toString(),
                  Detached: t.detached ? '1' : '0',
                  Attributes: t.attributes
                }
              }, n.Extension.Chrome.requestType.crypto, function(t) {
                t.success = t.success === '1';
                n.Common.executeCallback(t, i)
              });
              break;
            default:
              var r = n.Plugin.getCryptoPlugin().signDataCryptoAPI(t.base64Content, t.certIndex, t.detached, t.attributes);
              r.success && (r.body = r.body.replace(/\s+/g, ''));
              n.Common.executeCallback(r, i);
              return
          }
        },
        sign: function(t, i) {
          if (!n.cryptoPluginLoaded) {
            n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
            return
          }
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              n.Common.sendChromeRequest({
                text: 'Sign',
                'function': 'Sign',
                params: {
                  B64Data: t.base64Content,
                  CertIndex: t.certIndex.toString(),
                  CalcHash: t.calcHash ? '1' : '0'
                }
              }, n.Extension.Chrome.requestType.crypto, function(t) {
                t.success = t.success === '1';
                n.Common.executeCallback(t, i)
              });
              break;
            default:
              var r = n.Plugin.getCryptoPlugin().sign(t.certIndex, t.base64Content, t.calcHash);
              r.success && (r.signature = r.signature.replace(/\s+/g, ''));
              n.Common.executeCallback(r, i);
              return
          }
        }
      }
    }
    return n;
  }();
  var EsepCrypto = MyEsepCrypto
  window.constants = {
    "CryptoChromeExtensionUrl": "https://chrome.google.com/webstore/detail/esep-crypto-extension/ndhkcelnoeacagmhbidalbidnkjeokma?hl=ru",
    "CryptoFirefoxExtensionUrl": "https://addons.mozilla.org/firefox/addon/esep-crypto/",
    "CryptoPluginId": "5783B7E3-DC6A-4C46-BD1E-6DB3996DADEF",
    "CryptoPluginType": "application/granitcryptocomponent-plugin",
    "CryptoPluginUpdId": "4D1088A8-889D-4BCF-D858-BAA758903AB6",
    "CryptoPluginUpdType": "application/granitupdater",
    "CryptoPluginUrl": "http://esep.fsa.gov.ru/ESEP-WebApp/npcryco_esep.exe",
    "CryptoXmlUrl": "http://esep.fsa.gov.ru/ESEP-WebApp/update_info.xml",
    "MaxVisualizationSize": 26214400,
    "MaxVisualizationTimeout": 120,
    "ShowFileAccessCodeOnPreview": true,
    "UseDss": false,
    "UseFileByFileBatchSigning": true,
    "UseWinSelectCertWindow": false
  }
  InitializeCrypto()
  function InitializeCrypto(callback) {
    EsepCrypto.initialize(
      {
        cryptoInstallerUrl: window.constants.CryptoPluginUrl,
        cryptoXmlUrl: window.constants.CryptoXmlUrl,
        cryptoChromeExtensionUrl: window.constants.CryptoChromeExtensionUrl,
        cryptoFirefoxExtensionUrl: window.constants.CryptoFirefoxExtensionUrl,
        cryptoPluginHolderId: 'placeCryptoPlugin',
        updatePluginHolderId: 'placeUpdatePlugin',
        cryptoPluginId: window.constants.CryptoPluginId,
        cryptoPluginType: window.constants.CryptoPluginType,
        updatePluginId: window.constants.CryptoPluginUpdId,
        updatePluginType: window.constants.CryptoPluginUpdType,
        loadUpdatePlugin: true,
        checkEnvironment: true
      }
    );
  }
  function SignHashInternal(base64Content, certificate, format, pinCode, callback, callbackParams) {
    var pin = pinCode;
    window.batchPin = pin;
    console.log('DEBUG: really i"m debugging')
    try {
      EsepCrypto.Sign.setPin(pin,
        function(result) {
          if (!result.success) {
            executeCallback({
              IsError: true,
              ErrorMsg: 'Ошибка при вызове функции криптоплагина. ' + result.message,
              ErrorType: 'error'
            },
              callback,
              callbackParams);
            return;
          }
          var documentId = '';
          if (documentId !== '') {
            documentId = '1.3.6.1.4.1.311.88.2.3.1=\"' + documentId + '\"';
          }
          if (format !== 3) {
            EsepCrypto.Sign.signHash(
              {
                certIndex: certificate.Index,
                algorithm: certificate.Algorithm,
                base64Content: base64Content,
                format: format,
                tspUrl: 'http://tsp.uc-em.ru:2020/tsp/tsp.srf',
                documentId: documentId
              },
              function(result) {
                if (!result.success) {
                  executeCallback({
                    IsError: true,
                    ErrorMsg: 'Ошибка при вызове функции криптоплагина. ' + result.message,
                    ErrorType: 'error'
                  },
                    callback,
                    callbackParams);
                  return;
                }
                executeCallback({ IsError: false, ErrorMsg: '', ResponseObject: result.body },
                  callback,
                  callbackParams);
              });
          }
          //    else {
          //     EsepCrypto.Sign.signPdf({ certIndex: certificate.Index, base64Content: base64Content },
          //       function(result) {
          //         if (!result.success) {
          //           executeCallback({
          //               IsError: true,
          //               ErrorMsg: 'Ошибка при вызове функции криптоплагина. ' + result.message,
          //               ErrorType: 'error'
          //             },
          //             callback,
          //             callbackParams);
          //           return;
          //         }
          //         executeCallback({ IsError: false, ErrorMsg: '', ResponseObject: result.data },
          //           callback,
          //           callbackParams);
          //       });
          //   }
        });
    } catch (e) {
      executeCallback({
        IsError: true,
        ErrorMsg: 'Ошибка при вызове функции криптоплагина. ' + e.message,
        ErrorType: 'error'
      },
        callback,
        callbackParams);
    }
  }
  console.log("content esep init")
  myPort.postMessage({ url: window.location.href, command: 'loaded' });
} catch (error) {
  console.log(err)
}
