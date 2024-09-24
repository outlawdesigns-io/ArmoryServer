process.env.NODE_ENV = 'testing';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const ModelFactory = require('../src/modelFactory');
const should = chai.should();

const testModel = {
  Label:'7.62x39'
}

function _createModel(targetObj){
  let model = ModelFactory.get('caliber');
  for(const [key,value] of Object.entries(targetObj)){
    model[key] = value;
  }
  return model;
}

chai.use(chaiHttp);

describe('Caliber',()=>{
  beforeEach((done)=>{
    ModelFactory.getClass('caliber').truncate().then(()=>{done()});
  });
  describe('/GET',()=>{
    it('should GET all the Caliber objects',(done)=>{
      chai.request(server).get('/caliber').end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });
  describe('/POST',()=>{
    it('should POST a new Caliber object',(done)=>{
      chai.request(server)
      .post('/caliber')
      .field('Content-Type','multipart/form-data')
      .field('Label',testModel.Label)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Id');
        res.body.should.have.property('Label');
        done();
      });
    });
  });
  describe('/GET/:id',()=>{
    it('should GET a Caliber object by the given id',(done)=>{
      let model = _createModel(testModel);
      model.create().then(()=>{
        chai.request(server).get('/caliber/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('Id').eql(model.Id);
          res.body.should.have.property('Label');
          done();
        });
      });
    });
  });
  describe('/PUT/:id',()=>{
    it('should UPDATE a Caliber object by the given id',(done)=>{
      let model = _createModel(testModel);
      let updateModel = testModel;
      updateModel.Label = '.223 REM';
      model.create().then(()=>{
        chai.request(server)
        .put('/caliber/' + model.Id)
        .field('Content-Type','multipart/form-data')
        .field('Label',updateModel.Label)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('Label').eql(updateModel.Label);
          done();
        });
      });
    });
  });
  describe('/DELETE/:id',()=>{
    it('should DELETE a Caliber object given the id',(done)=>{
      let model = _createModel(testModel);
      model.create().then(()=>{
        chai.request(server).delete('/caliber/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(model.Id.toString());
          res.body.should.have.property('message').eql('Target Object Deleted');
          done();
        });
      });
    });
  });
});
