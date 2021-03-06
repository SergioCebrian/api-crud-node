'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');

async function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'Token inválido.' });
    }
    // Decode the Tokenreq.userId = decoded.id;
    const decoded = await jwt.verify(token, config.SECRET_TOKEN);
    req.userId = decoded.id;
    next();
}

module.exports = verifyToken;