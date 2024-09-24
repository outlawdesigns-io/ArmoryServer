process.env.NODE_ENV = 'testing';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const ModelFactory = require('../src/modelFactory');
const should = chai.should();

const testModel = {
  Manufacturer: 13,
  Caliber: 2,
  Model: 'AM-15',
  Serial_Number: '11111111',
  CurrentOptic:2,
  LinkToProduct:'http://www.google.com'
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
  beforeEach((done)=>{
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
      .field('Manufacturer',testModel.Manufacturer)
      .field('Caliber',testModel.Caliber)
      .field('Model',testModel.Model)
      .field('Serial_Number',testModel.Serial_Number)
      .field('CurrentOptic',testModel.CurrentOptic)
      .field('LinkToProduct',testModel.LinkToProduct)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Id');
        res.body.should.have.property('Manufacturer');
        res.body.should.have.property('Caliber');
        res.body.should.have.property('Model');
        res.body.should.have.property('Serial_Number');
        res.body.should.have.property('CurrentOptic');
        res.body.should.have.property('LinkToProduct');
        done();
      });
    });
  });
  describe('/GET/:id',()=>{
    it('should GET a Firearm object by the given id',(done)=>{
      let model = _createModel(testModel);
      model.create().then(()=>{
        chai.request(server).get('/firearm/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('Id').eql(model.Id);
          res.body.should.have.property('Manufacturer');
          res.body.should.have.property('Caliber');
          res.body.should.have.property('Model');
          res.body.should.have.property('Serial_Number');
          res.body.should.have.property('CurrentOptic');
          res.body.should.have.property('LinkToProduct');
          done();
        });
      });
    });
  });
  describe('/PUT/:id',()=>{
    it('should UPDATE a Firearm object by the given id',(done)=>{
      let model = _createModel(testModel);
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
