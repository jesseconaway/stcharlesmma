const express = require('express');
const Image = require('../models/imageModel');
const multer = require('multer');
const fs = require('fs-extra');

const imageRouter = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './frontEnd/public/coachImages');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

imageRouter.route('/').post(upload.single('imageData'), (req, res) => {
    const newImage = new Image({
        imageData: req.file.path
    })
    newImage.save()
        .then(() => {
            res.status(200).send("New Coach Added!")
        })
        .catch((err) => console.log(err));
});

imageRouter.route('/:imageName').delete((req, res) => {
    try {
        fs.unlinkSync(`./frontEnd/public/coachImages/${req.params.imageName}`);
        res.send('Coach Deleted');
    } catch (err) {
        res.send('error');
    };
});

module.exports = imageRouter;