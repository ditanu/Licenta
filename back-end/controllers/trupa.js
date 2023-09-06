const { Trupa } = require("../models");

const TrupaDb = require("../models").Trupa;
const UtilizatorDb = require("../models").Utilizator;

const controller = {
  addTrupa: (req, res) => {
    const { nume, nrMembrii, descriere, utilizatorId } = req.body;
    UtilizatorDb.findByPk(utilizatorId)
      .then((user) => {
        if (user) {
          user
            .createTrupe({ nume, nrMembrii, descriere, active: 0 })
            .then((trupa) => {
              res.status(201).send(trupa);
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

  getAllTrupe: async (req, res) => {
    TrupaDb.findAll()
      .then((trupe) => {
        res.status(200).send(trupe);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getTrupaById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "ID not provided!" });
    }

    TrupaDb.findByPk(id)
      .then((trupa) => {
        res.status(200).send({ trupa });
      })
      .catch((err) => {
        res.status(500).send({ message: "Server error!" });
      });
  },

  deleteOneTrupa: async (req, res) => {
    const id = req.params.id;

    try {
      if (!id) throw new Error("undefined");

      let trupa = await TrupaDb.findByPk(id);
      if (!trupa) throw new Error("nu exista");

      let old_trupa = await trupa.destroy();
      res.status(205).send(old_trupa);
    } catch (err) {
      if (err.message === "undefined")
        res.status(400).send({ message: "Nu ai specificat id-ul!" });
      else if (err.message === "nu exista") {
        res.status(404).send({ message: `Trupa cu id ${id} nu exista!` });
      } else {
        console.log(err.message);
        res.status(500).send({ message: "Server error!" });
      }
    }
  },

  updateTrupa: async (req, res) => {
    const trupa = await TrupaDb.findOne({ where: { id: req.params.id } });
    if (trupa) {
      trupa
        .update(req.body)
        .then((trupa) => res.status(200).send(trupa))
        .catch((err) => res.status(500).send(err));
    } else res.status(400).send({ message: "Nu exista trupa!" });
  },

  activeazaTrupa: async (req, res) => {
    const trupa = await TrupaDb.findOne({ where: { id: req.params.id } });
    if (trupa) {
      trupa.active = trupa.active == 0 ? 1 : 0;
      await trupa.save();
      res.status(200).send(trupa);
    } else {
      res.status(400).send({ message: "Nu exista trupa" });
    }
  },
};

module.exports = controller;
