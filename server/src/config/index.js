'use strict';

module.exports = {
    PORT: process.env.PORT || 3000,
    DB: process.env.MONGODB || 'mongodb://localhost:27017/favorites',
    NAME: 'api',
    VERSION: 'v1',
    SECRET_TOKEN: 'mi_clave_token'
}