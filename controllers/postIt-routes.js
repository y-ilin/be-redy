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
      yCoord: 80
    }).then(data => {
      res.json(data);
    });
  });

  app.put("/api/notes", (req, res) => {
    db.StickyNote.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(data => {
      res.json(data);
    });
  });
};
