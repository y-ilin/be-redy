module.exports = (sequelize, DataTypes) => {
  const StickyNote = sequelize.define("StickyNote", {
    noteText: {
      type: DataTypes.STRING,
      allowNull: true
    },
    xCoord: {
      type: DataTypes.DECIMAL
    },
    yCoord: {
      type: DataTypes.DECIMAL
    }
  });
  return StickyNote;
};
