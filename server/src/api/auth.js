'use strict';

const express = require('express');
const authApi = express.Router();
const authController = require('../controllers/auth');

authApi.get('/logout', authController.logOutUser);
authApi.post('/signin', authController.loginUser);
authApi.post('/signup', authController.saveUser);

module.exports = authApi;