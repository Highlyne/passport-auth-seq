// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  

  // Route for getting some data about our user to be used client side
  app.get("/api/examples", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
    res.redirect("/members")      
  }
    else {
      db.Example.findAll({}).then(function(dbExamples) {
       res.json(dbExamples)
        });
    }
  });
};
