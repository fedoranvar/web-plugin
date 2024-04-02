// try {
var pt = document.getElementById('PluginType');
// console.log(pt)

var PluginType = {
  'Applicant': 1,
  'Docs': 2,
}[(pt && pt.value) || 'Docs'];


var selectList = document.querySelector("#replication_action");
var documentStateIndex;
var statementStateIndex;
var documentLinkIndex;
var documentRegNomerIndex;
var documentRegNomerFGISIndex;

function clean_number(str) {
  str = str.replace(/B/g, 'В')
  str = str.replace(/O/g, 'О')
  str = str.replace(/P/g, 'Р')
  str = str.replace(/C/g, 'С')
  str = str.replace(/A/g, 'А')
  return str
}

function selectList_change_listener(value) {
  value = Number(value)
  if (value) {
    window.pageBot = new lucky_bot(value)
  } else {
    if (window.pageBot) {
      window.pageBot.clear()
      window.pageBot = null
    }
  }
}

function get_type_doc() {
  try {
    let value = document.querySelector("#select2-chosen-2")
    if (!value) {
      throw "Не смоги получить тип документа."
    }
    switch (value.textContent) {
      case "ДС ТР ЕАЭС":
        return "DTREA"
      case "СС ТР ЕАЭС":
        return "STREA"
      case "ДС ГОСТ Р":
      case "ДС ЕП РФ":
        return "DGSTR"
      case "ДС по 353 ПП":
        return "DPRTR"
      default:
        throw "Не известный тип документа"
    }
  } catch (error) {
    alert(error.message)
  }
}

function setColumn() {
  var t = Array.from(document.querySelectorAll("table.main_table:nth-child(1) th"));
  documentStateIndex = t.findIndex(column => column.innerText.toUpperCase() == "СТАТУС ДОКУМЕНТА");
  statementStateIndex = t.findIndex(column => column.innerText.toUpperCase() == "СТАТУС ЗАЯВЛЕНИЯ");
  if (PluginType == 1) {
    documentLinkIndex = t.findIndex(column => column.innerText.toUpperCase() == "МАКЕТ");
  } else {
    documentLinkIndex = t.findIndex(column => column.innerText.toUpperCase() == "НОМЕР ЗАЯВЛЕНИЯ");
  }
  documentRegNomerIndex = t.findIndex(column => column.innerText.toUpperCase() == "РЕГ. НОМЕР");
  documentRegNomerFGISIndex = t.findIndex(column => column.innerText.toUpperCase() == "РЕГ. НОМЕР ФГИС");
}

function getOrigin() {
  var i = document.location.origin;
  return i;
}
function generateLink(text, callBackName, parentNode = 'html body div.wrapper div.condensed div.top.top_header.fixed-block.active div.inner') {
  var l = document.querySelector(parentNode);
  if (l) {
    var oa = document.querySelector('.text-link.btn-' + callBackName.name);
    if (oa) {
      oa.parentNode.removeChild(oa);
    }
    var a = document.createElement('a');
    a.innerHTML = text;
    a.style.display = 'table';
    a.className = 'text-link btn-' + callBackName.name;
    a.style.marginLeft = '10px';
    a.style.marginBottom = '15px';
    a.style.cursor = "pointer";
    a.addEventListener('click', function() {
      window.postMessage({
        action: callBackName.name
      }, "*");
    }, false);
    l.parentNode.appendChild(a);
  }
  return a
}

function visibleWorkSpan(pervText, count) {
  var elem = document.querySelector('.status-span');
  if (elem) {
    if (elem.innerText == pervText) {
      // if (pervText.search(/\.$/g) != -1) {
      //     pervText = pervText.replace(/\.$/g,"..")
      // } else if (pervText.search(/\.\.$/g) != -1) {
      //   pervText = pervText.replace(/\.\.$/g,"...")
      // } else if (pervText.search(/\.\.\.$/g) != -1) {
      //   pervText = pervText.replace(/\.\.\.$/g,".")
      // } else if (count==0){
      // } else  if 
      switch (count) {
        case -2:
          return
        case 0:
        case 1:
        case 2:
          pervText = pervText + "."
          break;
        case 3:
          pervText = pervText.replace("...", "")
          count = -1
          break;
      }
      elem.innerText = pervText
      setTimeout(() => {
        visibleWorkSpan(pervText, count + 1)
      }, 1000);
    }
  }
}
function generateStatusSpan(
  text, count = 0, parentNode = 'html body div.wrapper div.condensed div.top.top_header.fixed-block.active div.inner') {
  var l = document.querySelector(parentNode);
  if (l) {
    var oa = document.querySelector('.status-span');
    if (oa) {
      oa.parentNode.removeChild(oa);
    }
    var a = document.createElement('span');
    a.innerHTML = text;
    a.style.display = 'table';
    a.className = 'status-span';
    a.style.marginLeft = '10px';
    a.style.marginBottom = '15px';
    l.parentNode.appendChild(a);
    visibleWorkSpan(text, count)
  }
}
// } catch (error) {
//   console.log('common.js :>> ', error);
// }
console.log('init common.js :>> ');


export  {
  generateLink,
  generateStatusSpan,
  selectList_change_listener,
  setColumn
}


