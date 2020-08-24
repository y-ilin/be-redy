module.exports = (sequelize, DataTypes) => {
  // Creating our StickyNote model
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

  StickyNote.associate = models => {
    // In order to create a voting system, we need to create a many-to-many association with Sequelize between our
    // StickyNote and User models. This way, we can track which users vote for which stickies.
    // Users can vote for many stickies, and each sticky can be voted for by many users.
    StickyNote.belongsToMany(models.User, { through: "Vote" });
    // Create this alias User2 for User, which we will use in "html-routes.js" to join the User table to the Sticky table
    // a second time where the logged-in user has already voted for each sticky.
    StickyNote.belongsToMany(models.User, { as: "User2", through: "Vote" });
    // Creating the has-many association between the stickies and their comments.
    // When stickies are deleted, that will cascade so that their associated comments will also be deleted.
    StickyNote.hasMany(models.Comment, { onDelete: "CASCADE" });
  };

  return StickyNote;
};
