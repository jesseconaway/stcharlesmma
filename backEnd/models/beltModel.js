const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const beltSchema = new Schema({
    name: { type: String, required: true },
    rank: { type: String, required: true }
});

const Belt = mongoose.model('Belt', beltSchema);

module.exports = Belt;