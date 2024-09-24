process.env.NODE_ENV = 'testing';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const ModelFactory = require('../src/modelFactory');
const should = chai.should();


const testAmmoModel = {
  Manufacturer:3,
  Caliber:2,
  BulletWeight:55,
  Casing:"Steel",
  BulletType:"FMJ",
  MuzzleVelocity:2953,
  Rounds:140
};

const testModel = {
  Ammo: 1,
  Vendor: 1,
  Rounds: 500,
  Price: 150,
  DatePurchased: '2023-10-07 00:00:00',
  DateReceived: null
};

function _createModel(targetObj,modelStr){
  let model = ModelFactory.get(modelStr);
  for(const [key,value] of Object.entries(targetObj)){
    model[key] = value;
  }
  return model;
}

chai.use(chaiHttp);

describe('AmmoPurchase',()=>{
  beforeEach((done)=>{
    ModelFactory.getClass('ammopurchase').truncate().then(()=>{done()});
  });
  describe('/GET',()=>{
    it('should GET all the AmmoPurchase objects',(done)=>{
      chai.request(server).get('/ammopurchase').end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });
  describe('/POST',()=>{
    it('should POST a new AmmoPurchase object',(done)=>{
      chai.request(server)
      .post('/ammopurchase')
      .field('Content-Type','multipart/form-data')
      .field('Ammo',testModel.Ammo)
      .field('Vendor',testModel.Vendor)
      .field('Rounds',testModel.Rounds)
      .field('Price',testModel.Price)
      .field('DatePurchased',testModel.DatePurchased)
      //.field('DateReceived',testModel.DateReceived)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('Id');
        res.body.should.have.property('Ammo');
        res.body.should.have.property('Vendor');
        res.body.should.have.property('Rounds');
        res.body.should.have.property('Price');
        res.body.should.have.property('DatePurchased');
        res.body.should.have.property('DateReceived');
        done();
      });
    });
  });
  describe('/GET/:id',()=>{
    it('should GET an AmmoPurchase object by the given id',(done)=>{
      let model = _createModel(testModel,'ammopurchase');
      model.create().then(()=>{
        chai.request(server).get('/ammopurchase/' + model.Id).end((err,res)=>{
          res.should.have.status(200);
          res.body.should.have.property('Id').eql(model.Id);
          res.body.should.have.property('Ammo');
          res.body.should.have.property('Vendor');
          res.body.should.have.property('Rounds');
          res.body.should.have.property('Price');
          res.body.should.have.property('DatePurchased');
          res.body.should.have.property('DateReceived');
          done();
        });
      });
    });
  });
  describe('/PUT/:id',()=>{
    it('should UPDATE an AmmoPurchase object by the given id',(done)=>{
      let model = _createModel(testModel,'ammopurchase');
      let updateModel = testModel;
      updateModel.Rounds = 1000;
      model.create().then(()=>{
        chai.request(server)
        .put('/ammopurchase/' + model.Id)
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
  describe('/PUT/:id/receive',()=>{
    it('should update a pending AmmoPurchase.DateReceived property',(done)=>{
      let ammoModel = _createModel(testAmmoModel,'ammo');
      let model = _createModel(testModel,'ammopurchase');
      ammoModel.create().then(()=>{
        model.Ammo = ammoModel.Id;
        model.create().then(()=>{
          chai.request(server).put('/ammopurchase/' + model.Id + '/receive').end((err,res)=>{
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('DateReceived').eql(model.db.date());
            done();
          });
        });
      });
    });
  });
  describe('/DELETE/:id',()=>{
    it('should DELETE an AmmoPurchase object given the id',(done)=>{
      let model = _createModel(testModel,'ammo');
      model.create().then(()=>{
        chai.request(server).delete('/ammopurchase/' + model.Id).end((err,res)=>{
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
