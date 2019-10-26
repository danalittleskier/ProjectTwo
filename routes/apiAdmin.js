// var passport = require("../config/passport");
var adminPassport = require("../config/adminPassport");

module.exports = function(app) {
  app.post("/api/admin", adminPassport.authenticate("local"), function(
    req,
    res
  ) {
    res.json(req.user);
  });
};
