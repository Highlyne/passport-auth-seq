// Requiring our models and passport as we've configured it
var db = require("../models");
  
var orm = require("../controllers/api-controllers");

module.exports = function(app) {
  

  // Route for getting some data about our user to be used client side
  app.get("/api/examples", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
    res.redirect("/login")      
  }
    else {
      db.Example.findAll({}).then(function(dbExamples) {
       res.json(dbExamples)
        });
    }
  });

   // Route for getting some data about our user to be used client side
   app.get("/api/controller", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
    res.redirect("/login")      
  }
    else {
      orm.all(function(exData){
        res.json(exData)
      })
    }
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/:id", function(req, res) {
    var id =req.params.id;
    if (!req.user) {res.redirect("/login")}
    else {
      orm.one(id,function(exData){
        res.json(exData)
      })
    }
  });

    // Route for getting some data about our user to be used client side
    app.post("/api/postdata", function(req, res) {
      var newData =req.body;
      if (!req.user) {res.redirect("/login")}
      else {
        orm.new(newData,function(exData){
          res.json(exData)
        })
      }
    });
};
