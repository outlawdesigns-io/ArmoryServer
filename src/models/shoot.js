"use strict";

const Record = require('outlawdesigns.io.noderecord');
const Firearm = require('./firearm');
const Ammo = require('./ammo');

class Shoot extends Record{

  constructor(id){
    const database = process.env.NODE_ENV == 'production' ? 'Armory':'Armory_Test';
    const table = 'Shoot';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','FireArm','Ammo','Rounds','Created'
    ];
  }
  static delete(targetId){
    let obj = new Shoot();
    return obj.db.table(obj.table).delete().where(obj.primaryKey + ' = ' + targetId).execute();
  }
  static async new(firearmId, ammoId,rounds){
    let firearm;
    let ammo;
    let shoot = new Shoot();
    try{
      firearm = await new Firearm(firearmId)._build(); //validate firarmId
      ammo = await new Ammo(ammoId)._build();
      ammo.Rounds -= rounds;
      await ammo._update();
    }catch(err){
      throw err;
    }
    shoot.FireArm = firearmId;
    shoot.Ammo = ammoId;
    shoot.Rounds = rounds;
    shoot.Created = shoot.db.date();
    return await shoot._create();
  }
  async getAll(){
    let records = [];
    let ids = await this._getAll();
    for(let id in ids){
      let obj = await new Shoot(ids[id][this.primaryKey])._build();
      records.push(obj._buildPublicObj());
    }
    return records;
  }
}

module.exports = Shoot;
