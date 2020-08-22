module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    commentText: {
      type: DataTypes.STRING
    }
  });
  Comment.associate = models => {
    Comment.belongsTo(models.StickyNote, { onDelete: "CASCADE" });
    Comment.belongsTo(models.User);
  };
  return Comment;
};
