const LocatieDb = require("../models").Locatie;

const controller = {
  addLocatie: async function (req, res) {
    try {
      let locatie = {
        nume: req.body.nume,
        nrLocuri: req.body.nrLocuri,
        strada: req.body.strada,
      };

      for (let camp in locatie) {
        if (locatie[camp] === undefined) throw new Error("undefined");
      }

      const newLocatie = await LocatieDb.create(locatie);
      res.status(201).send(newLocatie);
    } catch (err) {
      if (err.message === "undefined")
        res.status(400).send({
          message: "unul sau mai multe campuri nu au fost completate",
        });
      else {
        res.status(500).send({ message: "server error" });
        console.log(err);
      }
    }
  },

  getAllLocatii: async (req, res) => {
    LocatieDb.findAll()
      .then((locatii) => {
        res.status(200).send(locatii);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getLocatieById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "ID not provided!" });
    }

    LocatieDb.findByPk(id)
      .then((locatie) => {
        res.status(200).send({ locatie });
      })
      .catch((err) => {
        res.status(500).send({ message: "Server error!" });
      });
  },

  deleteOneLocatie: async (req, res) => {
    const id = req.params.id;
    try {
      if (!id) throw new Error("undefined");

      let locatie = await LocatieDb.findByPk(id);
      if (!locatie) throw new Error("nu exista");

      let old_locatie = await locatie.destroy();
      res.status(205).send(old_locatie);
    } catch (err) {
      if (err.message === "undefined")
        res.status(400).send({ message: "Nu ai specificat id-ul!" });
      else if (err.message === "nu exista") {
        res.status(404).send({ message: `Locatia cu id ${id} nu exista!` });
      } else {
        console.log(err.message);
        res.status(500).send({ message: "Server error!" });
      }
    }
  },

  updateLocatie: async (req, res) => {
    const locatie = await LocatieDb.findOne({ where: { id: req.params.id } });
    if (locatie) {
      locatie
        .update(req.body)
        .then((locatie) => res.status(200).send(locatie))
        .catch((err) => res.status(500).send(err));
    } else res.status(400).send({ message: "Nu exista locatia!" });
  },
};

module.exports = controller;
