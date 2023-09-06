const RecrutareDb = require("../models").Recrutare;
const UtilizatorDb = require("../models").Utilizator;

const controller = {
  addRecrutare: (req, res) => {
    const { motivatie, utilizatorId } = req.body;
    UtilizatorDb.findByPk(utilizatorId)
      .then((user) => {
        if (user) {
          user
            .createRecrutari({ motivatie })
            .then((recrutare) => {
              res.status(201).send(recrutare);
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

  getAllRecrutari: async (req, res) => {
    RecrutareDb.findAll()
      .then((recrutari) => {
        res.status(200).send(recrutari);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getRecrutareById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "ID not provided!" });
    }

    RecrutareDb.findByPk(id)
      .then((recrutare) => {
        res.status(200).send({ recrutare });
      })
      .catch((err) => {
        res.status(500).send({ message: "Server error!" });
      });
  },

  deleteOneRecrutare: async (req, res) => {
    const id = req.params.id;

    try {
      if (!id) throw new Error("undefined");

      let recrutare = await RecrutareDb.findByPk(id);
      if (!recrutare) throw new Error("nu exista");

      let old_recrutare = await recrutare.destroy();
      res.status(205).send(old_recrutare);
    } catch (err) {
      if (err.message === "undefined")
        res.status(400).send({ message: "Nu ai specificat id-ul!" });
      else if (err.message === "nu exista") {
        res.status(404).send({ message: `Recrutarea cu id ${id} nu exista!` });
      } else {
        console.log(err.message);
        res.status(500).send({ message: "Server error!" });
      }
    }
  },

  updateRecrutare: async (req, res) => {
    const recrutare = await RecrutareDb.findOne({
      where: { id: req.params.id },
    });
    if (recrutare) {
      recrutare
        .update(req.body)
        .then((recrutare) => res.status(200).send(recrutare))
        .catch((err) => res.status(500).send(err));
    } else res.status(400).send({ message: "Nu exista recrutare!" });
  },
};

module.exports = controller;
