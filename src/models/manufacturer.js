"use strict";

const Record = require('outlawdesigns.io.noderecord');

class Manufacturer extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'Manufacturer';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','Name','Website', 'Firearm', 'Ammo', 'Optic'
    ];
  }
  static delete(targetId){
    let obj = new Manufacturer();
    return obj.db.table(obj.table).delete().where(obj.primaryKey + ' = ' + targetId).execute();
  }
  async getAll(){
    let records = [];
    let ids = await this._getAll();
    for(let id in ids){
      let obj = await new Manufacturer(ids[id][this.primaryKey]).init();
      records.push(obj.getPublicProperties());
    }
    return records;
  }
}

module.exports = Manufacturer;
