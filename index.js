const express = require('express');
const http = require('https');
const fs = require('fs');
const ArmoryServer = require('./src/armoryServer');

/*Config*/
global.config = require('./src/config');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, auth_token, request_token, password");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

if(process.env.NODE_ENV !== 'testing'){
  //app.use(require('morgan')('combined'));
  var morgan = require('morgan');
  morgan.token('date', function() {
    var p = new Date().toString().replace(/[A-Z]{3}\+/,'+').split(/ /);
    return( p[2]+'/'+p[1]+'/'+p[3]+':'+p[4]+' '+p[5].replace('GMT','') );
  });
  app.use(morgan());
}

const armoryServer = new ArmoryServer();

/*Register Routes*/
app.get('/firearm',armoryServer.getAllFirearm);
app.post('/firearm',armoryServer.postFirearm);
app.get('/firearm/:id',armoryServer.getFirearm);
app.put('/firearm/:id',armoryServer.putFirearm);
app.delete('/firearm/:id',armoryServer.deleteFirearm);

app.get('/ammo',armoryServer.getAllAmmo);
app.post('/ammo',armoryServer.postAmmo);
app.get('/ammo/:id',armoryServer.getAmmo);
app.put('/ammo/:id',armoryServer.putAmmo);
app.delete('/ammo/:id',armoryServer.deleteAmmo);

app.get('/ammopurchase',armoryServer.getAllAmmoPurchase);
app.post('/ammopurchase',armoryServer.postAmmoPurchase);
app.get('/ammopurchase/:id',armoryServer.getAmmoPurchase);
app.put('/ammopurchase/:id',armoryServer.putAmmoPurchase);
app.put('/ammopurchase/:id/receive',armoryServer.receiveAmmoPurchase);
app.delete('/ammopurchase/:id',armoryServer.deleteAmmoPurchase);
//I would prefer this to be /ammopurchase/waiting, but it always thinks 'waiting' is an Id.
app.get('/waiting',armoryServer.getWaitingAmmo);

app.get('/caliber',armoryServer.getAllCaliber);
app.post('/caliber',armoryServer.postCaliber);
app.get('/caliber/:id',armoryServer.getCaliber);
app.put('/caliber/:id',armoryServer.putCaliber);
app.delete('/caliber/:id',armoryServer.deleteCaliber);

app.get('/manufacturer',armoryServer.getAllManufacturer);
app.post('/manufacturer',armoryServer.postManufacturer);
app.get('/manufacturer/:id',armoryServer.getManufacturer);
app.put('/manufacturer/:id',armoryServer.putManufacturer);
app.delete('/manufacturer/:id',armoryServer.deleteManufacturer);

app.get('/shoot',armoryServer.getAllShoot);
app.post('/shoot',armoryServer.postShoot);
app.get('/shoot/:id',armoryServer.getShoot);
app.put('/shoot/:id',armoryServer.putShoot);
app.delete('/shoot/:id',armoryServer.deleteShoot);
app.post('/shoot/:id/target',armoryServer.postTargetImage);
app.get('/shoot/:id/target',armoryServer.getShootImages);

app.get('/vendor',armoryServer.getAllVendor);
app.post('/vendor',armoryServer.postVendor);
app.get('/vendor/:id',armoryServer.getVendor);
app.put('/vendor/:id',armoryServer.putVendor);
app.delete('/vendor/:id',armoryServer.deleteVendor);

app.get('/optic',armoryServer.getAllOptic);
app.post('/optic',armoryServer.postOptic);
app.get('/optic/:id',armoryServer.getOptic);
app.put('/optic/:id',armoryServer.putOptic);
app.delete('/optic/:id',armoryServer.deleteOptic);

app.get('/target/:id',armoryServer.getTargetImage);



/*Start Server*/
if(process.env.NODE_ENV !== 'production'){
  app.listen(global.config[process.env.NODE_ENV].PORT,()=>{
    console.log(process.env.NODE_ENV + ' mode listening on port: ' + global.config[process.env.NODE_ENV].PORT);
  });
}else{
  http.createServer({
    key: fs.readFileSync(global.config[process.env.NODE_ENV].SSLKEYPATH),
    cert: fs.readFileSync(global.config[process.env.NODE_ENV].SSLCERTPATH)
  },app).listen(global.config[process.env.NODE_ENV].PORT,()=>{
    console.log(process.env.NODE_ENV + ' mode listening on port: ' + global.config[process.env.NODE_ENV].PORT);
  });
}
