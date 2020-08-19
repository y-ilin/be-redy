module.exports = (sequelize, DataTypes) => {
  const StickyNote = sequelize.define("StickyNote", {
    noteText: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        max: 120
      }
    },
    xCoord: {
      type: DataTypes.DECIMAL
    },
    yCoord: {
      type: DataTypes.DECIMAL
    },
    noteColour: {
      type: DataTypes.STRING
    }
  });
  return StickyNote;
};
