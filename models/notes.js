module.exports = (sequelize, DataTypes) => {
  const StickyNote = sequelize.define("StickyNote", {
    noteText: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        max: 99
      }
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
