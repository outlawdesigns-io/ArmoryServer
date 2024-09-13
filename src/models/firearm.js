"use strict";

const Record = require('outlawdesigns.io.noderecord');

class Firearm extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'Firearm';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','Manufacturer','Caliber','Model','Serial_Number', 'CurrentOptic', 'LinkToProduct'
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
      let obj = await new Firearm(ids[id][this.primaryKey]).init();
      records.push(obj.getPublicProperties());
    }
    return records;
  }
}

module.exports = Firearm;
