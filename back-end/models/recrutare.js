module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "recrutare",
    {
      motivatie: DataTypes.STRING,
    },
    {
      freezeTableName: true, // prevent Sequelize from adding an "s" to the end of the table name
    }
  );
};
