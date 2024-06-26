(function() {
  "use strict";
  class MyEnv {
    constructor() {
      this.awaitMessage = [];
      this.stateMessage = [];
    }
  }
  const Envi = new MyEnv();
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
  class Token {
    constructor() {
      this.secToken = [];
      this.started = false;
      this.orgId = "";
      this.certificationAuthority = false;
      this.esiaOrgInfo = false;
      console.log("Init Token");
    }
    uintToString(uintArray) {
      var encodedString = String.fromCharCode.apply(null, uintArray), decodedString = decodeURIComponent(escape(encodedString));
      return decodedString;
    }
    parseToken(requestDetails) {
      if (requestDetails.method == "POST") {
        if (requestDetails.requestHeaders)
          requestDetails.requestHeaders.forEach((item) => {
            if (item.name == "Authorization") {
              var token2 = item.value.replace(/^Bearer\s+/, "");
              this.setToken(token2);
            }
            if (item.name == "orgId") {
              this.setOrgId(item.value);
            }
          });
      }
    }
    parseOrganData(requestDetails) {
      switch (requestDetails.method) {
        case "POST":
          if (requestDetails.url.includes("/api/v1/rds/common/applications") && requestDetails.requestBody.raw.length) {
            var resp = JSON.parse(
              this.uintToString(new Uint8Array(requestDetails.requestBody.raw[0].bytes))
            );
            if (!this.certificationAuthority) {
              browserPolyfillExports.storage.local.set({
                certificationAuthority: JSON.stringify(resp.certificationAuthority)
              });
            }
          }
          break;
      }
      return;
    }
    setOrgId(orgId) {
      if (this.orgId != orgId) {
        this.orgId = orgId;
        browserPolyfillExports.storage.local.set({ orgId });
      }
    }
    setToken(token2) {
      console.log("token :>> ", token2, !this.secToken.some((item) => item == token2));
      if (!token2)
        return;
      if (!this.secToken.some((item) => item == token2)) {
        this.secToken.push(token2);
        browserPolyfillExports.storage.local.set({ fgisToken: token2 });
      }
    }
    getOrgId() {
      return this.orgId;
    }
    getToken() {
      return this.secToken.length ? this.secToken[this.secToken.length - 1] : "";
    }
    start() {
      if (this.started)
        return;
      this.started = true;
      var url = ["*://10.250.74.17/*", "*://srd.fsa.gov.ru/*"];
      browserPolyfillExports.webRequest.onBeforeSendHeaders.addListener(
        this.parseToken.bind(this),
        { urls: url },
        ["requestHeaders"]
      );
      browserPolyfillExports.webRequest.onBeforeRequest.addListener(
        this.parseOrganData.bind(this),
        { urls: url },
        ["requestBody"]
      );
      this.setToken(browserPolyfillExports.storage.local.get("fgisToken"));
    }
    checkToken() {
      if (this.token.getToken() == "") {
        throw "Нет токена. Залогиньтесь в 10.250.74.17, srd.fsa.gov.ru";
      }
    }
  }
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
    constructor(settings2, domain, advance_type) {
      try {
        this.agency_code = settings2.agency_code;
        this.agency_keyword = settings2.agency_keyword;
        this.document_token = settings2.document_token || null;
        this.apiVersion = this.document_token ? 3 : 2;
        this.domain = domain;
        this.Endpoint = ({ method, url, params, returnType, description }) => new Endpoint(this, method, url, params, returnType, description);
        this.advance_type = advance_type;
        this.repeatCount = 0;
        this.currentUserId = 0;
        this.maxRepeat = 5;
        this.miss_throw = false;
        this.data = {
          agencyData: { method: "GET", url: `/api/v${this.apiVersion}/fgis/agency/data` },
          experts: { method: "GET", url: `/api/v${this.apiVersion}/fgis/agency/experts` },
          getCurrentUserId: { method: "GET", url: "/Account/GetCurrentUserId", noKeys: true }
        };
        this.statement = {
          queue: {
            method: "GET",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/statement/queue`
          },
          show: {
            method: "GET",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/statement/show/{id}`,
            params: ["id"]
          },
          init: {
            method: "PUT",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/statement/init/{id}`,
            params: ["id"],
            description: "user_id"
          },
          get_url: {
            method: "GET",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/statement/url/{id}`,
            params: ["id"]
          },
          set_url: {
            method: "PUT",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/statement/set_url`
          },
          get_state: {
            method: "GET",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/statement/status/{id}`,
            params: ["id"]
          },
          set_status: {
            method: "PUT",
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
                                  Подписано - Signed`
          }
        };
        this.document = {
          show: {
            method: "GET",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/show/{id}`,
            params: ["id"]
          },
          download_archive: {
            method: "GET",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/download/{id}`,
            params: ["id"]
          },
          get_protocols: {
            method: "GET",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/protocols`,
            params: ["id"]
          },
          get_file_protocol: {
            method: "GET",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/protocols/files/{fileId}`,
            params: ["id", "fileId"],
            returnType: "blob"
          },
          put_file_protocol: {
            method: "PUT",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/protocols/files/{fileId}/set_id`,
            params: ["id", "fileId"],
            description: "fgis_file_id - идентификатор загруженного файла протокола во ФГИС сохраняет идентификатор ФГИС файла протокола"
          },
          get_document_files: {
            method: "GET",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/applicant/files`,
            params: ["id"]
          },
          get_file_document: {
            method: "GET",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/applicant/file/{fileId}`,
            params: ["id", "fileId"],
            returnType: "blob"
          },
          put_file_document: {
            method: "PUT",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/applicant/file/{fileId}/set_id`,
            params: ["id", "fileId"],
            description: "fgis_file_id - идентификатор загруженного файла протокола во ФГИС сохраняет идентификатор ФГИС файла протокола"
          },
          init: {
            method: "PUT",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/init/{id}`,
            params: ["id"]
          },
          get_state: {
            method: "GET",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/status/{id}`,
            params: ["id"]
          },
          set_status: {
            method: "PUT",
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
                                    Подписано - Signed`
          },
          last: {
            method: "GET",
            url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/last`
          },
          blanks: {
            method: "GET",
            url: `/api/v${this.apiVersion}/fgis/STREA/document/blanks/{id}`,
            params: ["id"]
          }
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
          "cert_other_doc"
        ].forEach((endpoint) => {
          this.document[endpoint] = this.generate_files_endpoints(endpoint);
        });
        console.log("Advance :>> ", this);
      } catch (error) {
        console.log("Advance err :>> ", error);
      }
    }
    generate_files_endpoints(document_name) {
      return {
        get_list: this.Endpoint({
          method: "GET",
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/${document_name}/files`,
          params: ["id"]
        }),
        get_file: this.Endpoint({
          method: "GET",
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/${document_name}/file/{fileId}`,
          params: ["id", "fileId"],
          returnType: "blob"
        }),
        put_file_info: this.Endpoint({
          method: "PUT",
          url: `/api/v${this.apiVersion}/fgis/${this.advance_type}/document/{id}/${document_name}/file/{fileId}/set_id`,
          params: ["id", "fileId"],
          description: "fgis_file_id - идентификатор загруженного файла протокола во ФГИС сохраняет идентификатор ФГИС файла протокола"
        })
      };
    }
    async getCurrentUserId() {
      console.log("currentUserId", this.currentUserId);
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
      let firstRow = "Ошибка в адвансе!\r\n";
      msg += firstRow;
      console.log(msg);
      throw msg;
    }
    async fetch_with_timeout(url, params, timeOut = 3e4) {
      console.log("Start fetch_with_timeout. TimeOut:", timeOut);
      var controller = new AbortController();
      controller.signal;
      var p1 = new Promise(function(resolve, reject) {
        setTimeout(() => {
          controller.abort();
          reject("Out timeout end");
        }, timeOut);
      });
      var p2 = new Promise(function(resolve, reject) {
        fetch(url, params).then((res) => resolve(res)).catch((err2) => reject(err2));
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
          throw "Не указан ключ agency_code";
        }
        if (!this.document_token && !this.agency_keyword) {
          throw "Не указан ключ agency_keyword";
        }
        let objUrl = o.url;
        if (o.params) {
          if (!opt.hasOwnProperty("params"))
            return this.ownException("Для этого запроса обязательны параметры.");
          o.params.forEach((element) => {
            if (!opt.params.hasOwnProperty(element)) {
              return this.ownException(
                `Кажется вы забыли указать обязательный параметр.
                        ${objUrl}
                        Нужны: ${o.params.toString()}
                        Пришли: ${opt.params.toString()}
                        `
              );
            }
            objUrl = objUrl.replace(`{${element}}`, opt.params[element]);
          });
        }
        let url = new URL(objUrl, this.domain);
        let body = new FormData();
        let params = {
          method: o.method,
          credentials: "include"
        };
        if (opt.body) {
          if (!Array.isArray(opt.body)) {
            return this.ownException("Body должен быть array!");
          }
          opt.body.forEach((element) => {
            body.set(element.name, element.value);
          });
        }
        switch (o.method) {
          case "GET":
            if (this.document_token) {
              url.searchParams.set("document_token", this.document_token);
            } else {
              url.searchParams.set("agency_code", this.agency_code);
              url.searchParams.set("agency_keyword", this.agency_keyword);
            }
            break;
          case "PUT":
            if (this.document_token) {
              body.set("document_token", this.document_token);
            } else {
              body.set("agency_code", this.agency_code);
              body.set("agency_keyword", this.agency_keyword);
            }
            params.body = body;
            break;
          case "POST":
            if (this.document_token) {
              body.set("document_token", this.document_token);
            } else {
              body.set("agency_code", this.agency_code);
              body.set("agency_keyword", this.agency_keyword);
            }
            params.body = body;
            break;
        }
        console.log("Fgis fetch", url.href, o.noObjResp);
        let f = o.hasOwnProperty("timeOut") ? this.fetch_with_timeout(url.href, params, o.timeOut) : fetch(url.href, params);
        return f.then((response) => {
          if (response.status != 200) {
            throw "Cервер не отвечает" + response;
          }
          if (o.returnType && o.returnType == "blob" && response.headers.get("Content-Type") == "text/html") {
            return response.blob();
          }
          return response.json().then((obj) => {
            console.log(obj);
            if (o == this.data.getCurrentUserId) {
              return obj;
            }
            if (obj.status == "error") {
              this.miss_throw = true;
              throw "Статус error.\r\n" + obj.message;
            }
            if (obj.status != "success") {
              throw "Неизвестный статус!.\r\n" + obj.message;
            }
            return obj.data;
          });
        }).catch((error) => {
          let maxRepeat = o.hasOwnProperty("maxRepeat") ? o.maxRepeat : this.maxRepeat;
          if (repeat && this.maxRepeat >= this.repeatCount && !this.miss_throw) {
            console.log("It was repeat", this.repeatCount, "/", maxRepeat);
            let self2 = this;
            return new Promise(function(resolve, reject) {
              setTimeout(function() {
                self2.fetch(o, opt, repeat, true).then((resp) => resolve(resp)).catch((error2) => {
                  reject(error2);
                });
              }, 1e3);
            });
          } else {
            return this.ownException(error);
          }
        });
      } catch (error) {
        console.log("Ошибка в конструкции fetch в Advance", error);
        return this.ownException("Ошибка в конструкции fetch в Advance", error);
      }
    }
  }
  function err$1(msg) {
    console.error(msg);
    throw msg;
  }
  function checkMode(mode) {
    if (mode !== "declarations" && mode !== "applications") {
      err$1("Не известный mode в class Sign.");
    }
  }
  class Sign {
    constructor(ids, fgis, mode, settings2, blanks) {
      checkMode(mode);
      this.ids = ids;
      this.mode = mode;
      this.fgis = fgis;
      this.settings = settings2;
      this.blanks = blanks;
      this.signTypeName = this._getSignTypeName();
      this.createSignedFileBody = this._getCreateSignedFileBody();
      this.logData = {};
      this.sign = {
        registrateBlanks: {
          method: "POST",
          url: `api/v1/rss/common/blanks/ids`,
          repeat: true,
          maxRepeat: 5,
          timeOut: 6e4
        },
        createSignedFile: {
          method: "POST",
          url: `api/v1/${this.fgis.fgisType}/common/${this.signTypeName}/createSignedFile`,
          body: this.createSignedFileBody,
          repeat: true,
          maxRepeat: 5,
          timeOut: 6e4
        },
        createsignui: {
          method: "POST",
          url: "/api/v1/storage/common/signop/createsignui",
          repeat: true,
          maxRepeat: 5,
          timeOut: 6e4
        }
      };
    }
    _getCreateSignedFileBody() {
      if (this.fgis.fgisType == "rss" && this.mode == "declarations") {
        return this.blanks;
      } else if (this.fgis.fgisType == "rds" || this.fgis.fgisType == "rss" || this.fgis.fgisType == "srd") {
        return {
          ids: this.ids,
          verifySignature: true
        };
      } else {
        err$1("Не известный _getCreateSignedFileBody");
      }
    }
    _getSignTypeName() {
      if (this.mode == "applications") {
        return "applications";
      } else if (this.fgis.fgisType == "rds" || this.fgis.fgisType == "srd") {
        return "declarations";
      } else if (this.fgis.fgisType == "rss") {
        return "certificates";
      } else {
        err$1("Не известный _getSignTypeName");
      }
    }
    start() {
      return this.createSignedFile().then(() => this.createsignui()).then(() => this.signDocument());
    }
    createSignedFile() {
      var self2 = this;
      function _parseRes(respData) {
        if (self2.fgis.fgisType == "rds" || self2.fgis.fgisType == "srd") {
          return respData;
        } else if (self2.fgis.fgisType == "rss") {
          if (self2.mode == "declarations") {
            return { items: [respData] };
          } else {
            return { items: respData };
          }
        } else {
          err$1("Не может спарсить результат в _parseRes, " + self2.fgis.fgisType);
        }
      }
      function _find_annexBlankId(blanksWithIds, numberStr) {
        let blank = blanksWithIds.annexBlanks.find((annexBlank) => {
          return annexBlank.number == Number(numberStr);
        });
        if (blank)
          return blank.id;
        return 1;
      }
      var action;
      if (this.fgis.fgisType == "rss" && this.mode == "declarations") {
        console.log("this.sign.createSignedFile.body :>> ", this.sign.createSignedFile.body);
        var annexBlankNumbers = [];
        this.sign.createSignedFile.body.annexes.forEach((annexes) => {
          annexes.annexBlanks.forEach((annexBlank) => {
            annexBlankNumbers.push(Number(annexBlank.blankNumber));
          });
        });
        action = this.fgis.fetch(this.sign.registrateBlanks, {
          body: {
            certificateBlankNumber: this.sign.createSignedFile.body.blankNumber,
            annexBlankNumbers
          }
        }).then((blanksWithIds) => {
          this.sign.createSignedFile.body.idBlank = blanksWithIds.certificateBlank.id;
          console.log("blanksWithIds :>> ", blanksWithIds);
          this.sign.createSignedFile.body.annexes.forEach((annexes) => {
            annexes.annexBlanks.forEach((annexBlank) => {
              annexBlank.idBlank = _find_annexBlankId(blanksWithIds, annexBlank.blankNumber);
            });
          });
          return this.fgis.fetch(this.sign.createSignedFile, {
            body: this.sign.createSignedFile.body
          });
        });
      } else {
        action = this.fgis.fetch(this.sign.createSignedFile, {
          body: this.sign.createSignedFile.body
        });
      }
      return action.then((respData) => {
        this.logData.createSignedFile = {
          body: this.sign.createSignedFile.body,
          response: _parseRes(respData)
        };
      });
    }
    createsignui() {
      var fileIds = this.logData.createSignedFile.response.items.map((el) => el.idFile);
      var body = {
        clientSigningMode: "Batch",
        fileIds,
        returnUrl: ""
      };
      return this.fgis.fetch(this.sign.createsignui, { body }).then((respData) => {
        this.logData.createsignui = {
          body,
          response: respData
        };
      });
    }
    signDocument() {
      Envi.awaitMessage.push({
        url: this.logData.createsignui.response.url,
        command: "loaded",
        responce: {
          command: "start",
          operationId: this.logData.createsignui.response.operationId,
          currentCertificate: {
            Index: parseInt(this.settings.indexCertif),
            Algorithm: parseInt(this.settings.algorithm)
          },
          pinCode: this.settings.pwdCertif
        }
      });
      var masterTab;
      var self2 = this;
      function _updatestate() {
        return self2.fgis.fetch(self2.fgis.sign.updatestate, {
          params: { id: self2.logData.createsignui.response.operationId }
        });
      }
      function _collectsignatures() {
        return self2.fgis.fetch(self2.fgis.sign.collectsignatures, {
          params: { id: self2.logData.createsignui.response.operationId }
        });
      }
      function _signaturesinfo() {
        return self2.fgis.fetch(self2.fgis.sign.signaturesinfo, {
          params: {
            fileId: self2.logData.createSignedFile.response.items[0].idFile
          }
        });
      }
      return browserPolyfillExports.tabs.create({
        url: this.logData.createsignui.response.url,
        active: false
      }).then((tab) => masterTab = tab).then(() => this.checkMessage(this.logData.createsignui.response.url)).then(() => _updatestate()).then(() => _collectsignatures()).then(() => _signaturesinfo()).then(() => {
        var action;
        switch (this.mode) {
          case "declarations":
            action = this.fgis.fetch(this.fgis.sign.dsSend, {
              body: this.createSignedFileBody
            });
            break;
          case "applications":
            action = this.fgis.fetch(this.fgis.sign.send, {
              body: this.createSignedFileBody
            });
            break;
        }
        return action;
      }).finally(() => {
        {
          browserPolyfillExports.tabs.remove([masterTab.id]);
        }
      });
    }
    checkMessage(url) {
      var count = 0;
      return new Promise((resolve, reject) => {
        var f = function() {
          var m = Envi.stateMessage.find((el) => el.command == "signDone" && el.url == url);
          if (m) {
            Envi.stateMessage = Envi.stateMessage.filter((el) => el.command !== "signDone" && el.url !== url);
            return resolve();
          } else {
            var errMsg = Envi.stateMessage.find((el) => el.command == "signError" && el.url == url);
            if (errMsg) {
              reject("ФГИС сломался : " + errMsg.msg);
            }
            if (count >= 90) {
              reject("Превышен лимит ожидания подписи");
            } else {
              count += 1;
              setTimeout(f, 1e3);
            }
          }
        };
        f();
      });
    }
  }
  class Fgis {
    constructor({ token: token2, advance, mode, settings: settings2, fgisType }) {
      checkMode(mode);
      this.token = token2;
      this.advance = advance;
      this.mode = mode;
      this.settings = settings2;
      this.fgisType = fgisType;
      this.maxRepeat = 5;
      this.repeatCount = 1;
      this.pub_document_type = this._get_pub_document_type(this.fgisType);
      this.sub_type_name = this._get_sub_type_name(this.fgisType);
      this.domain = this._get_domain(this.fgisType);
      this.full_url_pattern = this._get_full_url_pattern(this.fgisType);
      this.document_url = this._get_document_url(this.domain, this.fgisType, this.full_url_pattern);
      this.agencyData = fgisType == "srd" ? false : this.getOrganData();
      this.headers = new Headers();
      this.statement_url = `${this.domain}/${this.fgisType}/application/view/`;
      this.pub_document_url = `https://pub.fsa.gov.ru/${this.pub_document_type}/${this.full_url_pattern}/view/`;
      this.sign = {
        updatestate: {
          method: "POST",
          url: "/api/v1/storage/common/signop/{id}/updatestate",
          params: ["id"],
          repeat: true,
          maxRepeat: 10
        },
        collectsignatures: {
          method: "POST",
          url: "/api/v1/storage/common/signop/{id}/collectsignatures",
          params: ["id"],
          repeat: true,
          maxRepeat: 10,
          noObjResp: true
        },
        signaturesinfo: {
          method: "GET",
          url: "/api/v1/storage/common/files/{fileId}/signaturesinfo",
          params: ["fileId"],
          repeat: true,
          maxRepeat: 10
        },
        send: {
          method: "POST",
          url: `/api/v1/${this.fgisType}/common/applications/send`,
          repeat: true,
          maxRepeat: 10,
          timeOut: 3e4
        },
        dsSend: {
          method: "POST",
          url: `/api/v1/${this.fgisType}/common/${this.sub_type_name}/publish`,
          repeat: true,
          maxRepeat: 10,
          timeOut: 3e4
        }
      };
      this.statement = {
        init: {
          errName: "this.statement.init",
          method: "POST",
          url: `/api/v1/${this.fgisType}/common/applications/draft`,
          repeat: true,
          maxRepeat: 10,
          errfun: this.statement_init_errfun
        },
        get: {
          method: "GET",
          url: `/api/v1/${this.fgisType}/common/applications/{id}`,
          params: ["id"],
          repeat: true,
          maxRepeat: 10,
          timeOut: 3e4
        },
        post: {
          method: "POST",
          url: `/api/v1/${this.fgisType}/common/applications/{id}`,
          params: ["id"],
          repeat: true,
          maxRepeat: 5,
          noObjResp: true
        }
      };
      this.document = {
        init: {
          method: "POST",
          url: `/api/v1/${this.fgisType}/common/${this.sub_type_name}/draft`,
          repeat: true,
          maxRepeat: 10
        },
        loadFile: {
          method: "POST",
          url: "/api/v1/storage/common/files",
          bodyType: "FormData",
          repeat: true,
          maxRepeat: 10,
          timeOut: 3e4
        },
        get: {
          method: "GET",
          url: `/api/v1/${this.fgisType}/common/${this.sub_type_name}/{id}`,
          params: ["id"],
          repeat: true,
          maxRepeat: 10,
          timeOut: 1e4
        },
        post: {
          method: "POST",
          url: `/api/v1/${this.fgisType}/common/${this.sub_type_name}/{id}`,
          params: ["id"],
          repeat: true,
          maxRepeat: 5,
          noObjResp: true
        }
      };
      this.errorBook = {};
      console.log("Fgis :>> ", this);
    }
    _get_document_url(domain, fgisType, full_url_pattern) {
      switch (fgisType) {
        case "rds":
        case "rss":
          return `${domain}/${fgisType}/${full_url_pattern}/view/`;
        case "srd":
          return `${domain}/${fgisType}/view/`;
        default:
          err$1("Не известный document_url.");
      }
    }
    _get_domain(fgisType) {
      switch (fgisType) {
        case "rds":
        case "rss":
          return "http://10.250.74.17";
        case "srd":
          return "https://srd.fsa.gov.ru";
        default:
          err$1("Не известный domain.");
      }
    }
    _get_full_url_pattern(fgisType) {
      switch (fgisType) {
        case "rss":
          return "certificate";
        case "srd":
        case "rds":
          return "declaration";
        default:
          err$1("Не известный full_url_pattern.");
      }
    }
    _get_pub_document_type(fgisType) {
      switch (fgisType) {
        case "rds":
        case "srd":
          return "rds";
        case "rss":
          return "rss";
        default:
          err$1("Не известный pub_document_type.");
      }
    }
    _get_sub_type_name(fgisType) {
      switch (fgisType) {
        case "rds":
        case "srd":
          return "declarations";
        case "rss":
          return "certificates";
        default:
          err$1("Не известный sub_type_name.");
      }
    }
    random_uuid() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    fetchErrParser(instruction, responce, callback) {
      switch (instruction.errName) {
        case "this.statement.init":
          break;
        default:
          return responce;
      }
    }
    getOrganData() {
      return this.advance.fetch(this.advance.data.agencyData).then((data) => data);
    }
    signFile(ids = [], mode = "", blanks = {}) {
      if (!Array.isArray(ids) || ids.length == 0) {
        err$1(`Пустой список документов для подписания: ${ids}`);
      }
      var sign = new Sign(ids, this, mode || this.mode, this.settings, blanks);
      return sign.start();
    }
    setHeaders(fgisType) {
      switch (fgisType) {
        case "rds":
        case "rss":
          return this.agencyData.then((data) => {
            this.headers.set("Accept", "application/json, text/plain, */*");
            this.headers.set("Authorization", "Bearer " + this.token.getToken());
            this.headers.set("Pragma", "no-cache");
            this.headers.set("Content-Type", "application/json");
            this.headers.set("lkId", 5);
            this.headers.set("orgId", data.orgId);
          });
        case "srd":
          return Promise.resolve().then(() => {
            this.headers.set("Accept", "application/json, text/plain, */*");
            this.headers.set("Authorization", "Bearer " + this.token.getToken());
            this.headers.set("Pragma", "no-cache");
            this.headers.set("Content-Type", "application/json");
            this.headers.set("lkId", null);
            this.headers.set("orgId", null);
          });
      }
    }
    ownException(msg) {
      err$1("Ошибка во Фгис!. Текст:\r\n" + msg);
    }
    async fetch_with_timeout(url, params, timeOut = 3e4) {
      timeOut = Number(timeOut);
      var controller = new AbortController();
      controller.signal;
      var p1 = new Promise(function(resolve, reject) {
        setTimeout(() => {
          controller.abort();
          reject({
            result: "Превышен лимит ожидания",
            msg: "Превышен лимит ожидания"
          });
        }, timeOut);
      });
      var p2 = new Promise(function(resolve, reject) {
        fetch(url, params).then((res) => resolve(res)).catch((err2) => reject(err2));
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
          uuid = uuid + "_fgis_fetch_" + this.repeatCount;
        } else {
          uuid = this.random_uuid() + "_fgis_fetch_" + this.repeatCount;
        }
        var maxRepeat = o.hasOwnProperty("maxRepeat") ? o.maxRepeat : this.maxRepeat;
        return this.setHeaders(this.fgisType).then(() => {
          var objUrl = o.url;
          if (o.params) {
            if (!opt.hasOwnProperty("params"))
              return this.ownException("Для этого запроса обязательны параметры.");
            o.params.forEach((element) => {
              if (!opt.params.hasOwnProperty(element)) {
                return this.ownException(
                  `Кажется вы забыли указать обязательный параметр.
                        ${objUrl}
                        Нужны: ${o.params.toString()}
                        Пришли: ${opt.params.toString()}
                        `
                );
              }
              objUrl = objUrl.replace(`{${element}}`, opt.params[element]);
            });
          }
          var url = new URL(objUrl, this.domain);
          var params = {
            method: o.method,
            credentials: "include",
            headers: this.headers
          };
          switch (o.method) {
            case "POST":
              if (o.bodyType && o.bodyType == "FormData") {
                params.body = opt.body;
                params.headers.delete("Content-Type");
              } else {
                params.body = JSON.stringify(Object.assign({}, opt.body));
              }
              break;
          }
          var timeOut = o.hasOwnProperty("timeOut");
          console.info(
            "--- %s --- Fgis fetch %s / %s : ",
            uuid,
            this.repeatCount,
            maxRepeat,
            url.href,
            o,
            opt,
            "timeOut : ",
            timeOut
          );
          var f = o.hasOwnProperty("timeOut") ? this.fetch_with_timeout(url.href, params, o.timeOut) : fetch(url.href, params);
          return f.then((response) => {
            return response.json().catch((err2) => {
              switch (response.status) {
                case 500:
                case 502:
                  throw { result: response, msg: "(JSON) Сервис не работает." };
                case 401:
                case 403:
                  throw {
                    result: response,
                    msg: "(JSON) Отказано в доступе. Проверьте авторизацию."
                  };
                case 200:
                  return {};
                default:
                  throw {
                    result: response,
                    msg: `(JSON) Не известный код ошибки ( status :${response.status}): ${JSON.stringify(response)}`
                  };
              }
            });
          }).then((obj) => {
            if (obj.status) {
              switch (obj.status) {
                default:
                  if (obj.status > 205) {
                    throw {
                      result: obj,
                      msg: `Не известная ошибка запроса ( status :${obj.status}): ${obj.message}`
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
                    msg: `Не известная ошибка запроса ( code: ${obj.code}): ${obj.message ? obj.message : JSON.stringify(obj)}`
                  };
              }
            }
            console.info("--- %s --- Fgis fetch result ", uuid, obj);
            return obj;
          }).then((obj) => {
            if (!o.noObjResp && !Object.keys(obj).length && !obj.code && !obj.status) {
              throw {
                result: obj,
                msg: `Не известная ошибка запроса. Предпологается пустой объект ( obj: ${JSON.stringify(
                  obj
                )})`
              };
            }
            return obj;
          }).catch((error) => {
            console.warn("--- %s --- Fgis fetch error ", uuid, error.result);
            var msg = error.msg;
            if ((repeat || o.hasOwnProperty("repeat") && o.repeat) && maxRepeat >= this.repeatCount) {
              var self2 = this;
              return new Promise(function(resolve, reject) {
                setTimeout(function() {
                  return self2.fetch(o, opt, repeat, true, uuid).then((resp) => resolve(resp)).catch((error2) => {
                    reject(error2);
                  });
                }, 1e3);
              });
            } else {
              return this.ownException(msg);
            }
          });
        });
      } catch (error) {
        console.error("Ошибка в конструкции fetch в Fgis", error);
        return this.ownException("Ошибка в конструкции fetch в Fgis", error);
      }
    }
  }
  class Statement {
    constructor(id, advance, fgis, settings2) {
      this.id = id;
      this.advance = advance;
      this.fgis = fgis;
      this.isTest = settings2.isTest;
      this.advanceObj = {};
      this.idApplication = "";
      this.appSubmissionDate = "";
      this.idStatus = "";
      this.log = [];
      this.uuid = this.random_uuid();
      console.log("constructot Statement init with uuid :" + this.uuid);
    }
    checkSign(id) {
      return Promise.resolve().then(() => {
        return this.fgis.fetch(this.fgis.statement.get, { params: { id } }).then((d) => {
          if (d.idStatus && d.idStatus == 13) {
            return this.initAdvance(d.idApplication, d.applicationSubmissionDate, d.idStatus).catch((error) => {
              console.log(error);
            }).finally(() => {
              return this.markAdvance("Signed");
            });
          }
        });
      });
    }
    sign() {
      return this.markAdvance("Signing").then(() => this.advance.fetch(this.advance.statement.show, { params: { id: this.id } })).then((d) => {
        let action;
        if (!d.idApplication) {
          throw "Заявление не привязано к Адвансу.";
        }
        if (d.idStatus && d.idStatus == 13) {
          throw "Заявление уже подписано! (по статусу Адванс)";
        }
        action = this.checkSign(d.idApplication).then(() => {
          return d.idApplication;
        });
        return action;
      }).then((id) => this.fgis.signFile([id], "applications")).then(() => this.markAdvance("Signed")).then(() => {
        return { done: true };
      }).catch((err2) => {
        console.log("something wrong in statement sign", err2);
        if (err2 == "Заявление уже подписано! (по статусу Адванс)") {
          return this.markAdvance("Signed");
        } else {
          return this.markAdvance("SignError", err2).then(() => {
            throw err2;
          });
        }
      });
    }
    logState(o, t) {
      console.log("Statement:", o, JSON.parse(JSON.stringify(t)));
    }
    getList() {
      var url = this.locationOrigin + a_statement_api.queue.url + "?" + this.api_key;
      return fetch(url, {
        method: a_statement_api.queue.method,
        credentials: "include"
      }).then((response) => response.json()).then((obj) => console.log(obj));
    }
    workFlow(root = false, is_return_Signing = false) {
      return this.advance.fetch(this.advance.statement.get_state, { params: { id: this.id } }).then((state) => {
        let action;
        switch (state) {
          case "NotSet":
            console.log("Statement not ready to upload");
            break;
          case "ReadyToUpload":
            console.log("Statement ready to upload");
            action = this.save().then(() => this.workFlow(root = true));
            break;
          case "Uploading":
            console.log("Statement in Uploading");
            break;
          case "UploadError":
            console.log("Statement upload UploadError");
            if (!root) {
              action = this.save().then(() => this.workFlow(root = true));
            }
            break;
          case "Uploaded":
            console.log("Statement Uploaded done");
            if (is_return_Signing) {
              return { is_need_Signing: this.id };
            } else {
              action = this.sign().then(() => this.workFlow(root = false));
            }
            break;
          case "Signing":
            console.log("Statement in Signing");
            break;
          case "SignError":
            console.log("Statement Signing SignError");
            if (!root) {
              action = this.save().then(() => this.workFlow(root = true));
            }
            break;
          case "Signed":
            console.log("Statement Signed done");
            break;
          default:
            return { done: true };
        }
        return action;
      });
    }
    save() {
      console.log("save :>> ");
      return this.markAdvance("Uploading").then(() => this.showAdvance()).then(() => this.saveStatementToFgis()).then(() => this.initAdvance()).then(() => this.markAdvance("Uploaded")).then(() => this.done()).catch((err2) => {
        console.log("something wrong in statement save", err2);
        this.markAdvance("UploadError", err2);
        throw err2;
      });
    }
    getStatement(id) {
      this.logState("save", this);
      return this.fgis.fetch(this.fgis.statement.get, { params: { id } });
    }
    updateStatement(id = "") {
      console.log("Statement updateStatement");
      return this.advance.fetch(this.advance.statement.show, { params: { id: this.id } }).then((data) => {
        if (data.idApplication) {
          if (!id) {
            id = data.idApplication;
          }
          return this.getStatement(id);
        } else {
          throw "Заявление еще не было загруженно.";
        }
      }).then((d) => {
        console.log(d);
        return this.initAdvance(
          d.idApplication,
          d.appSubmissionDate,
          d.idStatus
        );
      });
    }
    done(data = { done: true }) {
      console.log("Statement done", data);
      return data;
    }
    showAdvance() {
      console.log("Statement showAdvance", this);
      return this.advance.fetch(this.advance.statement.show, { params: { id: this.id } }).then((data) => {
        this.advanceObj = data;
        if (this.isTest) {
          this.advanceObj.number = (Math.floor(Math.random() * (1e5 - 1)) + 1).toString() + "/Т";
        }
        this.advanceObj.idStatus = 20;
      });
    }
    markAdvance(status, message = "") {
      return this.advance.getCurrentUserId().then((user_id) => {
        let body = [
          { name: "id", value: this.id },
          { name: "user_id", value: user_id },
          { name: "status", value: status },
          { name: "message", value: message }
        ];
        return this.advance.fetch(this.advance.statement.set_status, { body });
      });
    }
    initAdvance(idApplication, applicationSubmissionDate, idStatus) {
      return this.advance.getCurrentUserId().then((user_id) => {
        this.user_id = user_id;
        if (!idApplication) {
          idApplication = this.idApplication;
        }
        if (!applicationSubmissionDate) {
          applicationSubmissionDate = "";
        }
        if (!idStatus) {
          idStatus = "";
        }
        let body = [
          { name: "idApplication", value: idApplication },
          { name: "statement_url", value: this.fgis.statement_url + idApplication + "/application" },
          { name: "applicationSubmissionDate", value: applicationSubmissionDate },
          { name: "idStatus", value: idStatus },
          { name: "user_id", value: this.user_id }
        ];
        return this.advance.fetch(this.advance.statement.init, { body, params: { id: this.id } }).then((data) => {
          console.log(data);
        });
      });
    }
    test() {
      return [
        {
          "idProduct": null,
          "idProductOrigin": "840",
          "fullName": "Комплексы вычислительные электронные цифровые: программно-аппаратный комплекс11111 ",
          "marking": null,
          "usageScope": null,
          "storageCondition": 'Условия хранения продукции в соответствии с ГОСТ 15150-69 "Машины, приборы и другие технические изделия. Исполнения для различных климатических районов. Категории, условия эксплуатации, хранения и транспортирования в части воздействия климатических факторов внешней среды". Срок хранения (службы, годности) указан в прилагаемой к продукции товаросопроводительной и/или эксплуатационной документации2222',
          "usageCondition": null,
          "batchSize": null,
          "batchId": null,
          "identification": null,
          "identifications": [
            {
              "idIdentification": 6768264,
              "annex": false,
              "name": "Teradata Intelliflex 1.1. Ð°ÑÑÐ¸ÐºÑÐ» 9185-1100-8090, Teradata 2800 (BAR) Data Warehouse Appliance, Ð°ÑÑÐ¸ÐºÑÐ» 9190-Ð¢004-8090 (9190-T010-8090, 9190-T011-8090), Teradata Multipurpose Server (TMS) 8-21X Ð´Ð»Ñ ÐÐ SAS VA, Ð°ÑÑÐ¸ÐºÑÐ» 9128-T518-8090, 9175-2100-8090 ",
              "type": null,
              "tradeMark": null,
              "model": null,
              "article": null,
              "sort": null,
              "idOkpds": [],
              "idTnveds": [
                73522
              ],
              "gtin": [
                ""
              ],
              "lifeTime": null,
              "storageTime": null,
              "description": null,
              "amount": null,
              "idOkei": null,
              "factoryNumber": null,
              "productionDate": null,
              "expiryDate": null,
              "documents": [],
              "standards": [
                {
                  "idStandard": 3073291,
                  "annex": false,
                  "idDictStandard": null,
                  "designation": 'ГОСТ IEC 60950-1- 2014 "Оборудование информационных технологий. Требования безопасности. Часть 1. Об',
                  "name": null,
                  "section": null,
                  "addlInfo": null,
                  "idStatus": null
                }
              ]
            }
          ]
        }
      ];
    }
    middleUpdaterFgis(data) {
      let localData = Object.assign({}, data);
      localData.manufacturer.addresses.forEach((element) => {
        element.foreignDistrict = null;
      });
      localData.manufacturerFilials.forEach((element) => {
        element.addresses.forEach((addr) => {
          addr.foreignDistrict = null;
        });
      });
      return localData;
    }
    saveStatementToFgis() {
      console.log("Statement saveStatementToFgis");
      let action;
      let rootData = this.middleUpdaterFgis(this.advanceObj);
      if (rootData.idApplication) {
        console.log("Update record in fgis", rootData);
        action = this.fgis.fetch(this.fgis.statement.post, { body: rootData, params: { id: rootData.idApplication } }).then((data) => {
          this.idApplication = rootData.idApplication;
        });
      } else {
        console.log("Create record in fgis", rootData);
        action = this.fgis.fetch(this.fgis.statement.init, { body: rootData }).then((data) => {
          return this.fgis.fetch(this.fgis.statement.get, { params: { id: data.id } }).then((d) => {
            console.log("saveStatementtoFgis", d);
            this.idApplication = d.idApplication;
            this.appSubmissionDate = d.appSubmissionDate;
            this.idStatus = d.idStatus;
            this.number = d.number;
          });
        });
      }
      return action;
    }
    random_uuid() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
  }
  console.log("Statement ds class init!");
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
      console.log("getList :>> ");
      return this.controller.get_list.fetch({
        params: { id: this.documentId }
      });
    }
    getFile(fileAdvanceId) {
      console.log("getFile :>> ", fileAdvanceId);
      return this.controller.get_file.fetch({
        params: { id: this.documentId, fileId: fileAdvanceId }
      });
    }
    putFile(fileAdvanceObject, fileFgisResponce) {
      console.log("putFile :>> ", fileAdvanceObject, fileFgisResponce);
      const formData = [
        {
          name: "fgis_file_id",
          value: fileFgisResponce.id
        }
      ];
      return this.controller.put_file_info.fetch(
        {
          body: formData,
          params: { id: this.documentId, fileId: fileAdvanceObject.file_id }
        }
      );
    }
    putFile2Fgis(fileAdvanceObject, fileAdvanceBlob) {
      console.log("putFile2Fgis :>> ", fileAdvanceObject, fileAdvanceBlob);
      var formData = new FormData();
      formData.append("file", new File([fileAdvanceBlob], fileAdvanceObject.file_name));
      const options = this.document.fgis.document.loadFile;
      if (this.document.settings.file_time_out) {
        options.timeOut = this.document.settings.file_time_out * 1e3;
      }
      return this.document.fgis.fetch(options, { body: formData });
    }
    processFile(fileAdvanceObject) {
      console.log("processFile :>> ", fileAdvanceObject);
      return this.getFile(fileAdvanceObject.file_id).then((fileAdvanceBlob) => this.putFile2Fgis(fileAdvanceObject, fileAdvanceBlob)).then((fileFgisResponce) => this.putFile(fileAdvanceObject, fileFgisResponce));
    }
    processFiles(fileAdvanceObjectList) {
      console.log("processFiles :>> ", fileAdvanceObjectList);
      if (fileAdvanceObjectList.length == 0) {
        console.log("Load files is end");
        return Promise.resolve();
      }
      return this.processFile(fileAdvanceObjectList[0]).then(() => {
        fileAdvanceObjectList = fileAdvanceObjectList.splice(1);
        return this.processFiles(fileAdvanceObjectList);
      });
    }
    process() {
      console.log("process :>> ", this);
      return this.getList().then((fileAdvanceObjectList) => {
        const loaded = fileAdvanceObjectList.filter((el) => {
          if (el.fgis_file_id != null && el.fgis_file_id != "") {
            return el;
          }
        });
        if (loaded.length == fileAdvanceObjectList.length) {
          console.log(`Все ${this.document_name} уже загружены во ФГИС.`);
          return Promise.resolve();
        }
        const validFileList = fileAdvanceObjectList.filter((el) => el.file_name && !el.fgis_file_id);
        return this.processFiles(validFileList);
      });
    }
  }
  class Document {
    constructor(id, advance, fgis, settings2, advanceType, isSrd, fgisType) {
      this.id = id;
      this.advance = advance;
      this.fgis = fgis;
      this.settings = settings2;
      this.assignRegNumber = settings2.assignRegNumber;
      this.isRobotSignErrors = settings2.isRobotSignErrors;
      this.isTest = settings2.isTest;
      this.advanceType = advanceType;
      this.isSrd = isSrd;
      this.fgisType = fgisType;
      this.idDocumentKey = this._getIdDocumentKey(this.fgisType);
      this.advanceObj = {};
      this.idApplication = "";
      this.agencyMode = false;
      this.fgisId = "";
      this.afterInitObj = {};
      this.idDeclaration = "";
      this.idDocument = 0;
      this.annexeIds = "";
      this.submissionDate = "";
      this.number = "";
      this.idStatus = "";
      this.fileList = [];
      console.log("Document :>> ", this);
    }
    done(data = { done: true }) {
      console.log("Ds.prototype.done", data);
      if (this.documentFgisData) {
        data.documentFgisData = this.documentFgisData;
      }
      return data;
    }
    _getIdDocumentKey(fgisType) {
      switch (fgisType) {
        case "rds":
        case "srd":
          return "idDeclaration";
        case "rss":
          return "idCertificate";
        default:
          err("Не определен _getIdDocumentKey: " + fgisType);
      }
    }
    markAdvance(status, message = "") {
      return this.advance.getCurrentUserId().then((user_id) => {
        let body = [
          { name: "id", value: this.id },
          { name: "user_id", value: user_id },
          { name: "status", value: status },
          { name: "message", value: message }
        ];
        return this.advance.fetch(this.advance.document.set_status, {
          body
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
      return this.advance.fetch(this.advance.document.get_state, { params: { id: this.id } }).then((state) => {
        let action;
        switch (state) {
          case "NotSet":
            console.log("Statement not ready to upload");
            break;
          case "ReadyToUpload":
            console.log("Statement ready to upload");
            action = this.save().then(() => this.workFlow(root = true));
            break;
          case "Uploading":
            console.log("Statement in Uploading");
            break;
          case "UploadError":
            console.log("Statement upload UploadError");
            if (!root) {
              action = this.save().then(() => this.workFlow(root = true));
            }
            break;
          case "Uploaded":
            console.log("Statement Uploaded done");
            action = this.sign().then(() => this.workFlow(root = false));
            break;
          case "Signing":
            console.log("Statement in Signing");
            break;
          case "SignError":
            console.log("Statement Signing SignError");
            if (!root) {
              action = this.save().then(() => this.workFlow(root = true));
            }
            break;
          case "Signed":
            console.log("Statement Signed done");
            break;
          default:
            return this.done();
        }
        return action;
      });
    }
    checkSign(id) {
      return Promise.resolve().then(() => {
        return this.fgis.fetch(this.fgis.document.get, { params: { id } }).then((d) => {
          if (d.idStatus && d.idStatus == 13) {
            return this.initAdvance(d.idApplication, d.submissionDate, d.idStatus, d.number).catch((error) => {
              console.log(error);
            }).finally(() => {
              throw "Документ уже подписан! (по статусу ФГИС)";
            });
          }
        });
      });
    }
    sign() {
      return this.markAdvance("Signing").then(
        () => this.advance.fetch(this.advance.document.show, {
          params: { id: this.id }
        })
      ).then((d) => {
        if (!d[this.idDocumentKey]) {
          throw "Документ не привязан к Адвансу.";
        }
        if (d.idStatus && d.idStatus == 13) {
          throw "Документ уже подписан! (по статусу Адванс)";
        }
        return this.checkSign(d[this.idDocumentKey]).then(() => d[this.idDocumentKey]);
      }).then((id) => {
        this.documentFgisData = {
          idDeclaration: id,
          url: `${this.fgis.document_url}${id}`,
          open_url: `${this.fgis.pub_document_url}${id}`
        };
        if (this.fgisType == "rss") {
          return this.advance.fetch(this.advance.document.blanks, { params: { id: this.id } }).then((blanks) => {
            return this.fgis.signFile([id], "declarations", blanks);
          });
        } else {
          return this.fgis.signFile([id], "declarations");
        }
      }).then(() => this.markAdvance("Signed")).then(() => {
        return { done: true };
      }).catch((err2) => {
        console.log("something wrong in statement sign", err2);
        return this.markAdvance("SignError", err2).then(() => {
          throw err2;
        });
      });
    }
    initAdvance(idDeclaration = this.idDeclaration, submissionDate = this.submissionDate, idStatus = this.idStatus, number = this.number || "") {
      return this.advance.getCurrentUserId().then((user_id) => {
        this.user_id = user_id;
        let documentFgisData = {
          idDeclaration,
          url: `${this.fgis.document_url}${idDeclaration}`,
          submissionDate,
          number,
          idStatus,
          user_id: this.user_id
        };
        if (this.fgisType == "rss") {
          documentFgisData.annexes = this.annexeIds;
        }
        if (number) {
          documentFgisData.open_url = `${this.fgis.pub_document_url}${idDeclaration}`;
        }
        this.documentFgisData = documentFgisData;
        let body = Object.keys(documentFgisData).map((key) => {
          return { name: key, value: documentFgisData[key] };
        });
        return this.advance.fetch(this.advance.document.init, {
          body,
          params: { id: this.id }
        }).then((data) => {
          console.log(data);
        });
      });
    }
    checkSignStatement() {
      console.log("Document checkSignStatement");
      return this.showAdvance().then((d) => {
        if (!d.idApplication) {
          throw "Завление не загружено вовсе! Дальше продолжать нельзя.";
        }
        console.log("Document checkSignStatement middle", d, this.fgis);
        return this.fgis.fetch(this.fgis.statement.get, {
          params: { id: d.idApplication }
        });
      }).then((data) => {
        console.log(data);
        if (data.idStatus != 13) {
          throw "Завление не подписано.";
        }
        return;
      });
    }
    getDocumentFilesAdvance() {
      console.log("Document getDocumentFilesAdvance");
      return this.advance.fetch(this.advance.document.get_document_files, {
        params: { id: this.id }
      });
    }
    getProtocolsAdvance() {
      console.log("Document getProtocolsAdvance");
      return this.advance.fetch(this.advance.document.get_protocols, {
        params: { id: this.id }
      });
    }
    getFileProtocolAdvance(fileId) {
      return this.advance.fetch(this.advance.document.get_file_protocol, {
        params: { id: this.id, fileId }
      });
    }
    loadFileItemFgis(file, is_document = false) {
      console.log("loadFileItemFgis", file);
      let file_blob;
      if (is_document) {
        file_blob = this.advance.fetch(this.advance.document.get_file_document, {
          params: {
            id: this.id,
            fileId: file.file_id
          }
        });
      } else {
        file_blob = this.advance.fetch(this.advance.document.get_file_protocol, {
          params: {
            id: this.id,
            fileId: file.file_id
          }
        });
      }
      return file_blob.then((body) => {
        console.log("body", body);
        var formData = new FormData();
        var p = new File([body], file.file_name);
        formData.append("file", p);
        let o = this.fgis.document.loadFile;
        if (this.settings.file_time_out) {
          o.timeOut = this.settings.file_time_out * 1e3;
        }
        return this.fgis.fetch(o, { body: formData });
      }).then((d) => {
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
          name: "fgis_file_id",
          value: fgis_file_id
        }
      ];
      return this.advance.fetch(this.advance.document.put_file_document, {
        body: formData,
        params: { id: this.id, fileId }
      });
    }
    putFileProtocolAdvance(fgis_file_id, fileId) {
      let formData = [
        {
          name: "fgis_file_id",
          value: fgis_file_id
        }
      ];
      return this.advance.fetch(this.advance.document.put_file_protocol, {
        body: formData,
        params: { id: this.id, fileId }
      });
    }
    promiseLoadFiles(is_document = false) {
      if (this.fileList.length == 0) {
        console.log("Load files is end");
        return;
      }
      return this.loadFileItemFgis(this.fileList[0], is_document).then(() => {
        this.fileList = this.fileList.splice(1);
        return this.promiseLoadFiles(is_document);
      });
    }
    promiseLoadDocumentFiles() {
      if (this.fileList.length == 0) {
        console.log("Load files is end");
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
        return el.fgis_file_id != null && el.fgis_file_id != "";
      });
      if (loaded.length == fileList.length) {
        console.log("Все файлы уже загружены во ФГИС.");
        return Promise.resolve();
      }
      this.fileList = fileList;
      return this.promiseLoadFiles(true);
    }
    loadFileFgis(fileList) {
      let loaded = fileList.filter((el) => {
        if (el.fgis_file_id != null && el.fgis_file_id != "") {
          return el;
        }
      });
      if (loaded.length == fileList.length) {
        console.log("Все протоколы уже загружены во ФГИС.");
        return Promise.resolve();
      }
      this.fileList = fileList.filter((el) => el.file_name);
      return this.promiseLoadFiles();
    }
    add_revocation_data(data, type) {
      var vals = {};
      if (type == 1) {
        vals = {
          idStatus: 14,
          beginDate: /* @__PURE__ */ new Date(),
          comment: "В связи с технической ошибкой",
          idBasis: 1,
          publicated: false,
          docDate: /* @__PURE__ */ new Date(),
          docName: this.settings.revoke_teh_document,
          docNumber: this.settings.revoke_teh_document_number
        };
      } else if (type == 2) {
        vals = {
          idStatus: 14,
          beginDate: /* @__PURE__ */ new Date(),
          comment: "По решению заявителя",
          idBasis: 8,
          publicated: false,
          docDate: /* @__PURE__ */ new Date(),
          docName: this.settings.revoke_applicant_document,
          docNumber: this.settings.revoke_applicant_document_number
        };
      }
      var search_result = data.statusChanges.filter(
        (item) => item.idStatus == 14 && item.publicated == false
      );
      if (!search_result.length) {
        data.statusChanges.push(vals);
        return true;
      }
      return false;
    }
    revoke(type) {
      return this.markAdvance("Uploading").then(() => this.showAdvance()).then(
        (document_data) => this.fgis.fetch(this.fgis.document.get, {
          params: { id: document_data[this.idDocumentKey] }
        })
      ).then((fgis_data) => {
        this.add_revocation_data(fgis_data, type);
        return this.updateDocumentInFgis(fgis_data);
      }).then(() => this.markAdvance("Uploaded")).then(() => this.done()).catch((err2) => {
        console.log("something wrong in document save", err2);
        this.markAdvance("UploadError", err2);
        throw err2;
      });
    }
    save() {
      console.log("Ds.Document.save", this.id);
      return this.markAdvance("Uploading").then(() => this.getProtocolsAdvance()).then((data) => this.loadFileFgis(data)).then(() => this.getDocumentFilesAdvance()).then((data) => this.loadDocumentFileFgis(data)).then(() => {
        if (this.fgisType == "rss") {
          return Promise.resolve().then(() => new GeneratorFilesAdvance(this, "product_doc").process()).then(() => new GeneratorFilesAdvance(this, "other_doc").process()).then(() => new GeneratorFilesAdvance(this, "conclusion_doc").process()).then(() => new GeneratorFilesAdvance(this, "sampling_doc").process()).then(() => new GeneratorFilesAdvance(this, "qms_doc").process()).then(() => new GeneratorFilesAdvance(this, "act_doc").process()).then(() => new GeneratorFilesAdvance(this, "cert_doc").process()).then(() => new GeneratorFilesAdvance(this, "transport_doc").process()).then(() => new GeneratorFilesAdvance(this, "cert_type_doc").process()).then(() => new GeneratorFilesAdvance(this, "project_doc").process()).then(() => new GeneratorFilesAdvance(this, "un_rules_doc").process()).then(() => new GeneratorFilesAdvance(this, "concl_expert_doc").process()).then(() => new GeneratorFilesAdvance(this, "test_protocol_doc").process()).then(() => new GeneratorFilesAdvance(this, "contract_doc").process()).then(() => new GeneratorFilesAdvance(this, "decision_doc").process()).then(() => new GeneratorFilesAdvance(this, "cert_other_doc").process());
        } else {
          return Promise.resolve();
        }
      }).then(() => this.showAdvance()).then((data) => this.saveDocumentToFgis(data)).then(() => this.initAdvance()).then(() => this.markAdvance("Uploaded")).then(() => this.done()).catch((err2) => {
        console.log("something wrong in document save", err2);
        this.markAdvance("UploadError", err2);
        throw err2;
      });
    }
    showAdvance() {
      console.log("showAdvance Document Start", this.id);
      return this.advance.fetch(this.advance.document.show, {
        params: { id: this.id }
      });
    }
    getExperts(id) {
      return this.advance.fetch(this.advance.data.experts).then((d) => {
        let res = d.find((el) => el.id == id);
        if (!res) {
          throw "Эксперт не найден в справочник";
        }
        return res;
      });
    }
    saveDocumentAsRegToFgis(rootData) {
      console.log(rootData);
      console.log("saveDocumentAsRegToFgis");
      rootData.assignRegNumber = true;
      return Promise.resolve().then(() => {
        let action;
        if (rootData[this.idDocumentKey]) {
          console.log("Update record in fgis");
          action = this.fgis.fetch(this.fgis.document.post, {
            body: rootData,
            params: { id: rootData[this.idDocumentKey] }
          }).then(() => {
            return this.fgis.fetch(this.fgis.document.get, {
              params: { id: rootData[this.idDocumentKey] }
            }).then((d) => {
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
      console.log("findRssAnnexeIds");
    }
    updateDocumentInFgis(data) {
      return Promise.resolve().then(() => {
        let action = this.fgis.fetch(this.fgis.document.post, {
          body: data,
          params: {
            id: data[this.idDocumentKey]
          }
        });
        return action;
      });
    }
    middleUpdaterFgis(data) {
      console.log("start middleUpdaterFgis :>> ", data);
      let localData = Object.assign({}, data);
      localData.testingLabs.forEach((element) => {
        var res = [];
        element.customInfo.forEach((el) => {
          el.customDeclNumber = el.customDeclNumber.replace(".", ",");
          el.customDeclNumber = el.customDeclNumber.replace(";", ",");
          var o = el.customDeclNumber.replace(" ", "").split(",");
          o.forEach((op) => {
            res.push({
              amount: el.amount,
              contractNumber: el.contractNumber,
              contractDate: el.contractDate,
              customDeclNumber: op
            });
          });
          element.customInfo = res;
        });
      });
      if (this.fgis.pub_document_type == "rds") {
        localData.testingLabs.forEach((lab) => {
          lab.protocols.forEach((prot) => {
            var exist = localData.scanCopy.find((el) => {
              return el.name == prot.number;
            });
            if (!exist) {
              localData.scanCopy.push({
                name: prot.number,
                idFile: prot.idFile,
                idType: 4
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
      return localData;
    }
    //
    updateSelfDocumentValues(fgisResult) {
      this.idDeclaration = fgisResult[this.idDocumentKey] || this.idDeclaration;
      this.submissionDate = fgisResult.submissionDate || this.submissionDate;
      this.idStatus = fgisResult.idStatus || this.idStatus;
      this.number = fgisResult.number || this.number;
      if (this.fgisType == "rss") {
        let res = "";
        fgisResult.annexes.forEach((annex) => {
          res += `${annex.idType}-${annex.idAnnex};`;
        });
        this.annexeIds = res;
        console.log("findRssAnnexeIds,", res);
      }
      return fgisResult;
    }
    saveDocumentToFgis(rootData) {
      var rootData = this.middleUpdaterFgis(rootData);
      console.log("Document saveDocumentToFgis", rootData);
      this.agencyMode = rootData.agencyMode;
      delete rootData.agencyMode;
      if (this.agencyMode && this.assignRegNumber) {
        rootData.assignRegNumber = true;
      }
      var action = Promise.resolve().then(() => {
        if (rootData[this.idDocumentKey]) {
          console.log("Update record in fgis");
          return this.fgis.fetch(this.fgis.document.post, {
            body: rootData,
            params: { id: rootData[this.idDocumentKey] }
          }).then(() => rootData[this.idDocumentKey]);
        } else {
          return this.fgis.fetch(this.fgis.document.init, { body: rootData }).then((resp) => resp.id);
        }
      }).then((idDocument) => {
        this.idDeclaration = idDocument;
        if (!this.agencyMode && !rootData[this.idDocumentKey]) {
          return this.initAdvance();
        }
        return idDocument;
      }).then(() => {
        if (!this.agencyMode) {
          return this.fgis.fetch(this.fgis.document.get, { params: { id: this.idDeclaration } }).then((fgisResult) => {
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
          "fullName": 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "АРТЭКС"',
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
          "shortName": 'ООО "АРТЭКС"',
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
          "fullName": 'Орган по сертификации Общества с ограниченной ответственностью "ГринЛайн"',
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
      };
      return body;
    }
  }
  console.log("Document ds class init!");
  class Ds {
    constructor({ id, token: token2, locationOrigin, mode, settings: settings2, advanceType, isSrd }) {
      try {
        this.name = "Менеджер деклараций";
        this.advanceType = advanceType;
        this.isSrd = isSrd;
        this.fgisType = this._get_fgis_type(this.advanceType, this.isSrd);
        console.log("this.advanceType :>> ", this.advanceType);
        console.log("this.isSrd :>> ", this.isSrd);
        console.log("this.fgisType :>> ", this.fgisType);
        this.advance = new Advance(settings2, locationOrigin, advanceType);
        console.log("this.advance :>> ", this.advance);
        this.fgis = new Fgis({
          token: token2,
          advance: this.advance,
          mode,
          settings: settings2,
          fgisType: this.fgisType
        });
        console.log("this.fgis :>> ", this.fgis);
        this.statement = new Statement(id, this.advance, this.fgis, settings2);
        console.log("this.statement :>> ", this.statement);
        this.document = new Document(
          id,
          this.advance,
          this.fgis,
          settings2,
          this.advanceType,
          this.isSrd,
          this.fgisType
        );
        console.log("this.document :>> ", this.document);
        console.log("Ds :>> ", this);
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
    _get_fgis_type(type, isSrd) {
      if (isSrd) {
        return "srd";
      } else {
        switch (type) {
          case "DTREA":
          case "DGSTR":
          case "DPRTR":
            return "rds";
          case "STREA":
            return "rss";
          default:
            console.error("Ошибка определения fgisType, ", type);
            throw "Ошибка определения fgisType: " + type;
        }
      }
    }
    doAction(actionName = "") {
      console.log(`${this.name} - ${actionName}`);
      let action;
      switch (actionName) {
        case "updateStatement":
          action = this.statement.updateStatement();
          break;
        case "revokeDs":
          action = this.document.revoke();
          break;
        case "signStatement":
          action = this.statement.sign();
          break;
        case "signDeclaration":
          action = this.document.sign();
          break;
        case "saveCommonDs":
          action = this.statement.save();
          break;
        case "saveDeclarationDs":
          action = this.document.save();
          break;
        case "revokeTeh":
          action = this.document.revoke(1);
          break;
        case "revokeApplicant":
          action = this.document.revoke(2);
          break;
        case "statementGetList":
          action = this.statement.getList();
          break;
        case "startReplication":
          action = this.statement.workFlow().then(() => this.document.workFlow());
          break;
        default:
          action = Promise.resolve().then(() => {
            console.error(`${this.name}: Для функции ${actionName} нет описания.`);
            throw `${this.name}: Для функции ${actionName} нет описания.`;
          });
          break;
      }
      return action;
    }
  }
  var settings = {};
  var portFromCS;
  var replication_page;
  var lucky_bot;
  var lucky_bot_connectors = [];
  var token = new Token();
  token.start();
  function replication_page_connecter(p) {
    console.log("Background", p);
    replication_page = p;
    replication_page.onMessage.addListener(function(m) {
      console.log("Background m", m);
      return true;
    });
  }
  function lucky_bot_connecter(p) {
    console.log(lucky_bot);
    console.log(`Background ${p.name} connected`);
    let res = lucky_bot_connectors.find((el) => {
      return el == p;
    });
    console.log(lucky_bot_connectors, res);
    if (!res) {
      lucky_bot_connectors.push(p);
    }
    p = p;
    p.onMessage.addListener(function(m) {
      console.log(lucky_bot_connectors, this);
      console.log(`${this.name} write`, m);
      return true;
    });
  }
  function connected(p) {
    console.log("CONNECTED IS RUN", p);
    if (p.name == "replication-page") {
      return replication_page_connecter(p);
    }
    if (p.name.includes("lucky_bot")) {
      return lucky_bot_connecter(p);
    }
    portFromCS = p;
    portFromCS.onMessage.addListener(function(m) {
      if (m.type == "stateMessage") {
        Envi.stateMessage.push(m);
        return;
      }
      var ob = Envi.awaitMessage.find(
        (el) => el.url == m.url && el.command == m.command
      );
      console.log(
        "In background script, received message from content script",
        m,
        Envi.awaitMessage,
        ob
      );
      if (ob) {
        console.log("We await u maaan!" + m.url);
        Envi.awaitMessage = Envi.awaitMessage.filter((item) => item != ob);
        console.log("Get this!", ob.responce);
        portFromCS.postMessage(ob.responce);
      } else {
        console.log("We dont await message from this url:" + m.url);
      }
    });
  }
  browserPolyfillExports.runtime.onMessage.addListener(handleMessage);
  browserPolyfillExports.runtime.onConnect.addListener(connected);
  function handleMessage(request, sender, sendResponse) {
    console.log("YA HANDLE MESSAGE");
    if (request.pageName) {
      return;
    }
    if (request.action == "get_experts") {
      var o = new organ_expert_old(token, request.orgId);
      o.start().then((data) => {
        return sendResponse({ data: JSON.stringify(data) });
      });
      return true;
    }
    var action;
    var originSettings = {};
    if (request.document_token) {
      originSettings = Object.assign({}, request.settings);
      originSettings.document_token = request.document_token;
      originSettings.assignRegNumber = true;
    } else {
      if (settings.originSettings) {
        originSettings = settings.originSettings.filter(
          (el) => el.origin == request.locationOrigin
        );
        if (!originSettings.length || !Object.keys(originSettings[0]).length) {
          sendResponse({
            done: false,
            err: "Что то не так с настройками пользователя!"
          });
          return true;
        }
      } else {
        sendResponse({
          done: false,
          err: "Что то не так с настройками пользователя!"
        });
        return true;
      }
      originSettings = originSettings[0];
      if (!originSettings.agency_code || !originSettings.agency_keyword) {
        sendResponse({ done: false, err: "Введите апи ключи для органа." });
        return true;
      }
      if (!request.module) {
        sendResponse({ done: false, err: "Не указан модуль." });
        return true;
      }
    }
    console.log("request :>> ", request);
    switch (request.module) {
      case "ds":
        var dsOptions = {
          id: request.id,
          token,
          locationOrigin: request.locationOrigin,
          mode: request.mode,
          settings: originSettings,
          advanceType: request.advanceType || request.type,
          // TODO: проверить если где то еще передача request.type
          isSrd: request.isSrd == void 0 ? false : request.isSrd
        };
        var ds = new Ds(dsOptions);
        action = ds.doAction(request.action);
        break;
      case "parser":
        console.log("We stopped parser starter");
        break;
      default:
        action = Promise.resolve().then(() => {
          throw `Не найден модуль: ${request.module}, запрос ${request.action}`;
        });
        break;
    }
    action.then((res) => {
      var data = Object.assign(res, { done: res.done });
      console.log("sendResponse", data);
      return sendResponse(data);
    }).catch((err2) => {
      console.log("catch sendResponse", { done: false, err: err2 });
      return sendResponse({ done: false, err: err2 });
    });
    console.log("-------- KONEC ");
    return true;
  }
  browserPolyfillExports.storage.local.get().then((storedSettings) => {
    console.log("Storage get in background!", storedSettings);
    settings = storedSettings;
  });
  browserPolyfillExports.storage.onChanged.addListener((newSettings) => {
    for (const key in newSettings) {
      if (newSettings.hasOwnProperty(key)) {
        settings[key] = newSettings[key].newValue;
      }
    }
  });
})();
