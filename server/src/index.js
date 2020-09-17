'use strict';

const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');

mongoose.connect(config.DB, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    // if(err) throw err
    if(err) return console.log('Error al conectar con la base de datos ' + err);
    console.log('Conexión a la base de datos');
    app.listen(config.PORT, () => {
        console.log('funciona el puerto ' + config.PORT);
    });
});