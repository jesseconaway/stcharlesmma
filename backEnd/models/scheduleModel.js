const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const scheduleSchema = new Schema({
    day: { type: String, required: true },
    name: { type: String, required: true },
    time: { type: Number, required: true },
    meridiem: { type: String, required: true }
});

const ScheduleItem = mongoose.model('Schedule Item', scheduleSchema);

module.exports = ScheduleItem;