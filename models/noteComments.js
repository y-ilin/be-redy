module.exports = (sequelize, DataTypes) => {
  // Creating our Comment model
  const Comment = sequelize.define("Comment", {
    commentText: {
      type: DataTypes.STRING
    }
  });
  Comment.associate = models => {
    // Creating the belongs-to association between comments and their stickies,
    // and another association between comments and the users that made them.
    // When stickies are deleted, that will cascade so that their associated comments will also be deleted.
    Comment.belongsTo(models.StickyNote, { onDelete: "CASCADE" });
    Comment.belongsTo(models.User);
  };
  return Comment;
};
