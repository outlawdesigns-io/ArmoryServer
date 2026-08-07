process.env.NODE_ENV = 'testing';

import '../src/config.js';
import { should, use } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);
chai.should();
import server from '../index.js';

import ModelFactory from '@outlawdesigns/armorysdk';

const testModel = {
  Manufacturer: 13,
  Caliber: 2,
  Model: 'AM-15',
  LinkToProduct:'http://www.google.com',
  MSRP:468.95
}

function _createModel(targetObj){
  let model = ModelFactory.get('firearmtype');
  for(const [key,value] of Object.entries(targetObj)){
    model[key] = value;
  }
  return model;
}

chai.use(chaiHttp);

describe('FirearmType',()=>{
  beforeEach(function(done){
    this.timeout(5000);
    ModelFactory.getClass('firearmtype').truncate().then(()=>{done()});
  });
  describe('/GET',()=>{
    it('should GET all the Firearm objects',(done)=>{
      chai.request(server).get('/firearmtype').end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });
  describe('/POST',()=>{
    it('should POST a new Firearm object',(done)=>{
      chai.request(server)
      .post('/firearmtype')
      .field('Content-Type','multipart/form-data')
      .field('Manufacturer',testModel.Manufacturer)
      .field('Caliber',testModel.Caliber)
      .field('Model',testModel.Model)
      .field('LinkToProduct',testModel.LinkToProduct)
      .field('MSRP',testModel.MSRP)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Id');
        res.body.should.have.property('Manufacturer');
        res.body.should.have.property('Caliber');
        res.body.should.have.property('Model');
        res.body.should.have.property('LinkToProduct');
        res.body.should.have.property('MSRP');
        done();
      });
    });
  });
  describe('/GET/:id',()=>{
    it('should GET a Firearm object by the given id',(done)=>{
      let model = _createModel(testModel);
      model.create().then(()=>{
        chai.request(server).get('/firearmtype/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('Id').eql(model.Id);
          res.body.should.have.property('Manufacturer');
          res.body.should.have.property('Caliber');
          res.body.should.have.property('Model');
          res.body.should.have.property('LinkToProduct');
          res.body.should.have.property('MSRP');
          done();
        });
      });
    });
  });
  describe('/PUT/:id',()=>{
    it('should UPDATE a Firearm object by the given id',(done)=>{
      let model = _createModel(testModel);
      let updateModel = testModel;
      updateModel.MSRP = 510.99;
      model.create().then(()=>{
        chai.request(server)
        .put('/firearmtype/' + model.Id)
        .field('Content-Type','multipart/form-data')
        .field('MSRP',updateModel.MSRP)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('MSRP').eql(`${updateModel.MSRP}`);
          done();
        });
      });
    });
  });
  describe('/DELETE/:id',()=>{
    it('should DELETE a Firearm object given the id',(done)=>{
      let model = _createModel(testModel);
      model.create().then(()=>{
        chai.request(server).delete('/firearmtype/' + model.Id).end((err,res)=>{
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
