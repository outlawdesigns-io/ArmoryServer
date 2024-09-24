"use strict";

const Record = require('outlawdesigns.io.noderecord');

class Caliber extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'Caliber';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','Label'
    ];
  }
}

module.exports = Caliber;
