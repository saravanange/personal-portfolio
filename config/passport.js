const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const expressSession = require('express-session');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Received username:", username);
      console.log("Received password:", password);
      
      const user = await User.findOne({ username: username }).exec();
      if (user) {
        console.log("User found:", user);
        if (user.password === password) {
          console.log("User isMatch");
          return done(null, user);
        } else {
          console.log("Input password:", password);
          console.log("Stored password:", user.password);
          console.log("User is not Match.");
          return done(null, false, { message: 'Invalid password' });
        }
      } else {
        console.log("User not found.");
        return done(null, false, { message: 'Invalid username' });
      }
    } catch (err) {
      console.error('Error while finding user:', err);
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


module.exports = passport;
