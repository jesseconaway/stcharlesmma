const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const coachRouter = require('./routers/coachRouter');
const fighterRouter = require('./routers/fighterRouter');
const imageRouter = require('./routers/imageRouter');
const classRouter = require('./routers/classRouter');
const scheduleRouter = require('./routers/scheduleRouter');
const beltRouter = require('./routers/beltRouter');
const docusignRouter = require('./routers/docusignRouter');
const contactRouter = require('./routers/contactRouter');
const loginRouter = require('./routers/loginRouter');

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/images', express.static('images'));

const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.MONGODB_URI || uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connected successfully');
})

// -----------------------------
// GET RID OF THIS IN PRODUCTION
// app.get('/', (req, res) => {
//     res.send('Server Ready');
// })

app.use('/api/belts', beltRouter);
app.use('/api/classes', classRouter);
app.use('/api/coaches', coachRouter);
app.use('/api/fighters', fighterRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/images', imageRouter);
app.use('/api/docusign', docusignRouter);
app.use('/api/contact', contactRouter);
app.use('/api/adminLogin', loginRouter);

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '..', '/frontEnd/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/frontEnd/build/index.html'));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});