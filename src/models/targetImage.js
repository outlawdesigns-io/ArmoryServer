"use strict";

const Record = require('outlawdesigns.io.noderecord');

class TargetImage extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'TargetImage';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','ShootId','BinaryData', 'User'
    ];
  }
  static async getByShootId(shootId){
    let records = [];
    let model = new TargetImage();
    let ids = await model.db.table(model.table).select(model.primaryKey).where('ShootId = ' + shootId).execute();
    for(let id in ids){
      let obj = await new TargetImage(ids[id][model.primaryKey]).init();
      records.push(obj.getPublicProperties());
    }
    return records;
  }
}

module.exports = TargetImage;
