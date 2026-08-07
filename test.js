import './src/config.js';
import ModelFactory from '@outlawdesigns/armorysdk';

async function main(){
 //let shoot = await Shoot.new(2,4,120);
 //let purchase = await AmmoPurchase.new(1,1,100,99.99,'4/1/2023');
 //let purchase = await AmmoPurchase.receive(7);
 //console.log(purchase);
 //console.log(await AmmoPurchase.getAwaitingReceipt());
 //let img = await new TargetImage(2)._build();
 //console.log(img);
 //const model = ModelFactory.get('ammopurchase',12);
 //await model._build();
 //console.log(model._buildPublicObj());
 //ModelFactory.getClass('ammotype').truncate().then(()=>{console.log('done.');});
 const testModel = {
   AmmunitionType:1,
   Rounds:140,
 }
 let model = _createModel(testModel);
 model.create().then(()=>{
   console.log(model);
 });

}

function _createModel(targetObj){
  let model = ModelFactory.get('ammo');
  for(const [key,value] of Object.entries(targetObj)){
    model[key] = value;
  }
  return model;
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
