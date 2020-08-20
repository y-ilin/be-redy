// Requiring our models and passport as we've configured it
const db = require("../models");

module.exports = function(app) {
  // In order to create a voting system, we need to create a many-to-many association with Sequelize between our
  // StickyNote and User models. This way, we can track which users vote for which stickies.
  // Users can vote for many stickies, and each sticky can be voted for by many users.
  db.StickyNote.belongsToMany(db.User, { through: "Vote" });
  // Create this alias User2 for User, which we will use in "html-routes.js" to join the User table to the Sticky table
  // a second time where the logged-in user has already voted for each sticky.
  db.StickyNote.belongsToMany(db.User, { as: "User2", through: "Vote" });
  db.User.belongsToMany(db.StickyNote, { through: "Vote" });

  // Finding a sticky by its id
  function findSticky(id) {
    return db.StickyNote.findOne({
      where: {
        id: id
      }
    });
  }

  // Finding a user by their id
  function findUser(id) {
    return db.User.findOne({
      where: {
        id: id
      }
    });
  }

  // When receiving a POST request to /api/vote, log the user's vote by adding
  // that particular user to that particular sticky's table in the database.
  app.post("/api/vote", async (req, res) => {
    try {
      // Finding the relevant sticky from the Sticky model
      const sticky = await findSticky(req.body.stickyId);

      // Finding the relevant user from the User model
      const user = await findUser(req.user.id);

      // Adding this user to this sticky in the database (this is a Sequelize method)
      await sticky.addUser(user);

      // Finding how many users have voted for this particular sticky (this is a Sequelize method)
      const stickyVoteCount = await sticky.countUsers();

      // Returning a JSON message to the client side with the user's email,
      // the sticky's id, and the sticky's vote count.
      res.json({
        userEmail: user.email,
        stickyId: sticky.id,
        stickyVoteCount: stickyVoteCount
      });
    } catch (error) {
      console.log(error);
    }
  });
};
