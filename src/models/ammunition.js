"use strict";

const Record = require('outlawdesigns.io.noderecord');

class Ammunition extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'Ammunition';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','AmmunitionType','Rounds','User'
    ];
  }
}

module.exports = Ammunition;
