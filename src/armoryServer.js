"use strict";

const http = require('https');
const Busboy = require('busboy');
const { Base64Encode } = require('base64-stream');

const Firearm = require('./models/firearm');
const Ammo = require('./models/ammo');
const AmmoPurchase = require('./models/ammopurchase');
const Caliber = require('./models/caliber');
const Manufacturer = require('./models/manufacturer');
const Shoot = require('./models/shoot');
const Vendor = require('./models/vendor');
const TargetImage = require('./models/targetImage');

//const fs = require('fs');

class ArmoryServer{
  static PostErrorStr = 'POSTs must be made as multipart/form-data';
  static PutErrorStr = 'PUTs must be made as multipart/form-data';
  static verifyToken(auth_token){
    if(auth_token === undefined){
      throw {error:'Token not present'};
    }
    return new Promise((resolve,reject)=>{
      let options = {};
      let req = http.request(options,(response)=>{
        let data = '';
        response.on('data',(chunk)=>{ data += chunk });
        response.on('end',()=>{ resolve(JSON.parse(data)) });
      }).on('error',(err)=>{
        reject(err.message)
      });
      req.write(JSON.stringify(auth_token));
    });
  }
  static async checkToken(req,res,next){
    if(!req.headers['auth_token']){
      res.status(400).send('auth_token missing.');
      return false;
    }
    let user = await ArmoryServer.verifyToken(req.headers.auth_token).catch(console.error);
    if("error" in user){
      res.status(400).send(user.error);
      return false;
    }
    return true;
  }
  async getFirearm(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        let record = new Firearm(req.params.id);
        await record._build();
        return res.send(record._buildPublicObj());
      }catch(err){
        return res.status(404).send('Not Found');
      }
    }
  }
  async getAllFirearm(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let record = new Firearm();
      res.send(await record.getAll());
    }
  }
  async putFirearm(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PutErrorStr});
      }
      try{
        let model = await new Firearm(req.params.id)._build();
        busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val;});
        busboy.on('finish',async ()=>{
          model = await model._update();
          return res.send(model._buildPublicObj());
        });
        return req.pipe(busboy);
      }catch(err){
        res.status(400).send(err);
      }
    }
  }
  async postFirearm(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PostErrorStr});
      }
      let model = new Firearm();
      busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val; });
      busboy.on('finish', async ()=>{
        model = await model._create().catch(console.error);
        return res.send(model._buildPublicObj());
      });
      return req.pipe(busboy);
    }
  }
  async deleteFirearm(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        await Firearm.delete(req.params.id);
        return res.send({message:'Target Object Deleted',id:req.params.id});
      }catch(err){
        return res.status(400).send(err);
      }
    }
  }
  async getAmmo(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        let record = new Ammo(req.params.id);
        await record._build();
        return res.send(record._buildPublicObj());
      }catch(err){
        return res.status(404).send('Not Found');
      }
    }
  }
  async getAllAmmo(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let record = new Ammo();
      res.send(await record.getAll());
    }
  }
  async putAmmo(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PutErrorStr});
      }
      try{
        let model = await new Ammo(req.params.id)._build();
        busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val;});
        busboy.on('finish',async ()=>{
          model = await model._update();
          return res.send(model._buildPublicObj());
        });
        return req.pipe(busboy);
      }catch(err){
        res.status(400).send(err);
      }
    }
  }
  async postAmmo(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PostErrorStr});
      }
      let model = new Ammo();
      busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val; });
      busboy.on('finish', async ()=>{
        model = await model._create().catch(console.error);
        return res.send(model._buildPublicObj());
      });
      return req.pipe(busboy);
    }
  }
  async deleteAmmo(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        await Ammo.delete(req.params.id);
        return res.send({message:'Target Object Deleted',id:req.params.id});
      }catch(err){
        return res.status(400).send(err);
      }
    }
  }
  async getAmmoPurchase(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        let record = new AmmoPurchase(req.params.id);
        await record._build();
        return res.send(record._buildPublicObj());
      }catch(err){
        return res.status(404).send('Not Found');
      }
    }
  }
  async getAllAmmoPurchase(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let record = new AmmoPurchase();
      return res.send(await record.getAll());
    }
  }
  async putAmmoPurchase(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PutErrorStr});
      }
      try{
        let model = await new AmmoPurchase(req.params.id)._build();
        busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val;});
        busboy.on('finish',async ()=>{
          model = await model._update();
          return res.send(model._buildPublicObj());
        });
        return req.pipe(busboy);
      }catch(err){
        return res.status(400).send(err);
      }
    }
  }
  async postAmmoPurchase(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PostErrorStr});
      }
      let model = new AmmoPurchase();
      busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val; });
      busboy.on('finish', async ()=>{
        try{
          model = await AmmoPurchase.new(model.Ammo,model.Vendor,model.Rounds,model.Price,model.DatePurchased,model.DateReceived);
          return res.send(model._buildPublicObj());
        }catch(err){
          return res.status(400).send(err.message)
        }
      });
      return req.pipe(busboy);
    }
  }
  async deleteAmmoPurchase(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        await AmmoPurchase.delete(req.params.id);
        return res.send({message:'Target Object Deleted',id:req.params.id});
      }catch(err){
        return res.status(400).send(err.message);
      }
    }
  }
  async receiveAmmoPurchase(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        return res.send(await AmmoPurchase.receive(req.params.id));
      }catch(err){
        return res.status(400).send(err.message);
      }
    }
  }
  async getWaitingAmmo(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        return res.send(await AmmoPurchase.getAwaitingReceipt());
      }catch(err){
        return res.status(400).send(err.message);
      }
    }
  }
  async getCaliber(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        let record = new Caliber(req.params.id);
        await record._build();
        return res.send(record._buildPublicObj());
      }catch(err){
        return res.status(404).send('Not Found');
      }
    }
  }
  async getAllCaliber(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let record = new Caliber();
      res.send(await record.getAll());
    }
  }
  async postCaliber(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PostErrorStr});
      }
      let model = new Caliber();
      busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val; });
      busboy.on('finish', async ()=>{
        model = await model._create().catch(console.error);
        return res.send(model._buildPublicObj());
      });
      return req.pipe(busboy);
    }
  }
  async putCaliber(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PutErrorStr});
      }
      try{
        let model = await new Caliber(req.params.id)._build();
        busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val;});
        busboy.on('finish',async ()=>{
          model = await model._update();
          return res.send(model._buildPublicObj());
        });
        return req.pipe(busboy);
      }catch(err){
        res.status(400).send(err);
      }
    }
  }
  async deleteCaliber(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        await Caliber.delete(req.params.id);
        return res.send({message:'Target Object Deleted',id:req.params.id});
      }catch(err){
        return res.status(400).send(err);
      }
    }
  }
  async getManufacturer(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        let record = new Manufacturer(req.params.id);
        await record._build();
        return res.send(record._buildPublicObj());
      }catch(err){
        return res.status(404).send('Not Found');
      }
    }
  }
  async getAllManufacturer(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let record = new Manufacturer();
      return res.send(await record.getAll());
    }
  }
  async postManufacturer(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PostErrorStr});
      }
      let model = new Manufacturer();
      busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val; });
      busboy.on('finish', async ()=>{
        model = await model._create().catch(console.error);
        return res.send(model._buildPublicObj());
      });
      return req.pipe(busboy);
    }
  }
  async putManufacturer(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PutErrorStr});
      }
      try{
        let model = await new Manufacturer(req.params.id)._build();
        busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val;});
        busboy.on('finish',async ()=>{
          model = await model._update();
          return res.send(model._buildPublicObj());
        });
        return req.pipe(busboy);
      }catch(err){
        res.status(400).send(err);
      }
    }
  }
  async deleteManufacturer(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        await Manufacturer.delete(req.params.id);
        return res.send({message:'Target Object Deleted',id:req.params.id});
      }catch(err){
        return res.status(400).send(err);
      }
    }
  }
  async getShoot(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        let record = new Shoot(req.params.id);
        await record._build();
        return res.send(record._buildPublicObj());
      }catch(err){
        return res.status(404).send('Not Found');
      }
    }
  }
  async getAllShoot(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let record = new Shoot();
      res.send(await record.getAll());
    }
  }
  async postShoot(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PostErrorStr});
      }
      let model = new Shoot();
      busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val; });
      busboy.on('finish', async ()=>{
        try{
          model = await Shoot.new(model.FireArm,model.Ammo,model.Rounds);
          return res.send(model._buildPublicObj());
        }catch(err){
          return res.status(400).send(err.message);
        }
      });
      return req.pipe(busboy);
    }
  }
  async putShoot(req,res,next){
    //if rounds != ammoObj.rounds, update it.
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PutErrorStr});
      }
      try{
        let model = await new Shoot(req.params.id)._build();
        busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val;});
        busboy.on('finish',async ()=>{
          model = await model._update();
          return res.send(model._buildPublicObj());
        });
        return req.pipe(busboy);
      }catch(err){
        return res.status(400).send(err);
      }
    }
  }
  async deleteShoot(req,res,next){
    //add rounds back to ammoObj.rounds
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        await Shoot.delete(req.params.id);
        return res.send({message:'Target Object Deleted',id:req.params.id});
      }catch(err){
        return res.status(400).send(err);
      }
    }
  }
  async getVendor(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        let record = new Vendor(req.params.id);
        await record._build();
        return res.send(record._buildPublicObj());
      }catch(err){
        return res.status(404).send('Not Found');
      }
    }
  }
  async getAllVendor(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let record = new Vendor();
      res.send(await record.getAll());
    }
  }
  async postVendor(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PostErrorStr});
      }
      let model = new Vendor();
      busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val; });
      busboy.on('finish', async ()=>{
        model = await model._create().catch(console.error);
        return res.send(model._buildPublicObj());
      });
      return req.pipe(busboy);
    }
  }
  async putVendor(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PutErrorStr});
      }
      try{
        let model = await new Vendor(req.params.id)._build();
        busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val;});
        busboy.on('finish',async ()=>{
          model = await model._update();
          return res.send(model._buildPublicObj());
        });
        return req.pipe(busboy);
      }catch(err){
        return res.status(400).send(err);
      }
    }
  }
  async deleteVendor(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        await Vendor.delete(req.params.id);
        return res.send({message:'Target Object Deleted',id:req.params.id});
      }catch(err){
        return res.status(400).send(err);
      }
    }
  }
  async getTargetImage(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        let record = new TargetImage(req.params.id);
        await record._build();
        return res.send(record._buildPublicObj());
      }catch(err){
        return res.status(404).send('Not Found');
      }
    }
  }
  async postTargetImage(req,res,next){
    let model = new TargetImage();
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers,limits:{files:1}});
      }catch(err){
        res.status(400).send({error:ArmoryServer.PostErrorStr});
        return;
      }
      busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val; });
      busboy.on('file',(fieldname,file,filename,encoding,mimetype)=>{
        let chunks = [];
        file.on('data',(chunk)=>{
          chunks.push(chunk);
        });
        file.on('end',async ()=>{
          let result = Buffer.concat(chunks);
          let insert = new TargetImage();
          try{
            insert.ShootId = model.ShootId;
            insert.BinaryData = result.toString('base64');
            await insert._create();
            res.send(insert._buildPublicObj());
          }catch(err){
            res.status(400).send(err.message);
          }
        });
      });
      return req.pipe(busboy);
    }
  }
  async getShootImages(req,res,next){
    if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
      try{
        res.send(await TargetImage.getByShootId(req.params.id));
      }catch(err){
        res.status(404).send('Not Found');
      }
    }
  }
}

module.exports = ArmoryServer;
