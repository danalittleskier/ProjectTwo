var passport = require("../config/passport");
var db = require("../models");
//var adminPassport = require("../config/adminPassport");
var Op = db.Sequelize.Op;

module.exports = function(app) {
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        db.Member.create({
          // eslint-disable-next-line camelcase
          first_name: req.body.firstName,
          // eslint-disable-next-line camelcase
          last_name: req.body.lastName,
          zip: req.body.zip,
          username: req.body.username,
          email: req.body.email
        });
        res.redirect("/members");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.post("/api/adcreate", function(req, res) {
    db.Admin.create({
      email: req.body.email,
      password: req.body.password
    }).catch(function(err) {
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
      db.Member.findAll({ where: { id: req.user.id } }).then(function(
        dbMember
      ) {
        res.json({
          email: req.user.email,
          id: req.user.id,
          member: dbMember[0]
        });
      });
    }
  });
  // Get all tools
  app.get("/api/tools", function(req, res) {
    db.Tool.findAll({}).then(function(dbTool) {
      res.json(dbTool);
    });
  });

  // Get all tools where category matches a given value
  app.get("/api/categories/:cat", function(req, res) {
    var categoryInput = req.params.cat.replace(/\+/g, " ");
    db.Tool.findAll({
      where: { category: categoryInput }
    })
      .then(function(dbTool) {
        res.json(dbTool.Tool);
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  // Create a new tool
  app.post("/api/tools", function(req, res) {
    db.Tool.create(req.body).then(function(dbTool) {
      res.json(dbTool);
    });
  });

  //Insert into Transactions table
  app.post(/\/api\/rent/, function(req, res) {
    db.Tool.update(
      {
        rented: true
      },
      {
        where: {
          id: req.body.tool_id
        }
      }
    ).then(function() {
      db.Transaction.create(req.body).then(function(dbTransaction) {
        res.json(dbTransaction);
      });
    });
  });

  // Delete an example by id
  app.delete("*/api/tools/:id", function(req, res) {
    console.log("params " + req.params.id);
    db.Tool.destroy({ where: { id: req.params.id } }).then(function(dbTool) {
      res.json(dbTool);
    });
  });
};
