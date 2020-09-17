'use strict';

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
    name: { type: String, required: true, unique: true },
    picture: { type: String },
    slug: { type: String },
    uuid: { type: String }
});

module.exports = mongoose.model('Category', categorySchema);