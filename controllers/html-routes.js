// Requiring path to so we can use relative routes to our HTML files
// const path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the whiteboard page
    if (req.user) {
      res.redirect("/whiteboard");
    }
    res.render("signup");
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the whiteboard page
    if (req.user) {
      res.redirect("/whiteboard");
    }
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route
  // If a user who is not logged in tries to access this route they will be redirected to the signup page

  // Modify this route to change data to the whiteboard page through handlebars.js
  app.get("/whiteboard", isAuthenticated, (req, res) => {
    db.StickyNote.findAll({}).then(data => {
      const hbsObject = {
        stickyNote: data
      };
      console.log(hbsObject);
      res.render("whiteboard", hbsObject);
    });
  });
};
