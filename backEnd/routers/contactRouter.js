const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');

const contactRouter = express.Router();

contactRouter.route('/').post(async (req, res) => {
    async function validateRecaptcha(token) {
        const secret = process.env.RECAPTCHA_SECRET_KEY;
        let user_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress; // CHANGED TO "SOCKET" FROM "CONNECTION"
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`);
        return response.data.success;
    }

    const isHuman = await validateRecaptcha(req.body.token);

    if (!isHuman) {
        res.status(500).send("Something went wrong. Try reloading the page.");
        return;
    } else {
        const smtpTrans = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.CONTACT_EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOpts = {
            from: req.body.email,
            to: process.env.CONTACT_EMAIL, // CHANGE IN PRODUCTION
            subject: `SCMMA Contact Message from ${req.body.name}`,
            text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
        };

        smtpTrans.sendMail(mailOpts, (error, response) => {
            if (error) {
                res.status(400).send('Oh no, Something went wrong.')
            }
            else {
                res.status(200).send('Success! Thank you for your message.')
            }
        })
    }
});

module.exports = contactRouter;