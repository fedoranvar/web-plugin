// var browser = require("webextension-polyfill");

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
    var encodedString = String.fromCharCode.apply(null, uintArray),
      decodedString = decodeURIComponent(escape(encodedString));
    return decodedString;
  }

  parseToken(requestDetails) {
    // if (requestDetails.method == 'GET') {
    //   //пробуем получить токен из URL
    //   var arr = requestDetails.url.match(/^[\w\W]+api\/account\/isActual\/([\w\W]+$)/i);
    //   if (arr && arr.length == 2) {
    //     this.setToken(arr[1]);
    //   }
    // }
    // else
    if (requestDetails.method == "POST") {
      //пробуем получить токен из хидеров
      if (requestDetails.requestHeaders)
        requestDetails.requestHeaders.forEach((item) => {
          if (item.name == "Authorization") {
            var token = item.value.replace(/^Bearer\s+/, "");
            this.setToken(token);
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
        if (requestDetails.url.includes( "/api/v1/rds/common/applications") && requestDetails.requestBody.raw.length){
            var resp = JSON.parse(
              this.uintToString(new Uint8Array(requestDetails.requestBody.raw[0].bytes))
            );
            if (!this.certificationAuthority) {
              browser.storage.local.set({
                certificationAuthority: JSON.stringify(resp.certificationAuthority),
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
      browser.storage.local.set({ orgId: orgId });
    }
  }

  setToken(token) {
    console.log('token :>> ', token, !this.secToken.some((item) => item == token));
    if (!token) return;
    if (!this.secToken.some((item) => item == token)) {
      this.secToken.push(token);
      // localStorage.setItem("fgisToken", token);
      browser.storage.local.set({ fgisToken: token });
    }
  }
  getOrgId() {
    return this.orgId;
  }
  getToken() {
    return this.secToken.length ? this.secToken[this.secToken.length - 1] : "";
  }
  start() {
    if (this.started) return;
    this.started = true;
    var url = ["*://10.250.74.17/*", "*://srd.fsa.gov.ru/*"];
    browser.webRequest.onBeforeSendHeaders.addListener(
      this.parseToken.bind(this),
      { urls: url },
      ["requestHeaders"]
    );

    browser.webRequest.onBeforeRequest.addListener(
      this.parseOrganData.bind(this),
      { urls: url },
      ["requestBody"]
    );

    // this.setToken(localStorage.getItem("fgisToken"));
    this.setToken(browser.storage.local.get( 'fgisToken'));
      ;
  }
  checkToken() {
    if (this.token.getToken() == "") {
      throw "Нет токена. Залогиньтесь в 10.250.74.17, srd.fsa.gov.ru";
    }
  }

}

export { Token}
