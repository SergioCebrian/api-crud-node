'use strict';

const Favorite = require('../models/favorite'),
      createSlug = require('../services/slug'),
      generateUUID = require('../services/uuid');

function getFavorites(req, res) {
    Favorite.find({})
            .select('-_id -__v')
            .populate('category', '-_id -__v')
            .exec((err, favorites) => {
              if (err) return res.status(500).send({ message: 'Error al hacer la petición' });
              if (!favorites) return res.status(404).send({ message: 'No existen favoritos' });
              res.status(200).send({ favorites });
            });
}

function getFavorite(req, res) {
    let uuid = req.params.uuid;

    Favorite.findOne({ uuid })
            .select('-_id -__v')
            .populate('category', '-_id -__v')
            .exec((err, favorite) => {
              if (err) return res.status(500).send({ message: 'Error al hacer la petición' });
              if (!favorite) return res.status(404).send({ message: 'El favorito no existe' });
              res.status(200).send({ favorite });
            });
}

function searchFavorite(req, res) {
    let term = req.params.term,
        regex = new RegExp(term, 'i');

    Favorite.find({ title: regex })
            .select('-_id -__v')
            .populate('favorite', 'title')
            .exec( (err, favorites) => {
                if (err) return res.status(500).send({ message: 'Error al hacer la petición' });
                if (!favorites) return res.status(404).send({ message: `La búsqueda ${regex} no devolvió resultados.` });
                res.status(200).send({ favorites });
            });
}

function saveFavorite(req, res) {
    let favorite = new Favorite();
        favorite.title = req.body.title;
        favorite.description = req.body.description;
        favorite.url = req.body.url;
        favorite.category = req.body.category;
        favorite.slug = createSlug(req.body.title);
        favorite.picture = req.body.picture || favorite.slug + '.jpg';
        favorite.uuid = generateUUID();

    favorite.save((err, favoriteStored) => {
        if(err) res.status(500).send({ message: 'Error al salvar en la base de datos' + err });
        res.status(200).send({ favorite: favoriteStored });
    });
}

function updateFavorite(req, res) {
    let favorite = new Favorite(),
        uuid = req.params.uuid,
        update = req.body;
        update.slug = createSlug(update.title);
        update.picture = update.picture || update.slug + '.jpg';

    Favorite.findOneAndUpdate({ uuid }, update, (err, favorite) => {
        if(err) res.status(500).send({ message: 'Error al actualizar en la base de datos' + err })
        res.status(200).send({ favorite });
    })
}

function deleteFavorite(req, res) {
    let uuid = req.params.uuid;

    Favorite.findOneAndDelete({ uuid }, (err, favorite) => {
        if (!favorite) return res.status(404).send({ message: `La categoría '${ req.params.uuid }' no existe` });
        if(err) res.status(500).send({ message: 'Error al borrar en la base de datos' + err });
        res.status(200).send({ message: 'Borrado en la base de datos' })
    })
}

module.exports = { 
  deleteFavorite,
  getFavorite,
  getFavorites,
  saveFavorite,
  searchFavorite,
  updateFavorite
}