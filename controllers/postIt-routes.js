const db = require("../models");

module.exports = function(app) {
  // GET route for loading our API to show all stickies
  app.get("/api/notes", (req, res) => {
    db.StickyNote.findAll({}).then(data => {
      res.json(data);
    });
  });

  // POST route to create a comment
  app.post("/api/notes", (req, res) => {
    db.StickyNote.create({
      noteText: req.body.noteText,
      xCoord: req.body.xCoord,
      yCoord: req.body.yCoord,
      noteColour: req.body.noteColour
    }).then(data => {
      res.json(data);
    });
  });

  // UPDATE route for updating sticky text and coordinates
  app.put("/api/notes", (req, res) => {
    db.StickyNote.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(data => {
      res.json(data);
    });
  });

  // DELETE route for deleting stickies
  app.delete("/api/notes/:id", (req, res) => {
    db.StickyNote.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbStickyNote => {
        res.json(dbStickyNote);
      })
      .catch(err => {
        res.json(err);
      });
  });
};
