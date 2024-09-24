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
}

module.exports = Manufacturer;
