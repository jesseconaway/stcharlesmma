const express = require('express');
const multer = require('multer');
const fs = require('fs-extra');

const imageRouter = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './frontEnd/public/images');
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
    res.status(200).send("Success")
});

imageRouter.route('/:imageName').delete((req, res) => {
    try {
        fs.unlinkSync(`./frontEnd/public/images/${req.params.imageName}`);
        res.status(200).send("Success");
    } catch (err) {
        res.send('error');
    };
});

module.exports = imageRouter;