"use strict";

const Record = require('outlawdesigns.io.noderecord');

class FirearmType extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'FirearmType';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','Manufacturer','Caliber','Model', 'LinkToProduct', 'MSRP'
    ];
  }
}

module.exports = FirearmType;
