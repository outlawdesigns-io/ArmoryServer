process.env.NODE_ENV = 'testing';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const ModelFactory = require('../src/modelFactory');
const should = chai.should();

const testModel = {
  Name: 'Gun Broker',
  Website: 'https://www.gunbroker.com/'
}

function _createModel(targetObj){
  let model = ModelFactory.get('vendor');
  for(const [key,value] of Object.entries(targetObj)){
    model[key] = value;
  }
  return model;
}

chai.use(chaiHttp);

describe('Vendor',()=>{
  beforeEach((done)=>{
    ModelFactory.getClass('vendor').truncate().then(()=>{done()});
  });
  describe('/GET',()=>{
    it('should GET all the Vendor objects',(done)=>{
      chai.request(server).get('/vendor').end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });
  describe('/POST',()=>{
    it('should POST a new Vendor object',(done)=>{
      chai.request(server)
      .post('/vendor')
      .field('Content-Type','multipart/form-data')
      .field('Name',testModel.Name)
      .field('Website',testModel.Website)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Id');
        res.body.should.have.property('Name');
        res.body.should.have.property('Website');
        done();
      });
    });
  });
  describe('/GET/:id',()=>{
    it('should GET a Vendor object by the given id',(done)=>{
      let model = _createModel(testModel);
      model.create().then(()=>{
        chai.request(server).get('/vendor/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('Id').eql(model.Id);
          res.body.should.have.property('Name');
          res.body.should.have.property('Website');
          done();
        });
      });
    });
  });
  describe('/PUT/:id',()=>{
    it('should UPDATE a Vendor object by the given id',(done)=>{
      let model = _createModel(testModel);
      let updateModel = testModel;
      updateModel.Website = 'https://google.com';
      model.create().then(()=>{
        chai.request(server)
        .put('/vendor/' + model.Id)
        .field('Content-Type','multipart/form-data')
        .field('Website',updateModel.Website)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('Website').eql(updateModel.Website);
          done();
        });
      });
    });
  });
  describe('/DELETE/:id',()=>{
    it('should DELETE a Vendor object given the id',(done)=>{
      let model = _createModel(testModel);
      model.create().then(()=>{
        chai.request(server).delete('/vendor/' + model.Id).end((err,res)=>{
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
