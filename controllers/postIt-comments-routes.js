// Requiring our models and passport as we've configured it
const db = require("../models");

module.exports = function(app) {
  app.get("/api/comments", (req, res) => {
    db.Comment.findAll({}).then(data => {
      res.json(data);
    });
  });

  app.post("/api/comments", (req, res) => {
    // const thisUser = req.user.email.split("@");
    // const currentUser = thisUser[0];
    db.Comments.create({
      comment: req.body.comment
    }).then(data => {
      res.json(data);
    });
  });
};
