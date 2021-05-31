const express = require('express');
const Belt = require('./../models/beltModel');

const beltRouter = express.Router();

beltRouter.route('/').get((req, res) => {
    Belt.find()
        .then(belts => res.json(belts))
        .catch(err => res.status(400).json('Error: ' + err));
});

beltRouter.route('/:id').get((req, res) => {
    Belt.findById(req.params.id)
        .then(belt => res.json(belt))
        .catch(err => res.status(400).json('Error: ' + err));
});

beltRouter.route('/').post((req, res) => {
    const name = req.body.name;
    const rank = req.body.rank;

    const newBelt = new Belt({ name, rank });

    newBelt.save()
        .then(res.status(200).send("Success"))
        .catch(err => res.status(400).json('Error: ' + err));
});

beltRouter.route('/:id').post((req, res) => {
    Belt.findById(req.params.id)
        .then(belt => {
            belt.name = req.body.name;
            belt.rank = req.body.rank;

            belt.save()
                .then(() => res.status(200).send("Success"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

beltRouter.route('/:id').delete((req, res) => {
    Belt.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).send("Success"))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = beltRouter;