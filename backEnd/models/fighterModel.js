const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const fighterSchema = new Schema({
    name: { type: String, required: true },
    details: { type: Array, required: true },
    order: { type: Number, required: true },
    image: { type: String, required: true }
});

const Fighter = mongoose.model('Fighter', fighterSchema);

module.exports = Fighter;