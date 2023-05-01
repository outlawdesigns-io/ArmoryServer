"use strict";

const Record = require('outlawdesigns.io.noderecord');

class Firearm extends Record{

  constructor(id){
    const database = process.env.NODE_ENV == 'production' ? 'Armory':'Armory_Test';
    const table = 'Firearm';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','Manufacturer','Caliber','Model','Serial_Number'
    ];
  }
  static delete(targetId){
    let obj = new Firearm();
    return obj.db.table(obj.table).delete().where(obj.primaryKey + ' = ' + targetId).execute();
  }
  async getAll(){
    let records = [];
    let ids = await this._getAll();
    for(let id in ids){
      let obj = await new Firearm(ids[id][this.primaryKey])._build();
      records.push(obj._buildPublicObj());
    }
    return records;
  }
}

module.exports = Firearm;
