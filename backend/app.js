const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sequelize = require('./sequelize');
const { registrationRoute, loginRoute, boardsRoute } = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(3000);

app.use('/registration', registrationRoute);
app.use('/login', loginRoute);
app.use('/boards', boardsRoute);

module.exports = app;
