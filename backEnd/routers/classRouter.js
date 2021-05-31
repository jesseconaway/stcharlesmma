const express = require('express');
const ScmmaClass = require('./../models/classModel');

const classRouter = express.Router();

classRouter.route('/').get((req, res) => {
    ScmmaClass.find()
        .then(scmmaClasses => res.json(scmmaClasses))
        .catch(err => res.status(400).json('Error: ' + err));
});

classRouter.route('/:id').get((req, res) => {
    ScmmaClass.findById(req.params.id)
        .then(scmmaClass => res.json(scmmaClass))
        .catch(err => res.status(400).json('Error: ' + err));
});

classRouter.route('/').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    const newClass = new ScmmaClass({ name, description });

    newClass.save()
        .then(res.status(200).send("Success"))
        .catch(err => res.status(400).json('Error: ' + err));
});

classRouter.route('/:id').post((req, res) => {
    ScmmaClass.findById(req.params.id)
        .then(scmmaClass => {
            scmmaClass.name = req.body.name;
            scmmaClass.description = req.body.description;

            scmmaClass.save()
                .then(() => res.status(200).send("Success"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

classRouter.route('/:id').delete((req, res) => {
    ScmmaClass.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).send("Success"))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = classRouter;