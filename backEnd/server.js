const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const coachRouter = require('./routers/coachRouter');
const imageRouter = require('./routers/imageRouter');

dotenv.config();
const app = express();

app.use(express.urlencoded());
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

app.get('/', (req, res) => {
    res.send('Server Ready');
})

app.use('/api/coaches', coachRouter);
app.use('/api/images', imageRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});