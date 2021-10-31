const passport = require('passport');
require('./strategies/local.strategy')();
module.exports = function passportConfig(app){
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done)=>{
        done(null, user); //adding to the session
    });

    passport.deserializeUser((user, done )=>{
        //finding the user here
        done(null, user);
    });
}