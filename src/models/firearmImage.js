"use strict";

const Record = require('outlawdesigns.io.noderecord');

class FirearmImage extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'FirearmImage';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','BinaryData','Firearm','Optic', 'User'
    ];
  }
  static async getByFirearmId(firearmId){
    let records = [];
    let model = new FirearmImage();
    let ids = await model.db.table(model.table).select(model.primaryKey).where('Firearm = ' + firearmId).execute();
    for(let id in ids){
      let obj = await new FirearmImage(ids[id][model.primaryKey]).init();
      records.push(obj.getPublicProperties());
    }
    return records;
  }
}

module.exports = FirearmImage;
