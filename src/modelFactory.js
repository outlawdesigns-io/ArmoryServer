const Firearm = require('./models/firearm');
const Ammo = require('./models/ammo');
const AmmoPurchase = require('./models/ammopurchase');
const Caliber = require('./models/caliber');
const Manufacturer = require('./models/manufacturer');
const Shoot = require('./models/shoot');
const Vendor = require('./models/vendor');
const TargetImage = require('./models/targetImage');
const Optic = require('./models/optic');
const FirearmImage = require('./models/firearmImage');

const models = {
  firearm: (id) => new Firearm(id),
  ammo: (id) => new Ammo(id),
  ammopurchase: (id) => new AmmoPurchase(id),
  caliber: (id) => new Caliber(id),
  manufacturer: (id) => new Manufacturer(id),
  shoot: (id) => new Shoot(id),
  vendor: (id) => new Vendor(id),
  optic: (id) => new Optic(id),
  target: (id) => new TargetImage(id),
  firearmimage: (id) => new FirearmImage(id)
};
const modelClasses = {
  firearm:Firearm,
  ammo:Ammo,
  ammopurchase:AmmoPurchase,
  caliber:Caliber,
  manufacturer:Manufacturer,
  shoot:Shoot,
  vendor:Vendor,
  optic:Optic,
  target:TargetImage,
  firearmimage:FirearmImage
}

module.exports = {
  get: (name,id) => {
    if(!models[name]){
      throw new Exception(`Model ${name} does not exist`);
    }
    return models[name](id);
  },
  getClass: (name) => {
    if(!modelClasses[name]){
      throw new Exception(`Class ${name} does not exist`);
    }
    return modelClasses[name];
  }
}
