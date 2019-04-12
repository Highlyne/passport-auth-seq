// Requiring necessary npm packages
// ======================
require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var exphbs = require("express-handlebars");
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
// =======================
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Setting up express app and configuring middleware needed for authentication
// =======================
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); // Looking for all forward facing files

// Use sessions to keep track of the user's login status
// ========================
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
// ========================
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");  // Let Express know the view engine is handlebars 

// Requiring our routes
// ====================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/login-routes.js")(app);

// Syncing our database and logging a message to the user upon success
// ======================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

module.exports = app;