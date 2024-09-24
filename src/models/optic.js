"use strict";

const Record = require('outlawdesigns.io.noderecord');

class Optic extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'Optic';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','Manufacturer', 'Name', 'MagnificationTimes', 'LinkToProduct'
    ];
  }
}

module.exports = Optic;
