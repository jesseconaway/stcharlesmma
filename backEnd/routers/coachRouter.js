const express = require('express');
const Coach = require('./../models/coachModel');

const coachRouter = express.Router();

coachRouter.route('/').get((req, res) => {
    Coach.find()
        .then(coaches => res.json(coaches))
        .catch(err => res.status(400).json('Error: ' + err));
});

coachRouter.route('/:id').get((req, res) => {
    Coach.findById(req.params.id)
        .then(camp => res.json(camp))
        .catch(err => res.status(400).json('Error: ' + err));
});

coachRouter.route('/').post((req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const classesCoached = req.body.classesCoached;
    const order = req.body.order;
    const image = req.body.image;

    const newCoach = new Coach({ name, classesCoached, order, image });

    newCoach.save()
        .then(res.status(200).send("New Coach Added!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

coachRouter.route('/:id').post((req, res) => {
    Coach.findById(req.params.id)
        .then(coach => {
            coach.name = req.body.name;
            coach.classesCoached = req.body.classesCoached;
            coach.order = req.body.order;
            coach.image = req.body.image;

            coach.save()
                .then(() => res.send("Coach Updated"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

coachRouter.route('/:id').delete((req, res) => {
    Coach.findByIdAndDelete(req.params.id)
        .then(() => res.send('Coach Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = coachRouter;