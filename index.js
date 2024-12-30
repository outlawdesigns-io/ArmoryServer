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
app.get('/firearm',armoryServer.getAll("firearm"));
app.post('/firearm',armoryServer.postModel("firearm"));
app.get('/firearm/:id',armoryServer.getModel("firearm"));
app.put('/firearm/:id',armoryServer.putModel("firearm"));
app.delete('/firearm/:id',armoryServer.deleteModel("firearm"));
app.post('/firearm/:id/image',armoryServer.postImage('firearmimage'));
app.get('/firearm/:id/image',armoryServer.getFirearmImages);

app.get('/ammo',armoryServer.getAll("ammo"));
app.post('/ammo',armoryServer.postModel("ammo"));
app.get('/ammo/:id',armoryServer.getModel("ammo"));
app.put('/ammo/:id',armoryServer.putModel("ammo"));
app.delete('/ammo/:id',armoryServer.deleteModel("ammo"));

app.get('/ammopurchase',armoryServer.getAll("ammopurchase"));
app.post('/ammopurchase',armoryServer.postModel("ammopurchase"));
app.get('/ammopurchase/:id',armoryServer.getModel("ammopurchase"));
app.put('/ammopurchase/:id',armoryServer.putModel("ammopurchase"));
app.put('/ammopurchase/:id/receive',armoryServer.receiveAmmoPurchase);
app.delete('/ammopurchase/:id',armoryServer.deleteModel("ammopurchase"));
//I would prefer this to be /ammopurchase/waiting, but it always thinks 'waiting' is an Id.
app.get('/waiting',armoryServer.getWaitingAmmo);

app.get('/caliber',armoryServer.getAll("caliber"));
app.post('/caliber',armoryServer.postModel("caliber"));
app.get('/caliber/:id',armoryServer.getModel("caliber"));
app.put('/caliber/:id',armoryServer.putModel("caliber"));
app.delete('/caliber/:id',armoryServer.deleteModel("caliber"));

app.get('/manufacturer',armoryServer.getAll("manufacturer"));
app.post('/manufacturer',armoryServer.postModel("manufacturer"));
app.get('/manufacturer/:id',armoryServer.getModel("manufacturer"));
app.put('/manufacturer/:id',armoryServer.putModel("manufacturer"));
app.delete('/manufacturer/:id',armoryServer.deleteModel("manufacturer"));

app.get('/shoot',armoryServer.getAll("shoot"));
app.post('/shoot',armoryServer.postShoot);
app.get('/shoot/:id',armoryServer.getModel("shoot"));
app.put('/shoot/:id',armoryServer.putModel("shoot"));
app.delete('/shoot/:id',armoryServer.deleteModel("shoot"));
app.post('/shoot/:id/target',armoryServer.postImage('target'));
app.get('/shoot/:id/target',armoryServer.getShootImages);

app.get('/vendor',armoryServer.getAll("vendor"));
app.post('/vendor',armoryServer.postModel("vendor"));
app.get('/vendor/:id',armoryServer.getModel("vendor"));
app.put('/vendor/:id',armoryServer.putModel("vendor"));
app.delete('/vendor/:id',armoryServer.deleteModel("shoot"));

app.get('/optic',armoryServer.getAll("optic"));
app.post('/optic',armoryServer.postModel("optic"));
app.get('/optic/:id',armoryServer.getModel("optic"));
app.put('/optic/:id',armoryServer.putModel("optic"));
app.delete('/optic/:id',armoryServer.deleteModel("optic"));

app.get('/target/:id',armoryServer.getModel("target"));
app.delete('/target/:id',armoryServer.deleteModel("target"));
app.get('/firearmimage/:id',armoryServer.getModel("firearmimage"));
app.delete('/firearmimage/:id',armoryServer.deleteModel("firearmimage"));




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

module.exports = app; // makes the server available for testing
