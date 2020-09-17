'use strict';

const express = require('express');
const favoriteApi = express.Router();
const favoriteController = require('../controllers/favorite');
const verifyToken = require('../middleware/auth');

favoriteApi.delete('/:uuid', verifyToken, favoriteController.deleteFavorite);
favoriteApi.get('/', verifyToken, favoriteController.getFavorites);
favoriteApi.get('/:uuid', verifyToken, favoriteController.getFavorite);
favoriteApi.get('/search/:term', verifyToken, favoriteController.searchFavorite);
favoriteApi.post('/', verifyToken, favoriteController.saveFavorite);
favoriteApi.put('/:uuid', verifyToken, favoriteController.updateFavorite);

module.exports = favoriteApi;