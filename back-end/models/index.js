const { Sequelize } = require("sequelize");

const Db = require("../config/db");
const EroareModel = require("./eroare");
const FeedbackModel = require("./feedback");
const LocatieModel = require("./locatie");
const RecrutareModel = require("./recrutare");
const ScenetaModel = require("./sceneta");
const TrupaModel = require("./trupa");
const UtilizatorModel = require("./utilizator");
const Rezerva_Tichet_Model = require("./rezerva_tichet");

const Eroare = EroareModel(Db, Sequelize);
const Feedback = FeedbackModel(Db, Sequelize);
const Locatie = LocatieModel(Db, Sequelize);
const Recrutare = RecrutareModel(Db, Sequelize);
const Sceneta = ScenetaModel(Db, Sequelize);
const Trupa = TrupaModel(Db, Sequelize);
const Utilizator = UtilizatorModel(Db, Sequelize);
const Rezerva_Tichet = Rezerva_Tichet_Model(Db, Sequelize);

// Fk utilizatorId pentru tabela Recrutare
Utilizator.hasMany(Recrutare, {
  foreignKey: "utilizatorId",
  as: "Recrutari",
  onDelete: "CASCADE",
});
Recrutare.belongsTo(Utilizator);

// Fk utilizatorId pentru Eroare
Utilizator.hasMany(Eroare, {
  foreignKey: "utilizatorId",
  as: "Erori",
  onDelete: "CASCADE",
});
Eroare.belongsTo(Utilizator);

// Fk utilizatorId pentru Trupa
Utilizator.hasMany(Trupa, {
  foreignKey: "utilizatorId",
  as: "Trupe",
  onDelete: "CASCADE",
});
Trupa.belongsTo(Utilizator);

// Fk trupaId pentru Sceneta
Trupa.hasMany(Sceneta, {
  foreignKey: "trupaId",
  as: "Scenete",
  onDelete: "CASCADE",
});
Sceneta.belongsTo(Trupa);

// Fk locatieId pentru Sceneta
Locatie.hasMany(Sceneta, {
  foreignKey: "locatieId",
  as: "Scenete",
  onDelete: "CASCADE",
});
Sceneta.belongsTo(Locatie);

// Fk scenetaId pentru Feedback
Sceneta.hasMany(Feedback, {
  foreignKey: {
    name: "scenetaId",
  },
  as: "Feedbackuri",
  onDelete: "CASCADE",
});

Feedback.belongsTo(Sceneta);

// Many TO Many intre Utilizator si Sceneta
Utilizator.belongsToMany(Sceneta, {
  through: Rezerva_Tichet,
  foreignKey: "utilizatorId",
});

Sceneta.belongsToMany(Utilizator, {
  through: Rezerva_Tichet,
  foreignKey: "scenetaId",
});

module.exports = {
  Eroare,
  Feedback,
  Locatie,
  Recrutare,
  Sceneta,
  Trupa,
  Utilizator,
  Rezerva_Tichet,
  connectionDb: Db,
};
