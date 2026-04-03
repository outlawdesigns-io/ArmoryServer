process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//configure SDK db connection
process.env.MYSQL_HOST = process.env.MYSQL_HOST || 'ubuntuserver';
process.env.MYSQL_USER = process.env.MYSQL_USER || 'root';
process.env.MYSQL_PASS = process.env.MYSQL_PASS || 'example';
process.env.MYSQL_CRON_DB = process.env.MYSQL_ARMORY_DB || 'Armory';

process.env.AUTH_DISCOVERY_URI = process.env.AUTH_DISCOVERY_URI || 'https://auth.outlawdesigns.io/.well-known/openid-configuration';
process.env.AUTH_CLIENT_ID =  process.env.AUTH_CLIENT_ID || 'armorysuite-server';
process.env.AUTH_CLIENT_AUDIENCE = process.env.AUTH_CLIENT_AUDIENCE || 'https://armory-service.outlawdesigns.io';
process.env.PORT = process.env.port || 8420;
