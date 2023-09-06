module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "sceneta",
    {
      nume: DataTypes.STRING,
      autor: DataTypes.STRING,
      gen: DataTypes.STRING,
      descriere: DataTypes.STRING,
      pret_bilet: DataTypes.DOUBLE,
      imgPoster: DataTypes.STRING,
      nr_locuri_totale: DataTypes.INTEGER,
      data: DataTypes.STRING,
      ora: DataTypes.STRING,
      locuri_ocupate: {
        type: DataTypes.STRING,
        defaultValue: "[]",
      },
    },

    {
      freezeTableName: true, // prevent Sequelize from adding an "s" to the end of the table name
    }
  );
};
