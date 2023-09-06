module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "locatie",
    {
      nume: DataTypes.STRING,
      nrLocuri: DataTypes.INTEGER,
      strada: DataTypes.STRING,
    },
    {
      freezeTableName: true, // prevent Sequelize from adding an "s" to the end of the table name
    }
  );
};
