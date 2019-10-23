const passport = require('passport');
const VKontakteStrategy = require('passport-vkontakte').Strategy;
const keys = require('./keys');

passport.use(new VKontakteStrategy({
    clientID: keys.vk.clientID,
    clientSecret: keys.vk.clientSecret
},
    ()=> {}
));
