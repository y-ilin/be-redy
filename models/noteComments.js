module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    comment: {
      type: DataTypes.STRING
    }
  });
  Comment.associate = models => {
    Comment.belongsTo(models.StickyNote);
    Comment.belongsTo(models.User);
  };
  return Comment;
};
