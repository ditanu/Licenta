const ScenetaDb = require("../models").Sceneta;
const TrupaDb = require("../models").Trupa;

const controller = {
  addSceneta: (req, res) => {
    const {
      nume,
      autor,
      gen,
      descriere,
      pret_bilet,
      imgPoster,
      data,
      ora,
      trupaId,
      locatieId,
    } = req.body;
    TrupaDb.findByPk(trupaId)
      .then((trupa) => {
        if (trupa) {
          trupa
            .createScenete({
              nume,
              autor,
              gen,
              descriere,
              pret_bilet,
              imgPoster,
              data,
              ora,
              locatieId,
            })
            .then((sceneta) => {
              res.status(201).send(sceneta);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send({ message: "Eroare de sv!" });
            });
        } else {
          res.status(404).send({ message: "User id-ul nu exista!" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Eroare de server!" });
      });
  },

  getAllScenete: async (req, res) => {
    ScenetaDb.findAll()
      .then((scenete) => {
        res.status(200).send(scenete);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getScenetaById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "ID not provided!" });
    }

    ScenetaDb.findByPk(id, {
      attributes: ["nume", "locuri_ocupate", "pret_bilet"],
    })
      .then((sceneta) => {
        res.status(200).send({ sceneta });
      })
      .catch((err) => {
        res.status(500).send({ message: "Server error!" });
      });
  },

  deleteOneSceneta: async (req, res) => {
    const id = req.params.id;

    try {
      if (!id) throw new Error("undefined");

      let sceneta = await ScenetaDb.findByPk(id);
      if (!sceneta) throw new Error("nu exista");

      let old_sceneta = await sceneta.destroy();
      res.status(205).send(old_sceneta);
    } catch (err) {
      if (err.message === "undefined")
        res.status(400).send({ message: "Nu ai specificat id-ul!" });
      else if (err.message === "nu exista") {
        res.status(404).send({ message: `Sceneta cu id ${id} nu exista!` });
      } else {
        console.log(err.message);
        res.status(500).send({ message: "Server error!" });
      }
    }
  },

  updateSceneta: async (req, res) => {
    const sceneta = await ScenetaDb.findOne({ where: { id: req.params.id } });
    if (sceneta) {
      sceneta
        .update(req.body)
        .then((sceneta) => res.status(200).send(sceneta))
        .catch((err) => res.status(500).send(err));
    } else res.status(400).send({ message: "Nu exista trupa!" });
  },
};

module.exports = controller;
