module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "rezerva_tichet",
    {
      locuri_rezervate: {
        type: DataTypes.STRING,
        defaultValue: "[]",
      },
    },
    {
      freezeTableName: true, // prevent Sequelize from adding an "s" to the end of the table name
    }
  );
};
