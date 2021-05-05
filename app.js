const express = require('express');
const path = require('path');
require('express-async-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const error = require('./middleware/async.error');

require('./config/db');
const { routes } = require('./routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

app.use(error);

module.exports = app;
