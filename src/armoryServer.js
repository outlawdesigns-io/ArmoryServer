"use strict";

const http = require('https');
const Busboy = require('busboy');
const { Base64Encode } = require('base64-stream');

const Firearm = require('./models/firearm');
const Ammo = require('./models/ammunition');
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
  static IllegalInstanceStr = 'Permission Denied. Illegal object instantiation.';
  static NullStr = 'null';
  static _currentUserId = 0; //get from config
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
    ArmoryServer._currentUserId = user.UID;
    return true;
  }
  getModel(modelStr){
    return async(req,res,next)=>{
      if(await ArmoryServer.checkToken(req,res,next)){
        try{
          let record = ModelFactory.get(modelStr,req.params.id);
          await record.init();
          return res.send(!record.User || record.User == ArmoryServer._currentUserId ? record.getPublicProperties() : {message:ArmoryServer.IllegalInstanceStr});
          //return res.send(record.getPublicProperties());
        }catch(err){
          return res.status(404).send({error:'Invalid UID'});
        }
      }
    }
  }
  getAll(modelStr){
    return async(req,res,next)=>{
      if(await ArmoryServer.checkToken(req,res,next)){
        try{
          //everywhere else, check for user property, if match, allow, else return permission error.
          //this could turn into a performance bottle neck consider implementing a ArmoryRecord with a getall(userId)
          let results = await ModelFactory.getClass(modelStr).getAll();
          return res.send(results.filter(e => !e.User || e.User == ArmoryServer._currentUserId));
        }catch(err){
          return res.status(400).send(err);
        }
      }
    }
  }
  deleteModel(modelStr){
    return async(req,res,next)=>{
      if(await ArmoryServer.checkToken(req,res,next)){
        try{
          let record = await ModelFactory.get(modelStr,req.params.id).init();
          if(record.User && record.User != ArmoryServer._currentUserId){
            return res.status(400).send({message:ArmoryServer.IllegalInstanceStr});
          }
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
      if(await ArmoryServer.checkToken(req,res,next)){
        let busboy;
        try{
          busboy = Busboy({headers:req.headers});
        }catch(err){
          return res.status(400).send({error:ArmoryServer.PostErrorStr});
        }
        let model = ModelFactory.get(modelStr);
        busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val == ArmoryServer.NullStr ? null:val; });
        busboy.on('finish', async ()=>{
          if(model.publicKeys.includes("User")){
            model.User = ArmoryServer._currentUserId;
          }
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
  async postShoot(req,res,next){
    if(await ArmoryServer.checkToken(req,res,next)){
      let busboy;
      try{
        busboy = Busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PostErrorStr});
      }
      let model = ModelFactory.get('shoot');
      busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val == ArmoryServer.NullStr ? null:val; });
      busboy.on('finish',async ()=>{
        try{
          model = await ModelFactory.getClass('shoot').new(model.Firearm,model.Ammo,model.Rounds, model.Distance_Ft, model.Optic, ArmoryServer._currentUserId);
          return res.send(model.getPublicProperties());
        }catch(err){
          return res.status(400).send({error:err});
        }
      });
      return req.pipe(busboy);
    }
  }
  putModel(modelStr){
    return async(req,res,next) => {
      if(await ArmoryServer.checkToken(req,res,next)){
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
            if(model.User && model.User != ArmoryServer._currentUserId){
              return res.status(400).send({message:ArmoryServer.IllegalInstanceStr});
            }
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
    if(await ArmoryServer.checkToken(req,res,next)){
      try{
        let model = await ModelFactory.get('ammopurchase',req.params.id).init();
        if(model.User != ArmoryServer._currentUserId){
          return res.status(400).send({message:ArmoryServer.IllegalInstanceStr});
        }
        return res.send(await AmmoPurchase.receive(req.params.id));
      }catch(err){
        return res.status(400).send(err.message);
      }
    }
  }
  async getWaitingAmmo(req,res,next){
    if(await ArmoryServer.checkToken(req,res,next)){
      try{
        return res.send(await AmmoPurchase.getAwaitingReceipt(ArmoryServer._currentUserId));
      }catch(err){
        return res.status(400).send(err.message);
      }
    }
  }
  async getShootImages(req,res,next){
    if(await ArmoryServer.checkToken(req,res,next)){
      try{
        let model = await ModelFactory.get('shoot',req.params.id).init();
        if(model.User != ArmoryServer._currentUserId){
          return res.status(400).send({message:ArmoryServer.IllegalInstanceStr});
        }
        return res.send(await ModelFactory.getClass('target').getByShootId(req.params.id));
      }catch(err){
        return res.status(404).send('Not Found');
      }
    }
  }
  async getFirearmImages(req,res,next){
    if(await ArmoryServer.checkToken(req,res,next)){
      try{
        let model = await ModelFactory.get('firearm',req.params.id).init();
        if(model.User != ArmoryServer._currentUserId){
          return res.status(400).send({message:ArmoryServer.IllegalInstanceStr});
        }
        return res.send(await ModelFactory.getClass('firearmimage').getByFirearmId(req.params.id));
      }catch(err){
        return res.status(404).send('Not Found');
      }
    }
  }
  postImage(modelStr){
    return async(req,res,next) => {
      let model = ModelFactory.get(modelStr);
      if(await ArmoryServer.checkToken(req,res,next)){
        let busboy;
        try{
          busboy = Busboy({headers:req.headers,limits:{files:1}});
        }catch(err){
          res.status(400).send({error:ArmoryServer.PostErrorStr});
          return;
        }
        busboy.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val == ArmoryServer.NullStr ? null:val;});
        busboy.on('file',(fieldname,file,filename,encoding,mimetype)=>{
          let chunks = [];
          file.on('data',(chunk)=>{
            chunks.push(chunk);
          });
          file.on('end', async ()=>{
            let results = Buffer.concat(chunks);
            let insert = ModelFactory.get(modelStr);
            try{
              model.BinaryData = results.toString('base64');
              model.User = ArmoryServer._currentUserId;
              await model.create();
              res.send(model.getPublicProperties());
            }catch(err){
              res.status(400).send({error:err.message});
            }
          });
        });
        return req.pipe(busboy);
      }
    }
  }
}

module.exports = ArmoryServer;
