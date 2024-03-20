// var browser = require("webextension-polyfill");

console.log('ya tut')

var token = new Token();
token.start();
var settings = {};
var awaitMessage = [];
var stateMessage = [];
var portFromCS;
var replication_page;
var lucky_bot;
var lucky_bot_connectors = [];

function test() {
  try {
    console.log("In test");
    var originSettings;
    if (settings.originSettings) {
      originSettings = settings.originSettings.filter(
        (el) => el.origin == "https://alfa-cert2.adv-docs.ru"
      );
      if (!originSettings.length || !Object.keys(originSettings[0]).length) {
        throw "Что то не так с настройками пользователя!";
      }
    } else {
      throw "Что то не так с настройками пользователя!";
    }
    console.log("originSettings");
    originSettings = originSettings[0];
    if (!originSettings.agency_code || !originSettings.agency_keyword) {
      throw "Введите апи ключи для органа.";
    }
    console.log("before something");
    var something = new controller({
      token: token,
      locationOrigin: "https://alfa-cert2.adv-docs.ru",
      mode: "applications",
      settings: originSettings,
    });
    something.test(2);
  } catch (error) {
    console.log(error);
  }
}

function replication_page_connecter(p) {
  console.log("Background", p);
  replication_page = p;
  replication_page.onMessage.addListener(function (m) {
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
  p.onMessage.addListener(function (m) {
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
  portFromCS.onMessage.addListener(function (m) {
    if (m.type == "stateMessage") {
      stateMessage.push(m);
      return;
    }
    var ob = awaitMessage.find(
      (el) => el.url == m.url && el.command == m.command
    );
    console.log(
      "In background script, received message from content script",
      m,
      awaitMessage,
      ob
    );
    if (ob) {
      console.log("We await u maaan!" + m.url);
      awaitMessage = awaitMessage.filter((item) => item != ob);
      console.log("Get this!", ob.responce);
      this.portFromCS.postMessage(ob.responce);
    } else {
      console.log("We dont await message from this url:" + m.url);
    }
  });
}

browser.runtime.onMessage.addListener(handleMessage);
browser.runtime.onConnect.addListener(connected);

function handleMessage(request, sender, sendResponse) {

  // return true;

  // console.log(request," === ", sender)
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
    originSettings = Object.assign({}, request.settings)
    // settings > настройки для ЭЦП
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
          err: "Что то не так с настройками пользователя!",
        });
        return true;
      }
    } else {
      sendResponse({
        done: false,
        err: "Что то не так с настройками пользователя!",
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
    // return true
  } 
  

  console.log('request :>> ', request);
  switch (request.module) {
    case "ds":
      var dsOptions = {
        id: request.id,
        token: token,
        locationOrigin: request.locationOrigin,
        mode: request.mode,
        settings: originSettings,
        advanceType: request.advanceType || request.type, // TODO: проверить если где то еще передача request.type
        isSrd: request.isSrd == undefined?false:request.isSrd,
      }
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
  action
    .then((res) => {
      var data = Object.assign(res, { done: res.done });
      console.log("sendResponse", data);
      return sendResponse(data);
    })
    .catch((err) => {
      console.log("catch sendResponse", { done: false, err: err });
      return sendResponse({ done: false, err });
    });
  return true;
}

browser.storage.local.get().then((storedSettings) => {
  console.log("Storage get in background!", storedSettings);
  settings = storedSettings;
});

browser.storage.onChanged.addListener((newSettings) => {
  for (const key in newSettings) {
    if (newSettings.hasOwnProperty(key)) {
      settings[key] = newSettings[key].newValue;
    }
  }
});
