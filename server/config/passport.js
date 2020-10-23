const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');
let Moderator= require('../models/users');

module.exports = function(passport) {
  // Local Strategy
  ///moderator
  passport.use('moderator-local', new LocalStrategy(function (username, password, done) {
    // Match Username
    let query = {username: username};
    Moderator.findOne(query, function (err, moderator) {
      if (err) throw err;
      if (!moderator) {
        return done(null, false, {message: 'No user found'});
      }

      // Match Password
      console.log(moderator.password);
      bcrypt.compare(password, moderator.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, moderator);
        } else {
          return done(null, false, {message: 'Incorrect password '});
        }
      });

    });

    ///
  }));
///student
///moderator
  passport.serializeUser(function(moderator, done) {

    done(null, moderator);
  });
  passport.deserializeUser(function(id, done) {
    Moderator.findById(id, function(err, moderator) {
      done(err, moderator);
    });
  });


};
