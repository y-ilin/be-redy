const db = require("../models");

module.exports = function(app) {
  app.get("/api/comments", (req, res) => {
    db.Comment.findAll({}).then(data => {
      res.json(data);
    });
  });

  app.post("/api/comments", (req, res) => {
    db.Comment.create({
      commentText: req.body.commentText,
      StickyNoteId: req.body.StickyNoteId,
      UserId: req.user.id
    }).then(data => {
      res.json(data);
    });
  });

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
