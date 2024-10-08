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
}

module.exports = Ammo;
