const express = require('express');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config()

const routes = require('./routes');

app.use(express.json())
const { PORT, MONGODB_URL } = process.env;

mongoose.connect(MONGODB_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', err => {
    console.log('Mongoose error', err);
});

db.once('open', async () => {
    console.log('Connected To', MONGODB_URL);
    app.use('/api', routes);
    app.listen(PORT, err => {
        if (err) throw err;
        console.log('Server listen on port ', PORT);
    });

});