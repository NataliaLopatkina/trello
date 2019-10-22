const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sequelize = require('./sequelize');
const verifyToken = require('./middelwares/verify-token');
const { registrationRoute, loginRoute, boardRoute, singleBoardRoute,  taskRoute } = require('./routes');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.listen(3000);

app.use('/registration', registrationRoute);
app.use('/login', loginRoute);
app.use('/board', verifyToken, boardRoute);
app.use('/single-board', verifyToken, singleBoardRoute);
app.use('/task', verifyToken, taskRoute);

app.use(function (err, req, res, next) {
    res.status(500).send('Something went wrong!');
})

module.exports = app;
