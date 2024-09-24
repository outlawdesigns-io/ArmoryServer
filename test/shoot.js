process.env.NODE_ENV = 'testing';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const ModelFactory = require('../src/modelFactory');
const should = chai.should();

const testModel = {
  FireArm: 3,
  Ammo: 3,
  Rounds: 30,
  Distance_Ft: 60,
  Optic: 0
}

function _createModel(targetObj){
  let model = ModelFactory.get('shoot');
  for(const [key,value] of Object.entries(targetObj)){
    model[key] = value;
  }
  return model;
}

chai.use(chaiHttp);

describe('Shoot',()=>{
  beforeEach((done)=>{
    ModelFactory.getClass('shoot').truncate().then(()=>{done()});
  });
  describe('/GET',()=>{
    it('should GET all the Shoot objects',(done)=>{
      chai.request(server).get('/shoot').end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });
  describe('/POST',()=>{
    it('should POST a new Shoot object',(done)=>{
      chai.request(server)
      .post('/shoot')
      .field('Content-Type','multipart/form-data')
      .field('FireArm',testModel.FireArm)
      .field('Ammo',testModel.Ammo)
      .field('Rounds',testModel.Rounds)
      .field('Distance_Ft',testModel.Distance_Ft)
      .field('Optic',testModel.Optic)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Id');
        res.body.should.have.property('FireArm');
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
      let model = _createModel(testModel);
      model.create().then(()=>{
        chai.request(server).get('/shoot/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('Id').eql(model.Id);
          res.body.should.have.property('FireArm');
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
      let model = _createModel(testModel);
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
      let model = _createModel(testModel);
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
