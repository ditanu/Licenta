module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "trupa",
    {
      nume: DataTypes.STRING,
      nrMembrii: DataTypes.INTEGER,
      descriere: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
    },
    {
      freezeTableName: true, // prevent Sequelize from adding an "s" to the end of the table name
    }
  );
};
