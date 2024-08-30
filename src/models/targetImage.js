"use strict";

const Record = require('outlawdesigns.io.noderecord');

class TargetImage extends Record{

  constructor(id){
    const database = process.env.NODE_ENV == 'production' ? 'Armory':'Armory_Test';
    const table = 'TargetImage';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','ShootId','BinaryData'
    ];
  }
  static delete(targetId){
    let obj = new TargetImage();
    return obj.db.table(obj.table).delete().where(obj.primaryKey + ' = ' + targetId).execute();
  }
  static async getByShootId(shootId){
    let records = [];
    let purchase = new TargetImage();
    let ids = await purchase.db.table(purchase.table).select(purchase.primaryKey).where('ShootId = ' + shootId).execute();
    for(let id in ids){
      let obj = await new TargetImage(ids[id][purchase.primaryKey]).init();
      records.push(obj.getPublicProperties());
    }
    return records;
  }
  async getAll(){
    let records = [];
    let ids = await this._getAll();
    for(let id in ids){
      let obj = await new TargetImage(ids[id][this.primaryKey]).init();
      records.push(obj.getPublicProperties());
    }
    return records;
  }
}

module.exports = TargetImage;
