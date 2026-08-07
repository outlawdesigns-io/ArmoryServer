process.env.NODE_ENV = 'testing';

import '../src/config.js';
import { should, use } from 'chai';
import chaiHttp from 'chai-http';
const chai = use(chaiHttp);
chai.should();
import server from '../index.js';

import ModelFactory from '@outlawdesigns/armorysdk';

const testModel = {
  FirearmType: 13,
  NickName: 2,
  Serial_Number: '11111111',
  AcquisitionDate:'2023-10-07 00:00:00',
  Price:456.96,
  CurrentOptic:1
}

function _createModel(targetObj){
  let model = ModelFactory.get('firearm');
  for(const [key,value] of Object.entries(targetObj)){
    model[key] = value;
  }
  return model;
}

chai.use(chaiHttp);

describe('Firearm',()=>{
  beforeEach(function(done){
    this.timeout(5000);
    ModelFactory.getClass('firearm').truncate().then(()=>{done()});
  });
  describe('/GET',()=>{
    it('should GET all the Firearm objects',(done)=>{
      chai.request(server).get('/firearm').end((err,res)=>{
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
      .post('/firearm')
      .field('Content-Type','multipart/form-data')
      .field('FirearmType',testModel.FirearmType)
      .field('NickName',testModel.NickName)
      .field('Serial_Number',testModel.Serial_Number)
      .field('AcquisitionDate',testModel.AcquisitionDate)
      .field('Price',testModel.Price)
      .field('CurrentOptic',testModel.CurrentOptic)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Id');
        res.body.should.have.property('FirearmType');
        res.body.should.have.property('NickName');
        res.body.should.have.property('Serial_Number');
        res.body.should.have.property('AcquisitionDate');
        res.body.should.have.property('Price');
        res.body.should.have.property('CurrentOptic');
        res.body.should.have.property('User');
        done();
      });
    });
  });
  describe('/GET/:id',()=>{
    it('should GET a Firearm object by the given id',(done)=>{
      let model = _createModel(testModel);
      model.User = 'test-user';
      model.create().then(()=>{
        chai.request(server).get('/firearm/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('Id').eql(model.Id);
          res.body.should.have.property('FirearmType');
          res.body.should.have.property('NickName');
          res.body.should.have.property('Serial_Number');
          res.body.should.have.property('AcquisitionDate');
          res.body.should.have.property('Price');
          res.body.should.have.property('CurrentOptic');
          res.body.should.have.property('User');
          done();
        });
      });
    });
  });
  describe('/PUT/:id',()=>{
    it('should UPDATE a Firearm object by the given id',(done)=>{
      let model = _createModel(testModel);
      model.User = 'test-user';
      let updateModel = testModel;
      updateModel.Serial_Number = '22222222';
      model.create().then(()=>{
        chai.request(server)
        .put('/firearm/' + model.Id)
        .field('Content-Type','multipart/form-data')
        .field('Serial_Number',updateModel.Serial_Number)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('Serial_Number').eql(updateModel.Serial_Number);
          done();
        });
      });
    });
  });
  describe('/DELETE/:id',()=>{
    it('should DELETE a Firearm object given the id',(done)=>{
      let model = _createModel(testModel);
      model.User = 'test-user';
      model.create().then(()=>{
        chai.request(server).delete('/firearm/' + model.Id).end((err,res)=>{
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
