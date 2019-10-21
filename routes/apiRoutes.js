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

  // Delete an example by id
  app.delete("/api/tools/:id", function(req, res) {
    db.Tool.destroy({ where: { id: req.params.id } }).then(function(dbTool) {
      res.json(dbTool);
    });
  });
};
