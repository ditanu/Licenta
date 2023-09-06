module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "eroare",
    {
      numeErr: DataTypes.STRING,
    },
    {
      freezeTableName: true, // prevent Sequelize from adding an "s" to the end of the table name
    }
  );
};
