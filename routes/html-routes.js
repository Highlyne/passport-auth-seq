// Requiring path to so we can use relative routes to our HTML files
//var path = require("path");
var db = require("../models");
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
        res.render("login", {
          msg: "Yellow!"
        });
  });

  // app.get("/", function(req, res) {
  //   // If the user already has an account send them to the members page
  //   // if (req.user) {
  //     // db.Example.findAll({}).then(function(dbExamples) {
  //       res.render("index", {
  //         msg: "Welcome!"
  //         // examples: dbExamples
  //       });
  //     // });
  //     // res.redirect("/members");
  //   // }
  //   // res.sendFile(path.join(__dirname, "../public/signup.html"));
  // });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
      // res.redirect("/members");
    // }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("login")
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
      // res.redirect("/members");
    // }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("signup", {
      msg: "Welcome!"
    })
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    if (req.user) {
      db.Example.findAll({raw: true}).then(function(dbExamples) {
        console.log("Here is example data ", dbExamples);
        res.render("members", {
          msg: "Welcome!",
          examples: dbExamples
        });
    // res.render("example", {
    //   msg: "Blue!"
    // })
  });
}  
    //res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
