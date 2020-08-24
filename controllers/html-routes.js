// Requiring path to so we can use relative routes to our HTML files
// const path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // GET route on page load on our app landing page,
  app.get("/", (req, res) => {
    // If the user already has an account send them to the whiteboard page
    if (req.user) {
      res.redirect("/whiteboard");
    }
    res.render("landing");
  });

  // GET route on page load on our signup page,
  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the whiteboard page
    if (req.user) {
      res.redirect("/whiteboard");
    }
    res.render("signup");
  });

  // GET route on page load on our login page,
  app.get("/login", (req, res) => {
    // If the user already has an account send them to the whiteboard page
    if (req.user) {
      res.redirect("/whiteboard");
    }
    res.render("login");
  });

  // GET route on our whiteboard page.
  // Here we've add our isAuthenticated middleware to this route
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // Modify this route to change data to the whiteboard page through handlebars.js
  app.get("/whiteboard", isAuthenticated, (req, res) => {
    console.log(req.user);
    // Find each sticky, include the users that have voted for each (db.User), and also include the logged-in
    // user if they have voted for each (left join of alias User2 where the id = the logged in user's id).
    db.StickyNote.findAll({
      include: [
        // This includes an array of each user that has voted for this particular sticky.
        { model: db.User },
        // This includes an array, it will contain the logged-in user if this user has voted for this sticky.
        // If not, the array will be empty.
        {
          model: db.User,
          as: "User2",
          where: { id: req.user.id },
          required: false
        },
        // This includes an array of each comment on this particular sticky.
        {
          model: db.Comment
        }
      ]
    }).then(data => {
      const hbsObject = {
        stickyNote: data
      };
      res.render("whiteboard", hbsObject);
    });
  });
};
