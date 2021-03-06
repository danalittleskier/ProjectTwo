var Passport = require("passport").Passport;
var LocalAdminStrategy = require("passport-local").Strategy;
var adminPassport = new Passport();

var admindb = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
adminPassport.use(
  new LocalAdminStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: "email"
    },
    function(email, password, done) {
      // When a user tries to sign in this code runs
      admindb.Admin.findOne({
        where: {
          email: email
        }
      }).then(function(dbAdmin) {
        // If there's no user with the given email
        if (!dbAdmin) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbAdmin.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        return done(null, dbAdmin);
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
adminPassport.serializeUser(function(admin, cb) {
  cb(null, admin);
});

adminPassport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = adminPassport;
