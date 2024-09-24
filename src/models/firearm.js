"use strict";

const Record = require('outlawdesigns.io.noderecord');

class Firearm extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'Firearm';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','Manufacturer','Caliber','Model','Serial_Number', 'CurrentOptic', 'LinkToProduct'
    ];
  }
}

module.exports = Firearm;
