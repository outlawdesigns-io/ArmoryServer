process.env.NODE_ENV = 'testing';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const ModelFactory = require('../src/modelFactory');
const should = chai.should();

const testModel = {
  Manufacturer: 26,
  Name: 'HS510C',
  MagnificationTimes: 1,
  LinkToProduct: 'https://holosun.com/products/reflex-sight/510/hs510c.html'
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
  beforeEach((done)=>{
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
      .field('Manufacturer',testModel.Manufacturer)
      .field('Name',testModel.Name)
      .field('MagnificationTimes',testModel.MagnificationTimes)
      .field('LinkToProduct',testModel.LinkToProduct)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Id');
        res.body.should.have.property('Manufacturer');
        res.body.should.have.property('Name');
        res.body.should.have.property('MagnificationTimes');
        res.body.should.have.property('LinkToProduct');
        done();
      });
    });
  });
  describe('/GET/:id',()=>{
    it('should GET an Optic object by the given id',(done)=>{
      let model = _createModel(testModel);
      model.create().then(()=>{
        chai.request(server).get('/optic/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('Id').eql(model.Id);
          res.body.should.have.property('Manufacturer');
          res.body.should.have.property('Name');
          res.body.should.have.property('MagnificationTimes');
          res.body.should.have.property('LinkToProduct');
          done();
        });
      });
    });
  });
  describe('/PUT/:id',()=>{
    it('should UPDATE an Optic object by the given id',(done)=>{
      let model = _createModel(testModel);
      let updateModel = testModel;
      updateModel.MagnificationTimes = 2;
      model.create().then(()=>{
        chai.request(server)
        .put('/optic/' + model.Id)
        .field('Content-Type','multipart/form-data')
        .field('MagnificationTimes',updateModel.MagnificationTimes)
        .end((err,res)=>{
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('MagnificationTimes').eql(updateModel.MagnificationTimes);
          done();
        });
      });
    });
  });
  describe('/DELETE/:id',()=>{
    it('should DELETE an Optic object given the id',(done)=>{
      let model = _createModel(testModel);
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
