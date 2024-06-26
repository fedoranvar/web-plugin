(function() {
  "use strict";
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var browserPolyfill = { exports: {} };
  (function(module, exports) {
    (function(global2, factory) {
      {
        factory(module);
      }
    })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : commonjsGlobal, function(module2) {
      var _a, _b;
      if (!((_b = (_a = globalThis.chrome) == null ? void 0 : _a.runtime) == null ? void 0 : _b.id)) {
        throw new Error("This script should only be loaded in a browser extension.");
      }
      if (typeof globalThis.browser === "undefined" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
        const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
        const wrapAPIs = (extensionAPIs) => {
          const apiMetadata = {
            "alarms": {
              "clear": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "clearAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "get": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "bookmarks": {
              "create": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getChildren": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getRecent": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getSubTree": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTree": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "move": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeTree": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "browserAction": {
              "disable": {
                "minArgs": 0,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "enable": {
                "minArgs": 0,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "getBadgeBackgroundColor": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getBadgeText": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getPopup": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTitle": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "openPopup": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "setBadgeBackgroundColor": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setBadgeText": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setIcon": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "setPopup": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setTitle": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "browsingData": {
              "remove": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "removeCache": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeCookies": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeDownloads": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeFormData": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeHistory": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeLocalStorage": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removePasswords": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removePluginData": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "settings": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "commands": {
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "contextMenus": {
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "cookies": {
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAllCookieStores": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "set": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "devtools": {
              "inspectedWindow": {
                "eval": {
                  "minArgs": 1,
                  "maxArgs": 2,
                  "singleCallbackArg": false
                }
              },
              "panels": {
                "create": {
                  "minArgs": 3,
                  "maxArgs": 3,
                  "singleCallbackArg": true
                },
                "elements": {
                  "createSidebarPane": {
                    "minArgs": 1,
                    "maxArgs": 1
                  }
                }
              }
            },
            "downloads": {
              "cancel": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "download": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "erase": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getFileIcon": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "open": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "pause": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeFile": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "resume": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "show": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "extension": {
              "isAllowedFileSchemeAccess": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "isAllowedIncognitoAccess": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "history": {
              "addUrl": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "deleteAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "deleteRange": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "deleteUrl": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getVisits": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "search": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "i18n": {
              "detectLanguage": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAcceptLanguages": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "identity": {
              "launchWebAuthFlow": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "idle": {
              "queryState": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "management": {
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getSelf": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "setEnabled": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "uninstallSelf": {
                "minArgs": 0,
                "maxArgs": 1
              }
            },
            "notifications": {
              "clear": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "create": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getPermissionLevel": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            },
            "pageAction": {
              "getPopup": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getTitle": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "hide": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setIcon": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "setPopup": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "setTitle": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              },
              "show": {
                "minArgs": 1,
                "maxArgs": 1,
                "fallbackToNoCallback": true
              }
            },
            "permissions": {
              "contains": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "request": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "runtime": {
              "getBackgroundPage": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getPlatformInfo": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "openOptionsPage": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "requestUpdateCheck": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "sendMessage": {
                "minArgs": 1,
                "maxArgs": 3
              },
              "sendNativeMessage": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "setUninstallURL": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "sessions": {
              "getDevices": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getRecentlyClosed": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "restore": {
                "minArgs": 0,
                "maxArgs": 1
              }
            },
            "storage": {
              "local": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              },
              "managed": {
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                }
              },
              "sync": {
                "clear": {
                  "minArgs": 0,
                  "maxArgs": 0
                },
                "get": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "getBytesInUse": {
                  "minArgs": 0,
                  "maxArgs": 1
                },
                "remove": {
                  "minArgs": 1,
                  "maxArgs": 1
                },
                "set": {
                  "minArgs": 1,
                  "maxArgs": 1
                }
              }
            },
            "tabs": {
              "captureVisibleTab": {
                "minArgs": 0,
                "maxArgs": 2
              },
              "create": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "detectLanguage": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "discard": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "duplicate": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "executeScript": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getCurrent": {
                "minArgs": 0,
                "maxArgs": 0
              },
              "getZoom": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getZoomSettings": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "goBack": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "goForward": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "highlight": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "insertCSS": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "move": {
                "minArgs": 2,
                "maxArgs": 2
              },
              "query": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "reload": {
                "minArgs": 0,
                "maxArgs": 2
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "removeCSS": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "sendMessage": {
                "minArgs": 2,
                "maxArgs": 3
              },
              "setZoom": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "setZoomSettings": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "update": {
                "minArgs": 1,
                "maxArgs": 2
              }
            },
            "topSites": {
              "get": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "webNavigation": {
              "getAllFrames": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "getFrame": {
                "minArgs": 1,
                "maxArgs": 1
              }
            },
            "webRequest": {
              "handlerBehaviorChanged": {
                "minArgs": 0,
                "maxArgs": 0
              }
            },
            "windows": {
              "create": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "get": {
                "minArgs": 1,
                "maxArgs": 2
              },
              "getAll": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getCurrent": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "getLastFocused": {
                "minArgs": 0,
                "maxArgs": 1
              },
              "remove": {
                "minArgs": 1,
                "maxArgs": 1
              },
              "update": {
                "minArgs": 2,
                "maxArgs": 2
              }
            }
          };
          if (Object.keys(apiMetadata).length === 0) {
            throw new Error("api-metadata.json has not been included in browser-polyfill");
          }
          class DefaultWeakMap extends WeakMap {
            constructor(createItem, items = void 0) {
              super(items);
              this.createItem = createItem;
            }
            get(key) {
              if (!this.has(key)) {
                this.set(key, this.createItem(key));
              }
              return super.get(key);
            }
          }
          const isThenable = (value) => {
            return value && typeof value === "object" && typeof value.then === "function";
          };
          const makeCallback = (promise, metadata) => {
            return (...callbackArgs) => {
              if (extensionAPIs.runtime.lastError) {
                promise.reject(new Error(extensionAPIs.runtime.lastError.message));
              } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
                promise.resolve(callbackArgs[0]);
              } else {
                promise.resolve(callbackArgs);
              }
            };
          };
          const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
          const wrapAsyncFunction = (name, metadata) => {
            return function asyncFunctionWrapper(target, ...args) {
              if (args.length < metadata.minArgs) {
                throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
              }
              if (args.length > metadata.maxArgs) {
                throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
              }
              return new Promise((resolve, reject) => {
                if (metadata.fallbackToNoCallback) {
                  try {
                    target[name](...args, makeCallback({
                      resolve,
                      reject
                    }, metadata));
                  } catch (cbError) {
                    console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
                    target[name](...args);
                    metadata.fallbackToNoCallback = false;
                    metadata.noCallback = true;
                    resolve();
                  }
                } else if (metadata.noCallback) {
                  target[name](...args);
                  resolve();
                } else {
                  target[name](...args, makeCallback({
                    resolve,
                    reject
                  }, metadata));
                }
              });
            };
          };
          const wrapMethod = (target, method, wrapper) => {
            return new Proxy(method, {
              apply(targetMethod, thisObj, args) {
                return wrapper.call(thisObj, target, ...args);
              }
            });
          };
          let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
          const wrapObject = (target, wrappers = {}, metadata = {}) => {
            let cache = /* @__PURE__ */ Object.create(null);
            let handlers = {
              has(proxyTarget2, prop) {
                return prop in target || prop in cache;
              },
              get(proxyTarget2, prop, receiver) {
                if (prop in cache) {
                  return cache[prop];
                }
                if (!(prop in target)) {
                  return void 0;
                }
                let value = target[prop];
                if (typeof value === "function") {
                  if (typeof wrappers[prop] === "function") {
                    value = wrapMethod(target, target[prop], wrappers[prop]);
                  } else if (hasOwnProperty(metadata, prop)) {
                    let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                    value = wrapMethod(target, target[prop], wrapper);
                  } else {
                    value = value.bind(target);
                  }
                } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
                  value = wrapObject(value, wrappers[prop], metadata[prop]);
                } else if (hasOwnProperty(metadata, "*")) {
                  value = wrapObject(value, wrappers[prop], metadata["*"]);
                } else {
                  Object.defineProperty(cache, prop, {
                    configurable: true,
                    enumerable: true,
                    get() {
                      return target[prop];
                    },
                    set(value2) {
                      target[prop] = value2;
                    }
                  });
                  return value;
                }
                cache[prop] = value;
                return value;
              },
              set(proxyTarget2, prop, value, receiver) {
                if (prop in cache) {
                  cache[prop] = value;
                } else {
                  target[prop] = value;
                }
                return true;
              },
              defineProperty(proxyTarget2, prop, desc) {
                return Reflect.defineProperty(cache, prop, desc);
              },
              deleteProperty(proxyTarget2, prop) {
                return Reflect.deleteProperty(cache, prop);
              }
            };
            let proxyTarget = Object.create(target);
            return new Proxy(proxyTarget, handlers);
          };
          const wrapEvent = (wrapperMap) => ({
            addListener(target, listener, ...args) {
              target.addListener(wrapperMap.get(listener), ...args);
            },
            hasListener(target, listener) {
              return target.hasListener(wrapperMap.get(listener));
            },
            removeListener(target, listener) {
              target.removeListener(wrapperMap.get(listener));
            }
          });
          const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
            if (typeof listener !== "function") {
              return listener;
            }
            return function onRequestFinished(req) {
              const wrappedReq = wrapObject(
                req,
                {},
                {
                  getContent: {
                    minArgs: 0,
                    maxArgs: 0
                  }
                }
              );
              listener(wrappedReq);
            };
          });
          const onMessageWrappers = new DefaultWeakMap((listener) => {
            if (typeof listener !== "function") {
              return listener;
            }
            return function onMessage(message, sender, sendResponse) {
              let didCallSendResponse = false;
              let wrappedSendResponse;
              let sendResponsePromise = new Promise((resolve) => {
                wrappedSendResponse = function(response) {
                  didCallSendResponse = true;
                  resolve(response);
                };
              });
              let result;
              try {
                result = listener(message, sender, wrappedSendResponse);
              } catch (err2) {
                result = Promise.reject(err2);
              }
              const isResultThenable = result !== true && isThenable(result);
              if (result !== true && !isResultThenable && !didCallSendResponse) {
                return false;
              }
              const sendPromisedResult = (promise) => {
                promise.then((msg) => {
                  sendResponse(msg);
                }, (error) => {
                  let message2;
                  if (error && (error instanceof Error || typeof error.message === "string")) {
                    message2 = error.message;
                  } else {
                    message2 = "An unexpected error occurred";
                  }
                  sendResponse({
                    __mozWebExtensionPolyfillReject__: true,
                    message: message2
                  });
                }).catch((err2) => {
                  console.error("Failed to send onMessage rejected reply", err2);
                });
              };
              if (isResultThenable) {
                sendPromisedResult(result);
              } else {
                sendPromisedResult(sendResponsePromise);
              }
              return true;
            };
          });
          const wrappedSendMessageCallback = ({
            reject,
            resolve
          }, reply) => {
            if (extensionAPIs.runtime.lastError) {
              if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
                resolve();
              } else {
                reject(new Error(extensionAPIs.runtime.lastError.message));
              }
            } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
              reject(new Error(reply.message));
            } else {
              resolve(reply);
            }
          };
          const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
            if (args.length < metadata.minArgs) {
              throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
            }
            if (args.length > metadata.maxArgs) {
              throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
            }
            return new Promise((resolve, reject) => {
              const wrappedCb = wrappedSendMessageCallback.bind(null, {
                resolve,
                reject
              });
              args.push(wrappedCb);
              apiNamespaceObj.sendMessage(...args);
            });
          };
          const staticWrappers = {
            devtools: {
              network: {
                onRequestFinished: wrapEvent(onRequestFinishedWrappers)
              }
            },
            runtime: {
              onMessage: wrapEvent(onMessageWrappers),
              onMessageExternal: wrapEvent(onMessageWrappers),
              sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                minArgs: 1,
                maxArgs: 3
              })
            },
            tabs: {
              sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
                minArgs: 2,
                maxArgs: 3
              })
            }
          };
          const settingMetadata = {
            clear: {
              minArgs: 1,
              maxArgs: 1
            },
            get: {
              minArgs: 1,
              maxArgs: 1
            },
            set: {
              minArgs: 1,
              maxArgs: 1
            }
          };
          apiMetadata.privacy = {
            network: {
              "*": settingMetadata
            },
            services: {
              "*": settingMetadata
            },
            websites: {
              "*": settingMetadata
            }
          };
          return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
        };
        module2.exports = wrapAPIs(chrome);
      } else {
        module2.exports = globalThis.browser;
      }
    });
  })(browserPolyfill);
  var browserPolyfillExports = browserPolyfill.exports;
  try {
    let checkReady22 = function(operationId, currentCertificate, pinCode) {
      console.log("checkReady2");
      if (document.querySelectorAll("#document-list li").length > 0) {
        console.log("Try sign");
        window.operationId = operationId;
        return start2(getfileAccessCodes2(), currentCertificate, pinCode);
      } else {
        setTimeout(() => {
          return checkReady22();
        }, 1e3);
      }
    }, getfileAccessCodes2 = function() {
      var list = document.querySelectorAll("#document-list li");
      var fileAccessCodes = [];
      for (var cnt = 0, m = list.length; cnt < m; cnt++) {
        if (list[cnt].id) {
          fileAccessCodes.push(list[cnt].id);
        }
      }
      console.log("fileAccessCodes", fileAccessCodes);
      return fileAccessCodes;
    }, isNull2 = function(objectToCheck) {
      return typeof objectToCheck == "undefined" || objectToCheck == null;
    }, start2 = function(fileAccessCodes, currentCertificate, pinCode) {
      console.log("start", fileAccessCodes, currentCertificate, pinCode);
      console.log(EsepCrypto);
      let headers = new Headers();
      headers.set("Content-Type", "application/json; charset=utf-8");
      console.log("DEBUG: I want to sign");
      return fetch("http://esep.fsa.gov.ru/Esep-WebApp/sign/GetFileHashBatch", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ fileAccessCodes, hashType: currentCertificate.Algorithm }),
        headers
      }).then((response) => {
        console.log(response);
        return response.json();
      }).then((response) => {
        if (response.wasSuccessful) {
          var signatures = [];
          var success = true;
          var index = 0;
          var accessCode;
          var iterateResult = function() {
            var item = response.hashes[index];
            if (!isNull2(item)) {
              accessCode = item.Key;
              var iterateCallback = function(result) {
                if (result.IsError) {
                  success = false;
                } else {
                  signatures.push({ fileAccessCode: accessCode, signature: result.ResponseObject });
                  index++;
                  iterateResult();
                }
              };
              setTimeout(function() {
                console.log("DEBUG: start signing");
                signData2(item.Value, currentCertificate, pinCode, iterateCallback);
              }, 50);
            } else {
              if (success) {
                console.log("processSignatures(signatures);", signatures);
                var r = processSignatures2(signatures, fileAccessCodes);
                console.log("processSignatures(signatures) done");
                return r;
              } else {
                hideProgress(true);
              }
            }
          };
          return iterateResult();
        } else {
          hideProgress(true);
          console.log("Что то не там в подписании!");
        }
      }).then(() => {
        console.log("We return from start");
        return true;
      }).catch((err2) => {
        console.log(err2);
      });
    }, processSignatures2 = function(signatures, fileAccessCodes) {
      console.log("processSignatures", window.operationId);
      var success = true;
      var index = 0;
      var iterateSignatures = function() {
        var item = signatures[index];
        if (!isNull2(item)) {
          let headers = new Headers();
          headers.set("Content-Type", "application/json; charset=utf-8");
          return fetch("http://esep.fsa.gov.ru/Esep-WebApp/sign/ProcessClientSignatureBatch", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              operationId: window.operationId,
              fileAccessCode: item.fileAccessCode,
              signature: item.signature
            }),
            headers
          }).then(() => {
            index++;
            iterateSignatures();
            console.log("finishBatchOperation index:", index);
          });
        } else {
          console.log("finishBatchOperation fileAccessCodes:", fileAccessCodes);
          return finishBatchOperation2(fileAccessCodes);
        }
      };
      iterateSignatures();
    }, signData2 = function(base64Content, certificate, pinCode, callback) {
      SignHashCMS2(base64Content, certificate, pinCode, callback);
    }, SignHashCMS2 = function(base64Content, certificate, pinCode, callback, callbackParams) {
      SignHashInternal2(base64Content, certificate, 2, pinCode, callback, callbackParams);
    }, executeCallback2 = function(result, callback, callbackParams) {
      console.log(result);
      if (result.hasOwnProperty("IsError") && result.IsError == true) {
        myPort.postMessage({ type: "stateMessage", url: window.location.href, command: "signError", msg: result.ErrorMsg });
      }
      if (callback && typeof callback == "function") {
        callback(result, callbackParams);
      }
    }, finishBatchOperation2 = function(fileAccessCodes) {
      console.log("finishBatchOperation", fileAccessCodes);
      let headers = new Headers();
      headers.set("Content-Type", "application/json; charset=utf-8");
      return fetch("http://esep.fsa.gov.ru/Esep-WebApp/sign/FinishBatchOperation", {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify({
          operationId: window.operationId,
          fileAccessCodes
        })
      }).then(() => {
        myPort.postMessage({ type: "stateMessage", url: window.location.href, command: "signDone" });
      });
    }, InitializeCrypto2 = function(callback) {
      EsepCrypto.initialize(
        {
          cryptoInstallerUrl: window.constants.CryptoPluginUrl,
          cryptoXmlUrl: window.constants.CryptoXmlUrl,
          cryptoChromeExtensionUrl: window.constants.CryptoChromeExtensionUrl,
          cryptoFirefoxExtensionUrl: window.constants.CryptoFirefoxExtensionUrl,
          cryptoPluginHolderId: "placeCryptoPlugin",
          updatePluginHolderId: "placeUpdatePlugin",
          cryptoPluginId: window.constants.CryptoPluginId,
          cryptoPluginType: window.constants.CryptoPluginType,
          updatePluginId: window.constants.CryptoPluginUpdId,
          updatePluginType: window.constants.CryptoPluginUpdType,
          loadUpdatePlugin: true,
          checkEnvironment: true
        }
      );
    }, SignHashInternal2 = function(base64Content, certificate, format, pinCode, callback, callbackParams) {
      var pin = pinCode;
      window.batchPin = pin;
      console.log('DEBUG: really i"m debugging');
      try {
        EsepCrypto.Sign.setPin(
          pin,
          function(result) {
            if (!result.success) {
              executeCallback2(
                {
                  IsError: true,
                  ErrorMsg: "Ошибка при вызове функции криптоплагина. " + result.message,
                  ErrorType: "error"
                },
                callback,
                callbackParams
              );
              return;
            }
            var documentId = "";
            if (documentId !== "") {
              documentId = '1.3.6.1.4.1.311.88.2.3.1="' + documentId + '"';
            }
            if (format !== 3) {
              EsepCrypto.Sign.signHash(
                {
                  certIndex: certificate.Index,
                  algorithm: certificate.Algorithm,
                  base64Content,
                  format,
                  tspUrl: "http://tsp.uc-em.ru:2020/tsp/tsp.srf",
                  documentId
                },
                function(result2) {
                  if (!result2.success) {
                    executeCallback2(
                      {
                        IsError: true,
                        ErrorMsg: "Ошибка при вызове функции криптоплагина. " + result2.message,
                        ErrorType: "error"
                      },
                      callback,
                      callbackParams
                    );
                    return;
                  }
                  executeCallback2(
                    { IsError: false, ErrorMsg: "", ResponseObject: result2.body },
                    callback,
                    callbackParams
                  );
                }
              );
            }
          }
        );
      } catch (e) {
        executeCallback2(
          {
            IsError: true,
            ErrorMsg: "Ошибка при вызове функции криптоплагина. " + e.message,
            ErrorType: "error"
          },
          callback,
          callbackParams
        );
      }
    };
    var checkReady2 = checkReady22, getfileAccessCodes = getfileAccessCodes2, isNull = isNull2, start = start2, processSignatures = processSignatures2, signData = signData2, SignHashCMS = SignHashCMS2, executeCallback = executeCallback2, finishBatchOperation = finishBatchOperation2, InitializeCrypto = InitializeCrypto2, SignHashInternal = SignHashInternal2;
    console.log("content esep init");
    var myPort = browserPolyfillExports.runtime.connect({ name: "port-from-cs" });
    myPort.onMessage.addListener(function(responce) {
      console.log("In content script, received message from background script: ", responce);
      if (responce.command == "start") {
        return checkReady22(responce.operationId, responce.currentCertificate, responce.pinCode);
      }
    });
    var hashTypesAvailable = [1, 2, 3];
    var MyEsepCrypto = /* @__PURE__ */ function() {
      var n = {
        Extension: {
          Chrome: {
            requestType: {
              crypto: "CryptoHost",
              updater: "UpdaterHost",
              tab: "Tab"
            },
            tabId: null,
            sendRequest: function(t, i, r) {
              var u, f;
              t.requestType = i;
              n.Extension.Chrome.tabId != null && (t.tabId = n.Extension.Chrome.tabId);
              u = document.createTextNode(JSON.stringify(t));
              u.addEventListener("EsepCryptoExtensionResponse", function() {
                if (r && typeof r == "function") {
                  var n2 = JSON.parse(u.nodeValue);
                  r(n2);
                }
                u.parentNode.removeChild(u);
              }, false);
              document.head.appendChild(u);
              f = document.createEvent("HTMLEvents");
              f.initEvent("EsepCryptoExtensionQuery", true, false);
              u.dispatchEvent(f);
            },
            checkExtension: function() {
              return 1;
            },
            checkCryptoHostInstalled: function(t) {
              n.Extension.Chrome.sendRequest({
                text: "FakeTestMethod",
                "function": "FakeTestMethod"
              }, n.Extension.Chrome.requestType.crypto, t);
            },
            checkCryptoUpdaterHostInstalled: function(t) {
              n.Extension.Chrome.sendRequest({
                text: "FakeTestMethod",
                "function": "FakeTestMethod"
              }, n.Extension.Chrome.requestType.updater, t);
            },
            canUpdate: function(t, i) {
              n.Extension.Chrome.sendRequest({
                text: "canUpdate",
                "function": "canUpdate",
                params: {
                  UpdateChanel: t
                }
              }, n.Extension.Chrome.requestType.updater, i);
            },
            checkGostCrypto: function(t) {
              n.Extension.Chrome.sendRequest({
                text: "haveGostCrypto",
                "function": "haveGostCrypto"
              }, n.Extension.Chrome.requestType.crypto, t);
            },
            checkEnvironment: function(t) {
              n.Extension.Chrome.sendRequest({
                text: "checkEnvironment",
                "function": "checkEnvironment"
              }, n.Extension.Chrome.requestType.crypto, t);
            }
          }
        },
        Params: {
          cryptoChromeExtensionUrl: "",
          cryptoFirefoxExtensionUrl: "",
          cryptoInstallerUrl: "",
          cryptoXmlUrl: "",
          cryptoPluginHolderId: "",
          updatePluginHolderId: "",
          cryptoPluginId: "",
          cryptoPluginType: "",
          updatePluginId: "",
          updatePluginType: "",
          loadUpdatePlugin: true,
          checkEnvironment: true
        },
        cryptoPluginLoaded: false,
        updatePluginLoaded: false,
        Browser: {
          current: null,
          type: {
            chrome: "chrome",
            activex: "ie",
            firefoxNew: "nff",
            firefox: "ff",
            npapi: "npapi"
          },
          getType: function() {
            return n.Browser.current == null && (n.Browser.current = n.Browser.isNewChrome() ? n.Browser.type.chrome : n.Browser.isActiveXSupported() ? n.Browser.type.activex : n.Browser.isNewFirefox() ? n.Browser.type.firefoxNew : n.Browser.isFirefox() ? n.Browser.type.firefox : n.Browser.type.npapi), n.Browser.current;
          },
          extensionUrl: null,
          getExtensionUrl: function() {
            if (n.Browser.extensionUrl == null)
              switch (n.Browser.getType()) {
                case n.Browser.type.chrome:
                  n.Browser.extensionUrl = n.Params.cryptoChromeExtensionUrl;
                  break;
                case n.Browser.type.firefoxNew:
                  n.Browser.extensionUrl = n.Params.cryptoFirefoxExtensionUrl;
              }
            return n.Browser.extensionUrl;
          },
          isActiveX: null,
          isActiveXSupported: function() {
            if (n.Browser.isActiveX == null)
              if (n.Browser.isActiveX = false, window.ActiveXObject)
                n.Browser.isActiveX = true;
              else if ("ActiveXObject" in window)
                n.Browser.isActiveX = true;
              else
                try {
                  var i = new ActiveXObject("Microsoft.XMLDOM");
                  n.Browser.isActiveX = true;
                } catch (t) {
                  (t.name === "TypeError" || t.name === "Error") && (n.Browser.isActiveX = true);
                }
            return n.Browser.isActiveX;
          },
          newChrome: null,
          isNewChrome: function() {
            var t, i;
            if (n.Browser.newChrome == null) {
              if ((t = navigator.userAgent.toLowerCase(), !(/chrome/.test(t) && /Google Inc/.test(navigator.vendor) && typeof chrome == "object")) || (i = t.match(/chrom(e|eframe|ium)\/([0-9]+)\./), !i))
                return n.Browser.newChrome = false, false;
              n.Browser.newChrome = parseInt(i[2], 10) >= 42;
            }
            return n.Browser.newChrome;
          },
          newFirefox: null,
          isNewFirefox: function() {
            if (n.Browser.newFirefox == null) {
              var i = navigator.userAgent.toLowerCase(), t = i.match(/firefox\/([0-9]+)\./);
              if (!t)
                return n.Browser.newFirefox = false, false;
              n.Browser.newFirefox = parseInt(t[1], 10) >= 48;
            }
            return n.Browser.newFirefox;
          },
          isFF: null,
          isFirefox: function() {
            return n.Browser.isFF == null && (n.Browser.isFF = navigator.userAgent.match(/firefox/i) != null), n.Browser.isFF;
          }
        },
        Common: {
          executeCallback: function(n2, t) {
            t && typeof t == "function" && t(n2);
          },
          sendChromeRequest: function(t, i, r) {
            n.Extension.Chrome.tabId == null ? n.Extension.Chrome.sendRequest({}, n.Extension.Chrome.requestType.tab, function(u) {
              n.Extension.Chrome.tabId = u.tabId;
              n.Extension.Chrome.sendRequest(t, i, r);
            }) : n.Extension.Chrome.sendRequest(t, i, r);
          },
          Faults: {
            cryptoPluginNotFound: {
              success: false,
              message: "Криптоплагин не найден.",
              alert: "error"
            },
            waitForDownloadAndInstall: {
              success: false,
              message: "Дождитесь окончания загрузки и установите криптоплагин. Если установка будет заблокирована, добавьте сайт в зону надежных узлов.",
              alert: "warning"
            },
            gostCryptoNotFound: {
              success: false,
              message: "Не найден ГОСТ криптопровайдер.",
              alert: "error"
            }
          }
        },
        Plugin: {
          objCryptoPlugin: null,
          getCryptoPlugin: function() {
            var i, t;
            if (n.Plugin.objCryptoPlugin == null) {
              if (i = document.getElementById(n.Params.cryptoPluginHolderId), i == null)
                return null;
              if (i.innerHTML = n.Browser.isActiveXSupported() ? '<object id="idCryptoPlugin" classid="clsid:' + n.Params.cryptoPluginId + '" border="0" width="0" height="0"></object>' : '<object id="idCryptoPlugin" type="' + n.Params.cryptoPluginType + '" class="hiddenObject" border="0" width="1" height="1"></object>', n.Plugin.objCryptoPlugin = document.getElementById("idCryptoPlugin"), (typeof n.Plugin.objCryptoPlugin == "undefined" || n.Plugin.objCryptoPlugin == null) && n.Browser.isFirefox()) {
                for (t = 0; t < document.embeds.length; t++)
                  if (document.embeds[t].id === "idCryptoPlugin") {
                    n.Plugin.objCryptoPlugin = document.embeds[t];
                    break;
                  }
              }
              typeof n.Plugin.objCryptoPlugin.getVersion == "undefined" && (i.innerHTML = "", n.Plugin.objCryptoPlugin = null);
            }
            return n.Plugin.objCryptoPlugin;
          },
          objUpdatePlugin: null,
          getUpdatePlugin: function() {
            var i, t;
            if (n.Plugin.objUpdatePlugin == null) {
              if (i = document.getElementById(n.Params.updatePluginHolderId), i == null)
                return null;
              if (i.innerHTML = n.Browser.isActiveXSupported() ? '<object id="idUpdatePlugin" classid="clsid:' + n.Params.updatePluginId + '" border="0" width="0" height="0"></object>' : '<object id="idUpdatePlugin" type="' + n.Params.updatePluginType + '" class="hiddenObject" border="0" width="1" height="1"></object>', n.Plugin.objUpdatePlugin = document.getElementById("idUpdatePlugin"), (typeof n.Plugin.objUpdatePlugin == "undefined" || n.Plugin.objUpdatePlugin == null) && n.Browser.isFirefox()) {
                for (t = 0; t < document.embeds.length; t++)
                  if (document.embeds[t].id === "idUpdatePlugin") {
                    n.Plugin.objUpdatePlugin = document.embeds[t];
                    break;
                  }
              }
              typeof n.Plugin.objUpdatePlugin.canUpdate == "undefined" && (i.innerHTML = "", n.Plugin.objUpdatePlugin = null);
            }
            return n.Plugin.objUpdatePlugin;
          },
          checkCryptoPluginInstalled: function(t) {
            var i, r;
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Extension.Chrome.checkCryptoHostInstalled(function(i2) {
                  if (i2.success === "0") {
                    if (i2.message === "HostError") {
                      n.Common.executeCallback(n.Common.Faults.waitForDownloadAndInstall, t);
                      return;
                    }
                    if (i2.message === "ExtensionTimeoutError") {
                      n.Common.executeCallback({
                        success: false,
                        message: i2.message,
                        alert: "error"
                      }, t);
                      return;
                    }
                  }
                  n.Extension.Chrome.checkEnvironment(function(i3) {
                    i3.success !== "1" ? (typeof i3.messages == "undefined" || i3.messages == null) && i3.message != null ? n.Extension.Chrome.checkGostCrypto(function(i4) {
                      i4.success !== "1" || i4.hasprovider !== "1" ? n.Common.executeCallback(n.Common.Faults.gostCryptoNotFound, t) : (n.cryptoPluginLoaded = true, n.Common.executeCallback({
                        success: true
                      }, t));
                      return;
                    }) : n.Common.executeCallback({
                      success: false,
                      message: i3.messages.join("<br />"),
                      alert: "error"
                    }, t) : (n.cryptoPluginLoaded = true, n.Common.executeCallback({
                      success: true
                    }, t));
                    return;
                  });
                });
                break;
              default:
                if (i = n.Plugin.getCryptoPlugin(), i == null) {
                  n.Common.executeCallback(n.Common.Faults.waitForDownloadAndInstall, t);
                  return;
                }
                if (typeof i.checkEnvironment == "undefined" && !i.haveGostCrypto()) {
                  n.Common.executeCallback(n.Common.Faults.gostCryptoNotFound, t);
                  return;
                }
                if (r = i.checkEnvironment(), !r.success) {
                  n.Common.executeCallback({
                    success: false,
                    message: r.messages.replace(/;/g, "\r\n"),
                    alert: "error"
                  }, t);
                  return;
                }
                n.cryptoPluginLoaded = true;
                n.Common.executeCallback({
                  success: true
                }, t);
                return;
            }
          },
          checkUpdatePluginInstalled: function(t) {
            var i = {
              success: false,
              message: "Дождитесь окончания загрузки и установите криптоплагин. Если установка будет заблокирована, добавьте сайт в зону надежных узлов.",
              alert: "warning",
              url: n.Params.cryptoInstallerUrl
            };
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Extension.Chrome.checkCryptoUpdaterHostInstalled(function(r) {
                  if (r.success === "0") {
                    if (r.message === "HostError") {
                      n.Common.executeCallback(i, t);
                      return;
                    }
                    if (r.message === "ExtensionTimeoutError") {
                      n.Common.executeCallback({
                        success: false,
                        message: r.message,
                        alert: "error"
                      }, t);
                      return;
                    }
                  }
                  n.updatePluginLoaded = true;
                  n.Common.executeCallback({
                    success: true
                  }, t);
                  return;
                });
                break;
              default:
                if (n.Plugin.getUpdatePlugin() == null) {
                  n.Common.executeCallback(i, t);
                  return;
                }
                n.updatePluginLoaded = true;
                n.Common.executeCallback({
                  success: true
                }, t);
                return;
            }
          },
          doUpdate: function(t) {
            var i = {
              success: false,
              message: "Неудачная попытка обновления, необходимо скачать и установить криптоплагин вручную.",
              alert: "error",
              url: n.Params.cryptoInstallerUrl
            }, r;
            if (!n.updatePluginLoaded) {
              n.Common.executeCallback(i, t);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "doIt",
                  "function": "doIt",
                  params: {
                    UpdateChanel: n.Params.cryptoXmlUrl
                  }
                }, n.Extension.Chrome.requestType.updater, function(r2) {
                  if (r2.success !== "1") {
                    if (r2.needUpdate === "1") {
                      n.Common.executeCallback(i, t);
                      return;
                    }
                    n.Common.executeCallback(n.Common.Faults.waitForDownloadAndInstall, t);
                    return;
                  }
                  n.Common.executeCallback(n.Common.Faults.waitForDownloadAndInstall, t);
                  return;
                });
                break;
              default:
                if (r = n.Plugin.getUpdatePlugin().doIt(n.Params.cryptoXmlUrl), r.success) {
                  n.Common.executeCallback(n.Common.Faults.waitForDownloadAndInstall, t);
                  return;
                }
                if (r.needUpdate) {
                  n.Common.executeCallback(i, t);
                  return;
                }
                n.Common.executeCallback(n.Common.Faults.waitForDownloadAndInstall, t);
                return;
            }
          },
          setParameter: function(t, i) {
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "SetParameter",
                  "function": "SetParameter",
                  params: {
                    ParamName: t.name,
                    ParamValue: t.value
                  }
                }, n.Extension.Chrome.requestType.crypto, function(t2) {
                  t2.success = t2.success === "1";
                  n.Common.executeCallback(t2, i);
                });
                break;
              default:
                var r = n.Plugin.getCryptoPlugin().setParameter(t.name, t.value);
                n.Common.executeCallback(r, i);
            }
          }
        },
        initialize: function(t, i) {
          var f, e, r, o, u, s;
          for (f in t)
            t.hasOwnProperty(f) && (n.Params[f] = t[f]);
          n.cryptoPluginLoaded = false;
          n.updatePluginLoaded = false;
          switch (n.Browser.getType()) {
            case n.Browser.type.chrome:
            case n.Browser.type.firefoxNew:
              if (!n.Extension.Chrome.checkExtension()) {
                n.Common.executeCallback({
                  success: false,
                  message: "Расширение браузера не найдено. Пожалуйста, установите расширение, затем обновите страницу.",
                  alert: "error",
                  url: n.Browser.getExtensionUrl()
                }, i);
                return;
              }
              n.Extension.Chrome.checkCryptoHostInstalled(function(t2) {
                if (t2.success === "0") {
                  if (t2.message === "HostError") {
                    n.Common.executeCallback({
                      success: false,
                      needUpdate: false,
                      needInstall: true
                    }, i);
                    return;
                  }
                  if (t2.message === "ExtensionTimeoutError") {
                    n.Common.executeCallback({
                      success: false,
                      message: t2.message,
                      alert: "error"
                    }, i);
                    return;
                  }
                }
                if (n.cryptoPluginLoaded = true, n.Params.loadUpdatePlugin === true)
                  n.Extension.Chrome.checkCryptoUpdaterHostInstalled(function(t3) {
                    if (t3.success === "0" && t3.message === "HostError") {
                      n.Common.executeCallback({
                        success: false,
                        needUpdate: false,
                        needInstall: true
                      }, i);
                      return;
                    }
                    if (t3.message === "ExtensionTimeoutError") {
                      n.Common.executeCallback({
                        success: false,
                        message: t3.message,
                        alert: "error"
                      }, i);
                      return;
                    }
                    n.updatePluginLoaded = true;
                    n.Extension.Chrome.canUpdate(n.Params.cryptoXmlUrl, function(t4) {
                      if (t4.success === "1") {
                        n.Common.executeCallback({
                          success: false,
                          needUpdate: true,
                          needInstall: false,
                          versionCurrent: t4.version,
                          versionServer: t4.serverVersion
                        }, i);
                        return;
                      }
                      if (n.Params.checkEnvironment === true)
                        n.Extension.Chrome.checkEnvironment(function(t5) {
                          t5.success !== "1" ? (typeof t5.messages == "undefined" || t5.messages == null) && t5.message != null ? n.Extension.Chrome.checkGostCrypto(function(t6) {
                            t6.success !== "1" || t6.hasprovider !== "1" ? n.Common.executeCallback(n.Common.Faults.gostCryptoNotFound, i) : n.Common.executeCallback({
                              success: true
                            }, i);
                            return;
                          }) : n.Common.executeCallback({
                            success: false,
                            message: t5.messages.join("<br />"),
                            alert: "error"
                          }, i) : n.Common.executeCallback({
                            success: true
                          }, i);
                          return;
                        });
                      else {
                        n.Common.executeCallback({
                          success: true
                        }, i);
                        return;
                      }
                    });
                  });
                else if (n.Params.checkEnvironment === true)
                  n.Extension.Chrome.checkEnvironment(function(t3) {
                    t3.success !== "1" ? (typeof t3.messages == "undefined" || t3.messages == null) && t3.message != null ? n.Extension.Chrome.checkGostCrypto(function(t4) {
                      t4.success !== "1" || t4.hasprovider !== "1" ? n.Common.executeCallback(n.Common.Faults.gostCryptoNotFound, i) : n.Common.executeCallback({
                        success: true
                      }, i);
                      return;
                    }) : n.Common.executeCallback({
                      success: false,
                      message: t3.messages.join("<br />"),
                      alert: "error"
                    }, i) : n.Common.executeCallback({
                      success: true
                    }, i);
                    return;
                  });
                else {
                  n.Common.executeCallback({
                    success: true
                  }, i);
                  return;
                }
              });
              break;
            default:
              if (n.Params.loadUpdatePlugin === true && (e = n.Plugin.getUpdatePlugin(), e != null && (n.updatePluginLoaded = true, r = e.canUpdate(n.Params.cryptoXmlUrl), o = !r.success && r.version === "", r.success || o))) {
                n.Common.executeCallback({
                  success: false,
                  needUpdate: r.success || o,
                  needInstall: false,
                  versionCurrent: r.version === "" ? "(unknown)" : r.version,
                  versionServer: r.serverVersion === "" ? "(unknown)" : r.serverVersion
                }, i);
                return;
              }
              if (u = n.Plugin.getCryptoPlugin(), u == null) {
                n.Common.executeCallback({
                  success: false,
                  needUpdate: false,
                  needInstall: true
                }, i);
                return;
              }
              if (n.cryptoPluginLoaded = true, n.Params.checkEnvironment === true) {
                if (typeof u.checkEnvironment == "undefined" && !u.haveGostCrypto()) {
                  n.Common.executeCallback(n.Common.Faults.gostCryptoNotFound, i);
                  return;
                }
                if (s = u.checkEnvironment(), !s.success) {
                  n.Common.executeCallback({
                    success: false,
                    message: s.messages.replace(/;/g, "\r\n"),
                    alert: "error"
                  }, i);
                  return;
                }
              }
              n.Common.executeCallback({
                success: true
              }, i);
              return;
          }
        },
        Certificate: {
          updateCertificates: function(t) {
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, t);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "UpdateCertificateList",
                  "function": "UpdateCertificateList"
                }, n.Extension.Chrome.requestType.crypto, function() {
                  n.Common.executeCallback({
                    success: true
                  }, t);
                });
                break;
              default:
                n.Plugin.getCryptoPlugin().updateCertificateList();
                n.Common.executeCallback({
                  success: true
                }, t);
                return;
            }
          },
          selectCertificateUI: function(t) {
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, t);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "SelectCertificateUI",
                  "function": "SelectCertificateUI"
                }, n.Extension.Chrome.requestType.crypto, function(i2) {
                  i2.Index = Number(i2.Index);
                  i2.success = i2.success === "1";
                  n.Common.executeCallback(i2, t);
                });
                break;
              default:
                var i = n.Plugin.getCryptoPlugin().selectCertificate();
                n.Common.executeCallback(i, t);
                return;
            }
          },
          getCertificatesList: function(t) {
            var r, i;
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, t);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "GetCertificateList",
                  "function": "GetCertificateList"
                }, n.Extension.Chrome.requestType.crypto, function(i2) {
                  i2.success = i2.success === "1";
                  i2.count = Number(i2.count);
                  n.Common.executeCallback(i2, t);
                });
                break;
              default:
                var u = n.Plugin.getCryptoPlugin(), f = u.getCertificatesCount(), e = {
                  success: true,
                  count: f
                };
                for (r = 0; r < f; r++)
                  i = u.getCertificateInfo(r), e[r.toString()] = {
                    SerialNumber: i.SerialNumber,
                    Subject: i.Subject,
                    Issuer: i.Issuer,
                    StartDate: i.StartDate,
                    EndDate: i.EndDate
                  };
                n.Common.executeCallback(e, t);
                return;
            }
          },
          getCertificateInfo: function(t, i) {
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "GetCertificate",
                  "function": "GetCertificate",
                  params: {
                    Index: t.toString()
                  }
                }, n.Extension.Chrome.requestType.crypto, function(t2) {
                  t2.success = t2.success === "1";
                  t2.Index = Number(t2.Index);
                  t2.count = Number(t2.count);
                  n.Common.executeCallback(t2, i);
                });
                break;
              default:
                var r = n.Plugin.getCryptoPlugin().getCertificateInfo(t);
                n.Common.executeCallback(r, i);
            }
          },
          getCertificatesCount: function(t) {
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, t);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "GetCertificateCount",
                  "function": "GetCertificateCount"
                }, n.Extension.Chrome.requestType.crypto, function(i2) {
                  n.Common.executeCallback(Number(i2.count), t);
                });
                break;
              default:
                var i = n.Plugin.getCryptoPlugin().getCertificatesCount();
                n.Common.executeCallback(i, t);
            }
          },
          importCertificate: function(t, i) {
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "ImportCertificate",
                  "function": "ImportCertificate",
                  params: {
                    Certificate: t
                  }
                }, n.Extension.Chrome.requestType.crypto, function(t2) {
                  t2.success = t2.success === "1";
                  n.Common.executeCallback(t2, i);
                });
                break;
              default:
                var r = n.Plugin.getCryptoPlugin().importCert(t);
                n.Common.executeCallback(r, i);
            }
          },
          certificateRequest: function(t, i) {
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "CertificateRequest",
                  "function": "CertificateRequest",
                  params: {
                    Subject: t.subject,
                    Extensions: t.extensions
                  }
                }, n.Extension.Chrome.requestType.crypto, function(t2) {
                  t2.success = t2.success === "1";
                  n.Common.executeCallback(t2, i);
                });
                break;
              default:
                var r = n.Plugin.getCryptoPlugin().certificateRequest(t.subject, t.extensions);
                n.Common.executeCallback(r, i);
            }
          }
        },
        File: {
          hashData: function(t, i) {
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "HashData",
                  "function": "HashData",
                  params: {
                    B64Data: t
                  }
                }, n.Extension.Chrome.requestType.crypto, function(t2) {
                  t2.success = t2.success === "1";
                  n.Common.executeCallback(t2, i);
                });
                break;
              default:
                var r = n.Plugin.getCryptoPlugin().hashData(t);
                n.Common.executeCallback(r, i);
                return;
            }
          },
          selectFile: function(t, i) {
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "SelectFile",
                  "function": "SelectFile",
                  params: {
                    DefaultName: t.path,
                    Extensions: t.filter
                  }
                }, n.Extension.Chrome.requestType.crypto, function(t2) {
                  t2.success = t2.success === "1";
                  n.Common.executeCallback(t2, i);
                });
                break;
              default:
                var r = n.Plugin.getCryptoPlugin().SelectFile(t.path, t.filter);
                n.Common.executeCallback(r, i);
                return;
            }
          },
          fileToBase64: function(t, i) {
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "LoadFile",
                  "function": "LoadFile",
                  params: {
                    File: t
                  }
                }, n.Extension.Chrome.requestType.crypto, function(t2) {
                  t2.success = t2.success === "1";
                  n.Common.executeCallback(t2, i);
                });
                break;
              default:
                var r = n.Plugin.getCryptoPlugin().LoadFile(t);
                n.Common.executeCallback(r, i);
                return;
            }
          }
        },
        Sign: {
          setPin: function(t, i) {
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "SetPINCode",
                  "function": "SetPINCode",
                  params: {
                    PIN: t
                  }
                }, n.Extension.Chrome.requestType.crypto, function(t2) {
                  t2.success = t2.success === "1";
                  n.Common.executeCallback(t2, i);
                });
                break;
              default:
                var r = n.Plugin.getCryptoPlugin().setPINCode(t);
                n.Common.executeCallback(r, i);
                return;
            }
          },
          signHash: function(t, i) {
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "SignHash",
                  "function": "SignHash",
                  params: {
                    CertIndex: t.certIndex.toString(),
                    B64Hash: t.base64Content,
                    SignFormat: t.format.toString(),
                    TSPUrl: t.tspUrl,
                    DocID: t.documentId,
                    AlgId: (t.algorithm == null ? n.Common.hashAlgorithmTypes.GOST3411 : t.algorithm).toString()
                  }
                }, n.Extension.Chrome.requestType.crypto, function(t2) {
                  t2.success = t2.success === "1";
                  n.Common.executeCallback(t2, i);
                });
                break;
              default:
                var r = n.Plugin.getCryptoPlugin().signHash(t.certIndex, t.base64Content, t.format, t.tspUrl, t.documentId);
                n.Common.executeCallback(r, i);
                return;
            }
          },
          signPdf: function(t, i) {
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "SignPDF",
                  "function": "SignPDF",
                  params: {
                    CertIndex: t.certIndex.toString(),
                    B64Data: t.base64Content
                  }
                }, n.Extension.Chrome.requestType.crypto, function(t2) {
                  t2.success = t2.success === "1";
                  n.Common.executeCallback(t2, i);
                });
                break;
              default:
                var r = n.Plugin.getCryptoPlugin().signPDF(t.certIndex, t.base64Content);
                n.Common.executeCallback(r, i);
                return;
            }
          },
          signData: function(t, i) {
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "SignData",
                  "function": "SignData",
                  params: {
                    B64Data: t.base64Content,
                    CertIndex: t.certIndex.toString(),
                    Detached: t.detached ? "1" : "0",
                    Attributes: t.attributes
                  }
                }, n.Extension.Chrome.requestType.crypto, function(t2) {
                  t2.success = t2.success === "1";
                  n.Common.executeCallback(t2, i);
                });
                break;
              default:
                var r = n.Plugin.getCryptoPlugin().signDataCryptoAPI(t.base64Content, t.certIndex, t.detached, t.attributes);
                r.success && (r.body = r.body.replace(/\s+/g, ""));
                n.Common.executeCallback(r, i);
                return;
            }
          },
          sign: function(t, i) {
            if (!n.cryptoPluginLoaded) {
              n.Common.executeCallback(n.Common.Faults.cryptoPluginNotFound, i);
              return;
            }
            switch (n.Browser.getType()) {
              case n.Browser.type.chrome:
              case n.Browser.type.firefoxNew:
                n.Common.sendChromeRequest({
                  text: "Sign",
                  "function": "Sign",
                  params: {
                    B64Data: t.base64Content,
                    CertIndex: t.certIndex.toString(),
                    CalcHash: t.calcHash ? "1" : "0"
                  }
                }, n.Extension.Chrome.requestType.crypto, function(t2) {
                  t2.success = t2.success === "1";
                  n.Common.executeCallback(t2, i);
                });
                break;
              default:
                var r = n.Plugin.getCryptoPlugin().sign(t.certIndex, t.base64Content, t.calcHash);
                r.success && (r.signature = r.signature.replace(/\s+/g, ""));
                n.Common.executeCallback(r, i);
                return;
            }
          }
        }
      };
      return n;
    }();
    var EsepCrypto = MyEsepCrypto;
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
    };
    InitializeCrypto2();
    console.log("content esep init");
    myPort.postMessage({ url: window.location.href, command: "loaded" });
  } catch (error) {
    console.log(err);
  }
})();
