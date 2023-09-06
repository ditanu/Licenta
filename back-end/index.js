const express = require("express");
const app = express();

const router = require("./routes");

const cors = require("cors");

const connectionDb = require("./models").connectionDb;

const port = 8080;

const Db = require("./config/db");

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api", router);

app.get("/reset", function (req, res) {
  connectionDb
    .sync({
      force: true,
    })
    .then(() => {
      res.status(201).send({ message: "Database reset!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Database reset failed",
        err: err.message,
      });
    });
});

app.listen(port, () => {
  console.log(`Server is online on port ${port}`);
  console.log(`http://localhost:${port}`);
});
