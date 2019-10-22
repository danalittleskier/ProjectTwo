/* eslint-disable camelcase */
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect("/members");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  // Get all tools
  app.get("/api/tools", function(req, res) {
    db.Tool.findAll({}).then(function(dbTool) {
      res.json(dbTool);
    });
  });

  // Create a new tool
  app.post("/api/tools", function(req, res) {
    db.Tool.create(req.body).then(function(dbTool) {
      res.json(dbTool);
    });
  });

  //Insert into Transactions table
  app.post("/api/rent", function(req, res) {
    console.log(req.body);
    db.Transaction.create(req.body).then(function(dbTransaction) {
      res.json(dbTransaction);
    });
  });

  // Delete an example by id
  app.delete("/api/tools/:id", function(req, res) {
    db.Tool.destroy({ where: { id: req.params.id } }).then(function(dbTool) {
      res.json(dbTool);
    });
  });
};
