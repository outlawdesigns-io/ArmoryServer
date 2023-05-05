global.config = require('./src/config');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const Shoot = require('./src/models/shoot');
const AmmoPurchase = require('./src/models/ammopurchase');
const TargetImage = require('./src/models/TargetImage');

async function main(){
 //let shoot = await Shoot.new(2,4,120);
 //let purchase = await AmmoPurchase.new(1,1,100,99.99,'4/1/2023');
 //let purchase = await AmmoPurchase.receive(7);
 //console.log(purchase);
 //console.log(await AmmoPurchase.getAwaitingReceipt());
 //let img = await new TargetImage(2)._build();
 //console.log(img);
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
