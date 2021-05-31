const express = require('express');
const ScheduleItem = require('./../models/scheduleModel');

const scheduleRouter = express.Router();

scheduleRouter.route('/').get((req, res) => {
    ScheduleItem.find()
        .then(scheduleItems => res.json(scheduleItems))
        .catch(err => res.status(400).json('Error: ' + err));
});

scheduleRouter.route('/:id').get((req, res) => {
    ScheduleItem.findById(req.params.id)
        .then(scheduleItem => res.json(scheduleItem))
        .catch(err => res.status(400).json('Error: ' + err));
});

scheduleRouter.route('/').post((req, res) => {
    const day = req.body.day;
    const name = req.body.name;
    const time = req.body.time;
    const meridiem = req.body.meridiem;

    const newItem = new ScheduleItem({ day, name, time, meridiem });

    newItem.save()
        .then(res.status(200).send("Success"))
        .catch(err => res.status(400).json('Error: ' + err));
});

scheduleRouter.route('/:id').delete((req, res) => {
    ScheduleItem.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).send("Success"))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = scheduleRouter;