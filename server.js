const express = require('express');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config()

const routes = require('./routes');

app.use(express.json())
const { PORT } = process.env;

// app.use('/', (req, res) => {
//     console.log("heyy");
//     res.send("helloo")
// })
app.use('/api', routes);

app.listen(PORT, err => {
    if (err) throw err;
    console.log('Server listen on port ', PORT);
});
