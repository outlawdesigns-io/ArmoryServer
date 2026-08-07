"use strict";

const Record = require('outlawdesigns.io.noderecord');

class Vendor extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'Vendor';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','Name','Website', 'User'
    ];
  }
}

module.exports = Vendor;
