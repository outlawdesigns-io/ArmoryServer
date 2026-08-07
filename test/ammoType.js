process.env.NODE_ENV = 'testing';

import '../src/config.js';
import { should, use } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);
chai.should();
import server from '../index.js';

import ModelFactory from '@outlawdesigns/armorysdk';

const testModel = {
  Manufacturer:3,
  Caliber:2,
  BulletWeight:55,
  Casing:"Steel",
  BulletType:"FMJ",
  MuzzleVelocity:2953
}

function _createModel(targetObj){
  let model = ModelFactory.get('ammotype');
  for(const [key,value] of Object.entries(targetObj)){
    model[key] = value;
  }
  return model;
}

describe('AmmoType',()=>{
  beforeEach(function(done){
    this.timeout(5000);
    ModelFactory.getClass('ammotype').truncate().then(()=>{done()});
  });
  describe('/GET',()=>{
    it('should GET all the AmmoType objects',(done)=>{
      chai.request(server).get('/ammotype').end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });
  describe('/POST',()=>{
    it('should POST a new Ammo object',(done)=>{
      chai.request(server)
      .post('/ammotype')
      .field('Content-Type','multipart/form-data')
      .field('Manufacturer',testModel.Manufacturer)
      .field('Caliber',testModel.Caliber)
      .field('BulletWeight',testModel.BulletWeight)
      .field('Casing',testModel.Casing)
      .field('BulletType',testModel.BulletType)
      .field('MuzzleVelocity',testModel.MuzzleVelocity)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Id');
        res.body.should.have.property('Manufacturer');
        res.body.should.have.property('Caliber');
        res.body.should.have.property('BulletWeight');
        res.body.should.have.property('Casing');
        res.body.should.have.property('BulletType');
        res.body.should.have.property('MuzzleVelocity');
        done();
      });
    });
  });
  describe('/GET/:id',()=>{
    it('should GET an Ammo object by the given id',(done)=>{
      let model = _createModel(testModel);
      model.create().then(()=>{
        chai.request(server).get('/ammotype/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('Id').eql(model.Id);
          res.body.should.have.property('Manufacturer');
          res.body.should.have.property('Caliber');
          res.body.should.have.property('BulletWeight');
          res.body.should.have.property('Casing');
          res.body.should.have.property('BulletType');
          res.body.should.have.property('MuzzleVelocity');
          done();
        });
      });
    });
  });
  describe('/PUT/:id',()=>{
    it('should UPDATE an Ammo object by the given id',(done)=>{
      let model = _createModel(testModel);
      let updateModel = testModel;
      updateModel.MuzzleVelocity = 3000;
      model.create().then(()=>{
        chai.request(server)
        .put('/ammotype/' + model.Id)
        .field('Content-Type','multipart/form-data')
        .field('MuzzleVelocity',updateModel.MuzzleVelocity)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('MuzzleVelocity').eql(`${updateModel.MuzzleVelocity}`);
          done();
        });
      });
    });
  });
  describe('/DELETE/:id',()=>{
    it('should DELETE an Ammo object given the id',(done)=>{
      let model = _createModel(testModel);
      model.create().then(()=>{
        chai.request(server).delete('/ammotype/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(model.id.toString());
          res.body.should.have.property('message').eql('Target Object Deleted');
          done();
        });
      });
    });
  });
});
