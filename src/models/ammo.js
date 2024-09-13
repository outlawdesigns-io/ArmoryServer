"use strict";

const Record = require('outlawdesigns.io.noderecord');

class Ammo extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'Ammo';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','Manufacturer','Caliber','BulletWeight','Casing','BulletType','MuzzleVelocity','Rounds'
    ];
  }
  static delete(targetId){
    let obj = new Ammo();
    return obj.db.table(obj.table).delete().where(obj.primaryKey + ' = ' + targetId).execute();
  }
  async getAll(){
    let records = [];
    let ids = await this._getAll();
    for(let id in ids){
      let obj = await new Ammo(ids[id][this.primaryKey]).init();
      records.push(obj.getPublicProperties());
    }
    return records;
  }
}

module.exports = Ammo;
