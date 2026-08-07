process.env.NODE_ENV = 'testing';

import '../src/config.js';
import { should, use } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);
chai.should();
import server from '../index.js';

import ModelFactory from '@outlawdesigns/armorysdk';

const testModel = {
  OpticType: 26,
  AcquisitionDate:'2023-10-07 00:00:00',
  SerialNumber:'ABC123',
  Price:325,
}

function _createModel(targetObj){
  let model = ModelFactory.get('optic');
  for(const [key,value] of Object.entries(targetObj)){
    model[key] = value;
  }
  return model;
}

chai.use(chaiHttp);

describe('Optic',()=>{
  beforeEach(function(done){
    this.timeout(5000);
    ModelFactory.getClass('optic').truncate().then(()=>{done()});
  });
  describe('/GET',()=>{
    it('should GET all the Optic objects',(done)=>{
      chai.request(server).get('/optic').end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });
  describe('/POST',()=>{
    it('should POST a new Optic object',(done)=>{
      chai.request(server)
      .post('/optic')
      .field('Content-Type','multipart/form-data')
      .field('OpticType',testModel.OpticType)
      .field('AcquisitionDate',testModel.AcquisitionDate)
      .field('SerialNumber',testModel.SerialNumber)
      .field('Price',testModel.Price)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Id');
        res.body.should.have.property('OpticType');
        res.body.should.have.property('AcquisitionDate');
        res.body.should.have.property('SerialNumber');
        res.body.should.have.property('Price');
        res.body.should.have.property('User');
        done();
      });
    });
  });
  describe('/GET/:id',()=>{
    it('should GET an Optic object by the given id',(done)=>{
      let model = _createModel(testModel);
      model.User = 'test-user';
      model.create().then(()=>{
        chai.request(server).get('/optic/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('Id').eql(model.Id);
          res.body.should.have.property('OpticType');
          res.body.should.have.property('AcquisitionDate');
          res.body.should.have.property('SerialNumber');
          res.body.should.have.property('Price');
          res.body.should.have.property('User');
          done();
        });
      });
    });
  });
  describe('/PUT/:id',()=>{
    it('should UPDATE an Optic object by the given id',(done)=>{
      let model = _createModel(testModel);
      model.User = 'test-user';
      let updateModel = testModel;
      updateModel.SerialNumber = 'XYZ12895';
      model.create().then(()=>{
        chai.request(server)
        .put('/optic/' + model.Id)
        .field('Content-Type','multipart/form-data')
        .field('SerialNumber',updateModel.SerialNumber)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('SerialNumber').eql(updateModel.SerialNumber);
          done();
        });
      });
    });
  });
  describe('/DELETE/:id',()=>{
    it('should DELETE an Optic object given the id',(done)=>{
      let model = _createModel(testModel);
      model.User = 'test-user';
      model.create().then(()=>{
        chai.request(server).delete('/optic/' + model.Id).end((err,res)=>{
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
