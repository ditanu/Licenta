const express = require("express");
const router = express.Router();
const utilizatorRouter = require("./utilizator");
const trupaRouter = require("./trupa");
const locatieRouter = require("./locatie");
const scenetaRouter = require("./sceneta");
const recrutareRouter = require("./recrutare");
const feedbackRouter = require("./feedback");

router.use("/utilizator", utilizatorRouter);
router.use("/trupa", trupaRouter);
router.use("/locatie", locatieRouter);
router.use("/sceneta", scenetaRouter);
router.use("/recrutare", recrutareRouter);
router.use("/feedback", feedbackRouter);

module.exports = router;
