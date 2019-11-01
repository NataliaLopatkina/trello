const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('vkontakte', {
   function (params) {}
}));

router.get('/redirect', passport.authenticate('vkontakte'), (req, res)=> {
    res.send('you reached the callback URI')
});

module.exports = router;
