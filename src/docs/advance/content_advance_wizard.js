// var browser = require("webextension-polyfill");

function getDSId() {
  return document.querySelector('#ClaimId').value;
}

function getOrigin() {
  return document.location.origin;
}

function _getRequestObject(data){
  return  {
    id: getDSId(),
    locationOrigin: getOrigin(),
    module: "ds",
    advanceType: data.type,
    isSrd: data.isSrd,
  }
}
function _updateRequestObject(data, action, mode){
  return  Object.assign(data, {
    action: action,
    mode: mode,
  })
}

function startReplication(data) {
  browser.runtime.sendMessage(_updateRequestObject(data, 'startReplication', "declarations"))
    .then(() => {
      refreshButton()
    });
}

function refreshButton() {
  setTimeout(() => {
    document.querySelector(".btn-refresh").click()
  }, 1000);
}

function saveDeclarationDs(data) {
  browser.runtime.sendMessage(_updateRequestObject(data, 'saveDeclarationDs', "declarations"))
  .then(() => {
    setTimeout(() => {
      refreshButton()
    }, 1000);
  });
}

function revokeApplicant(data) {
  browser.runtime.sendMessage(_updateRequestObject(data, 'revokeApplicant', "applications"))
  .then(() => {
    refreshButton()
  });
}

function revokeTeh(data) {
  browser.runtime.sendMessage(_updateRequestObject(data, 'revokeTeh', "declarations"))
  .then(() => {
    refreshButton()
  });
}

function saveCommonDs(data) {
  browser.runtime.sendMessage(_updateRequestObject(data, 'saveCommonDs', "declarations"))
  .then(() => {
    refreshButton()
  });
}

function signStatement(data) {
  browser.runtime.sendMessage(_updateRequestObject(data, 'signStatement', "applications"))
  .then(() => {
    refreshButton()
  });
}
function signDeclaration(data) {
  browser.runtime.sendMessage(_updateRequestObject(data, 'signDeclaration', "declarations"))
  .then(() => {
    refreshButton()
  });
}

var ACTUAL_OBSERVER = false;
function update_observers(){
  if(!ACTUAL_OBSERVER){
    ACTUAL_OBSERVER  = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        update_observers()
      });    
    });
    ACTUAL_OBSERVER.observe(document.body, { attributes: true, childList: true, characterData: true});
  } else if (document.querySelector("#modal_dialog_window")){
    ACTUAL_OBSERVER.disconnect();
    ACTUAL_OBSERVER = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        console.log(mutation);
        render_test()
      });    
    });
    ACTUAL_OBSERVER.observe(document.querySelector("#modal_dialog_window"), { subtree:true, attributes: true, childList: true, characterData: true });
    render_test()

  }
}

function render_test(observer) {
  var document_actions_div = document.querySelector("#document_actions")

  if (!document_actions_div) return 

  function addElement(data_action, value, disabled) {
    if (!document.querySelector("#" + data_action)) {
      var clonedNode = document_actions_div.children[0].cloneNode(true);
      clonedNode.setAttribute('data-action', data_action)
      clonedNode.value = value
      clonedNode.id = data_action
      clonedNode.disabled = disabled
      document_actions_div.appendChild(clonedNode);
    }
  }
  addElement("btn-document-revoke-applicant", 'Аннулировать по заявителю', false)
  addElement("btn-document-revoke-teh", 'Аннулировать по технической', false)
}

window.addEventListener("message", function (event) {
  console.log('message :>> ', event); 
  var data = _getRequestObject(event.data)

  if (event.source == window && event.data.action == "btn-document-revoke-teh") {
    revokeTeh(data);
  }
  if (event.source == window && event.data.action == "btn-document-revoke-applicant") {
    revokeApplicant(data);
  }
  if (event.source == window && event.data.action == "btn-document-save") {
    saveDeclarationDs(data);
  }
  if (event.source == window && event.data.action == "btn-document-sign") {
    signDeclaration(data);
  }
  if (event.source == window && event.data.action == "btn-statement-save") {
    saveCommonDs(data);
  }
  if (event.source == window && event.data.action == "btn-statement-sign") {
    signStatement(data);
  }
  if (event.source == window && event.data.action == "btn-start-replication") {
    startReplication(data);
  }
});

// update_observers()