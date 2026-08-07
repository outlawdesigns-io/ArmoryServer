process.env.NODE_ENV = 'testing';

import '../src/config.js';
import { should, use } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);
chai.should();
import server from '../index.js';

import ModelFactory from '@outlawdesigns/armorysdk';

const testAmmoType = {
  Manufacturer:3,
  Caliber:2,
  BulletWeight:55,
  Casing:"Steel",
  BulletType:"FMJ",
  MuzzleVelocity:2953
}

const testAmmo = {
  AmmunitionType:1,
  Rounds:140,
};
const testFirearmType = {
  Manufacturer: 13,
  Caliber: 2,
  Model: 'AM-15',
  LinkToProduct:'http://www.google.com',
  MSRP:468.95
};
const testFirearm = {
  FirearmType: 13,
  NickName: 2,
  Serial_Number: '11111111',
  AcquisitionDate:'2023-10-07 00:00:00',
  Price:456.96,
  CurrentOptic:1
}

const testModel = {
  Firearm: 3,
  Ammo: 3,
  Rounds: 30,
  Distance_Ft: 60,
  Optic: 0
}


function _createModel(targetObj,modelStr){
  let model = ModelFactory.get(modelStr);
  for(const [key,value] of Object.entries(targetObj)){
    model[key] = value;
  }
  return model;
}

chai.use(chaiHttp);

describe('Shoot',()=>{
  beforeEach(function(done){
    this.timeout(5000);
    ModelFactory.getClass('shoot').truncate().then(()=>{done()});
  });
  describe('/GET',function(){
    it('should GET all the Shoot objects',(done)=>{
      this.timeout = 5000;
      chai.request(server).get('/shoot').end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });
  describe('/POST',async ()=>{
    let ammoType = _createModel(testAmmoType,'ammotype');
    let ammo = _createModel(testAmmo, 'ammo');
    let model = _createModel(testModel,'shoot');
    let firearmType = _createModel(testFirearmType,'firearmtype');
    let firearm = _createModel(testFirearm,'firearm');
    ammo.User = 'test-user';
    firearm.User = 'test-user';
    model.User = 'test-user';
    await ammoType.create();
    await ammo.create();
    await firearmType.create();
    await firearm.create();
    it('should POST a new Shoot object',(done)=>{
      chai.request(server)
      .post('/shoot')
      .field('Content-Type','multipart/form-data')
      .field('Firearm',firearm.Id)
      .field('Ammo',ammo.Id)
      .field('Rounds',testModel.Rounds)
      .field('Distance_Ft',testModel.Distance_Ft)
      .field('Optic',testModel.Optic)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Id');
        res.body.should.have.property('Firearm');
        res.body.should.have.property('Ammo');
        res.body.should.have.property('Rounds');
        res.body.should.have.property('Distance_Ft');
        res.body.should.have.property('Created');
        res.body.should.have.property('Optic');
        done();
      });
    });
  });
  describe('/GET/:id',()=>{
    it('should GET a Shoot object by the given id',(done)=>{
      let model = _createModel(testModel,'shoot');
      model.User = 'test-user';
      model.create().then(()=>{
        chai.request(server).get('/shoot/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('Id').eql(model.Id);
          res.body.should.have.property('Firearm');
          res.body.should.have.property('Ammo');
          res.body.should.have.property('Rounds');
          res.body.should.have.property('Distance_Ft');
          res.body.should.have.property('Created');
          res.body.should.have.property('Optic');
          done();
        });
      });
    });
  });
  describe('/PUT/:id',()=>{
    it('should UPDATE a Shoot object by the given id',(done)=>{
      let model = _createModel(testModel,'shoot');
      model.User = 'test-user';
      let updateModel = testModel;
      updateModel.Optic = 1;
      model.create().then(()=>{
        chai.request(server)
        .put('/shoot/' + model.Id)
        .field('Content-Type','multipart/form-data')
        .field('Optic',updateModel.Optic)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('Optic').eql(updateModel.Optic);
          done();
        });
      });
    });
  });
  describe('/DELETE/:id',()=>{
    it('should DELETE a Shoot object given the id',(done)=>{
      let model = _createModel(testModel,'shoot');
      model.User = 'test-user';
      model.create().then(()=>{
        chai.request(server).delete('/shoot/' + model.Id).end((err,res)=>{
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
