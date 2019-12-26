/* eslint-disable array-callback-return */
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Creating constants
const app = express();
const port = process.env.port || 3000;
const db = mongoose.connect('mongodb://localhost/BookAPI');

// Requiring Local modules
const Book = require('./src/models/bookModel');
const bookRouter = require('./src/routes/bookRouter')(Book);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get((req, res) => {
  res.send('Welcome to Our Book API');
});
// use routers
app.use('/api', bookRouter);

const listn = chalk.magenta(`Server Listening on Port ${port}.  Browse to localhost:${port}`);
app.listen(port, () => {
  debug(`${listn}`);
});
