const Caliber = require('./models/caliber');
const Manufacturer = require('./models/manufacturer');
const FirearmType = require('./models/firearmType');
const Firearm = require('./models/firearm');
const FirearmImage = require('./models/firearmImage');
const OpticType = require('./models/opticType');
const Optic = require('./models/optic');
const AmmunitionType = require('./models/ammunitionType');
const Ammunition = require('./models/ammunition');
const AmmoPurchase = require('./models/ammopurchase');
const Vendor = require('./models/vendor');
const Shoot = require('./models/shoot');
const TargetImage = require('./models/targetImage');


const models = {
  firearm: (id) => new Firearm(id),
  ammo: (id) => new Ammunition(id),
  ammopurchase: (id) => new AmmoPurchase(id),
  caliber: (id) => new Caliber(id),
  manufacturer: (id) => new Manufacturer(id),
  shoot: (id) => new Shoot(id),
  vendor: (id) => new Vendor(id),
  optic: (id) => new Optic(id),
  target: (id) => new TargetImage(id),
  firearmimage: (id) => new FirearmImage(id),
  ammoType: (id) => new AmmunitionType(id),
  firearmType: (id) => new FirearmType(id),
  opticType: (id) => new OpticType(id)
};
const modelClasses = {
  firearm:Firearm,
  ammo:Ammunition,
  ammopurchase:AmmoPurchase,
  caliber:Caliber,
  manufacturer:Manufacturer,
  shoot:Shoot,
  vendor:Vendor,
  optic:Optic,
  target:TargetImage,
  firearmimage:FirearmImage,
  ammotype:AmmunitionType,
  firearmtype:FirearmType,
  optictype:OpticType
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
