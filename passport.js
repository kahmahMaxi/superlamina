const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
const User = require('./model/users')

var theData = { email: '' }

passport.use(
    new GoogleStrategy (
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:7070/auth/google/callback",
            scope: ["email", "profile"],
        },
        function (accessToken, refreshToken, profile, cb) {
            // const user = User.create({ useremail: profile.email })
            var user = { email: profile.email }
            return cb(null, user)
        }
    )
);

// passport.serializeUser((user, done) => {
//     done(null, user)
// })

// passport.deserializeUser((user, done) => {
//     done(null, user)
// })

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, user);
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

module.exports = theData

