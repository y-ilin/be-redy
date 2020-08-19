const db = require("../models");

module.exports = function(app) {
  console.log(app);
  // Find Sticky Note by ID
  function findSticky(id) {
    return db.StickyNote.findOne({
      where: {
        id: id
      }
    });
  }

  //Find a user by their ID
  function findUser(id) {
    return db.user.findOne({
      where: {
        id: id
      }
    });
  }

  // when receiving a POST request to /api/comment, log the user's comment by adding
  // that particular user to that particular sticky's table in the database.
  app.post("/api/comment", async (req, res) => {
      try {
          //Find the relevant sticky from the sticky model
          const sticky = await findSticky(req.boy.stickyId);

          // Find the relevant user from the user model
          const user = await findUser(req.body.userId);

          //adding this user to this sticky in the database
          await sticky.addUser(user);

          //finding how many users have commented on this particular sticky.
          const stickyCommentCount = await sticky.countUsers();
          console.log("total comments on this sticky are " + stickyCommentCount);

          //Returning a JSON message to the client side with the user's email,
          // the sticky's id, and the sticky's comment count.
          res.json({
              userEmail: user.email,
              stickyID: sticky.id,
              userComment: ,
              stickyCommentCount: stickyCommentCount
          });
      } catch (error) {
          console.log(error);
      }
  });
};
