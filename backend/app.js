const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sequelize = require('./sequelize');
const passportSetup = require('./config/passport-setup');
const verifyToken = require('./middelwares/verify-token');
const errorHandler = require('./middelwares/error-handler');
const { registrationRoute, loginRoute, boardRoute, taskRoute, googleRoute } = require('./routes');

app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(3000);

app.use('/registration', registrationRoute);
app.use('/login', loginRoute);
app.use('/boards', verifyToken, boardRoute);
app.use('/tasks', verifyToken, taskRoute);
app.use('/google', googleRoute)

app.use(errorHandler);

module.exports = app;
