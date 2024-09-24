"use strict";

const Record = require('outlawdesigns.io.noderecord');
const Ammo = require('./ammo');
const Vendor = require('./vendor');

class AmmoPurchase extends Record{

  constructor(id){
    const database = global.config[process.env.NODE_ENV].DB_DB;
    const table = 'AmmoPurchase';
    const primaryKey = 'Id';
    super(database,table,primaryKey,id);
    this.publicKeys = [
      'Id','Ammo','Vendor','Rounds','Price','DatePurchased','DateReceived'
    ];
  }
  static async new(ammoId,vendorId,rounds,price,datePurchased,dateReceived){
    let ammo;
    let vendor;
    let purchase = new AmmoPurchase();
    try{
      ammo = await new Ammo(ammoId).init();
      vendor = await new Vendor(vendorId).init();
    }catch(err){
      throw err;
    }
    if(dateReceived !== undefined){
      ammo.Rounds += parseInt(rounds);
      await ammo.update();
      purchase.DateReceived = dateReceived;
    }
    purchase.DatePurchased = datePurchased;
    purchase.Price = price;
    purchase.Rounds = rounds;
    purchase.Vendor = vendorId;
    purchase.Ammo = ammoId;
    return await purchase.create();
  }
  static async receive(purchaseId){
    //todo: reject if DateReceived is already populated.
    //todo: ammo doesn't exist gets caught, but doesn't seem to bubble all the way up.
    let purchase;
    let ammo;
    try{
      purchase = await new AmmoPurchase(purchaseId).init();
      ammo = await new Ammo(purchase.Ammo).init();
      ammo.Rounds += purchase.Rounds;
      await ammo.update();
      purchase.DateReceived = purchase.db.date();
      await purchase.update();
      return purchase.getPublicProperties();
    }catch(err){
      throw err;
    }
  }
  static async getAwaitingReceipt(){
    let records = [];
    let purchase = new AmmoPurchase();
    let ids = await purchase.db.table(purchase.table).select(purchase.primaryKey).where('DateReceived = 0').execute();
    for(let id in ids){
      let obj = await new AmmoPurchase(ids[id][purchase.primaryKey]).init();
      records.push(obj.getPublicProperties());
    }
    return records;
  }
}

module.exports = AmmoPurchase;
