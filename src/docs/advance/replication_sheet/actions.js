// var browser = require("webextension-polyfill");

function saveItem(id, type) {
  var action;
  if (type == "statement") {
    action = "saveCommonDs";
  } else if (type == "document") {
    action = "saveDeclarationDs";
  }
  return browser.runtime
    .sendMessage({
      action: action,
      id: id,
      locationOrigin: getOrigin(),
      mode: "applications",
      module: "ds",
      advanceType: get_type_doc(),
      isSrd: PluginType == 1,
    })
    .then((data) => {
      return data;
    });
}


function signItem(id, type) {
  let action;
  if (type == "statement") {
    action = "signStatement";
  } else if (type == "document") {
    action = "signDeclaration";
  }
  return browser.runtime.sendMessage({
    action: action,
    id: id,
    locationOrigin: getOrigin(),
    mode: "applications",
    module: "ds",
    advanceType: get_type_doc(),
    isSrd: PluginType == 1,
  });
}

console.log('init actions.js :>> ');
