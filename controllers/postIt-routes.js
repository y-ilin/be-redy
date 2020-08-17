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

  // PUT route for updating notes. We can get the updated note data from req.body
  app.put("/api/notes", (req, res) => {
    console.log(req.body.id);
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.StickyNote.update(
      {
        xCoord: req.body.x,
        yCoord: req.body.y
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
      .then(dbStickyNote => {
        res.json(dbStickyNote);
      })
      .catch(err => {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });
};
