

class Ds {
  constructor({ id, token, locationOrigin, mode, settings, advanceType, isSrd}) {

   try {
      this.name = "Менеджер деклараций";
    this.advanceType = advanceType;
    this.isSrd = isSrd;

    this.fgisType = this._get_fgis_type(this.advanceType, this.isSrd);
   
    console.log('this.advanceType :>> ', this.advanceType);
    console.log('this.isSrd :>> ', this.isSrd);
    console.log('this.fgisType :>> ', this.fgisType);

    this.advance = new Advance(settings, locationOrigin, advanceType);
    console.log('this.advance :>> ', this.advance);
    
    this.fgis = new Fgis({
       token: token,
       advance: this.advance,
       mode: mode,
       settings: settings,
       fgisType: this.fgisType,
      });

   console.log('this.fgis :>> ', this.fgis);
   this.statement = new Statement(id, this.advance, this.fgis, settings);
   console.log('this.statement :>> ', this.statement);

   this.document = new Document(
      id,
      this.advance,
      this.fgis,
      settings,
      this.advanceType,
      this.isSrd,
      this.fgisType,
      );

   console.log('this.document :>> ', this.document);
   console.log('Ds :>> ', this);
   } catch (error) {
      console.log('error :>> ', error);
   }

    
   
  }
  _get_fgis_type(type, isSrd) {
     if (isSrd){
         return "srd"
     }else {
        switch (type) {
          case "DTREA":
          case "DGSTR":
          case "DPRTR":
            return "rds";
          case "STREA":
            return "rss";
          default:
            console.error("Ошибка определения fgisType, ", type)
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
        // 1 = Тех
        action = this.document.revoke(1);
        break;
      case "revokeApplicant":
        // 2 = Заявитель
        action = this.document.revoke(2);
        break;
      case "statementGetList":
        action = this.statement.getList();
        break;
      case "startReplication":
        action = this.statement
          .workFlow()
          .then(() => this.document.workFlow());
        break;
      default:
        action = Promise.resolve().then(() => {
         console.error(`${this.name}: Для функции ${actionName} нет описания.`)
          throw `${this.name}: Для функции ${actionName} нет описания.`;
        });
        break;
    }
    return action;
  }
}