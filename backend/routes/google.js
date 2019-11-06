const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('google', {
   scope: ['profile']
}));

router.get('/redirect', passport.authenticate('google'), (req, res)=> {
    res.send('you reached the callback URI')
});

module.exports = router;
