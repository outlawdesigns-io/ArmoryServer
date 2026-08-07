process.env.NODE_ENV = 'testing';

import '../src/config.js';
import { should, use } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);
chai.should();
import server from '../index.js';

import ModelFactory from '@outlawdesigns/armorysdk';

const TIME_OUT = 5000;

const testModel = {
  AmmunitionType:1,
  Rounds:140,
}

function _createModel(targetObj){
  let model = ModelFactory.get('ammo');
  for(const [key,value] of Object.entries(targetObj)){
    model[key] = value;
  }
  return model;
}

describe('Ammo',()=>{
  beforeEach(function(done){
    this.timeout(5000);
    ModelFactory.getClass('ammo').truncate().then(()=>{done()});
  });
  describe('/GET',()=>{
    it('should GET all the Ammo objects',(done)=>{
      chai.request(server).get('/ammo').end((err,res)=>{
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
      .post('/ammo')
      .field('Content-Type','multipart/form-data')
      .field('AmmunitionType',testModel.AmmunitionType)
      .field('Rounds',testModel.Rounds)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Id');
        res.body.should.have.property('AmmunitionType');
        res.body.should.have.property('Rounds');
        res.body.should.have.property('User');
        done();
      });
    });
  });
  describe('/GET/:id',()=>{
    it('should GET an Ammo object by the given id',(done)=>{
      let model = _createModel(testModel);
      model.User = 'test-user';
      model.create().then(()=>{
        chai.request(server).get('/ammo/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('Id').eql(model.Id);
          res.body.should.have.property('AmmunitionType');
          res.body.should.have.property('Rounds');
          res.body.should.have.property('User');
          done();
        });
      });
    });
  });
  describe('/PUT/:id',()=>{
    it('should UPDATE an Ammo object by the given id',(done)=>{
      let model = _createModel(testModel);
      model.User = 'test-user';
      let updateModel = testModel;
      updateModel.Rounds = 500;
      model.create().then(()=>{
        chai.request(server)
        .put('/ammo/' + model.Id)
        .field('Content-Type','multipart/form-data')
        .field('Rounds',updateModel.Rounds)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('Rounds').eql(updateModel.Rounds);
          done();
        });
      });
    });
  });
  describe('/DELETE/:id',()=>{
    it('should DELETE an Ammo object given the id',(done)=>{
      let model = _createModel(testModel);
      model.User = 'test-user';
      model.create().then(()=>{
        chai.request(server).delete('/ammo/' + model.Id).end((err,res)=>{
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
