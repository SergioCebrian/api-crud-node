'use strict';

const express = require('express');
const categoryApi = express.Router();
const categoryController = require('../controllers/category');
const verifyToken = require('../middleware/auth');

categoryApi.delete('/:uuid', verifyToken, categoryController.deleteCategory);
categoryApi.get('/', verifyToken, categoryController.getCategories);
categoryApi.get('/:uuid', verifyToken, categoryController.getCategory);
categoryApi.post('', verifyToken, categoryController.saveCategory);
categoryApi.put('/:uuid', verifyToken, categoryController.updateCategory);

module.exports = categoryApi;