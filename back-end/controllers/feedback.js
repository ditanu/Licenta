const FeedbackDb = require("../models").Feedback;
const ScenetaDb = require("../models").Sceneta;

const controller = {
  addFeedback: (req, res) => {
    const { observatii, notaSceneta, email, scenetaId } = req.body;
    ScenetaDb.findByPk(scenetaId)
      .then((sceneta) => {
        if (sceneta) {
          sceneta
            .createFeedbackuri({ observatii, notaSceneta, email })
            .then((feedback) => {
              res.status(201).send(feedback);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send({ message: "Eroare de sv!" });
            });
        } else {
          res.status(404).send({ message: "Sceneta cu id-ul nu exista!" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Eroare de server!" });
      });
  },

  getAllFeedbacks: async (req, res) => {
    FeedbackDb.findAll({
      attributes: [
        "id",
        "observatii",
        "notaSceneta",
        "email",
        "createdAt",
        "updatedAt",
        "scenetaId",
      ],
    })
      .then((feedbacks) => {
        res.status(200).send(feedbacks);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getFeedbackById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "ID not provided!" });
    }

    FeedbackDb.findByPk(id, {
      attributes: [
        "id",
        "observatii",
        "notaSceneta",
        "email",
        "createdAt",
        "updatedAt",
        "scenetaId",
      ],
    })
      .then((feedback) => {
        res.status(200).send({ feedback });
      })
      .catch((err) => {
        res.status(500).send({ message: "Server error!" });
      });
  },

  deleteOneFeedback: async (req, res) => {
    const id = req.params.id;

    try {
      if (!id) throw new Error("undefined");

      let feedback = await FeedbackDb.findByPk(id, {
        attributes: [
          "id",
          "observatii",
          "notaSceneta",
          "email",
          "createdAt",
          "updatedAt",
          "scenetaId",
        ],
      });
      if (!feedback) throw new Error("nu exista");

      let old_feedback = await feedback.destroy();
      res.status(205).send(old_feedback);
    } catch (err) {
      if (err.message === "undefined")
        res.status(400).send({ message: "Nu ai specificat id-ul!" });
      else if (err.message === "nu exista") {
        res.status(404).send({ message: `Feedback-ul cu id ${id} nu exista!` });
      } else {
        console.log(err.message);
        res.status(500).send({ message: "Server error!" });
      }
    }
  },

  updateFeedback: async (req, res) => {
    const feedback = await FeedbackDb.findOne({
      where: { id: req.params.id },
      attributes: [
        "id",
        "observatii",
        "notaSceneta",
        "email",
        "createdAt",
        "updatedAt",
        "scenetaId",
      ],
    });
    if (feedback) {
      feedback
        .update(req.body)
        .then((feedback) => res.status(200).send(feedback))
        .catch((err) => res.status(500).send(err));
    } else res.status(400).send({ message: "Nu exista feedback!" });
  },
};

module.exports = controller;
