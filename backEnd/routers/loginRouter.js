const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginRouter = express.Router();

const admin = {
    username: 'scmmaAdmin',
    name: 'Admin'
};

const generateToken = (user) => {
    return jwt.sign({
        username: user.username,
        name: user.name
    }, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
};

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

loginRouter.route('/').post((req, res) => {

    if (bcrypt.compareSync(req.body.password, bcrypt.hashSync(process.env.ADMIN_PASSWORD, salt))) {
        res.status(200).send({
            name: admin.name,
            token: generateToken(admin),
            message: 'Admin Successfully Logged In'
        })
    } else if (req.body.username !== admin.username) {
        res.status(400).send({ message: "Invalid Username" });
    } else if (!bcrypt.compareSync(req.body.password, bcrypt.hashSync(process.env.ADMIN_PASSWORD, salt))) {
        res.status(400).send({ message: 'Password Incorrect' });
    }
});

loginRouter.route('/verify').post((req, res) => {
    const decodedJwt = jwt.verify(req.body.token, process.env.JWT_SECRET);
    if (!decodedJwt || decodedJwt.name !== 'Admin' || decodedJwt.username !== 'scmmaAdmin') {
        res.status(400).send({ message: "Must Log In" });
        return;
    }

    let currentDate = new Date();

    if (decodedJwt.exp * 1000 < currentDate.getTime()) {
        res.status(400).send({ message: "Must Log In" });
        return;
    } else {
        res.status(200).send({ message: 'Admin Logged In' })
    }
})

module.exports = loginRouter;