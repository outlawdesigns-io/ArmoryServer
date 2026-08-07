"use strict";

const Record = require('outlawdesigns.io.noderecord');
const Firearm = require('./firearm');
const Ammo = require('./ammunition');

class Shoot extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'Shoot';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','Firearm','Ammo','Rounds','Distance_Ft','Created', 'Optic', 'User'
    ];
  }
  static async new(firearmId, ammoId, rounds, distance_ft, optic, user){
    let firearm;
    let ammo;
    let shoot = new Shoot();
    try{
      firearm = await new Firearm(firearmId).init(); //validate firarmId
      ammo = await new Ammo(ammoId).init();
      ammo.Rounds -= rounds;
      await ammo.update();
    }catch(err){
      throw err;
    }
    shoot.Firearm = firearmId;
    shoot.Ammo = ammoId;
    shoot.Rounds = rounds;
    shoot.Distance_Ft = distance_ft;
    shoot.Optic = optic;
    shoot.Created = shoot.db.date();
    shoot.User = user;
    return await shoot.create();
  }
}

module.exports = Shoot;
