const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const classSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const ScmmaClass = mongoose.model('Class', classSchema);

module.exports = ScmmaClass;