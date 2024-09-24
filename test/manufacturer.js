process.env.NODE_ENV = 'testing';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const ModelFactory = require('../src/modelFactory');
const should = chai.should();

const testModel = {
  Name: "WOLF Performance Ammunition",
  Website: "http://www.wolfammo.com",
  Firearm: 0,
  Ammo: 1,
  Optic: 0
}

function _createModel(targetObj){
  let model = ModelFactory.get('manufacturer');
  for(const [key,value] of Object.entries(targetObj)){
    model[key] = value;
  }
  return model;
}

chai.use(chaiHttp);

describe('Manufacturer',()=>{
  beforeEach((done)=>{
    ModelFactory.getClass('manufacturer').truncate().then(()=>{done()});
  });
  describe('/GET',()=>{
    it('should GET all the Manufacturer objects',(done)=>{
      chai.request(server).get('/manufacturer').end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });
  describe('/POST',()=>{
    it('should POST a new Manufacturer object',(done)=>{
      chai.request(server)
      .post('/manufacturer')
      .field('Content-Type','multipart/form-data')
      .field('Name',testModel.Name)
      .field('Website',testModel.Website)
      .field('Firearm',testModel.Firearm)
      .field('Ammo',testModel.Ammo)
      .field('Optic',testModel.Optic)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Id');
        res.body.should.have.property('Name');
        res.body.should.have.property('Website');
        res.body.should.have.property('Firearm');
        res.body.should.have.property('Ammo');
        res.body.should.have.property('Optic');
        done();
      });
    });
  });
  describe('/GET/:id',()=>{
    it('should GET an Manufacturer object by the given id',(done)=>{
      let model = _createModel(testModel);
      model.create().then(()=>{
        chai.request(server).get('/manufacturer/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('Id').eql(model.Id);
          res.body.should.have.property('Name');
          res.body.should.have.property('Website');
          res.body.should.have.property('Firearm');
          res.body.should.have.property('Ammo');
          res.body.should.have.property('Optic');
          done();
        });
      });
    });
  });
  describe('/PUT/:id',()=>{
    it('should UPDATE a manufacturer object by the given id',(done)=>{
      let model = _createModel(testModel);
      let updateModel = testModel;
      updateModel.Optic = 1;
      model.create().then(()=>{
        chai.request(server)
        .put('/manufacturer/' + model.Id)
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
    it('should DELETE an manufacturer object given the id',(done)=>{
      let model = _createModel(testModel);
      model.create().then(()=>{
        chai.request(server).delete('/manufacturer/' + model.Id).end((err,res)=>{
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
