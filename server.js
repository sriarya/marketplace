const express = require('express');
const app = express();
require('dotenv').config()

app.use(express.urlencoded({ extended: true }))
const { PORT } = process.env;

app.listen(PORT, err => {
    if (err) throw err;
    console.log('Server listen on port ', PORT);
});
