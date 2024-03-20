// var browser = require("webextension-polyfill");

class Parser {
    constructor({token,fgis}) {
        this.name = "Parser"
        this.token = token;
        this.fgis = fgis
    }
    doAction(actionName = "") {
        console.log(`${this.name} - ${actionName}`)
        let action;
        switch (actionName) {
            case 'getOrganxpert':           
                var o = new organ_expert(fgis)
                action = o.start()
                break;
            default:
                action = Promise.resolve().then(() => { throw `${this.name}: Для функции ${request.action} нет описания.` })
                break;
        }
        return action
    }
}
class type_of_research {
    constructor(token) {
        this.url = "http://10.250.74.17/nsi/api/testingStatus/get";
        this.name = "Тип испытаний и лаборатории";
        // 1 - recordset, 2 - treeview
        this.type_data = 1
        this.token = token;
        this.fetch_method = "POST";
        this.fetch_headers = new Headers();
        this.fetch_body = {
            "sort": "id",
            "attrs": [            
            ],
            "offset": 0,
            "limit": 9999999
        };
        this.data= [];
    }
    start() {
        console.log("start")
        this.fetch_headers.append('Accept', "application/json;charset=UTF-8");
        this.fetch_headers.append('Authorization', "Bearer " + this.token.getToken());
        this.fetch_headers.append('Pragma', "no-cache");
        this.fetch_headers.append('Content-Type', "application/json");
        this.fetch_headers.append('lkId', 5);      
        return fetch(this.url,{
            method:this.fetch_method,
            body:JSON.stringify(this.fetch_body),
            credentials:"include",
            headers:this.fetch_headers
        })
        .then(response => response.json())
        .then(obj => {
            console.log(obj);
            return obj
        });
    }
    stop(){
        console.log("stop")
    }
    load_root(){
        console.log("load_root")
    }
    getData(){
        console.log("getData")
    }
}
class lab_info {
    constructor(token) {
        this.url = "http://10.250.74.17/api/v1/ral/common/showcases/get";
        this.name = "Данные по ИЛ";
        // 1 - recordset, 2 - treeview
        this.type_data = 1
        this.token = token;
        this.fetch_method = "POST";
        this.fetch_headers = new Headers();
        this.fetch_body = {
            "idType": [
                10,
                11
            ],
            "offset": 0,
            "limit": 99999999
        };
        this.data= [];
        this.fetch_headers.append('Accept', "application/json, text/plain, */*");
        this.fetch_headers.append('Authorization', "Bearer " + this.token.getToken());
        this.fetch_headers.append('Pragma', "no-cache");
        this.fetch_headers.append('Content-Type', "application/json");
        this.fetch_headers.append('lkId', 5);      
        this.total = 100;
        this.offset = 0;
        this.limit = 50;
        this.maxoffset=0;
        this.handleWork=0;
    }
    start() {
        console.log("start")
        this.watch_old()
        .then((r)=>{
            console.log(r)
        }).then(()=>{
            return fetch(this.url,{
                method:this.fetch_method,
                body:JSON.stringify(this.fetch_body),
                credentials:"include",
                headers:this.fetch_headers
            })
        })
        .then(response => response.json())
        .then(obj => {
            console.log(obj);
        });
    }
    watch_old(){
        return browser.storage.local.get()
        .then((storedSettings) => {
        return storedSettings.lab_info || []
        })
    }
    get_short(){
        var url = "http://10.250.74.17/api/v1/ral/common/companies/get/short"
        return fetch(url,{
            method:this.fetch_method,
            body:JSON.stringify({
                "id": []
            }),
            credentials:"include",
            headers:this.fetch_headers
        }).then(response => response.json())
        .then(obj => {
            console.log(obj)
            return 
        });
    }
    load_branch(offset){
        if (offset >= Math.ceil(this.total/this.limit) || offset >= (this.handleWork||9999999999)) { 
            console.log("I am end") 
            return browser.storage.local.set({
                lab_info:this.data
              });
        } 
        console.log("Сделано: " + offset.toString() + " из " + (Math.ceil(this.total/this.limit)).toString() );
        return fetch(this.url,{
            method:this.fetch_method,
            body:JSON.stringify({
                "idType": [
                    10,
                    11
                ],
                "offset": offset,
                "limit": this.limit
            }),
            credentials:"include",
            headers:this.fetch_headers
        })
        .then(response => response.json())
        .then(obj => {
            // console.log(obj);
            this.total = obj.total;
            this.data = this.data.concat(obj.items)   
            return this.load_branch(offset+1) 
        });
    }
}
class techregProductListEEU {
    constructor(token) {
        this.url = "http://10.250.74.17/nsi/api/tree/techregProductListEEU/get";
        this.name = "Технические регламенты*";
        // 1 - recordset, 2 - treeview
        this.token = token;
        this.fetch_method = "POST";
        this.fetch_headers = new Headers();
        this.parentId = null;
        this.fetch_body = {
            "attrs": [],
            "parentId": this.parentId,
        };
        this.data= [];
        this.root= [];
        this.res_data = [];
        this.fetch_headers.append('Accept', "application/json, text/plain, */*");
        this.fetch_headers.append('Authorization', "Bearer " + this.token.getToken());
        this.fetch_headers.append('Pragma', "no-cache");
        this.fetch_headers.append('Content-Type', "application/json");
        this.fetch_headers.append('lkId', 5);      
        // this.total = 100;
        // this.offset = 0;
        // this.limit = 50;
        // this.maxoffset=0;
        // this.handleWork=0;
    }
    watch_old(){
        return browser.storage.local.get()
        .then((storedSettings) => {
        return storedSettings.ed_perechen || []
        })
    }
    start(first_start= true){
        // leaf
        // ПРОВЕРИТ ЬЕСЛИ ЛИ Элемент leaf у элемента 
        if (!this.root.length && !first_start ) { 
            console.log(this)
            return this.data
        }
        var parentId = null
        if (!first_start){
            // this.root[0].filter(el=>{
            //     el.leaf == true
            // })
            parentId = this.root[0].id
        } 
        // if (offset >= Math.ceil(this.total/this.limit) || offset >= (this.handleWork||9999999999)) { 
        //     console.log("I am end") 
        //     return browser.storage.local.set({
        //         ed_perechen:this.data
        //       });
        // } 
        this.fetch_body = {
            "attrs": [],
            "parentId": parentId,
        };   
        // console.log("Сделано: " + offset.toString() + " из " + (Math.ceil(this.total/this.limit)).toString() );
        return fetch(this.url,{
            method:this.fetch_method,
            body:JSON.stringify(this.fetch_body),
            credentials:"include",
            headers:this.fetch_headers
        })
        .then(response => response.json())
        .then(obj => {
            // console.log(obj);
            // this.data = obj.items
            // console.log(this.data,this.root,obj.items )   
            this.data = this.data.concat(obj.items)
            this.root = this.root.concat(obj.items)  
            if (parentId){
                this.root = this.root.filter(el=>el.id != parentId)
            }
            this.root = this.root.filter(el=>el.leaf == false)
            // var oooo = this.root.filter(el=>{               
            //     el.id != parentId && el.leaf == true
            // })
            // console.log(this.data,this.root,obj.items )  
            return this.start(false) 
        });
    }
}
class singleListRU {
    constructor(token) {
        this.url = "http://10.250.74.17/nsi/api/tree/singleListRU/get";
        this.name = "Единый перечень продукции РФ*";
        // 1 - recordset, 2 - treeview
        this.token = token;
        this.fetch_method = "POST";
        this.fetch_headers = new Headers();
        this.parentId = null;
        this.fetch_body = {
            "attrs": [],
            "parentId": this.parentId,
        };
        this.data= [];
        this.root= [];
        this.res_data = [];
        this.fetch_headers.append('Accept', "application/json, text/plain, */*");
        this.fetch_headers.append('Authorization', "Bearer " + this.token.getToken());
        this.fetch_headers.append('Pragma', "no-cache");
        this.fetch_headers.append('Content-Type', "application/json");
        this.fetch_headers.append('lkId', 5);      
        // this.total = 100;
        // this.offset = 0;
        // this.limit = 50;
        // this.maxoffset=0;
        // this.handleWork=0;
    }
    // start() {
    //         console.log("start")
    //         this.watch_old()
    //         .then((r)=>{
    //             console.log(r)
    //         }).then(()=>{
    //             return fetch(this.url,{
    //                 method:this.fetch_method,
    //                 body:JSON.stringify(this.fetch_body),
    //                 credentials:"include",
    //                 headers:this.fetch_headers
    //             })
    //         })
    //         .then(response => response.json())
    //         .then(obj => {
    //             console.log(obj);
    //         });
    // }
    watch_old(){
        return browser.storage.local.get()
        .then((storedSettings) => {
        return storedSettings.ed_perechen || []
        })
    }
    start(first_start= true){
        // leaf
        // ПРОВЕРИТ ЬЕСЛИ ЛИ Элемент leaf у элемента 
        if (!this.root.length && !first_start ) { 
            console.log(this)
            return this.data
        }
        var parentId = null
        if (!first_start){
            // this.root[0].filter(el=>{
            //     el.leaf == true
            // })
            parentId = this.root[0].id
        } 
        // if (offset >= Math.ceil(this.total/this.limit) || offset >= (this.handleWork||9999999999)) { 
        //     console.log("I am end") 
        //     return browser.storage.local.set({
        //         ed_perechen:this.data
        //       });
        // } 
        this.fetch_body = {
            "attrs": [],
            "parentId": parentId,
        };   
        // console.log("Сделано: " + offset.toString() + " из " + (Math.ceil(this.total/this.limit)).toString() );
        return fetch(this.url,{
            method:this.fetch_method,
            body:JSON.stringify(this.fetch_body),
            credentials:"include",
            headers:this.fetch_headers
        })
        .then(response => response.json())
        .then(obj => {
            // console.log(obj);
            // this.data = obj.items
            // console.log(this.data,this.root,obj.items )   
            this.data = this.data.concat(obj.items)
            this.root = this.root.concat(obj.items)  
            if (parentId){
                this.root = this.root.filter(el=>el.id != parentId)
            }
            this.root = this.root.filter(el=>el.leaf == false)
            // var oooo = this.root.filter(el=>{               
            //     el.id != parentId && el.leaf == true
            // })
            // console.log(this.data,this.root,obj.items )  
            return this.start(false) 
        });
    }
}
class get_short {
    constructor(token) {
        this.url = "http://10.250.74.17/api/v1/ral/common/companies/get/short";
        this.name = "Лаборатория короткая?";
        // 1 - recordset, 2 - treeview
        this.type_data = 1
        this.token = token;
        this.fetch_method = "POST";
        this.fetch_headers = new Headers();
        this.fetch_body = {id:[5]};
        this.data= [];
    }
    start() {
        console.log("start")
        this.fetch_headers.append('Accept', "application/json;charset=UTF-8");
        this.fetch_headers.append('Authorization', "Bearer " + this.token.getToken());
        this.fetch_headers.append('Pragma', "no-cache");
        this.fetch_headers.append('Content-Type', "application/json");
        this.fetch_headers.append('lkId', 5);      
        return fetch(this.url,{
            method:this.fetch_method,
            body:JSON.stringify(this.fetch_body),
            credentials:"include",
            headers:this.fetch_headers
        })
        .then(response => response.json())
        .then(obj => {
            console.log(obj);
        });
    }
}
class legalForm {
    constructor(token) {
        this.url = "http://10.250.74.17/nsi/api/legalForm/get";
        this.name = "Правовые формы";
        // 1 - recordset, 2 - treeview
        this.type_data = 1
        this.token = token;
        this.fetch_method = "POST";
        this.fetch_headers = new Headers();
        this.fetch_body = {
            "offset": 0,
            "limit": 9999999
        };
        this.data= [];
    }
    start() {
        console.log("start")
        this.fetch_headers.append('Accept', "application/json;charset=UTF-8");
        this.fetch_headers.append('Authorization', "Bearer " + this.token.getToken());
        this.fetch_headers.append('Pragma', "no-cache");
        this.fetch_headers.append('Content-Type', "application/json");
        this.fetch_headers.append('lkId', 5);      
        return fetch(this.url,{
            method:this.fetch_method,
            body:JSON.stringify(this.fetch_body),
            credentials:"include",
            headers:this.fetch_headers
        })
        .then(response => response.json())
        .then(obj => {
            console.log(obj);
            return obj
        });
    }
}
class organ_expert {
    // constructor(token) {
    //     this.fgis = fgis
    //     // this.url = "http://10.250.74.17/development/api/employees/rss/null";
    //     // this.name = "Эксперты органа";
    //     // // 1 - recordset, 2 - treeview
    //     // this.type_data = 1
    //     // this.token = token;
    //     // this.fetch_method = "GET";
    //     // this.fetch_headers = new Headers();
    //     // this.fetch_body = {};
    //     // this.data= [];
    //     // this.orgId = orgId;
    // }
    constructor(token) {
        this.url = "http://10.250.74.17/development/api/employees/rss/null";
        this.name = "Эксперты";
        // 1 - recordset, 2 - treeview
        this.type_data = 1
        this.token = token;
        this.fetch_method = "GET";
        this.fetch_headers = new Headers();
    }
    start() {
        console.log("start")
        this.fetch_headers.append('Accept', "application/json;charset=UTF-8");
        this.fetch_headers.append('Authorization', "Bearer " + this.token.getToken());
        this.fetch_headers.append('Pragma', "no-cache");
        this.fetch_headers.append('Content-Type', "application/json");
        this.fetch_headers.append('lkId', 5);      
        return fetch(this.url,{
            method:this.fetch_method,
            credentials:"include",
            headers:this.fetch_headers
        })
        .then(response => response.json())
        .then(obj => {
            console.log(obj);
            return obj
        });
    }
}
class shema {
    constructor(token) {
        this.url = "http://10.250.74.17/nsi/api/validationScheme2/get";
        this.name = "Схемы";
        // 1 - recordset, 2 - treeview
        this.type_data = 1
        this.token = token;
        this.fetch_method = "POST";
        this.fetch_headers = new Headers();
        this.fetch_body = {
            "sort": "id",
            "attrs": [{
                "name": "validationFormId",
                "operation": "in",
                "value": [1,2, 3]
              }],
            "offset": 0,
            "limit": 9999999
        };
        this.data= [];
    }
    start() {
        console.log("start")
        this.fetch_headers.append('Accept', "application/json;charset=UTF-8");
        this.fetch_headers.append('Authorization', "Bearer " + this.token.getToken());
        this.fetch_headers.append('Pragma', "no-cache");
        this.fetch_headers.append('Content-Type', "application/json");
        return fetch(this.url,{
            method:this.fetch_method,
            body:JSON.stringify(this.fetch_body),
            credentials:"include",
            headers:this.fetch_headers
        })
        .then(response => response.json())
        .then(obj => {
            console.log(obj);
            return obj
        });
    }
    stop(){
        console.log("stop")
    }
    load_root(){
        console.log("load_root")
    }
    getData(){
        console.log("getData")
    }
}
class tehreg_shema_validate {
    constructor(token) {
        this.url = "http://10.250.74.17/nsi/api/techregScheme/get";
        this.name = "Схемы";
        // 1 - recordset, 2 - treeview
        this.type_data = 1
        this.token = token;
        this.fetch_method = "POST";
        this.fetch_headers = new Headers();
        this.fetch_body = {"offset":0,
        "limit":9999999,
        "fields":
        ["validationSchemeId"],
        "attrs":[
            // {"name":"techRegId","operation":"in","value":[27,32]}
        ]};
        this.data= [];
    }
    start() {
        console.log("start")
        this.fetch_headers.append('Accept', "application/json;charset=UTF-8");
        this.fetch_headers.append('Authorization', "Bearer " + this.token.getToken());
        this.fetch_headers.append('Pragma', "no-cache");
        this.fetch_headers.append('Content-Type', "application/json");
        this.fetch_headers.append('lkId', 5);      
        return fetch(this.url,{
            method:this.fetch_method,
            body:JSON.stringify(this.fetch_body),
            credentials:"include",
            headers:this.fetch_headers
        })
        .then(response => response.json())
        .then(obj => {
            console.log(obj);
            return obj
        });
    }
    stop(){
        console.log("stop")
    }
    load_root(){
        console.log("load_root")
    }
    getData(){
        console.log("getData")
    }
}
class tehreglaments {
    constructor(token) {
        this.url = "http://10.250.74.17/nsi/api/validationFormNormDoc/get";
        this.name = "Регламенты";
        // 1 - recordset, 2 - treeview
        this.type_data = 1
        this.token = token;
        this.fetch_method = "POST";
        this.fetch_headers = new Headers();
        this.fetch_body = {
            "sort": "sortIndex",
            "attrs": [
                // {
                //     "name": "docType",
                //     "operation": "=",
                //     "value": 1
                // },
                // {
                //     "name": "validationFormId",
                //     "operation": "=",
                //     "value": 2
                // },
                // {
                //     "name": "rdsAvailability",
                //     "operation": "=",
                //     "value": true
                // },
                {
                    "name": "actuationDate",
                    "operation": "between",
                    "value": [
                        "01.01.1900",
                        "11.12.2018"
                    ]
                }
            ],
            "columns": [
                {
                    "names": [
                        "docNum",
                        "name"
                    ],
                    "search": ""
                }
            ],
            "offset": 0,
            "limit": 50
        };
        this.data= [];
    }
    start() {
        console.log("start")
        this.fetch_headers.append('Accept', "application/json;charset=UTF-8");
        this.fetch_headers.append('Authorization', "Bearer " + this.token.getToken());
        this.fetch_headers.append('Pragma', "no-cache");
        this.fetch_headers.append('Content-Type', "application/json");
        this.fetch_headers.append('lkId', 5);      
        return fetch(this.url,{
            method:this.fetch_method,
            body:JSON.stringify(this.fetch_body),
            credentials:"include",
            headers:this.fetch_headers
        })
        .then(response => response.json())
        .then(obj => {
            console.log(obj);
            return obj
        });
    }
    stop(){
        console.log("stop")
    }
    load_root(){
        console.log("load_root")
    }
    getData(){
        console.log("getData")
    }
}
class oksm {
    constructor(token) {
        this.url = "http://10.250.74.17/nsi/api/oksm/get";
        this.name = "Страны";
        this.type_data = 1
        this.token = token;
        this.fetch_method = "POST";
        this.fetch_headers = new Headers();
        this.fetch_body = {
            "limit": 999999999
        };
        this.data= [];
    }
    start() {
        console.log("start")
        this.fetch_headers.append('Accept', "application/json;charset=UTF-8");
        this.fetch_headers.append('Authorization', "Bearer " + this.token.getToken());
        this.fetch_headers.append('Pragma', "no-cache");
        this.fetch_headers.append('Content-Type', "application/json");
        this.fetch_headers.append('lkId', 5);      
        return fetch(this.url,{
            method:this.fetch_method,
            body:JSON.stringify(this.fetch_body),
            credentials:"include",
            headers:this.fetch_headers
        })
        .then(response => response.json())
        .then(obj => {
            console.log(obj);
            return obj
        });
    }
    stop(){
        console.log("stop")
    }
    load_root(){
        console.log("load_root")
    }
    getData(){
        console.log("getData")
    }
}
// console.log(token)
browser.runtime.onMessage.addListener(handleMessageParser);
function handleMessageParser(request, sender, sendResponse) {
    if (request.pageName == 'parser') {
        console.log(request)
        let o;
        switch (request.action) {
            case 'shema':
            o = new shema(token)
                break;
            case 'tehreg_shema_validate':
            o = new tehreg_shema_validate(token)
                break;
            case 'tehreglaments':
            o = new tehreglaments(token)
                break;
            case 'legalForm':
            o = new legalForm(token)
                break;
            case 'techregProductListEEU':
            o = new techregProductListEEU(token)
                break;
            case 'singleListRU':
            o = new singleListRU(token)
                break;
            case 'type_of_research':
            o = new type_of_research(token)
                break;
            case 'organ_expert':
            o = new organ_expert(token)
                break;
            case 'oksm':
                o = new oksm(token)
                break;
            default:
                break;
        }
        o.start().then(res=>{
            sendResponse({response: res});
        })
        return true;   
    }     
  }

// var o = new lab_info(token)
// o.get_short()
// console.log(o.date)
// var o = new get_short(token)
// o.start(0)




// техрегламенты = gr_pg("http://10.250.74.17/nsi/api/validationFormNormDoc/get", {
// 	"sort": "sortIndex",
// 	"attrs": [{
// 		"name": "validationFormId",
// 		"operation": "in",
// 		"value": [1,2,3]
// 	}, {
// 		"name": "actuationDate",
// 		"operation": "between",
// 		"value": ["01.01.1900", "21.04.2020"]
// 	}],
// 	"offset": 0,
// 	"limit": 50
// })

// var token = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJlYTZjODFjNy1jMjY3LTQ5MWUtYjdiZC00NjgxZjlhNmU5MzMiLCJzdWIiOiJpbmQuMjAzNTg0MjU1NDUiLCJleHAiOjE1ODgzMTU1NzB9.XbHxaXo6O_xR2xUI7cBrGAHYN_r6n7S_DYFMa2Wx9poCUh33ec2xpzqq8I0erm202YPRokRzqtKjETG8jP2E9Q"

// function f(url, fetch_body){
  

//   var fetch_headers = new Headers()
//   fetch_headers.append('Accept', "application/json;charset=UTF-8");
//   fetch_headers.append('Authorization', "Bearer " + this.token);
//   fetch_headers.append('Pragma', "no-cache");
//   fetch_headers.append('Content-Type', "application/json");
  
//   return fetch(url,{
//   method:"POST",
//   body:JSON.stringify(fetch_body),
//   credentials:"include",
//   headers:fetch_headers
// })
//   .then(response => response.json())
//   .then(obj => {
//   console.log(obj);
    
//     return obj
// });
  
// }
// gr_pg("http://10.250.74.17/nsi/api/validationFormNormDoc/get", {
// 	"sort": "sortIndex",
// 	"attrs": [{
// 		"name": "validationFormId",
// 		"operation": "in",
// 		"value": [1,2,3]
// 	}, {
// 		"name": "actuationDate",
// 		"operation": "between",
// 		"value": ["01.01.1900", "21.04.2020"]
// 	}],
// 	"offset": 0,
// 	"limit": 50
// })

// f("http://10.250.74.17/nsi/api/techregScheme/get",{
// 	"offset": 0,
// 	"limit": 9999999,
// 	"fields": ["validationSchemeId"],
// 	"attrs": []
// }).then(res=>res.items.map(item=>item.validationSchemeId)).
// then(ids=>{
//   console.log(ids);
// 	return f('http://10.250.74.17/nsi/api/validationScheme2/get', {
//           "sort": "id",
//           "attrs": [{
//             "name": "validationFormId",
//             "operation": "in",
//             "value": [1,2, 3]
//           }],
//           "offset": 0,
//           "limit": 1000
//         })
// })



export { Parser}
