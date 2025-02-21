"use strict";

const Record = require('outlawdesigns.io.noderecord');

class Firearm extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'Firearm';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','FirearmType','NickName','Serial_Number','AcquisitionDate', 'Price', 'CurrentOptic', 'User'
    ];
  }
}

module.exports = Firearm;
