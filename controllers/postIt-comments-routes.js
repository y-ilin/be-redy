const db = require("../models");

module.exports = function(app) {
  // GET route to our comments API
  app.get("/api/comments", (req, res) => {
    db.Comment.findAll({}).then(data => {
      res.json(data);
    });
  });

  // POST route to create a comment
  app.post("/api/comments", (req, res) => {
    db.Comment.create({
      commentText: req.body.commentText,
      StickyNoteId: req.body.StickyNoteId,
      UserId: req.user.id
    }).then(data => {
      res.json(data);
    });
  });

  // DELETE route to delete a comment, selecting the comment by its id
  app.delete("/api/comments/:id", (req, res) => {
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(comments => {
        res.json(comments);
      })
      .catch(err => {
        res.json(err);
      });
  });
};
