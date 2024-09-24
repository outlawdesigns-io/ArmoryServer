"use strict";

const Record = require('outlawdesigns.io.noderecord');

class Caliber extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'Caliber';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','Label'
    ];
  }
  static delete(targetId){
    let obj = new Caliber();
    return obj.db.table(obj.table).delete().where(obj.primaryKey + ' = ' + targetId).execute();
  }
  async getAll(){
    let records = [];
    let ids = await this._getAll();
    for(let id in ids){
      let obj = await new Caliber(ids[id][this.primaryKey]).init();
      records.push(obj.getPublicProperties());
    }
    return records;
  }
  static truncate(){
    let obj = new Caliber();
    return obj.db.table(obj.table).truncate().execute();
  }
}

module.exports = Caliber;
