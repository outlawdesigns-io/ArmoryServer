"use strict";

const Record = require('outlawdesigns.io.noderecord');

class FirearmImage extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'FirearmImage';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','BinaryData','Firearm','Optic'
    ];
  }
}

module.exports = FirearmImage;
