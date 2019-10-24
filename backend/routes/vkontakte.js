const express = require('express');
const router = express.Router();
const passport = require('passport');

// passport.authenticate('vkontakte')

router.get('/', passport.authenticate('vkontakte'),
    function (req, res) {
        // The request will be redirected to vk.com for authentication, so
        // this function will not be called.
    })

router.get('/callback',
    passport.authenticate('vkontakte', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;
