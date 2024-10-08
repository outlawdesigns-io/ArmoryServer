module.exports = {
  development:{
    PORT:9912,
    SSLCERTPATH:'/etc/apache2/certs/fullchain.pem',
    SSLKEYPATH:'/etc/apache2/certs/privkey.pem',
    ACCNTHOST:'api.outlawdesigns.io',
    ACCNTPORT:9661,
    ACCNTVERIFYEND:'/verify',
    AUTHHEADER:'auth_token',
    DBUSER:'root',
    DBHOST:'localhost',
    DBPASS:'',
    DB_DB:'Armory_Test',
  },
  testing:{
    PORT:9912,
    SSLCERTPATH:'/etc/apache2/certs/fullchain.pem',
    SSLKEYPATH:'/etc/apache2/certs/privkey.pem',
    ACCNTHOST:'api.outlawdesigns.io',
    ACCNTPORT:9661,
    ACCNTVERIFYEND:'/verify',
    AUTHHEADER:'auth_token',
    DBUSER:'root',
    DBHOST:'localhost',
    DBPASS:'',
    DB_DB:'Armory_Test',
  },
  production:{
    PORT:8420,
    SSLCERTPATH:'/etc/apache2/certs/fullchain.pem',
    SSLKEYPATH:'/etc/apache2/certs/privkey.pem',
    ACCNTHOST:'api.outlawdesigns.io',
    ACCNTPORT:9661,
    ACCNTVERIFYEND:'/verify',
    AUTHHEADER:'auth_token',
    DBUSER:'root',
    DBHOST:'localhost',
    DBPASS:'',
    DB_DB:'Armory',
  }
};
