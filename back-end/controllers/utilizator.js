const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserDb = require("../models").Utilizator;
const Rezerva_TichetDB = require("../models").Rezerva_Tichet;

const controller = {
  register: async function (req, res) {
    try {
      let user = {
        nume: req.body.nume,
        prenume: req.body.prenume,
        email: req.body.email,
        parola: req.body.parola,
        telefon: req.body.telefon,
        tipDeUser: 0,
      };

      //TODO: validari si in back

      console.log(JSON.stringify(user));

      const existUser = await UserDb.findOne({
        where: {
          email: user.email,
        },
      });

      if (existUser) {
        return res
          .status(400)
          .send("Aceasta adresa de mail este deja folosita!");
      }
      // const preHashPass = user.password;
      console.log("da");
      user.parola = await bcrypt.hash(user.parola, 10);

      const newUser = await UserDb.create(user);
      if (newUser) {
        res.status(200).send(newUser);
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  },

  login: async function (req, res) {
    const payload = {
      email: req.body.email,
      parola: req.body.parola,
    };

    try {
      const user = await UserDb.findOne({
        where: {
          email: payload.email,
        },
      });

      if (!user) {
        return res.status(403).send("Email sau parola gresita!");
      }

      const match = await bcrypt.compare(payload.parola, user.parola);

      if (match) {
        jwt.sign(
          user.get(),
          "secretjwtkey123456",
          {
            algorithm: "HS256",
          },
          (err, token) => {
            if (err) {
              console.log(err);
              throw new Error("jwt");
            }
            res.cookie("bearer", token, {
              httpOnly: true,
              expire: 604800000,
            });
            res.status(200).send({ user: user, token: token });
          }
        );
      } else {
        return res.status(403).send("Email sau parola gresita!");
      }
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  },

  // logout: async function (req, res) {
  //   const token = req.token;
  //   const now = new Date();
  //   const expire = new Date(req.user.exp);
  //   const milliseconds = now.getTime() - expire.getTime();
  //   /* ----------------------------- BlackList Token ---------------------------- */
  //   await cache.set(token, token, milliseconds);

  //   return res.json({ message: "Logged out successfully" });
  // },

  //   getUserById: async function (req, res) {
  //     try {
  //       const id = req.params.id;
  //       const user = await UserDb.findOne({ where: { userId: id } });
  //       if (user) {
  //         res.status(200).send(user);
  //       } else {
  //         res.status(404).send("fuck you");
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //       res.status(500).send("Server error");
  //     }
  //   },

  getAllUsers: async (req, res) => {
    UserDb.findAll()
      .then((useri) => {
        res.status(200).send(useri);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Server error!" });
      });
  },

  updateUser: async (req, res) => {
    try {
      const user = await UserDb.findOne({ where: { id: req.params.id } });
      if (user) {
        console.log(user);
        console.log(req.body);
        user
          .update(req.body)
          .then((user) =>
            res.status(200).send({ user: user, message: "User updated" })
          )
          .catch((err) => res.status(500).send(err));
      } else res.status(400).send({ message: "Nu exista user-ul!" });
    } catch (error) {
      console.log(error);
    }
  },

  deleteOneUser: async (req, res) => {
    const id = req.params.id;
    try {
      if (!id) throw new Error("undefined");

      let user = await UserDb.findByPk(id);
      if (!user) throw new Error("nu exista");

      let old_user = await user.destroy();
      res.status(205).send(old_user);
    } catch (err) {
      if (err.message === "undefined")
        res.status(400).send({ message: "Nu ai specificat id-ul!" });
      else if (err.message === "nu exista") {
        res.status(404).send({ message: `User-ul cu id ${id} nu exista!` });
      } else {
        console.log(err.message);
        res.status(500).send({ message: "Server error!" });
      }
    }
  },

  addBilet: async (req, res) => {
    const biletUtilizator = {
      utilizatorId: req.body.utilizatorId,
      scenetaId: req.body.scenetaId,
      locuri_rezervate: req.body.locuri_rezervate,
    };

    let errors = {};

    if (
      !biletUtilizator.utilizatorId ||
      !biletUtilizator.scenetaId ||
      !biletUtilizator.locuri_rezervate
    ) {
      errors.campuriGoale = "Campurile n-au fost completate!";
    }

    if (Object.keys(errors).length === 0) {
      Rezerva_TichetDB.create(biletUtilizator)
        .then(() => {
          res.status(201).send({ message: "Merge" });
        })
        .catch((errors) => {
          res.status(500).send(errors);
        });
    } else {
      res.status(400).send(errors);
    }
  },

  getAllBilete: async (req, res) => {
    Rezerva_TichetDB.findAll()
      .then((bilete) => {
        res.status(200).send(bilete);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Server error!" });
      });
  },
};
module.exports = controller;
