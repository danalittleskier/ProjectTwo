var db = require("../models");
var Op = db.Sequelize.Op;

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Tool.findAll({}).then(function (dbTools) {
      res.render("index", {
        msg: "Welcome!",
        tools: dbTools
      });
    });
  });

  app.get("/login", function (req, res) {
    res.render("login");
    // db.Tool.findAll({}).then(function(dbTools) {
    // });
  });

  app.get("/signup", function (req, res) {
    res.render("signup");
    // db.Tool.findAll({}).then(function(dbTools) {
    // });
  });

  app.get("/categories/:cats", function (req, res) {
    db.Tool.findAll({
      where: {
        category: req.params.cats
      }
    }).then(function (dbTools) {
      res.render("category", {
        tools: dbTools
      });
    });
  });

  app.get("/members", isAuthenticated, function (req, res) {
    res.render("members");
    // db.Tool.findAll({}).then(function(dbTools) {
    // });
  });

  app.get("/search/:str", function (req, res) {
    var searchTerm = req.params.str;
    console.log("search Term : "+searchTerm);
    db.Tool.findAll({
      where: {
        name: {
          [Op.startsWith]: searchTerm
        }
      }
    }).then(function (dbTools) {
      res.render("results", {
        tools: dbTools
      });
      //res.json(dbTools);
    });
  });
  // Load tool page and pass in an tool by id
  app.get("/tools/:id", function (req, res) {
    db.Tool.findOne({ where: { id: req.params.id } }).then(function (dbTool) {
      res.render("tools", {
        tool: dbTool
      });
    });
  });

  app.get("/tools", function (req, res) {
    db.Tool.findAll({}).then(function (dbTools) {
      res.render("tools", {
        tools: dbTools
      });
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
