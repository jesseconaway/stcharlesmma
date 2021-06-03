const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const coachSchema = new Schema({
    name: { type: String, required: true },
    classesCoached: { type: Array, required: true },
    order: { type: Number, required: true },
    image: { type: String, required: true },
    bio: { type: String, required: false },
    accolades: { type: Array, required: false },
    quote: { type: String, required: false }
});

const Coach = mongoose.model('Coach', coachSchema);

module.exports = Coach;