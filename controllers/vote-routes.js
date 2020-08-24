// Requiring our models and passport as we've configured it
const db = require("../models");

module.exports = function(app) {
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

  // POST route to log the user's vote by adding that particular user to that particular sticky's table in the database.
  app.post("/api/vote", async (req, res) => {
    try {
      // Finding the relevant sticky from the Sticky model
      const sticky = await findSticky(req.body.stickyId);

      // Finding the relevant user from the User model
      const user = await findUser(req.user.id);

      if (req.body.voteFor === "true") {
        // If the user is adding a vote to this sticky, add this user to this sticky in the database (this is a Sequelize method)
        await sticky.addUser(user);
      } else {
        // Else, remove this user from this sticky in the database (also a Sequelize method)
        await sticky.removeUser(user);
      }

      // Finding how many users have voted for this particular sticky (this is a Sequelize method)
      const stickyVoteCount = await sticky.countUsers();

      // Returning a JSON message to the client side with the user's email, the sticky's id, and the sticky's vote count.
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
