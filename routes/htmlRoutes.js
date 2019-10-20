var db = require("../models");

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

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
