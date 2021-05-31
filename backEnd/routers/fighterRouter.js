const express = require('express');
const Fighter = require('./../models/fighterModel');

const fighterRouter = express.Router();

fighterRouter.route('/').get((req, res) => {
    Fighter.find()
        .then(fighters => res.json(fighters))
        .catch(err => res.status(400).json('Error: ' + err));
});

fighterRouter.route('/:id').get((req, res) => {
    Fighter.findById(req.params.id)
        .then(fighter => res.json(fighter))
        .catch(err => res.status(400).json('Error: ' + err));
});

fighterRouter.route('/').post((req, res) => {
    const name = req.body.name;
    const details = req.body.details;
    const order = req.body.order;
    const image = req.body.image;

    const newFighter = new Fighter({ name, details, order, image });

    newFighter.save()
        .then(res.status(200).send("Success"))
        .catch(err => res.status(400).json('Error: ' + err));
});

fighterRouter.route('/:id').post((req, res) => {
    Fighter.findById(req.params.id)
        .then(fighter => {
            fighter.name = req.body.name;
            fighter.details = req.body.details;
            fighter.order = req.body.order;
            fighter.image = req.body.image;

            fighter.save()
                .then(() => res.status(200).send("Success"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

fighterRouter.route('/:id').delete((req, res) => {
    Fighter.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).send("Success"))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = fighterRouter;