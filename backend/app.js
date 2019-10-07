const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sequelize = require('./sequelize');
const { registrationRoute, loginRoute, boardRoute, boardsRoute, searchRoute } = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(3000);

app.use('/registration', registrationRoute);
app.use('/login', loginRoute);
app.use('/board', boardRoute);
app.use('/boards', boardsRoute);
app.use('/boards/search', searchRoute);

module.exports = app;
