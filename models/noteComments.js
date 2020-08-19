module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    comments: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER
    },
    stickyNotesId: {
      type: DataTypes.INTEGER
    }
  });
  return Comments;
};
