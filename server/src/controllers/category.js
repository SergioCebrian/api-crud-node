'use strict';

const Category = require('../models/category'),
      createSlug = require('../services/slug'),
      generateUUID = require('../services/uuid');

function getCategories(req, res) {
    Category.find({})
            .select('-_id -__v')
            .exec((err, categories) => {
              if (err) return res.status(500).send({ message: 'Error al hacer la petición' });
              if (!categories) return res.status(404).send({ message: 'No existen categorías' });
              res.status(200).send({ categories });
    });
}

function getCategory(req, res) {
    let uuid = req.params.uuid;
 
    Category.find({ uuid })
            .select('-_id -__v')
            .exec((err, category) => {
              if (err) return res.status(500).send({ message: 'Error al hacer la petición' });
              if (!category) return res.status(404).send({ message: 'La categoría no existe' });
              res.status(200).send({ category }); // category: category
    });     
}

function saveCategory(req, res) {
    let category = new Category();
        category.name = req.body.name;
        category.slug = createSlug(req.body.name);
        category.picture = `${category.slug}.png`,
        category.uuid = generateUUID();

    category.save((err, categoryStored) => {
        if(err) res.status(500).send({ message: 'Error al salvar en la base de datos' + err })
        res.status(200).send({ category: categoryStored })
    })
}

function updateCategory(req, res) {
    let category = new Category(),
        uuid = req.params.uuid,
        update = req.body;
        update.slug = createSlug(update.name);
        update.picture = `${update.slug}.png`;

    Category.findOneAndUpdate({ uuid }, update, (err, category) => {
        if(err) res.status(500).send({ message: 'Error al actualizar en la base de datos' + err })
        res.status(200).send({ category });
    })
}

function deleteCategory(req, res) {
    let uuid = req.params.uuid;

    Category.findOneAndDelete({ uuid }, (err, category) => {
        if (!category) return res.status(404).send({ message: `La categoría '${ req.params.uuid }' no existe` });
        if(err) res.status(500).send({ message: 'Error al borrar en la base de datos' + err });
        res.status(200).send({ message: 'Borrado en la base de datos' })
    })
}

module.exports = { 
  deleteCategory,
  getCategory,
  getCategories,
  saveCategory,
  updateCategory
}