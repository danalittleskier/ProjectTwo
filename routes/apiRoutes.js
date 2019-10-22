/* eslint-disable camelcase */
var db = require("../models");

module.exports = function(app) {
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
