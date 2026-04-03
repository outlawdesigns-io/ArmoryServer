"use strict";

import http from 'https';
import busboy from 'busboy';

import Base64Encode from 'base64-stream';

import ModelFactory from '@outlawdesigns/armorysdk';
// import ModelFactory from '../../ArmorySDK/index.js';
import authClient from '@outlawdesigns/authenticationclient';

/*
currently can't put shoots from the client. If you implement this in the future,
consider applying this logic: "if rounds != ammoObj.rounds, update it".

*/

class ArmoryServer{
  _currentUserId;
  static PostErrorStr = 'POSTs must be made as multipart/form-data';
  static PutErrorStr = 'PUTs must be made as multipart/form-data';
  static IllegalInstanceStr = 'Permission Denied. Illegal object instantiation.';
  static NullStr = 'null';
  constructor(oauthIssuerUrl, oathClientId, oauthAudience){
    // this.checkToken = this.checkToken.bind(this);
    // this.getModel = this.getModel.bind(this);
    // this.getAll = this.getAll.bind(this);
    // this.deleteModel = this.deleteModel.bind(this);
    // this.postModel = this.postModel.bind(this);
    // this.postShoot = this.postShoot.bind(this);
    // this.putModel = this.putModel.bind(this);
    this.receiveAmmoPurchase = this.receiveAmmoPurchase.bind(this);
    this.getWaitingAmmo = this.getWaitingAmmo.bind(this);
    this.getShootImages = this.getShootImages.bind(this);
    this.getFirearmImages = this.getFirearmImages.bind(this);
    // this.postImage = this.postImage.bind(this);
    this._authAudience = oauthAudience;
    this._authClient = authClient;
    this._authClient.init(oauthIssuerUrl, oathClientId);
  }
  async checkToken(req,res,next){
    let auth_token = (req.headers['authorization'] || '' ).split(' ')[1] || null;
    try{
      let resp = await this._authClient.verifyAccessToken(auth_token,this._authAudience);
      this._currentUserId = resp.sub;
      return true;
    }catch(err){
      return false;
    }
  }
  getModel(modelStr){
    return async(req,res,next)=>{
      if(await this.checkToken(req,res,next)){
        try{
          let record = ModelFactory.get(modelStr,req.params.id);
          await record.init();
          return res.send(!record.User || record.User == this._currentUserId ? record.getPublicProperties() : {message:ArmoryServer.IllegalInstanceStr});
          //return res.send(record.getPublicProperties());
        }catch(err){
          return res.status(404).send({error:'Invalid UID'});
        }
      }
      return res.status(400).send({message:'Token Verification Error.'});
    }
  }
  getAll(modelStr){
    return async(req,res,next)=>{
      if(await this.checkToken(req,res,next)){
        try{
          //everywhere else, check for user property, if match, allow, else return permission error.
          //this could turn into a performance bottle neck consider implementing a ArmoryRecord with a getall(userId)
          let results = await ModelFactory.getClass(modelStr).getAll();
          return res.send(results.filter(e => !e.User || e.User == this._currentUserId));
        }catch(err){
          return res.status(400).send(err);
        }
      }
      return res.status(400).send({message:'Token Verification Error.'});
    }
  }
  deleteModel(modelStr){
    return async(req,res,next)=>{
      if(await this.checkToken(req,res,next)){
        try{
          let record = await ModelFactory.get(modelStr,req.params.id).init();
          if(record.User && record.User != this._currentUserId){
            return res.status(400).send({message:ArmoryServer.IllegalInstanceStr});
          }
          let modelClass = ModelFactory.getClass(modelStr);
          await modelClass.delete(req.params.id);
          return res.send({message:'Target Object Deleted',id:req.params.id});
        }catch(err){
          return res.status(400).send(err);
        }
      }
      return res.status(400).send({message:'Token Verification Error.'});
    }
  }
  postModel(modelStr){
    return async(req,res,next)=>{
      if(await this.checkToken(req,res,next)){
        let bb;
        try{
          bb = busboy({headers:req.headers});
        }catch(err){
          console.log(err);
          return res.status(400).send({error:ArmoryServer.PostErrorStr});
        }
        let model = ModelFactory.get(modelStr);
        bb.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val == ArmoryServer.NullStr ? null:val; });
        bb.on('finish', async ()=>{
          if(model.publicKeys.includes("User")){
            model.User = this._currentUserId;
          }
          try{
            model = await model.create();
            return res.send(model.getPublicProperties());
          }catch(err){
            return res.status(400).send({error:err});
          }
        });
        return req.pipe(bb);
      }
      return res.status(400).send({message:'Token Verification Error.'});
    }
  }
  async postShoot(req,res,next){
    if(await this.checkToken(req,res,next)){
      let bb;
      try{
        bb = busboy({headers:req.headers});
      }catch(err){
        return res.status(400).send({error:ArmoryServer.PostErrorStr});
      }
      let model = ModelFactory.get('shoot');
      bb.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val == ArmoryServer.NullStr ? null:val; });
      bb.on('finish',async ()=>{
        try{
          model = await ModelFactory.getClass('shoot').new(model.Firearm,model.Ammo,model.Rounds, model.Distance_Ft, model.Optic, this._currentUserId);
          return res.send(model.getPublicProperties());
        }catch(err){
          return res.status(400).send({error:err});
        }
      });
      return req.pipe(bb);
    }
    return res.status(400).send({message:'Token Verification Error.'});
  }
  putModel(modelStr){
    return async(req,res,next) => {
      if(await this.checkToken(req,res,next)){
        let bb;
        try{
          bb = busboy({headers:req.headers});
        }catch(err){
          return res.status(400).send({error:ArmoryServer.PutErrorStr});
        }
        try{
          let model = await ModelFactory.get(modelStr,req.params.id).init();
          bb.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val == ArmoryServer.NullStr ? null:val;});
          bb.on('finish',async ()=>{
            if(model.User && model.User != this._currentUserId){
              return res.status(400).send({message:ArmoryServer.IllegalInstanceStr});
            }
            model = await model.update();
            return res.send(model.getPublicProperties());
          });
          return req.pipe(bb);
        }catch(err){
          return res.status(400).send(err);
        }
      }
      return res.status(400).send({message:'Token Verification Error.'});
    }
  }
  async receiveAmmoPurchase(req,res,next){
    if(await this.checkToken(req,res,next)){
      try{
        console.log(req.params);
        let model = await ModelFactory.get('ammopurchase',req.params.id).init();
        if(model.User != this._currentUserId){
          return res.status(400).send({message:ArmoryServer.IllegalInstanceStr});
        }
        return res.send(await ModelFactory.getClass('ammopurchase').receive(req.params.id));
      }catch(err){
        return res.status(400).send(err.message);
      }
    }
    return res.status(400).send({message:'Token Verification Error.'});
  }
  async getWaitingAmmo(req,res,next){
    if(await this.checkToken(req,res,next)){
      try{
        return res.send(await ModelFactory.getClass('ammopurchase').getAwaitingReceipt(this._currentUserId));
      }catch(err){
        return res.status(400).send(err.message);
      }
    }
    return res.status(400).send({message:'Token Verification Error.'});
  }
  async getShootImages(req,res,next){
    if(await this.checkToken(req,res,next)){
      try{
        let model = await ModelFactory.get('shoot',req.params.id).init();
        if(model.User != this._currentUserId){
          return res.status(400).send({message:ArmoryServer.IllegalInstanceStr});
        }
        return res.send(await ModelFactory.getClass('targetimage').getByShootId(req.params.id));
      }catch(err){
        console.log(err);
        return res.status(404).send('Not Found');
      }
    }
    return res.status(400).send({message:'Token Verification Error.'});
  }
  async getFirearmImages(req,res,next){
    if(await this.checkToken(req,res,next)){
      try{
        let model = await ModelFactory.get('firearm',req.params.id).init();
        if(model.User != this._currentUserId){
          return res.status(400).send({message:ArmoryServer.IllegalInstanceStr});
        }
        return res.send(await ModelFactory.getClass('firearmimage').getByFirearmId(req.params.id));
      }catch(err){
        return res.status(404).send('Not Found');
      }
    }
    return res.status(400).send({message:'Token Verification Error.'});
  }
  postImage(modelStr){
    return async(req,res,next) => {
      let model = ModelFactory.get(modelStr);
      if(await this.checkToken(req,res,next)){
        let bb;
        try{
          bb = busboy({headers:req.headers,limits:{files:1}});
        }catch(err){
          res.status(400).send({error:ArmoryServer.PostErrorStr});
          return;
        }
        bb.on('field',(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype)=>{ model[fieldname] = val == ArmoryServer.NullStr ? null:val;});
        bb.on('file',(fieldname,file,filename,encoding,mimetype)=>{
          let chunks = [];
          file.on('data',(chunk)=>{
            chunks.push(chunk);
          });
          file.on('end', async ()=>{
            let results = Buffer.concat(chunks);
            let insert = ModelFactory.get(modelStr);
            try{
              model.BinaryData = results.toString('base64');
              model.User = this._currentUserId;
              await model.create();
              res.send(model.getPublicProperties());
            }catch(err){
              res.status(400).send({error:err.message});
            }
          });
        });
        return req.pipe(bb);
      }
      return res.status(400).send({message:'Token Verification Error.'});
    }
  }
}

export default ArmoryServer;
