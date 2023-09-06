module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "utilizator",
    {
      nume: DataTypes.STRING,
      prenume: DataTypes.STRING,
      email: DataTypes.STRING,
      parola: DataTypes.STRING,
      telefon: DataTypes.STRING,
      tipDeUser: DataTypes.INTEGER,
    },
    {
      freezeTableName: true, // prevent Sequelize from adding an "s" to the end of the table name
    }
  );
};
