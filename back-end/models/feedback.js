module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "feedback",
    {
      observatii: DataTypes.STRING,
      notaSceneta: DataTypes.INTEGER,
      email: DataTypes.STRING,
    },
    {
      freezeTableName: true, // prevent Sequelize from adding an "s" to the end of the table name
    }
  );
};
