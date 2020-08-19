const db = require("../models");

module.exports = function(app) {
  app.get("/api/notes", (req, res) => {
    db.StickyNote.findAll({}).then(data => {
      res.json(data);
    });
  });

  app.post("/api/notes", (req, res) => {
    db.StickyNote.create({
      noteText: "Add text here",
      xCoord: 80,
      yCoord: 80,
      noteColour: "yellow"
    }).then(data => {
      res.json(data);
    });
  });

  // UPDATE route for updating text and coordinates
  app.put("/api/notes", (req, res) => {
    db.StickyNote.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(data => {
      res.json(data);
    });
  });

  // DELETE route for deleting stickies.
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
