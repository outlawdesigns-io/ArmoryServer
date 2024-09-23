# Armory REST API

## Preamble

`Armory` is a firearm/ammunition inventory management system. It is intended to provide users with a digital solution for organizing their firearm collection, and maintaining an accurate ammunition inventory. This [expressJS](https://expressjs.com/) back-end implementation provides the user an interface for creating and managing firearm related objects and relationships between them over http(s). It can be used to build reports or client applications in any language that supports making http calls. See [ArmoryVue](https://github.com/outlawdesigns-io/ArmoryVue) for an example client application.

## Meta

### Security

This API is accessible only by registered users of [outlawdesigns.io](https://outlawdesigns.io) who present a valid authorization token.
Authorization tokens should be presented as a value of the `auth_token` header.

#### Sample Call
```
curl --location --request GET 'https://api.outlawdesigns.io:8420/firearm/' \
--header 'auth_token: YOUR_TOKEN' \
```

### Reporting performance or availability problems

Report performance/availability at our [support site](mailto:j.watson@outlawdesigns.io).

### Reporting bugs, requesting features

Please report bugs with the API or the documentation on our [issue tracker](https://github.com/outlawdesigns-io/ArmoryServer).

## Endpoints

>Note: All `POST`/`PUT` data should be formatted as `multipart/form-data`

### firearm/

* [GetAllFirearm](./docs/getAllFirearm.md)
* [GetFirearm](./docs/getFirearm.md)
* [CreateFirearm](./docs/createFirearm.md)
* [UpdateFirearm](./docs/updateFirearm.md)
* [DeleteFirearm](./docs/deleteFirearm.md)

### ammo/

* [GetAllAmmo](./docs/getAllAmmo.md)
* [GetAmmo](./docs/getAmmo.md)
* [CreateAmmo](./docs/createAmmo.md)
* [UpdateAmmo](./docs/updateAmmo.md)
* [DeleteAmmo](./docs/deleteAmmo.md)

### ammopurchase/

* [GetAllAmmoPurchase](./docs/getAllAmmoPurchase.md)
* [GetAmmoPurchase](./docs/getAmmoPurcahse.md)
* [CreateAmmoPurchase](./docs/createAmmoPurchase.md)
* [ReceiveAmmoPurchase](./docs/receiveAmmoPurchase.md)
* [DeleteAmmoPurchase](./docs/deleteAmmoPurchase.md)

### caliber/

* [GetAllCaliber](./docs/getAllCaliber.md)
* [GetCaliber](./docs/getCaliber.md)
* [CreateCaliber](./docs/createCaliber.md)
* [UpdateCaliber](./docs/updateCaliber.md)
* [DeleteCaliber](./docs/deleteCaliber.md)

### manufacturer/

* [GetAllManufacturer](./docs/getAllManufacturer.md)
* [GetManufacturer](./docs/getManufacturer.md)
* [CreateManufacturer](./docs/createManufacturer.md)
* [UpdateManufacturer](./docs/updateManufacturer.md)
* [DeleteManufacturer](./docs/deleteManufacturer.md)

### shoot/

* [GetAllShoot](./docs/getAllShoot.md)
* [GetShoot](./docs/getShoot.md)
* [CreateShoot](./docs/createShoot.md)
* [UpdateShoot](./docs/updateShoot.md)
* [DeleteShoot](./docs/deleteShoot.md)
* [GetShootTarget](./docs/getShootTarget.md)
* [CreateShootTarget](./docs/createShootTarget.md)

### vendor/

* [GetAllVendor](./docs/getAllVendor.md)
* [GetVendor](./docs/getVendor.md)
* [CreateVendor](./docs/createVendor.md)
* [UpdateVendor](./docs/updateVendor.md)
* [DeleteVendor](./docs/deleteVendor.md)

### optic/

* [GetAllOptic](./docs/getAllOptic.md)
* [GetOptic](./docs/getOptic.md)
* [CreateOptic](./docs/createOptic.md)
* [UpdateOptic](./docs/updateOptic.md)
* [DeleteOptic](./docs/deleteOptic.md)

### target/

* [GetTarget](./docs/getTarget.md)

### waiting/

* [GetAmmoPurchasesAwaitingReceipt](./docs/getAwaitingReceipt.md)

## Deployment

This package can be deployed in three different modes (`development`,`testing`,`production`). Data sources, ports, authentication endpoints, and certificate paths for each mode are set in `src/config.js`.

### Development

Building in `development` mode strips out the need for authentication and downgrades from `https` to `http`. Service will respond to unauthenticated requests and ignore any provided certificates.

### Testing

Used for performing unit tests. When performing these tests, each model will truncate its data source on completion. Ensure that `src/config.js`'s `testing` object's `DB_DB` property it distinct from the other two, **or data will be lost** when tests are executed.

### Production

Building in `production` mode will enforce authentication requirements and upgrades from `http` to `https`. Service will **not** respond to unauthenticated requests and production certificates must be in place.

### Sample build command
```
docker build -t amoryserver-express:production . --build-arg ENV=production
```
### Sample YAML entry

```
  backend:
    image: armoryserver-expressjs
    build:
      context: /home/ubuntu/projects/ArmoryServer/
      dockerfile: /home/ubuntu/projects/ArmoryServer/Dockerfile
      args:
        ENV: development
    ports:
      - '8420:8420'
```
