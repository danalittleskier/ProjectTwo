var db = require("../models");
var passport = require("../config/passport");
var adminPassport = require("../config/adminPassport");
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
    })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.post("/api/admin", adminPassport.authenticate("local"), function(req,res) {
    res.json(req.user);
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

  //Get all tools where category matches a given value
  // app.get("/api/categories/:category", function(req, res) {
  //   db.Tool.findAll({
  //     where: { category: req.params.category }
  //   }).then(function(dbTool) {
  //     res.json(dbTool);
  //   });
  // });
  app.get("/api/search/:str", function (req, res) {
    var searchTerm = req.params.str;
    console.log("search Term : "+searchTerm);
    db.Tool.findAll({
      where: {
        name: {
          [Op.startsWith]: searchTerm
        }
      }
    }).then(function (dbTools) {
      res.json(dbTools);
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
  app.delete("/api/tools/:id", function(req, res) {
    db.Tool.destroy({ where: { id: req.params.id } }).then(function(dbTool) {
      res.json(dbTool);
    });
  });
};
