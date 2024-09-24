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
const Optic = require('./models/optic');

const ModelFactory = require('./modelFactory');

//const fs = require('fs');

/*
currently can't put shoots from the client. If you implement this in the future,
consider applying this logic: "if rounds != ammoObj.rounds, update it".

*/

class ArmoryServer{
  static PostErrorStr = 'POSTs must be made as multipart/form-data';
  static PutErrorStr = 'PUTs must be made as multipart/form-data';
  static NullStr = 'null';
  static verifyToken(auth_token){
    if(auth_token === undefined){
      throw {error:'Token not present'};
    }
    return new Promise((resolve,reject)=>{
      let options = {
        hostname:global.config[process.env.NODE_ENV].ACCNTHOST,
        port:global.config[process.env.NODE_ENV].ACCNTPORT,
        path:global.config[process.env.NODE_ENV].ACCNTVERIFYEND,
        method:'GET',
        headers:{
          'Content-Type':'application/json; charset=utf-8',
          'auth_token':auth_token,
        }
      };
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
  getModel(modelStr){
    return async(req,res,next)=>{
      if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
        try{
          let record = ModelFactory.get(modelStr,req.params.id);
          await record.init();
          return res.send(record.getPublicProperties());
        }catch(err){
          return res.status(404).send({error:'Invalid UID'});
        }
      }
    }
  }
  getAll(modelStr){
    return async(req,res,next)=>{
      if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
        try{
          return res.send(await ModelFactory.getClass(modelStr).getAll());
        }catch(err){
          console.log(err);
          return res.status(400).send(err);
        }
      }
    }
  }
  deleteModel(modelStr){
    return async(req,res,next)=>{
      if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
        try{
          let modelClass = ModelFactory.getClass(modelStr);
          await modelClass.delete(req.params.id);
          return res.send({message:'Target Object Deleted',id:req.params.id});
        }catch(err){
          return res.status(400).send(err);
        }
      }
    }
  }
  postModel(modelStr){
    return async(req,res,next)=>{
      if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
        let busboy;
        try{
          busboy = Busboy({headers:req.headers});
        }catch(err){
          return res.status(400).send({error:ArmoryServer.PostErrorStr});
        }
        let model = ModelFactory.get(modelStr);
        busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val == ArmoryServer.NullStr ? null:val; });
        busboy.on('finish', async ()=>{
          try{
            model = await model.create();
            return res.send(model.getPublicProperties());
          }catch(err){
            return res.status(400).send({error:err});
          }
        });
        return req.pipe(busboy);
      }
    }
  }
  putModel(modelStr){
    return async(req,res,next) => {
      if(process.env.NODE_ENV != 'production' || await ArmoryServer.checkToken(req,res,next)){
        let busboy;
        try{
          busboy = Busboy({headers:req.headers});
        }catch(err){
          return res.status(400).send({error:ArmoryServer.PutErrorStr});
        }
        try{
          let model = await ModelFactory.get(modelStr,req.params.id).init();
          busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val == ArmoryServer.NullStr ? null:val;});
          busboy.on('finish',async ()=>{
            model = await model.update();
            return res.send(model.getPublicProperties());
          });
          return req.pipe(busboy);
        }catch(err){
          res.status(400).send(err);
        }
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
            await insert.create();
            res.send(insert.getPublicProperties());
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
