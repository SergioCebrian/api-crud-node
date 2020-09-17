'use strict';

const mongoose = require('mongoose'),
      schema = mongoose.Schema,
      Category = require('./category');

const favoriteSchema = new schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    picture: { type: String },
    url: { type: String, required: true, unique: true },
    category: { type: schema.Types.ObjectId, ref: 'Category' },
    slug: { type: String },
    uuid: { type: String }
});

module.exports = mongoose.model('Favorite', favoriteSchema);