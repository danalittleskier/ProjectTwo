var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Tool.findAll({}).then(function(dbTools) {
      res.render("index", {
        msg: "Welcome!",
        tools: dbTools
      });
    });
  });

  app.get("/login", function(req, res) {
    res.render("login");
    // db.Tool.findAll({}).then(function(dbTools) {
    // });
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
    // db.Tool.findAll({}).then(function(dbTools) {
    // });
  });

  app.get("/categories/:cats", function(req, res) {
    db.Tool.findAll({
      where: {
        category: req.params.cats
      }
    }).then(function(dbTools) {
      res.render("category", {
        tools: dbTools
      });
    });
  });

  app.get("/members", isAuthenticated, function(req, res) {
    res.render("members");
    // db.Tool.findAll({}).then(function(dbTools) {
    // });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Load tool page and pass in an tool by id
  app.get("/tools/:id", function(req, res) {
    db.Tool.findOne({ where: { id: req.params.id } }).then(function(dbTool) {
      res.render("tools", {
        tool: dbTool
      });
    });
  });

  app.get("/tools", function(req, res) {
    db.Tool.findAll({}).then(function(dbTools) {
      res.render("tools", {
        tools: dbTools
      });
    });
  });
  app.get("/category", function (req,res){
    db
  })

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
