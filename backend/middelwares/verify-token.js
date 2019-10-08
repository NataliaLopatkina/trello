const jwt = require('jsonwebtoken');

const verifyToken = function (req, res, next) {
    const accessToken = JSON.parse(req.headers['authorization'].replace(/^Bearer\s/, ''));

    jwt.verify(accessToken, 'accessToken', function (err, decoded) {
        if (decoded) {
            req.user = decoded;
            return next();
        } else {
            return res.redirect('/');
        }
    });
}

module.exports = verifyToken;
