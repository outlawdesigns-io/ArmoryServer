process.env.NODE_ENV = 'testing';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const ModelFactory = require('../src/modelFactory');
const should = chai.should();

chai.use(chaiHttp);

const testModel = {
  Manufacturer:3,
  Caliber:2,
  BulletWeight:55,
  Casing:"Steel",
  BulletType:"FMJ",
  MuzzleVelocity:2953,
  Rounds:140
}

function _createModel(targetObj){
  let model = ModelFactory.get('ammo');
  for(const [key,value] of Object.entries(targetObj)){
    model[key] = value;
  }
  return model;
}

describe('Ammo',()=>{
  beforeEach((done)=>{
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
      .field('Manufacturer',testModel.Manufacturer)
      .field('Caliber',testModel.Caliber)
      .field('BulletWeight',testModel.BulletWeight)
      .field('Casing',testModel.Casing)
      .field('BulletType',testModel.BulletType)
      .field('MuzzleVelocity',testModel.MuzzleVelocity)
      .field('Rounds',testModel.Rounds)
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
        res.body.should.have.property('Rounds');
        done();
      });
    });
  });
  describe('/GET/:id',()=>{
    it('should GET an Ammo object by the given id',(done)=>{
      let model = _createModel(testModel);
      model.create().then(()=>{
        chai.request(server).get('/ammo/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('Id').eql(model.Id);
          res.body.should.have.property('Manufacturer');
          res.body.should.have.property('Caliber');
          res.body.should.have.property('BulletWeight');
          res.body.should.have.property('Casing');
          res.body.should.have.property('BulletType');
          res.body.should.have.property('MuzzleVelocity');
          res.body.should.have.property('Rounds');
          done();
        });
      });
    });
  });
  describe('/PUT/:id',()=>{
    it('should UPDATE an Ammo object by the given id',(done)=>{
      let model = _createModel(testModel);
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
